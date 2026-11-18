import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MembersBadge } from "@/components/app/members-badge";
import { cn } from "@/lib/utils";
import type { Story } from "@/lib/story-data";

/**
 * One story's preview — used on both /home ("New on Carrypost") and
 * /library (the full shelf), so the two never drift into different
 * layouts for the same data. Cover left, text right, as a row rather
 * than a stacked tile — reads closer to a list of books on a shelf
 * than a grid of thumbnails.
 */
export function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      href={`/story/${story.slug}`}
      className="group flex gap-5 rounded-xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-accent/40 sm:gap-6 sm:p-5"
    >
      <StoryCover story={story} />

      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-medium tracking-wide text-primary uppercase">
            {story.category}
          </p>
          {story.premium && <MembersBadge />}
        </div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-balance">
          {story.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground sm:line-clamp-3">
          {story.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{story.author}</span>
          <span aria-hidden="true">·</span>
          <span>{story.readMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}

const COVER_CLASS =
  "relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-lg bg-secondary sm:w-32";

/**
 * Cover art tile. Falls back to this same flat placeholder for any
 * story left without a `coverImage` (see lib/story-data.ts), so adding
 * covers one at a time never reshuffles the layout.
 */
function StoryCover({ story }: { story: Story }) {
  if (story.coverImage) {
    return (
      <div className={COVER_CLASS}>
        <Image
          src={story.coverImage}
          alt={`Cover art for ${story.title}`}
          fill
          sizes="(min-width: 640px) 128px, 96px"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(COVER_CLASS, "flex items-center justify-center")}
      aria-hidden="true"
    >
      <BookOpen className="h-6 w-6 text-primary/30" strokeWidth={1.25} />
    </div>
  );
}
