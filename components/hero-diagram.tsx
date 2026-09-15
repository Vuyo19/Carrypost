import { HERO_PROVIDERS } from "@/lib/site-data";

/**
 * "One update, many accounts" — deliberately NOT the original concept's
 * radial burst of circles with five diverging arrows. That read as busy
 * decoration rather than information. This keeps the same idea (one input
 * fans out to many providers) as a single trunk-and-branch line into a flat
 * row of rectangular chips, echoing the plainer box/line icons used
 * elsewhere in the deck (How it works, Propagation) so the hero doesn't
 * introduce its own visual language.
 */
export function HeroDiagram() {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg border border-border px-5 py-3 text-center">
        <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
          New address
        </p>
        <p className="text-sm font-medium">entered once</p>
      </div>

      <div className="h-8 w-px bg-border" aria-hidden="true" />

      <div className="rounded-full border border-white/60 px-6 py-2.5 text-center">
        <p className="text-sm font-semibold">Carrypost</p>
        <p className="text-[11px] text-muted-foreground">carry the change</p>
      </div>

      <div className="h-8 w-px bg-border" aria-hidden="true" />

      <div className="relative w-full max-w-md">
        <div
          className="h-px w-full bg-border"
          aria-hidden="true"
          style={{ maxWidth: "calc(100% - 2px)" }}
        />
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 pt-4">
          {HERO_PROVIDERS.map((provider) => (
            <div key={provider} className="relative">
              <div
                className="absolute -top-4 left-1/2 h-4 w-px -translate-x-1/2 bg-border"
                aria-hidden="true"
              />
              <div className="rounded-md border border-border px-3 py-2 text-xs whitespace-nowrap">
                {provider}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs tracking-wide text-muted-foreground">
        one update <span aria-hidden="true">→</span> many accounts
      </p>
    </div>
  );
}
