import { GENRES } from "@/lib/site-data";

/**
 * "One shelf, every genre" — same trunk-and-branch visual language used
 * elsewhere in the deck (How it works, Reading rules): a single line
 * fanning out into a flat row of rectangular chips, not a burst of
 * circles or cover-art imagery. Carried over from the address-change
 * hero's "one update, many accounts" diagram — the shape of the idea
 * (one input, many outcomes) still fits, just pointed at genres instead
 * of providers.
 */
export function HeroDiagram() {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg border border-border px-5 py-3 text-center">
        <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
          New story
        </p>
        <p className="text-sm font-medium">added this week</p>
      </div>

      <div className="h-8 w-px bg-border" aria-hidden="true" />

      <div className="rounded-full border border-primary/60 px-6 py-2.5 text-center">
        <p className="text-sm font-semibold">Carrypost</p>
        <p className="text-[11px] text-muted-foreground">one shelf</p>
      </div>

      <div className="h-8 w-px bg-border" aria-hidden="true" />

      <div className="relative w-full max-w-md">
        <div
          className="h-px w-full bg-border"
          aria-hidden="true"
          style={{ maxWidth: "calc(100% - 2px)" }}
        />
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 pt-4">
          {GENRES.map((genre) => (
            <div key={genre} className="relative">
              <div
                className="absolute -top-4 left-1/2 h-4 w-px -translate-x-1/2 bg-border"
                aria-hidden="true"
              />
              <div className="rounded-md border border-border px-3 py-2 text-xs whitespace-nowrap">
                {genre}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs tracking-wide text-muted-foreground">
        one shelf <span aria-hidden="true">→</span> every genre
      </p>
    </div>
  );
}
