"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

/** Délai d'inactivité avant déconnexion (minutes) — surchargeable via NEXT_PUBLIC_ADMIN_IDLE_TIMEOUT_MINUTES. */
const IDLE_TIMEOUT_MINUTES = (() => {
  const raw = Number(process.env.NEXT_PUBLIC_ADMIN_IDLE_TIMEOUT_MINUTES);
  return Number.isFinite(raw) && raw > 0 ? raw : 10;
})();
const IDLE_TIMEOUT_MS = IDLE_TIMEOUT_MINUTES * 60_000;
const CHECK_INTERVAL_MS = 15_000;
/** Partagé entre onglets : une activité dans un onglet garde les autres connectés. */
const LAST_ACTIVITY_KEY = "bilinks_admin_last_activity";
const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
  "wheel",
] as const;

function readLastActivity(): number {
  try {
    const value = Number(localStorage.getItem(LAST_ACTIVITY_KEY));
    return Number.isFinite(value) && value > 0 ? value : Date.now();
  } catch {
    return Date.now();
  }
}

function writeLastActivity(timestamp: number): void {
  try {
    localStorage.setItem(LAST_ACTIVITY_KEY, String(timestamp));
  } catch {
    // stockage indisponible : le suivi reste local à l'onglet
  }
}

/** Déconnecte l'administrateur après une période d'inactivité. */
export function IdleLogout() {
  const { admin, logout } = useAuth();
  const isLoggedIn = admin != null;

  useEffect(() => {
    if (!isLoggedIn) return;

    let lastActivity = Date.now();
    let lastWrite = 0;
    writeLastActivity(lastActivity);

    const onActivity = () => {
      lastActivity = Date.now();
      // Limite les écritures localStorage (mousemove est très fréquent).
      if (lastActivity - lastWrite > 5_000) {
        lastWrite = lastActivity;
        writeLastActivity(lastActivity);
      }
    };

    const checkIdle = () => {
      const last = Math.max(lastActivity, readLastActivity());
      if (Date.now() - last >= IDLE_TIMEOUT_MS) {
        try {
          localStorage.removeItem(LAST_ACTIVITY_KEY);
        } catch {
          // ignore
        }
        logout();
        toast(
          `Vous avez été déconnecté après ${IDLE_TIMEOUT_MINUTES} minutes d'inactivité.`,
          { icon: "🔒", duration: 6000 }
        );
      }
    };

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, onActivity, { passive: true });
    }
    // Au retour sur l'onglet (ordinateur en veille, onglet en arrière-plan), vérifier immédiatement.
    document.addEventListener("visibilitychange", checkIdle);
    const interval = window.setInterval(checkIdle, CHECK_INTERVAL_MS);

    return () => {
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, onActivity);
      }
      document.removeEventListener("visibilitychange", checkIdle);
      window.clearInterval(interval);
    };
  }, [isLoggedIn, logout]);

  return null;
}
