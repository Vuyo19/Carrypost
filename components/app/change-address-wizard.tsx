"use client";

import { useState } from "react";

import { AccountsStep } from "@/components/app/wizard-steps/accounts-step";
import { AddressStep } from "@/components/app/wizard-steps/address-step";
import { ConnectStep } from "@/components/app/wizard-steps/connect-step";
import { DocumentsStep } from "@/components/app/wizard-steps/documents-step";
import { DoneStep } from "@/components/app/wizard-steps/done-step";
import { PayStep } from "@/components/app/wizard-steps/pay-step";
import { WizardStepper } from "@/components/app/wizard-stepper";
import {
  ACCOUNTS_FOUND,
  DEFAULT_SELECTED_ACCOUNT_IDS,
  NEW_VALUE_NOUNS,
  SUPPORTED_PROVIDERS,
  type ChangeType,
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
 *
 * Step 2 (Address) also picks *what kind* of change this is — address,
 * phone number, or surname (CarrypostBackend's AddressChange.change_type
 * now supports all three). Discovery doesn't branch on it: which
 * companies to notify is the same question regardless of what's actually
 * changing about the person.
 *
 * Step 4 (Documents) is its own screen, not folded into Accounts — but it
 * only exists for someone who actually selected a guided-verification
 * provider. Nobody with an all-"ready" selection should see a step about
 * paperwork that doesn't apply to them, so leaving Accounts skips straight
 * to Pay when selectedGuidedProviders is empty.
 */
export function ChangeAddressWizard() {
  const [step, setStep] = useState(1);
  const [discoveryMethod, setDiscoveryMethod] =
    useState<DiscoveryMethod>("gmail");
  const [changeType, setChangeType] = useState<ChangeType>("address");
  const [selectedIds, setSelectedIds] = useState<string[]>(
    DEFAULT_SELECTED_ACCOUNT_IDS
  );
  const [attachments, setAttachments] = useState<Record<string, File | null>>({});

  const accounts =
    discoveryMethod === "gmail" ? ACCOUNTS_FOUND : SUPPORTED_PROVIDERS;

  const selectedGuidedProviders = accounts.filter(
    (a) => a.status === "needs-you" && selectedIds.includes(a.id)
  );

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

  const leaveAccounts = () => {
    setStep(selectedGuidedProviders.length > 0 ? 4 : 5);
  };

  const guidedCount = selectedGuidedProviders.length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
      <div className="mb-16">
        <WizardStepper currentStep={step} />
      </div>

      {step === 1 && <ConnectStep onNext={startConnect} />}
      {step === 2 && (
        <AddressStep
          changeType={changeType}
          onChangeTypeChange={setChangeType}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <AccountsStep
          accounts={accounts}
          heading={
            discoveryMethod === "gmail"
              ? `We found ${accounts.length} accounts that may need your ${NEW_VALUE_NOUNS[changeType]}`
              : "Choose from Carrypost's supported providers"
          }
          description={
            discoveryMethod === "gmail"
              ? "Choose who Carrypost should update. You stay in control."
              : `These are the providers Carrypost is allowlisted to dispatch and update. Select who should receive your ${NEW_VALUE_NOUNS[changeType]}.`
          }
          searchable={discoveryMethod === "manual"}
          selectedIds={selectedIds}
          onToggle={toggleAccount}
          onNext={leaveAccounts}
        />
      )}
      {step === 4 && (
        <DocumentsStep
          providers={selectedGuidedProviders}
          attachments={attachments}
          onAttach={attachDocument}
          onNext={() => setStep(5)}
        />
      )}
      {step === 5 && (
        <PayStep
          changeType={changeType}
          selectedCount={selectedIds.length}
          guidedCount={guidedCount}
          onNext={() => setStep(6)}
        />
      )}
      {step === 6 && <DoneStep />}
    </div>
  );
}
