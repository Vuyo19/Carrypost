import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

      <div className="mt-8 flex border-b border-border text-sm">
        <span className="border-b-2 border-primary px-1 pb-3 font-medium text-primary">
          Sign up
        </span>
        <Link
          href="/log-in"
          className="ml-8 px-1 pb-3 text-muted-foreground transition-colors hover:text-foreground"
        >
          Log in
        </Link>
      </div>

      <form className="mt-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Create a password" />
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox defaultChecked />I agree to the Terms and Privacy Policy
        </label>

        <Button
          render={<Link href="/home" />}
          nativeButton={false}
          className="h-11 w-full rounded-full text-base"
        >
          Create account
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
        Already have an account?{" "}
        <Link href="/log-in" className="font-medium text-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
