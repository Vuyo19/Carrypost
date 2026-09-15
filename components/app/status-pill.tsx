import { cn } from "@/lib/utils";
import type { AccountStatus, UpdateStatus } from "@/lib/app-data";

const LABELS: Record<AccountStatus | UpdateStatus, string> = {
  ready: "Ready",
  "needs-you": "Needs you",
  updated: "Updated",
  "in-progress": "In progress",
};

/**
 * Three states, three weights of the same cherry — no green/amber borrowed
 * from a generic status-badge palette. Solid = done, tinted = under way,
 * outlined = still needs the customer, in that order of visual weight.
 */
const STYLES: Record<AccountStatus | UpdateStatus, string> = {
  ready: "bg-primary text-primary-foreground",
  updated: "bg-primary text-primary-foreground",
  "in-progress": "bg-secondary text-primary",
  "needs-you": "border border-primary text-primary",
};

export function StatusPill({
  status,
  className,
}: {
  status: AccountStatus | UpdateStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold",
        STYLES[status],
        className
      )}
    >
      {LABELS[status]}
    </span>
  );
}
