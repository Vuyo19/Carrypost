"use client";

import { useState } from "react";
import { ScanSearch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GoogleAuthModal } from "@/components/app/google-auth-modal";
import { REQUESTED_SCOPES } from "@/lib/app-data";

const LOOKS_FOR = [
  "Receipts, statements and welcome emails from providers",
  "Account names and service categories",
  "Signals that an account may still use your old address",
];

export function ConnectStep({
  onNext,
}: {
  onNext: (method: "gmail" | "manual") => void;
}) {
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          Step 1
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Find the accounts you may need to update
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Connect Gmail so Carrypost can identify likely service providers
          from your inbox.
        </p>

        <div className="mt-10 rounded-xl border border-primary/25 p-6">
          <p className="text-sm font-semibold text-primary">
            What Carrypost looks for
          </p>
          <ul className="mt-4 flex flex-col gap-4">
            {LOOKS_FOR.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <ScanSearch
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            Carrypost does not need to read your personal conversations.
          </p>
        </div>
      </div>

      <div className="h-fit rounded-xl border border-border p-6">
        <h2 className="text-xl font-semibold">Connect Gmail</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You approve access on Google&apos;s permission screen.
        </p>

        <p className="mt-6 text-xs font-semibold text-primary">
          Requested access
        </p>
        <ul className="mt-3 flex flex-col gap-3">
          {REQUESTED_SCOPES.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-primary bg-primary text-primary-foreground">
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                  <path
                    d="M2 6l2.5 2.5L10 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>

        <Button
          onClick={() => setGoogleModalOpen(true)}
          className="mt-6 h-11 w-full rounded-full"
        >
          Continue to Google
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          You can disconnect Gmail later.
        </p>

        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          or
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <p className="mt-6 text-sm font-semibold">
          Don&apos;t want to connect email?
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Add accounts yourself from the providers Carrypost is already
          allowlisted to update.
        </p>

        <Button
          onClick={() => onNext("manual")}
          variant="outline"
          className="mt-4 h-11 w-full rounded-full"
        >
          Choose from supported providers
        </Button>
      </div>

      <GoogleAuthModal
        open={googleModalOpen}
        onCancel={() => setGoogleModalOpen(false)}
        onAllow={() => {
          setGoogleModalOpen(false);
          onNext("gmail");
        }}
      />
    </div>
  );
}
