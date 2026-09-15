import { PROPAGATION_CHANNELS } from "@/lib/site-data";

export function Propagation() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Tell Carrypost once. We help tell everyone else.
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Each provider gets the update through the route it accepts.
        </p>

        <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-4">
          <div className="rounded-lg border border-border px-5 py-3 text-center">
            <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
              New
            </p>
            <p className="text-sm font-medium">Address</p>
          </div>

          <Connector />

          <div className="rounded-full border border-white/60 px-6 py-2.5 text-center">
            <p className="text-sm font-semibold">Carrypost</p>
            <p className="text-[11px] text-muted-foreground">
              one place to manage the change
            </p>
          </div>

          <Connector />

          <div className="rounded-lg border border-border px-5 py-3 text-center">
            <p className="text-sm font-medium">Your providers</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {PROPAGATION_CHANNELS.map((channel) => (
                <span
                  key={channel.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  <channel.icon className="h-3 w-3" strokeWidth={1.5} />
                  {channel.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-16 max-w-xl text-sm font-medium">
          If a provider still needs you to verify yourself, Carrypost shows
          you exactly what is left to do.
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
