import { HeroDiagram } from "@/components/hero-diagram";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:py-32">
      <div>
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          One change · One place
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Move once.
          <br />
          Tell everyone once.
        </h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          Update your address once in Carrypost. We help carry that change to
          the accounts and providers you choose.
        </p>
        <p className="mt-2 max-w-md text-muted-foreground">
          No more repeating yourself. No more wondering who you forgot.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-base font-semibold"
          >
            Update my address
            <span aria-hidden="true">→</span>
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            See how it works
          </a>
        </div>
      </div>

      <HeroDiagram />
    </section>
  );
}
