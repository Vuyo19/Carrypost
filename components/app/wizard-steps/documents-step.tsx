"use client";

import { Paperclip, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Account } from "@/lib/app-data";

/** Mirrors CarrypostBackend's document_relay.ALLOWED_CONTENT_TYPES exactly —
 *  once this wizard is wired to the real API, whatever passes this input's
 *  `accept` filter is what the backend will actually accept too. */
const ACCEPTED_TYPES = "application/pdf,image/jpeg,image/png";

/**
 * Its own step (not a subsection of Accounts) so a customer with guided
 * providers gets a clear, single-purpose screen for the one thing that's
 * different about them — attaching proof — rather than it competing for
 * attention with the account-selection list above it.
 *
 * change-address-wizard.tsx skips this step entirely when nothing selected
 * in Accounts actually needs guided verification — this component only
 * ever renders once `providers` is non-empty.
 *
 * Still local component state, same as the rest of the wizard (no
 * address-changes wiring yet). Shaped to match CarrypostBackend's real
 * contract exactly: one file per provider, PDF/JPEG/PNG only, attached to
 * the dispatch email and never written anywhere — see that backend's
 * app/services/document_relay.py, which this UI's copy restates rather
 * than just decorates with reassuring words.
 */
export function DocumentsStep({
  providers,
  attachments,
  onAttach,
  onNext,
}: {
  providers: Account[];
  attachments: Record<string, File | null>;
  onAttach: (providerId: string, file: File | null) => void;
  onNext: () => void;
}) {
  const attachedCount = providers.filter((p) => attachments[p.id]).length;

  return (
    <div>
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">
        Step 4
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Proof of address
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        These providers need proof of address before they can act. Attach it
        below — Carrypost sends it straight to them in the same email and
        never keeps a copy.
      </p>

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {providers.map((provider) => {
          const file = attachments[provider.id] ?? null;
          const inputId = `proof-${provider.id}`;
          return (
            <li key={provider.id} className="flex items-center gap-4 py-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                {provider.name[0]}
              </div>
              <div className="flex-1">
                <p className="font-medium">{provider.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {file ? file.name : "Proof of address required"}
                </p>
              </div>

              {file ? (
                <button
                  type="button"
                  onClick={() => onAttach(provider.id, null)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  Remove
                </button>
              ) : (
                <label
                  htmlFor={inputId}
                  className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-primary/60 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-secondary"
                >
                  <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
                  Attach
                  <input
                    id={inputId}
                    type="file"
                    accept={ACCEPTED_TYPES}
                    className="sr-only"
                    onChange={(e) => onAttach(provider.id, e.target.files?.[0] ?? null)}
                  />
                </label>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {attachedCount} of {providers.length} attached — the rest can still
          be completed by phone or portal if that suits you better.
        </p>
        <Button onClick={onNext} className="h-11 rounded-full px-8">
          Continue
        </Button>
      </div>
    </div>
  );
}
