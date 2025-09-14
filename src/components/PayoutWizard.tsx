import React, { useState, useEffect, useMemo } from "react";
import { PayoutData, ValidationErrors } from "../types/payout";
import { validateStep } from "../utils/validation";
import { createPayout } from "../services/payoutApi";
import { useFocusTrap, announceToScreenReader } from "../utils/accessibility";
import BasicInformationStep from "./steps/BasicInformationStep";
import RecipientInformationStep from "./steps/RecipientInformationStep";
import PaymentDetailsStep from "./steps/PaymentDetailsStep";
import ScheduleTaxStep from "./steps/ScheduleTaxStep";
import ReviewStep from "./steps/ReviewStep";
import SuccessStep from "./steps/SuccessStep";

const PayoutWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [payoutData, setPayoutData] = useState<Partial<PayoutData>>({
    currency: "USD", // Set default currency
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [payoutId, setPayoutId] = useState<string | null>(null);

  const containerRef = useFocusTrap(true);

  const steps = useMemo(
    () => [
      { id: 1, title: "Basic Info", description: "Payout details" },
      { id: 2, title: "Recipient", description: "Contact information" },
      { id: 3, title: "Payment", description: "Payment method" },
      { id: 4, title: "Schedule", description: "Timing & tax" },
      { id: 5, title: "Review", description: "Confirm details" },
    ],
    []
  );

  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  // Announce step changes to screen readers
  useEffect(() => {
    const stepTitle =
      steps.find((step) => step.id === currentStep)?.title || "";
    announceToScreenReader(
      `Step ${currentStep} of ${totalSteps}: ${stepTitle}`
    );
  }, [currentStep, totalSteps, steps]);

  const updatePayoutData = (updates: Partial<PayoutData>) => {
    setPayoutData((prev) => ({ ...prev, ...updates }));
    // Clear errors when data is updated
    setErrors({});
    setSubmitError(null);
  };

  const validateCurrentStep = (): boolean => {
    const stepErrors = validateStep(currentStep, payoutData);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const goToNextStep = () => {
    const stepErrors = validateStep(currentStep, payoutData);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      // Focus first error field
      const firstErrorField = Object.keys(stepErrors)[0];
      if (firstErrorField) {
        setTimeout(() => {
          const element = document.querySelector(
            `[name="${firstErrorField}"]`
          ) as HTMLElement;
          element?.focus();
        }, 100);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await createPayout(payoutData as PayoutData);

      if (response.success) {
        setPayoutId(response.payoutId || null);
        setCurrentStep(6); // Success step
        announceToScreenReader("Payout created successfully!", "assertive");
      } else {
        setSubmitError(response.message);
        announceToScreenReader(`Error: ${response.message}`, "assertive");
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred. Please try again.";
      setSubmitError(errorMessage);
      announceToScreenReader(`Error: ${errorMessage}`, "assertive");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    const commonProps = {
      data: payoutData,
      errors,
      updateData: updatePayoutData,
    };

    switch (currentStep) {
      case 1:
        return <BasicInformationStep {...commonProps} />;
      case 2:
        return <RecipientInformationStep {...commonProps} />;
      case 3:
        return <PaymentDetailsStep {...commonProps} />;
      case 4:
        return <ScheduleTaxStep {...commonProps} />;
      case 5:
        return <ReviewStep data={payoutData} />;
      case 6:
        return <SuccessStep payoutId={payoutId} />;
      default:
        return <BasicInformationStep {...commonProps} />;
    }
  };

  const getStepStatus = (
    stepId: number
  ): "active" | "completed" | "pending" => {
    if (stepId === currentStep) return "active";
    if (stepId < currentStep) return "completed";
    return "pending";
  };

  if (currentStep === 6) {
    return (
      <div className="wizard" ref={containerRef}>
        <div className="wizard-content">{renderCurrentStep()}</div>
      </div>
    );
  }

  return (
    <div className="wizard" ref={containerRef}>
      <div className="wizard-header">
        <h1 className="wizard-title">Create Payout</h1>
        <p className="wizard-subtitle">
          Set up a new payout in just a few simple steps
        </p>
        <div className="wizard-progress">
          <div
            className="wizard-progress-bar"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label={`Step ${currentStep} of ${totalSteps}`}
          />
        </div>
      </div>

      <div className="wizard-content">
        <nav
          className="wizard-steps"
          role="navigation"
          aria-label="Payout creation steps"
        >
          {steps.map((step) => (
            <div
              key={step.id}
              className={`wizard-step ${getStepStatus(step.id)}`}
              role="tab"
              aria-selected={step.id === currentStep}
              aria-label={`Step ${step.id}: ${step.title} - ${step.description}`}
            >
              <span className="wizard-step-number" aria-hidden="true">
                {step.id}
              </span>
              <span className="wizard-step-text">
                <span className="wizard-step-title">{step.title}</span>
                <span className="wizard-step-description">
                  {step.description}
                </span>
              </span>
            </div>
          ))}
        </nav>

        <div
          role="tabpanel"
          aria-labelledby={`step-${currentStep}`}
          aria-live="polite"
        >
          {renderCurrentStep()}
        </div>

        {submitError && (
          <div
            className="form-error"
            role="alert"
            aria-live="assertive"
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
            }}
          >
            {submitError}
          </div>
        )}

        <div className="wizard-navigation">
          <button
            type="button"
            className="btn btn-outline"
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            aria-label="Go to previous step"
          >
            ← Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={goToNextStep}
              aria-label="Go to next step"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={isSubmitting}
              aria-label="Create payout"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Creating...
                </>
              ) : (
                "Create Payout"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayoutWizard;
