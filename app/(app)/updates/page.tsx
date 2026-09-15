import { UpdatesList } from "@/components/app/updates-list";

export default function UpdatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Your change is moving
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        You do not need to remember who is outstanding — Carrypost keeps the
        list for you.
      </p>

      <div className="mt-10">
        <UpdatesList />
      </div>
    </div>
  );
}
