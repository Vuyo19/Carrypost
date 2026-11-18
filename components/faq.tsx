import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/site-data";

export function Faq() {
  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          A few things you may be wondering.
        </h2>
        <p className="mt-4 text-muted-foreground">
          The short version: a library of short stories, read right here and
          nowhere else.
        </p>

        <Accordion className="mt-12">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="py-5 text-base font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-12 text-sm font-medium">
          Fewer tabs. More finished stories.
        </p>
      </div>
    </section>
  );
}
