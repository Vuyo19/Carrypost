import { StoryCard } from "@/components/app/story-card";
import { CATEGORIES, STORIES } from "@/lib/story-data";

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        The shelf
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        Every short story on Carrypost, in one place.
      </p>

      <div className="mt-12 space-y-14">
        {CATEGORIES.map((category) => {
          const stories = STORIES.filter((story) => story.category === category);
          if (stories.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="text-sm font-semibold tracking-wide text-primary uppercase">
                {category}
              </h2>
              <div className="mt-4 border-t border-border" />
              <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {stories.map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
