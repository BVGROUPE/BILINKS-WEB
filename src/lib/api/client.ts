import {
  getApiBearerToken,
  getApiRefreshToken,
  notifyApiSessionExpired,
  setApiTokens,
} from "@/lib/api/auth-token";
import { AUTH_ROUTES } from "@/lib/api/routes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ||
  "";

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

export function isApiConfigured(): boolean {
  return Boolean(API_BASE_URL);
}

async function parseBody(res: Response): Promise<unknown> {
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

/** Rafraîchissement du token d'accès — un seul appel en vol à la fois (anti-course). */
let refreshInFlight: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getApiRefreshToken();
  if (!refreshToken) return false;

  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${AUTH_ROUTES.refresh}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
          cache: "no-store",
        });
        if (!res.ok) return false;
        const data = (await parseBody(res)) as {
          access_token?: string;
          refresh_token?: string;
        };
        if (!data?.access_token?.trim() || !data?.refresh_token?.trim()) {
          return false;
        }
        setApiTokens(data.access_token.trim(), data.refresh_token.trim());
        return true;
      } catch {
        return false;
      } finally {
        refreshInFlight = null;
      }
    })();
  }

  return refreshInFlight;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  _isRetry = false
): Promise<T> {
  if (!isApiConfigured()) {
    throw new Error("Le serveur n'est pas configuré.");
  }

  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = getApiBearerToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (response.status === 401 && path.startsWith("/admin") && !_isRetry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiRequest<T>(path, init, true);
    }
  }

  const payload = await parseBody(response);
  if (!response.ok) {
    if (response.status === 401 && path.startsWith("/admin")) {
      notifyApiSessionExpired();
    }
    throw new ApiError(
      "request_failed",
      response.status,
      payload
    );
  }

  return payload as T;
}
