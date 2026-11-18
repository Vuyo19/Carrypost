"use client";

/**
 * The interactive half of a premium story's page — pulled out of the
 * (Server Component) page itself since presenting a RevenueCat paywall
 * needs the browser.
 *
 * Deliberately does NOT rely on RevenueCat's own "3 Paywalls" Experiment
 * resolution (presentPaywall with no `offering` → offerings.current)
 * here — that's sticky per customer, one variant for the life of the
 * experiment, which is correct for real A/B data but useless for
 * quickly eyeballing all 3 designs yourself or running a custom traffic
 * split. Instead this fetches every configured Offering and rolls a
 * fresh *weighted* pick on every tap (see `pickWeightedOffering` in
 * lib/revenuecat.ts for the actual A/B/C percentages) — a deliberate,
 * custom departure from the experiment's own logic, good for demoing/QA
 * or running your own split, but a session that uses this doesn't
 * contribute meaningful data to the Experiment's results anymore, since
 * it's no longer one consistent variant per customer.
 *
 * One real difference from the mobile SDK: Web Billing has no
 * `presentPaywallIfNeeded` — just `presentPaywall`, which always shows
 * — so this checks `isMember` itself first and skips presenting
 * entirely when already entitled.
 */

import { ErrorCode, PurchasesError } from "@revenuecat/purchases-js";
import { Lock } from "lucide-react";
import { useState } from "react";

import { getOfferingsCached, getRevenueCat, pickWeightedOffering, ULTRA_ENTITLEMENT_ID } from "@/lib/revenuecat";
import { useMembership } from "@/lib/use-membership";
import type { Story } from "@/lib/story-data";

/**
 * presentPaywall can hang indefinitely rather than erroring — observed
 * after its offerings lookup gets rate-limited (429) and retries
 * internally, it can list the paywall's available workflows but then
 * never actually fetch the one it picked, with nothing ever rejecting.
 * Worse, the (invisible, opacity: 0) full-screen overlay it creates
 * stays in the DOM and keeps intercepting every click on the page —
 * so a hang doesn't just strand the button, it silently breaks the
 * entire page until reload. This wraps any promise with a hard ceiling
 * so that can't happen unnoticed.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

/** Removes a paywall overlay stuck invisible/empty after a timeout, so
 *  it stops silently eating every click on the rest of the page. */
function removeStuckPaywallOverlay() {
  document.getElementById("rcb-ui-pw-root")?.remove();
}

export function LockedStoryBody({ story }: { story: Story }) {
  const { isMember, managementURL, refresh } = useMembership();
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUnlock() {
    const purchases = getRevenueCat();
    if (!purchases) {
      setError("Membership isn't configured yet — try again shortly.");
      return;
    }

    setError(null);
    setUnlocking(true);
    try {
      // Re-check against the latest CustomerInfo, not the cached `isMember`
      // — mirrors what presentPaywallIfNeeded does on mobile, by hand,
      // since the web SDK has no built-in "if needed" variant.
      const alreadyEntitled = await purchases.isEntitledTo(ULTRA_ENTITLEMENT_ID);
      if (alreadyEntitled) {
        await refresh();
        return;
      }

      const offerings = await getOfferingsCached(purchases);
      const offering = pickWeightedOffering(offerings) ?? undefined;

      await withTimeout(
        purchases.presentPaywall({
          offering,
          listener: {
            onPurchaseCancelled: () => {
              // Closed without buying — not an error, nothing to report.
            },
            onPurchaseError: () => {
              setError("Something went wrong — try again.");
            },
          },
        }),
        15000,
        "Timed out waiting for the paywall to load."
      );
      // presentPaywall only resolves on a successful purchase.
      await refresh();
    } catch (err) {
      removeStuckPaywallOverlay();
      if (err instanceof PurchasesError && err.errorCode === ErrorCode.UserCancelledError) {
        // Closed without buying — not an error.
      } else {
        console.warn("[paywall] presentPaywall failed", err);
        setError("Couldn't open the paywall — try again.");
      }
    } finally {
      setUnlocking(false);
    }
  }

  if (isMember) {
    return (
      <div className="mt-10 rounded-xl border border-dashed border-border p-8 text-center">
        <Lock className="mx-auto h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
        <p className="mt-4 text-sm font-semibold">You&apos;re a member — thank you.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          &quot;{story.title}&quot; itself is still just a teaser (no full text written yet),
          but your membership is active and will unlock every premium story as they&apos;re
          added.
        </p>
        {managementURL && (
          <a
            href={managementURL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-10 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Manage membership
          </a>
        )}
      </div>
    );
  }

  return (
    <>
      <p className="mt-6 text-base leading-relaxed text-foreground/90">{story.excerpt}</p>

      <div className="mt-10 rounded-xl border border-dashed border-border p-8 text-center">
        <Lock className="mx-auto h-5 w-5 text-primary/60" strokeWidth={1.5} aria-hidden="true" />
        <p className="mt-4 text-sm font-semibold">This one&apos;s for members.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          The rest of &quot;{story.title}&quot; unlocks with a Carrypost membership.
        </p>
        <button
          type="button"
          onClick={handleUnlock}
          disabled={unlocking}
          className="mt-6 inline-flex h-10 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {unlocking ? "Opening paywall…" : "Unlock with membership"}
        </button>
        {unlocking && (
          <p className="mt-3 text-xs text-muted-foreground">
            This can take several seconds the first time — it&apos;s still loading, not stuck.
          </p>
        )}
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
      </div>
    </>
  );
}
