import { cn } from "@/lib/utils";
import { WIZARD_STEPS } from "@/lib/app-data";

export function WizardStepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex items-start justify-center gap-3 sm:gap-6">
      {WIZARD_STEPS.map((step, index) => {
        const isComplete = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isLast = index === WIZARD_STEPS.length - 1;

        return (
          <li key={step.number} className="flex items-start">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-xs font-semibold",
                  isComplete || isActive
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground"
                )}
              >
                {step.number}
              </div>
              <span
                className={cn(
                  "text-xs whitespace-nowrap",
                  isActive
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div
                className={cn(
                  "mt-4 h-px w-8 sm:w-16",
                  isComplete ? "bg-primary" : "bg-border"
                )}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
