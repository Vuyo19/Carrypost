"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AppNavbar } from "@/components/app/app-navbar";
import { MeProvider } from "@/lib/me-context";
import { useMe } from "@/lib/use-me";

/**
 * Real auth guard: everything under (app) — /home, /change-address,
 * /updates — requires a live Carrypost session now that sign-in is real
 * OAuth (see CarrypostBackend/app/api/v1/routes/auth.py). A client
 * component wrapping server-rendered page children is deliberate here
 * (not a Next.js middleware check) — the session lives in an httpOnly
 * cookie on the BACKEND's origin, so the only reliable way to ask "is
 * this person signed in" is the credentialed GET /auth/me call itself.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const state = useMe();
  const router = useRouter();

  useEffect(() => {
    if (state.status === "unauthenticated") {
      router.replace("/log-in");
    }
  }, [state.status, router]);

  if (state.status !== "authenticated") {
    // Loading or mid-redirect — render nothing rather than a flash of the
    // authenticated shell (or, worse, of pages built around a `me` that
    // doesn't exist yet).
    return (
      <div className="theme-app min-h-full flex-1 bg-background" aria-hidden="true" />
    );
  }

  return (
    <MeProvider value={state.me}>
      <div className="theme-app flex min-h-full flex-1 flex-col bg-background text-foreground">
        <AppNavbar />
        <main className="flex-1">{children}</main>
      </div>
    </MeProvider>
  );
}
