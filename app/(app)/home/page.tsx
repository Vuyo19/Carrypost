import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MiniDiagram } from "@/components/app/mini-diagram";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
      <p className="text-sm font-semibold text-primary">Welcome back.</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        What changed?
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        When life moves, Carrypost helps move the admin with you.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-primary/30 p-8">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            Changed address?
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Tell Carrypost once.
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            We find likely accounts, route the updates, and track what is
            done.
          </p>
          <Button
            render={<Link href="/change-address" />}
            nativeButton={false}
            className="mt-6 h-11 rounded-full px-6 text-base"
          >
            Change address
          </Button>
        </div>

        <div className="rounded-xl border border-border p-8">
          <h2 className="text-base font-semibold">One change. One place.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A quick reminder of what Carrypost does.
          </p>
          <div className="mt-6">
            <MiniDiagram />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-sm font-semibold">Your Carrypost</h2>
        <div className="mt-4 border-t border-border" />

        <div className="flex items-center gap-4 py-6">
          <div className="size-10 shrink-0 rounded-full bg-secondary" />
          <div>
            <p className="font-medium">No active changes</p>
            <p className="text-sm text-muted-foreground">
              When you start an address change, progress will appear here.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        No subscription. Use Carrypost when something changes.
      </p>
    </div>
  );
}
