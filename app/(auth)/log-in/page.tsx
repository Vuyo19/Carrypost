import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LogInPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Pick up where your last change left off.
      </p>

      <form className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs font-medium text-primary">
              Forgot password?
            </a>
          </div>
          <Input id="password" type="password" placeholder="Your password" />
        </div>

        <Button
          render={<Link href="/home" />}
          nativeButton={false}
          className="h-11 w-full rounded-full text-base"
        >
          Log in
        </Button>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          or
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <Button
          render={<a href="#" />}
          nativeButton={false}
          variant="outline"
          className="h-11 w-full rounded-full text-base"
        >
          Continue with Google
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to Carrypost?{" "}
        <Link href="/sign-up" className="font-medium text-primary">
          Create an account
        </Link>
      </p>
    </div>
  );
}
