import { HOW_IT_WORKS_STEPS } from "@/lib/site-data";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Good short fiction, without the commitment of a whole book.
      </h2>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Carrypost turns reading into something you can start on a whim and
        actually finish.
      </p>

      <ol className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <li key={step.number} className="flex flex-col items-start">
            <step.icon
              className="h-9 w-9"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <span className="mt-6 text-xs text-muted-foreground">
              {step.number}
            </span>
            <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-16 max-w-xl text-sm font-medium">
        One shelf to browse. One place to pick up where you left off.
      </p>
    </section>
  );
}
