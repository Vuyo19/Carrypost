"use client";

import { Paperclip, X } from "lucide-react";

import type { Account } from "@/lib/app-data";

/** Mirrors CarrypostBackend's document_relay.ALLOWED_CONTENT_TYPES exactly —
 *  once this wizard is wired to the real API, whatever passes this input's
 *  `accept` filter is what the backend will actually accept too. */
const ACCEPTED_TYPES = "application/pdf,image/jpeg,image/png";

/**
 * Shown only for selected providers that need guided verification — a
 * subset of the account list above it, not a separate step, since the two
 * are really one decision ("who, and what do they need from me").
 *
 * This is still local component state, same as the rest of the wizard (no
 * backend wiring yet — see change-address-wizard.tsx). But it's shaped to
 * match CarrypostBackend's real contract exactly: one file per provider,
 * PDF/JPEG/PNG only, attached to the outgoing email and never written
 * anywhere — see that backend's app/services/document_relay.py, which this
 * UI's copy is deliberately restating, not just decorating with reassuring
 * words.
 */
export function DocumentAttachments({
  providers,
  attachments,
  onAttach,
}: {
  providers: Account[];
  attachments: Record<string, File | null>;
  onAttach: (providerId: string, file: File | null) => void;
}) {
  if (providers.length === 0) return null;

  const attachedCount = providers.filter((p) => attachments[p.id]).length;

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold">Documents</h2>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        These providers need proof of address before they can act. Attach it
        below — Carrypost sends it straight to them in the same email and
        never keeps a copy.
      </p>

      <ul className="mt-6 divide-y divide-border border-y border-border">
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

      <p className="mt-3 text-sm text-muted-foreground">
        {attachedCount} of {providers.length} attached — the rest can still be
        completed by phone or portal if that suits you better.
      </p>
    </div>
  );
}
