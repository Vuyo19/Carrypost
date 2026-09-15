import { cn } from "@/lib/utils";
import type { AccountStatus, UpdateStatus } from "@/lib/app-data";

const LABELS: Record<AccountStatus | UpdateStatus, string> = {
  ready: "Ready",
  "needs-you": "Needs you",
  updated: "Updated",
  "in-progress": "In progress",
};

const STYLES: Record<AccountStatus | UpdateStatus, string> = {
  ready: "bg-emerald-50 text-emerald-700",
  updated: "bg-emerald-50 text-emerald-700",
  "needs-you": "bg-amber-50 text-amber-800",
  "in-progress": "bg-secondary text-primary",
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
