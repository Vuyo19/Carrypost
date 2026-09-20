import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AppleIcon, GoogleIcon, MicrosoftIcon } from "@/components/app/brand-icons";

/**
 * Carrypost is OAuth-only — no username/password anywhere in the product.
 * Three providers, matching what a South African consumer actually already
 * has an account with: Google, Microsoft, and Apple (the real product name
 * for "sign in with your Apple/iCloud ID" is "Sign in with Apple" — there's
 * no separate "iCloud" OAuth provider, so that's the label used here).
 *
 * No backend exists yet (see the wizard's "Illustrative price" note), so
 * every provider button just does what the old email/password buttons did:
 * sends the visitor to /home as if the provider round-trip had succeeded.
 */

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
          render={<Link href="/home" />}
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
