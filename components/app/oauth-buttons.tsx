import { Button } from "@/components/ui/button";
import { AppleIcon, GoogleIcon, MicrosoftIcon } from "@/components/app/brand-icons";

/**
 * Carrypost is OAuth-only — no username/password anywhere in the product.
 * Three providers, matching what a South African consumer actually already
 * has an account with: Google, Microsoft, and Apple (the real product name
 * for "sign in with your Apple/iCloud ID" is "Sign in with Apple" — there's
 * no separate "iCloud" OAuth provider, so that's the label used here).
 *
 * These are real navigations to CarrypostBackend, not client-side routing —
 * a plain <a>, not <Link>, since the flow leaves this app entirely for the
 * provider's own consent screen and comes back via a server-set redirect
 * once CarrypostBackend's callback finishes (see CarrypostBackend's
 * app/api/v1/routes/auth.py). Until real OAuth credentials are configured
 * there (CarrypostBackend/.env.example walks through each provider's
 * console), clicking these will reach the provider with an empty client_id
 * and the provider will reject it — that's expected, not a frontend bug.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

const PROVIDERS = [
  { id: "google", label: "Continue with Google", Icon: GoogleIcon },
  { id: "microsoft", label: "Continue with Microsoft", Icon: MicrosoftIcon },
  { id: "apple", label: "Continue with Apple", Icon: AppleIcon },
] as const;

export function OAuthButtons() {
  return (
    <div className="flex flex-col gap-3">
      {PROVIDERS.map(({ id, label, Icon }) => (
        <Button
          key={id}
          render={<a href={`${API_URL}/auth/${id}/login`} />}
          nativeButton={false}
          variant="outline"
          className="h-12 w-full gap-3 rounded-full text-base font-medium"
        >
          <Icon className="h-5 w-5 shrink-0" />
          {label}
        </Button>
      ))}
    </div>
  );
}
