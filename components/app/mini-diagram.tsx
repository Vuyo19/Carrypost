import { CATEGORIES } from "@/lib/story-data";

/**
 * Compact restatement of the marketing hero's fan-out diagram (see
 * hero-diagram.tsx) — a single line from "Carrypost" into a flat row of
 * genre chips. Sized down for the "every genre, one shelf" reminder card
 * on the dashboard.
 */
export function MiniDiagram() {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full border border-primary/60 px-4 py-2 text-center">
        <p className="text-sm font-semibold">Carrypost</p>
      </div>

      <div className="h-5 w-px bg-border" aria-hidden="true" />

      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => (
          <div
            key={category}
            className="rounded-md border border-border px-2.5 py-1.5 text-[11px] whitespace-nowrap text-muted-foreground"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
