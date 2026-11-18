import Link from "next/link";
import { notFound } from "next/navigation";

import { LockedStoryBody } from "@/components/app/locked-story-body";
import { MembersBadge } from "@/components/app/members-badge";
import { getStoryBySlug } from "@/lib/story-data";

export default async function StoryPage({ params }: PageProps<"/story/[slug]">) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-14 sm:px-8">
      <Link
        href="/library"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to the library
      </Link>

      <div className="mt-8 flex items-center gap-2">
        <p className="text-[11px] font-medium tracking-wide text-primary uppercase">
          {story.category}
        </p>
        {story.premium && <MembersBadge />}
      </div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {story.title}
      </h1>
      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
        <span>{story.author}</span>
        <span aria-hidden="true">·</span>
        <span>{story.readMinutes} min read</span>
        <span aria-hidden="true">·</span>
        <span>{story.publishedAt}</span>
      </div>

      <div className="mt-10 border-t border-border" />

      {story.caption && (
        <blockquote className="mt-10 border-l-2 border-primary pl-5 text-lg text-balance text-foreground italic">
          {story.caption}
        </blockquote>
      )}

      {story.premium ? (
        <LockedStoryBody story={story} />
      ) : (
        <>
          <article className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
            {story.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          <div className="mt-14 border-t border-border pt-8 text-center">
            <p className="text-sm font-medium">You&apos;ve reached the end.</p>
            <Link
              href="/library"
              className="mt-3 inline-block text-sm text-primary hover:underline"
            >
              Find your next story
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
