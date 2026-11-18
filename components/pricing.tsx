import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PRICING_ROWS } from "@/lib/site-data";

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Read some for free. Unlock the rest soon.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Carrypost is free to read today. A membership for the full library
          is on its way.
        </p>

        <dl className="mt-16 divide-y divide-border border-y border-border text-left">
          {PRICING_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 py-5"
            >
              <dt className="font-medium">{row.label}</dt>
              <dd className="text-muted-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>

        <Button
          render={<Link href="/sign-up" />}
          nativeButton={false}
          variant="outline"
          className="mt-10 h-11 rounded-full border-white/70 bg-transparent px-8 text-base text-foreground hover:bg-white hover:text-primary-foreground"
        >
          Start reading
        </Button>
      </div>
    </section>
  );
}
