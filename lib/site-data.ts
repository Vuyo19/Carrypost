import {
  Ban,
  Bookmark,
  BookOpen,
  Clock3,
  Globe,
  Lock,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { CATEGORIES } from "@/lib/story-data";

/** The 6 genres on the shelf — reused for the hero's fan-out diagram. */
export const GENRES = CATEGORIES;

export type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: "1",
    title: "Open a story",
    description:
      "Browse the shelf by genre, or let a new one find you on the home page.",
    icon: BookOpen,
  },
  {
    number: "2",
    title: "Read in one sitting",
    description:
      "Most stories run 10–20 minutes — long enough to matter, short enough to finish.",
    icon: Clock3,
  },
  {
    number: "3",
    title: "Pick up where you left off",
    description:
      "Your place is saved to your account, not to a device or a download.",
    icon: Bookmark,
  },
  {
    number: "4",
    title: "New stories, regularly",
    description: "Fresh short fiction is added to the shelf every week.",
    icon: Sparkles,
  },
];

export type Channel = {
  label: string;
  icon: LucideIcon;
};

export const READING_RULES: Channel[] = [
  { label: "No downloads", icon: Lock },
  { label: "No PDFs", icon: Ban },
  { label: "No app to install", icon: Globe },
  { label: "Browser only", icon: BookOpen },
];

export const PRICING_ROWS = [
  { label: "Start reading", value: "Free" },
  { label: "New stories", value: "Added every week" },
  { label: "Full library + membership", value: "Coming soon" },
];

export const FAQ_ITEMS = [
  {
    question: "What is Carrypost?",
    answer:
      "A library of short stories, written to be read in one sitting. Browse the shelf, open one, and start reading — right there on the page.",
  },
  {
    question: "How long are the stories?",
    answer:
      "Longer than an article, shorter than a book. Most take 10–20 minutes to read, start to finish.",
  },
  {
    question: "Can I download or print a story?",
    answer:
      "No. Every story on Carrypost is read on the site and nowhere else — there's no download, export, or app. Just the page.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes, for now. Everything on the shelf is free to read today. A membership for the full library is on its way.",
  },
  {
    question: "Do I need an account?",
    answer:
      "You need one to keep your place in a story and pick up where you left off. Sign up with Google, Microsoft, or Apple — no passwords.",
  },
] as const;

export const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQs" },
] as const;
