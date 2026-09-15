"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusPill } from "@/components/app/status-pill";
import type { Account } from "@/lib/app-data";
import { cn } from "@/lib/utils";

type Filter = "all" | "ready" | "needs-you";

export function AccountsStep({
  accounts,
  heading,
  description,
  selectedIds,
  onToggle,
  onNext,
}: {
  accounts: Account[];
  heading: string;
  description: string;
  selectedIds: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const readyCount = accounts.filter((a) => a.status === "ready").length;
  const needsYouCount = accounts.length - readyCount;
  const guidedRemaining = accounts.filter(
    (a) => a.status === "needs-you" && !selectedIds.includes(a.id)
  ).length;

  const visible = accounts.filter((a) =>
    filter === "all" ? true : a.status === filter
  );

  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">
        Step 3
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {heading}
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">{description}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            { key: "all", label: `All ${accounts.length}` },
            { key: "ready", label: `Ready ${readyCount}` },
            { key: "needs-you", label: `Needs you ${needsYouCount}` },
          ] as { key: Filter; label: string }[]
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === tab.key
                ? "border-transparent bg-secondary font-medium text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ul className="mt-6 divide-y divide-border border-y border-border">
        {visible.map((account) => {
          const checked = selectedIds.includes(account.id);
          return (
            <li key={account.id} className="flex items-center gap-4 py-4">
              <Checkbox
                checked={checked}
                onCheckedChange={() => onToggle(account.id)}
                aria-label={`Select ${account.name}`}
              />
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                {account.name[0]}
              </div>
              <div className="flex-1">
                <p className="font-medium">{account.name}</p>
                <p className="text-sm text-muted-foreground">
                  {account.category}
                </p>
              </div>
              <StatusPill status={account.status} />
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm">
          <span className="font-semibold">{selectedIds.length} selected</span>
          <span className="ml-3 text-muted-foreground">
            {guidedRemaining} left for guided updates
          </span>
        </div>
        <Button
          onClick={onNext}
          disabled={selectedIds.length === 0}
          className="h-11 rounded-full px-8"
        >
          Review changes
        </Button>
      </div>
    </div>
  );
}
