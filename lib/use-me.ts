"use client";

import { useEffect, useState } from "react";

/**
 * Talks to CarrypostBackend's GET /auth/me — the one place the frontend
 * finds out who's signed in. There's no token to manage here: the session
 * is an httpOnly cookie set by the OAuth callback (see
 * CarrypostBackend/app/core/security.py), so `credentials: "include"` is
 * what actually authenticates this request, not anything in the JS.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api/v1";

export type ConnectedAccount = {
  provider: "google" | "microsoft" | "apple";
  email: string | null;
  canSend: boolean;
};

export type Me = {
  id: string;
  email: string;
  displayName: string | null;
  /** Carried over from the address-change dispatcher's OAuth model (see
   *  CarrypostBackend's app/api/v1/routes/auth.py) — the backend still
   *  returns these, but nothing on the reading site reads them now that
   *  there's no dispatch step to gate. Safe to drop once the backend's
   *  own address-change surface is retired. */
  connectedAccounts: ConnectedAccount[];
  canDispatch: boolean;
};

export type MeState =
  | { status: "loading" }
  | { status: "authenticated"; me: Me }
  | { status: "unauthenticated" };

export function useMe(): MeState {
  const [state, setState] = useState<MeState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 401) {
          setState({ status: "unauthenticated" });
          return;
        }
        if (!res.ok) throw new Error(`Unexpected status ${res.status}`);
        const me = (await res.json()) as Me;
        setState({ status: "authenticated", me });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "unauthenticated" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function initialsFor(me: Me): string {
  const source = me.displayName?.trim() || me.email;
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}
