import Link from "next/link";

import { HeroDiagram } from "@/components/hero-diagram";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:py-32">
      <div>
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          One shelf · Every story
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Short stories.
          <br />
          Read right here.
        </h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          Carrypost is a library of short fiction — longer than an article,
          shorter than a book, written to be read in one sitting.
        </p>
        <p className="mt-2 max-w-md text-muted-foreground">
          No downloads. No apps. Just open a story and read.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 text-base font-semibold"
          >
            Start reading
            <span aria-hidden="true">→</span>
          </Link>
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
