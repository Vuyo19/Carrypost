"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { StatusPill } from "@/components/app/status-pill";
import type { Account } from "@/lib/app-data";
import { cn } from "@/lib/utils";

type Filter = "all" | "ready" | "needs-you";

export function AccountsStep({
  accounts,
  heading,
  description,
  searchable = false,
  selectedIds,
  onToggle,
  onNext,
}: {
  accounts: Account[];
  heading: string;
  description: string;
  /** Show a company-name search box above the list — for browsing the full
   *  supported-providers catalog ("can Carrypost help with X?"), not the
   *  small set Gmail already found. */
  searchable?: boolean;
  selectedIds: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim().toLowerCase();
  const searched = searchable && trimmedQuery
    ? accounts.filter((a) => a.name.toLowerCase().includes(trimmedQuery))
    : accounts;

  const noMatches = searchable && trimmedQuery !== "" && searched.length === 0;

  const readyCount = searched.filter((a) => a.status === "ready").length;
  const needsYouCount = searched.length - readyCount;
  const guidedRemaining = accounts.filter(
    (a) => a.status === "needs-you" && !selectedIds.includes(a.id)
  ).length;

  const visible = searched.filter((a) =>
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

      {searchable && (
        <div className="relative mt-8 max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a company — e.g. Nedbank"
            aria-label="Search supported providers"
            className="h-11 pl-9"
          />
        </div>
      )}

      {noMatches ? (
        <div className="mt-8 rounded-xl border border-border p-6">
          <p className="font-medium">
            Carrypost doesn&apos;t support &quot;{query.trim()}&quot; yet
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;re not allowlisted to dispatch updates to this provider
            yet. Try a different name, or browse the full list.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 text-sm font-medium text-primary"
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap gap-2">
            {(
              [
                { key: "all", label: `All ${searched.length}` },
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
        </>
      )}

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
