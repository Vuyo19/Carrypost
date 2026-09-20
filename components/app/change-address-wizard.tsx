"use client";

import { useState } from "react";

import { AccountsStep } from "@/components/app/wizard-steps/accounts-step";
import { AddressStep } from "@/components/app/wizard-steps/address-step";
import { ConnectStep } from "@/components/app/wizard-steps/connect-step";
import { DoneStep } from "@/components/app/wizard-steps/done-step";
import { PayStep } from "@/components/app/wizard-steps/pay-step";
import { WizardStepper } from "@/components/app/wizard-stepper";
import {
  ACCOUNTS_FOUND,
  DEFAULT_SELECTED_ACCOUNT_IDS,
  SUPPORTED_PROVIDERS,
} from "@/lib/app-data";

type DiscoveryMethod = "gmail" | "manual";

/**
 * Owns the wizard's step and account-selection state. There is no backend
 * behind this concept yet (see the "Illustrative price" note on the pay
 * step), so "Continue to Google", "Pay", etc. just advance local state
 * rather than calling out anywhere.
 *
 * Step 1 branches into two ways of reaching step 3: Gmail discovery (the
 * 8 accounts the deck found from the inbox, several pre-selected) or,
 * for someone who doesn't want to grant inbox access, picking straight
 * from the providers Carrypost is allowlisted to dispatch to — a bigger
 * catalog, nothing pre-selected since nothing has been "found" yet.
 */
export function ChangeAddressWizard() {
  const [step, setStep] = useState(1);
  const [discoveryMethod, setDiscoveryMethod] =
    useState<DiscoveryMethod>("gmail");
  const [selectedIds, setSelectedIds] = useState<string[]>(
    DEFAULT_SELECTED_ACCOUNT_IDS
  );
  const [attachments, setAttachments] = useState<Record<string, File | null>>({});

  const accounts =
    discoveryMethod === "gmail" ? ACCOUNTS_FOUND : SUPPORTED_PROVIDERS;

  const toggleAccount = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
    );
  };

  const attachDocument = (providerId: string, file: File | null) => {
    setAttachments((prev) => ({ ...prev, [providerId]: file }));
  };

  const startConnect = (method: DiscoveryMethod) => {
    setDiscoveryMethod(method);
    setSelectedIds(method === "gmail" ? DEFAULT_SELECTED_ACCOUNT_IDS : []);
    setStep(2);
  };

  const guidedCount = accounts.filter(
    (a) => a.status === "needs-you" && selectedIds.includes(a.id)
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
      <div className="mb-16">
        <WizardStepper currentStep={step} />
      </div>

      {step === 1 && <ConnectStep onNext={startConnect} />}
      {step === 2 && <AddressStep onNext={() => setStep(3)} />}
      {step === 3 && (
        <AccountsStep
          accounts={accounts}
          heading={
            discoveryMethod === "gmail"
              ? `We found ${accounts.length} accounts that may need your new address`
              : "Choose from Carrypost's supported providers"
          }
          description={
            discoveryMethod === "gmail"
              ? "Choose who Carrypost should update. You stay in control."
              : "These are the providers Carrypost is allowlisted to dispatch and update. Select who should receive your new address."
          }
          searchable={discoveryMethod === "manual"}
          selectedIds={selectedIds}
          onToggle={toggleAccount}
          attachments={attachments}
          onAttach={attachDocument}
          onNext={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <PayStep
          selectedCount={selectedIds.length}
          guidedCount={guidedCount}
          onNext={() => setStep(5)}
        />
      )}
      {step === 5 && <DoneStep />}
    </div>
  );
}
