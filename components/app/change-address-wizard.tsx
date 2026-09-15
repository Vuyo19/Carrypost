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
} from "@/lib/app-data";

/**
 * Owns the wizard's step and account-selection state. There is no backend
 * behind this concept yet (see the "Illustrative price" note on the pay
 * step), so "Continue to Google", "Pay", etc. just advance local state
 * rather than calling out anywhere.
 */
export function ChangeAddressWizard() {
  const [step, setStep] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    DEFAULT_SELECTED_ACCOUNT_IDS
  );

  const toggleAccount = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
    );
  };

  const guidedCount = ACCOUNTS_FOUND.filter(
    (a) => a.status === "needs-you" && selectedIds.includes(a.id)
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
      <div className="mb-16">
        <WizardStepper currentStep={step} />
      </div>

      {step === 1 && <ConnectStep onNext={() => setStep(2)} />}
      {step === 2 && <AddressStep onNext={() => setStep(3)} />}
      {step === 3 && (
        <AccountsStep
          selectedIds={selectedIds}
          onToggle={toggleAccount}
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
