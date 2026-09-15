const REMINDER_PROVIDERS = ["Mobile", "Retail", "Gym", "Insurance", "Internet"];

/**
 * Compact restatement of the same non-circular diagram used on the
 * marketing hero (see hero-diagram.tsx) — a single line from "Carrypost"
 * into a flat row of chips, not a burst of circles. Sized down for the
 * "reminder of what Carrypost does" card on the dashboard.
 */
export function MiniDiagram() {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full border border-primary/60 px-4 py-2 text-center">
        <p className="text-sm font-semibold">Carrypost</p>
      </div>

      <div className="h-5 w-px bg-border" aria-hidden="true" />

      <div className="flex flex-wrap justify-center gap-2">
        {REMINDER_PROVIDERS.map((provider) => (
          <div
            key={provider}
            className="rounded-md border border-border px-2.5 py-1.5 text-[11px] whitespace-nowrap text-muted-foreground"
          >
            {provider}
          </div>
        ))}
      </div>
    </div>
  );
}
