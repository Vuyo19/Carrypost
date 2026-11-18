/**
 * Static mock data for the library and reading screens behind auth.
 *
 * Carrypost pivoted from the address-change dispatcher to a short-story
 * reading site — see the backend's app/models for the dispatch tables
 * that are no longer wired to anything on the frontend. There is no
 * stories backend yet, so this file is the single source of truth for
 * the library and the reading page at /story/[slug]. All content below
 * is original, written for this mock — not excerpted from anywhere.
 *
 * Currently down to just the Comedy shelf, every entry `premium` (a
 * locked teaser, no `paragraphs` yet) — the other six genres were
 * dropped at the user's request while this stays focused on practicing
 * the paywall idea, and `Category`/`CATEGORIES` below are narrowed to
 * match (not just the story list) so the marketing hero diagram and the
 * home page's genre shelf stop fanning out into genres that don't
 * actually have anything in them. Re-add them (see git history) once
 * there's more than one genre to actually show.
 */

export type Category = "Comedy";

export const CATEGORIES: Category[] = ["Comedy"];

export type Story = {
  slug: string;
  title: string;
  author: string;
  category: Category;
  readMinutes: number;
  excerpt: string;
  publishedAt: string;
  /** Empty for a `premium` story that's only a teaser so far — see below. */
  paragraphs: string[];
  /** Cover art, shown on the story card. A path under public/covers/ —
   *  StoryCard renders a plain placeholder tile in its place for any
   *  story left without one. */
  coverImage?: string;
  /** Pull-quote shown above the excerpt on the card and, larger, on the
   *  reading page. Optional — most stories don't have one. */
  caption?: string;
  /** True for a story that's only ever had a title/caption/excerpt
   *  written — no `paragraphs` yet. This is the first piece of the
   *  paywall: the reading page renders a locked teaser instead of body
   *  text for these, with no real membership check behind it (none
   *  exists yet — see the Pricing section's "coming soon"). */
  premium?: boolean;
};

export const STORIES: Story[] = [
  {
    slug: "born-in-the-suburbs-deported-to-the-township",
    title: "Born in the Suburbs, Deported to the Township",
    author: "Katlego Zulu",
    category: "Comedy",
    readMinutes: 7,
    publishedAt: "14 Nov 2026",
    coverImage: "/covers/born-in-the-suburbs-deported-to-the-township.jpg",
    caption:
      "I went to visit my roots. My roots asked me why I sound like a customer service agent from Sandton.",
    excerpt:
      "A suburban-raised kid visits his township relatives, armed with private-school English and the confidence of a man who thinks saying \"Sawubona\" makes him fluent. Within 20 minutes, his grandmother has questioned his upbringing, the neighbourhood kids have nicknamed him \"Google Translate\", and he's accidentally agreed to something in a language he barely understands. His biggest challenge isn't surviving the township. It's surviving Sunday lunch without being exposed as an English-only subscription.",
    premium: true,
    paragraphs: [],
  },
  {
    slug: "tenderpreneurship-101",
    title: "Tenderpreneurship 101: How to Invoice a Pothole for R4 Million",
    author: "Tumi Sithole",
    category: "Comedy",
    readMinutes: 7,
    publishedAt: "15 Nov 2026",
    coverImage: "/covers/tenderpreneurship-101.jpg",
    caption:
      "Some people see a broken road. Others see an opportunity to buy their third Mercedes-Benz.",
    excerpt:
      "Meet a fictional tenderpreneur whose only qualification is knowing a guy who knows a guy who once shook hands with a minister. His business has no employees, no equipment, and an office that doubles as his mother's spare bedroom. Somehow, he's won a contract to install 12 traffic cones for R9 million. His biggest fear? Not an audit. A government official discovering that traffic cones cost R200 at Builders Warehouse.",
    premium: true,
    paragraphs: [],
  },
  {
    slug: "manifesting-a-lamborghini-on-2-percent-battery",
    title: "Manifesting a Lamborghini on 2% Battery",
    author: "Azola Mbeki",
    category: "Comedy",
    readMinutes: 6,
    publishedAt: "15 Nov 2026",
    coverImage: "/covers/manifesting-a-lamborghini-on-2-percent-battery.jpg",
    caption:
      "He wants to be a billionaire by 30. He's 29, unemployed, and still waiting for his mother to make breakfast.",
    excerpt:
      "A self-proclaimed future billionaire wakes up at 11:47 AM, watches three motivational videos, posts \"Nobody wants to work anymore\" and takes a well-deserved nap. He refuses entry-level jobs because he's CEO material, but his only business experience is successfully negotiating extra sauce at Nando's. His vision board features Monaco, private jets and a Bugatti. His bank account features R16.42 and a debit order that has been rejected twice.",
    premium: true,
    paragraphs: [],
  },
  {
    slug: "my-snake-wants-a-salary-increase",
    title: "My Snake Wants a Salary Increase",
    author: "Siya Radebe",
    category: "Comedy",
    readMinutes: 8,
    publishedAt: "16 Nov 2026",
    coverImage: "/covers/my-snake-wants-a-salary-increase.jpg",
    caption:
      "I sacrificed my peace for generational wealth. Now my snake wants medical aid, a company car, and every second weekend off.",
    excerpt:
      "A broke South African man, tired of watching tenderpreneurs drive G-Wagons, visits a mysterious traditional wealth practitioner who promises overnight riches through a supernatural snake. The ritual works — suddenly he's making millions. But the snake starts behaving like a disgruntled corporate employee: demanding bonuses, paid leave, load-shedding backup power, and an annual performance review. Things spiral when it threatens to join a union and report its owner to the CCMA.",
    premium: true,
    paragraphs: [],
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((story) => story.slug === slug);
}
