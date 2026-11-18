import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MiniDiagram } from "@/components/app/mini-diagram";
import { StoryCard } from "@/components/app/story-card";
import { STORIES } from "@/lib/story-data";

export default function HomePage() {
  const recent = STORIES.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
      <p className="text-sm font-semibold text-primary">Welcome back.</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        What do you want to read?
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        New short stories, and a place to pick up where you left off.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-primary/30 p-8">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            Nothing in progress
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Open your first story.
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Browse the shelf and find something to start.
          </p>
          <Button
            render={<Link href="/library" />}
            nativeButton={false}
            className="mt-6 h-11 rounded-full px-6 text-base"
          >
            Browse the library
          </Button>
        </div>

        <div className="rounded-xl border border-border p-8">
          <h2 className="text-base font-semibold">Every genre, one shelf.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A quick reminder of what&apos;s on Carrypost.
          </p>
          <div className="mt-6">
            <MiniDiagram />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">New on Carrypost</h2>
          <Link
            href="/library"
            className="text-sm text-primary hover:underline"
          >
            See the full shelf
          </Link>
        </div>
        <div className="mt-4 border-t border-border" />

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {recent.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Free to read today. Membership for the full library is coming soon.
      </p>
    </div>
  );
}
