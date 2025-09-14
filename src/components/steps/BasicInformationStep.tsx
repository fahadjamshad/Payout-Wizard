import React from "react";
import { PayoutData, ValidationErrors } from "../../types/payout";

interface BasicInformationStepProps {
  data: Partial<PayoutData>;
  errors: ValidationErrors;
  updateData: (updates: Partial<PayoutData>) => void;
}

const BasicInformationStep: React.FC<BasicInformationStepProps> = ({
  data,
  errors,
  updateData,
}) => {
  const handleInputChange = (
    field: keyof PayoutData,
    value: string | number
  ) => {
    updateData({ [field]: value });
  };

  return (
    <div>
      <h2 className="step-title">Basic Information</h2>
      <p className="step-description">
        Tell us about the payout you want to create.
      </p>

      <div className="form-group">
        <label htmlFor="payoutType" className="form-label">
          Payout Type *
        </label>
        <select
          id="payoutType"
          name="payoutType"
          value={data.payoutType || ""}
          onChange={(e) => handleInputChange("payoutType", e.target.value)}
          className={`form-select ${errors.payoutType ? "error" : ""}`}
          aria-describedby={
            errors.payoutType ? "payoutType-error" : "payoutType-help"
          }
          aria-invalid={!!errors.payoutType}
        >
          <option value="">Select payout type</option>
          <option value="salary">Salary</option>
          <option value="bonus">Bonus</option>
          <option value="commission">Commission</option>
          <option value="reimbursement">Reimbursement</option>
          <option value="other">Other</option>
        </select>
        {errors.payoutType && (
          <div id="payoutType-error" className="form-error" role="alert">
            {errors.payoutType}
          </div>
        )}
        <div id="payoutType-help" className="form-help">
          Choose the type of payout you're creating
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="amount" className="form-label">
          Amount *
        </label>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <select
            id="currency"
            name="currency"
            value={data.currency || "USD"}
            onChange={(e) => handleInputChange("currency", e.target.value)}
            className={`form-select ${errors.currency ? "error" : ""}`}
            style={{ width: "auto", minWidth: "80px" }}
            aria-label="Currency"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
          </select>
          <input
            type="number"
            id="amount"
            name="amount"
            value={data.amount || ""}
            onChange={(e) =>
              handleInputChange("amount", parseFloat(e.target.value) || 0)
            }
            className={`form-input ${errors.amount ? "error" : ""}`}
            placeholder="0.00"
            min="0"
            step="0.01"
            aria-describedby={errors.amount ? "amount-error" : "amount-help"}
            aria-invalid={!!errors.amount}
          />
        </div>
        {errors.amount && (
          <div id="amount-error" className="form-error" role="alert">
            {errors.amount}
          </div>
        )}
        <div id="amount-help" className="form-help">
          Enter the payout amount (minimum $0.01, maximum $1,000,000)
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={data.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className={`form-textarea ${errors.description ? "error" : ""}`}
          placeholder="Enter a description for this payout..."
          rows={3}
          maxLength={500}
          aria-describedby={
            errors.description ? "description-error" : "description-help"
          }
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <div id="description-error" className="form-error" role="alert">
            {errors.description}
          </div>
        )}
        <div id="description-help" className="form-help">
          Provide a clear description of this payout (
          {data.description?.length || 0}/500 characters)
        </div>
      </div>

      {data.amount && data.currency && (
        <div className="form-group">
          <div
            style={{
              padding: "1rem",
              background: "#f0f9ff",
              border: "1px solid #bae6fd",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <strong>
              Total Amount: {data.currency}{" "}
              {data.amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInformationStep;
