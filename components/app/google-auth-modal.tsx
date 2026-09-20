"use client";

import { Check } from "lucide-react";

import { GoogleIcon } from "@/components/app/brand-icons";
import { REQUESTED_SCOPES } from "@/lib/app-data";

/**
 * A mock of Google's real OAuth consent screen — the popup a user actually
 * sees after "Continue to Google", listing exactly what Carrypost is asking
 * to read from their inbox before anything is granted. There's no real
 * Google integration behind this (no backend at all yet), so "Continue"
 * here just tells the wizard the (simulated) grant succeeded.
 *
 * Styled to Google's own palette/type scale (Roboto, #1a73e8 blue,
 * #202124/#5f6368 text) so it reads as the real permission dialog rather
 * than a Carrypost-branded imitation of it — that's the point: this is
 * Google asking on Carrypost's behalf, not Carrypost asking directly.
 */
export function GoogleAuthModal({
  open,
  onCancel,
  onAllow,
}: {
  open: boolean;
  onCancel: () => void;
  onAllow: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className="w-full max-w-[420px] rounded-lg bg-white p-8 shadow-2xl"
        style={{ fontFamily: "Roboto, Arial, sans-serif" }}
        role="dialog"
        aria-modal="true"
        aria-label="Sign in with Google"
      >
        <GoogleIcon className="h-6 w-6" />

        <div className="mt-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c92a4a] text-xl font-bold text-white">
            C
          </div>
        </div>

        <h2 className="mt-4 text-center text-xl leading-snug text-[#202124]">
          Carrypost wants to access your Google Account
        </h2>
        <p className="mt-1 text-center text-sm text-[#5f6368]">
          you@gmail.com
        </p>

        <div className="mt-6 rounded-lg border border-[#dadce0] p-4">
          <p className="text-sm text-[#202124]">This will allow Carrypost to:</p>
          <ul className="mt-3 flex flex-col gap-3">
            {REQUESTED_SCOPES.map((scope) => (
              <li key={scope} className="flex items-start gap-3 text-sm text-[#202124]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5f6368]" strokeWidth={2} />
                {scope}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#5f6368]">
          Make sure you trust Carrypost. You may be sharing sensitive info
          with this site or app. You can see or remove access anytime in your{" "}
          <span className="text-[#1a73e8]">Google Account</span>.
        </p>

        <div className="mt-7 flex items-center justify-end gap-6">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-[#1a73e8] hover:bg-[#1a73e8]/5 rounded px-2 py-1.5 -mx-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onAllow}
            className="rounded-md bg-[#1a73e8] px-6 py-2 text-sm font-medium text-white hover:bg-[#1765cc]"
          >
            Authorize
          </button>
        </div>
      </div>
    </div>
  );
}
