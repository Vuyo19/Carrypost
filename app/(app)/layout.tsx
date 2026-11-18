"use client";

import { AppNavbar } from "@/components/app/app-navbar";
import { MeProvider } from "@/lib/me-context";
import { useMe } from "@/lib/use-me";

/**
 * Real auth guard: everything under (app) — /home, /library, /story —
 * requires a live Carrypost session now that sign-in is real OAuth (see CarrypostBackend/app/api/v1/routes/auth.py). A client
 * component wrapping server-rendered page children is deliberate here
 * (not a Next.js middleware check) — the session lives in an httpOnly
 * cookie on the BACKEND's origin, so the only reliable way to ask "is
 * this person signed in" is the credentialed GET /auth/me call itself.
 *
 * TEMPORARILY DISABLED for local testing without real OAuth credentials
 * configured — the redirect-to-/log-in effect is commented out below so
 * these routes render regardless of session state. AppNavbar already
 * handles a null `me` gracefully. Re-enable before this leaves local dev:
 * restore the `useEffect` + `useRouter` redirect and the loading-state
 * early return that were here.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const state = useMe();

  return (
    <MeProvider value={state.status === "authenticated" ? state.me : null}>
      <div className="theme-app flex min-h-full flex-1 flex-col bg-background text-foreground">
        <AppNavbar />
        <main className="flex-1">{children}</main>
      </div>
    </MeProvider>
  );
}
