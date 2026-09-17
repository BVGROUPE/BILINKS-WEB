import type {
  AdminEtablissementOffreApi,
  AdminEtablissementOffreCreateBody,
  AdminEtablissementOffreUpdateBody,
  AdminEtablissementOffresListResponse,
} from "@/lib/api/admin-types";
import { isAdminListApiReady, API_REQUIRED_MESSAGE } from "@/lib/api/admin-list-fetch";
import { apiRequest, isApiConfigured } from "@/lib/api/client";
import { messageFromApiError } from "@/lib/api/errors";
import { ADMIN_ROUTES } from "@/lib/api/routes";

export type { AdminEtablissementOffreApi as EtablissementOffreRow };

/**
 * Offres établissement « externes » : catalogue public consommé par
 * /subscribe?type=etablissement (paiement en ligne en libre-service).
 * Distinctes des packs « internes » (etablissements-store.ts), créés pour
 * une négociation directe et jamais listés publiquement.
 */
export async function fetchEtablissementOffresPersisted(): Promise<
  AdminEtablissementOffreApi[]
> {
  if (!isApiConfigured() || !isAdminListApiReady()) return [];

  try {
    const payload = await apiRequest<AdminEtablissementOffresListResponse>(
      ADMIN_ROUTES.etablissementOffres.list
    );
    return payload.data;
  } catch {
    return [];
  }
}

export async function createEtablissementOffrePersisted(
  body: AdminEtablissementOffreCreateBody
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isApiConfigured()) return { ok: false, error: API_REQUIRED_MESSAGE };

  try {
    await apiRequest(ADMIN_ROUTES.etablissementOffres.create, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: messageFromApiError(err, "Création impossible.") };
  }
}

export async function updateEtablissementOffrePersisted(
  id: string,
  body: AdminEtablissementOffreUpdateBody
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isApiConfigured()) return { ok: false, error: API_REQUIRED_MESSAGE };

  try {
    await apiRequest(ADMIN_ROUTES.etablissementOffres.byId(id), {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: messageFromApiError(err, "Mise à jour impossible."),
    };
  }
}

export async function deleteEtablissementOffrePersisted(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isApiConfigured()) return { ok: false, error: API_REQUIRED_MESSAGE };

  try {
    await apiRequest(ADMIN_ROUTES.etablissementOffres.byId(id), {
      method: "DELETE",
    });
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: messageFromApiError(
        err,
        "Suppression impossible (des paiements y sont peut-être liés — passez-la en INACTIF)."
      ),
    };
  }
}
