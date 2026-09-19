import Link from "next/link";

import { Button } from "@/components/ui/button";

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

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.766 12.276c0-.818-.074-1.606-.21-2.361H12.24v4.466h6.482a5.54 5.54 0 0 1-2.4 3.633v3.02h3.885c2.274-2.094 3.559-5.176 3.559-8.758z"
      />
      <path
        fill="#34A853"
        d="M12.24 24c3.24 0 5.956-1.075 7.941-2.906l-3.885-3.02c-1.077.722-2.454 1.147-4.056 1.147-3.12 0-5.76-2.106-6.705-4.936H1.522v3.115C3.497 21.4 7.573 24 12.24 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.535 14.285a7.23 7.23 0 0 1-.377-2.285c0-.793.137-1.563.377-2.285V6.6H1.522A11.96 11.96 0 0 0 .24 12c0 1.936.463 3.77 1.282 5.4z"
      />
      <path
        fill="#EA4335"
        d="M12.24 4.775c1.762 0 3.343.606 4.588 1.795l3.443-3.443C18.192 1.19 15.477 0 12.24 0 7.573 0 3.497 2.6 1.522 6.6l4.013 3.115c.945-2.83 3.585-4.94 6.705-4.94z"
      />
    </svg>
  );
}

function MicrosoftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.632-3.335c.843-1.012 1.4-2.427 1.245-3.831-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
    </svg>
  );
}

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
