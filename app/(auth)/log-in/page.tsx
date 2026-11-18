import Link from "next/link";

import { OAuthButtons } from "@/components/app/oauth-buttons";

export default function LogInPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 sm:p-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick up where you left off.
        </p>
      </div>

      <div className="mt-8">
        <OAuthButtons />
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        By continuing, you agree to Carrypost&apos;s Terms and Privacy Policy.
      </p>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to Carrypost?{" "}
        <Link href="/sign-up" className="font-medium text-primary">
          Create an account
        </Link>
      </p>

      <p className="mt-3 text-center">
        <Link
          href="/library"
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          Skip for now
        </Link>
      </p>
    </div>
  );
}
