"use client";

import { Lock } from "lucide-react";

import { useMembership } from "@/lib/use-membership";

/**
 * The small "Members" pill shown on premium stories — pulled into its
 * own client component (rather than inline in the story card / story
 * page, which otherwise stay server-rendered) purely so it can check
 * live membership status and hide itself once unlocked, matching
 * CarrypostMobile's story-card.tsx / story/[slug].tsx behavior.
 */
export function MembersBadge() {
  const { isMember } = useMembership();

  if (isMember) return null;

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
      <Lock className="h-2.5 w-2.5" strokeWidth={2} aria-hidden="true" />
      Members
    </span>
  );
}
