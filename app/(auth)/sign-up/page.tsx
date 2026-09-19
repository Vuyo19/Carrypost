import Link from "next/link";

import { OAuthButtons } from "@/components/app/oauth-buttons";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 sm:p-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start with the move. Nothing more.
        </p>
      </div>

      <div className="mt-8">
        <OAuthButtons />
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        By continuing, you agree to Carrypost&apos;s Terms and Privacy Policy.
      </p>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/log-in" className="font-medium text-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
