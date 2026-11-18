import { READING_RULES } from "@/lib/site-data";

export function Propagation() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Written to be read here. Nowhere else.
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Every story stays on the page — there is nothing to download,
          export, or carry anywhere else.
        </p>

        <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-4">
          <div className="rounded-lg border border-border px-5 py-3 text-center">
            <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
              A story
            </p>
            <p className="text-sm font-medium">you open</p>
          </div>

          <Connector />

          <div className="rounded-full border border-white/60 px-6 py-2.5 text-center">
            <p className="text-sm font-semibold">Carrypost</p>
            <p className="text-[11px] text-muted-foreground">
              the only place to read it
            </p>
          </div>

          <Connector />

          <div className="rounded-lg border border-border px-5 py-3 text-center">
            <p className="text-sm font-medium">Stays here</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {READING_RULES.map((rule) => (
                <span
                  key={rule.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  <rule.icon className="h-3 w-3" strokeWidth={1.5} />
                  {rule.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-16 max-w-xl text-sm font-medium">
          If you want to read it again, it is exactly where you left it.
        </p>
      </div>
    </section>
  );
}

function Connector() {
  return (
    <>
      <div
        className="hidden h-px w-10 bg-border sm:block"
        aria-hidden="true"
      />
      <div className="h-6 w-px bg-border sm:hidden" aria-hidden="true" />
    </>
  );
}
