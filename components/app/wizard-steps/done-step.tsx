import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UpdatesList } from "@/components/app/updates-list";

export function DoneStep() {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">
        Done
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Your change is moving
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        You do not need to remember who is outstanding — Carrypost keeps the
        list for you.
      </p>

      <div className="mt-10">
        <UpdatesList />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          You can leave now. Carrypost will keep the status here when you
          return.
        </p>
        <Button
          render={<Link href="/updates" />}
          nativeButton={false}
          className="h-11 rounded-full px-8"
        >
          View updates
        </Button>
      </div>
    </div>
  );
}
