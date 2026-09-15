import {
  GitBranch,
  Headset,
  ListChecks,
  Mail,
  Route,
  ScanSearch,
  Send,
  Webhook,
  type LucideIcon,
} from "lucide-react";

/** The 6 accounts named in the v9 hero diagram — reused for the hero's
 *  simplified provider list. */
export const HERO_PROVIDERS = [
  "Subscriptions",
  "Mobile account",
  "Medical scheme",
  "Retail account",
  "Insurance policy",
  "Internet provider",
] as const;

export type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: "1",
    title: "Find who needs to know",
    description:
      "With your permission, Carrypost helps surface the services you already use.",
    icon: ScanSearch,
  },
  {
    number: "2",
    title: "Choose your accounts",
    description:
      "Review the list and choose exactly who should receive your change.",
    icon: ListChecks,
  },
  {
    number: "3",
    title: "Tell us once",
    description:
      "Enter your new address once instead of typing it again and again.",
    icon: GitBranch,
  },
  {
    number: "4",
    title: "We carry the change",
    description:
      "Carrypost sends, guides and tracks the update until you know what is done.",
    icon: Send,
  },
];

export type Channel = {
  label: string;
  icon: LucideIcon;
};

export const PROPAGATION_CHANNELS: Channel[] = [
  { label: "Email", icon: Mail },
  { label: "API", icon: Webhook },
  { label: "Support", icon: Headset },
  { label: "Guided", icon: Route },
];

export const PRICING_ROWS = [
  { label: "One address change", value: "One-off fee" },
  { label: "Account discovery + update flow", value: "Included" },
  { label: "Clear price before you confirm", value: "No surprises" },
];

export const FAQ_ITEMS = [
  {
    question: "What does Carrypost actually do?",
    answer:
      "You update your address once, choose the accounts that need it, and Carrypost helps send, guide and track those updates.",
  },
  {
    question: "Will every account update automatically?",
    answer:
      "Not always. Some providers can be handled directly; others may still need you to verify yourself or upload documents.",
  },
  {
    question: "Why connect my email?",
    answer:
      "It helps Carrypost find services you already use, so you do not have to remember every account from scratch.",
  },
  {
    question: "What about banks and SARS?",
    answer:
      "They may still require direct authentication, proof of residence or other regulated checks. Carrypost guides the steps.",
  },
  {
    question: "Is this a subscription?",
    answer:
      "No. Carrypost is designed for moments of change: pay once, complete the update, and leave.",
  },
] as const;

export const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQs" },
] as const;
