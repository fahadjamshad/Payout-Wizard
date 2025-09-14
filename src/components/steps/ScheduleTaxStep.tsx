import React from "react";
import { PayoutData, ValidationErrors } from "../../types/payout";

interface ScheduleTaxStepProps {
  data: Partial<PayoutData>;
  errors: ValidationErrors;
  updateData: (updates: Partial<PayoutData>) => void;
}

const ScheduleTaxStep: React.FC<ScheduleTaxStepProps> = ({
  data,
  errors,
  updateData,
}) => {
  const handleInputChange = (
    field: keyof PayoutData,
    value: string | number | boolean
  ) => {
    updateData({ [field]: value });
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Get maximum date (1 year from today)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <div>
      <h2 className="step-title">Schedule & Tax Information</h2>
      <p className="step-description">
        Set the payment schedule and tax withholding details.
      </p>

      <div className="form-group">
        <label htmlFor="paymentDate" className="form-label">
          Payment Date *
        </label>
        <input
          type="date"
          id="paymentDate"
          name="paymentDate"
          value={data.paymentDate || ""}
          onChange={(e) => handleInputChange("paymentDate", e.target.value)}
          className={`form-input ${errors.paymentDate ? "error" : ""}`}
          min={getMinDate()}
          max={getMaxDate()}
          aria-describedby={
            errors.paymentDate ? "paymentDate-error" : "paymentDate-help"
          }
          aria-invalid={!!errors.paymentDate}
        />
        {errors.paymentDate && (
          <div id="paymentDate-error" className="form-error" role="alert">
            {errors.paymentDate}
          </div>
        )}
        <div id="paymentDate-help" className="form-help">
          Select when this payout should be processed
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="frequency" className="form-label">
          Payment Frequency *
        </label>
        <select
          id="frequency"
          name="frequency"
          value={data.frequency || ""}
          onChange={(e) => handleInputChange("frequency", e.target.value)}
          className={`form-select ${errors.frequency ? "error" : ""}`}
          aria-describedby={
            errors.frequency ? "frequency-error" : "frequency-help"
          }
          aria-invalid={!!errors.frequency}
        >
          <option value="">Select frequency</option>
          <option value="one_time">One Time</option>
          <option value="weekly">Weekly</option>
          <option value="bi_weekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
        {errors.frequency && (
          <div id="frequency-error" className="form-error" role="alert">
            {errors.frequency}
          </div>
        )}
        <div id="frequency-help" className="form-help">
          How often should this payout be repeated?
        </div>
      </div>

      <fieldset
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "1.5rem",
          marginTop: "2rem",
        }}
      >
        <legend style={{ padding: "0 0.5rem", fontWeight: "600" }}>
          Tax Information
        </legend>

        <div className="form-group">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <input
              type="checkbox"
              id="taxExempt"
              name="taxExempt"
              checked={data.taxExempt || false}
              onChange={(e) => handleInputChange("taxExempt", e.target.checked)}
              aria-describedby="taxExempt-help"
            />
            <label
              htmlFor="taxExempt"
              className="form-label"
              style={{ margin: 0 }}
            >
              Tax Exempt
            </label>
          </div>
          <div id="taxExempt-help" className="form-help">
            Check if this payout is exempt from tax withholding
          </div>
        </div>

        {!data.taxExempt && (
          <div className="form-group">
            <label htmlFor="taxWithholding" className="form-label">
              Tax Withholding Percentage
            </label>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="number"
                id="taxWithholding"
                name="taxWithholding"
                value={data.taxWithholding || 0}
                onChange={(e) =>
                  handleInputChange(
                    "taxWithholding",
                    parseFloat(e.target.value) || 0
                  )
                }
                className={`form-input ${errors.taxWithholding ? "error" : ""}`}
                min="0"
                max="100"
                step="0.01"
                style={{ width: "120px" }}
                aria-describedby={
                  errors.taxWithholding
                    ? "taxWithholding-error"
                    : "taxWithholding-help"
                }
                aria-invalid={!!errors.taxWithholding}
              />
              <span>%</span>
            </div>
            {errors.taxWithholding && (
              <div
                id="taxWithholding-error"
                className="form-error"
                role="alert"
              >
                {errors.taxWithholding}
              </div>
            )}
            <div id="taxWithholding-help" className="form-help">
              Percentage of the payout amount to withhold for taxes (0-100%)
            </div>
          </div>
        )}
      </fieldset>

      <div className="form-group">
        <label htmlFor="notes" className="form-label">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={data.notes || ""}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          className="form-textarea"
          placeholder="Any additional information about this payout..."
          rows={3}
          maxLength={1000}
          aria-describedby="notes-help"
        />
        <div id="notes-help" className="form-help">
          Optional notes for internal reference ({data.notes?.length || 0}/1000
          characters)
        </div>
      </div>

      {/* Summary Section */}
      {data.amount && data.currency && (
        <div
          style={{
            padding: "1.5rem",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            marginTop: "2rem",
          }}
        >
          <h3
            style={{
              margin: "0 0 1rem 0",
              fontSize: "1.125rem",
              fontWeight: "600",
            }}
          >
            Payment Summary
          </h3>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Gross Amount:</span>
              <span>
                <strong>
                  {data.currency}{" "}
                  {data.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </span>
            </div>

            {!data.taxExempt &&
              data.taxWithholding &&
              data.taxWithholding > 0 && (
                <>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Tax Withholding ({data.taxWithholding}%):</span>
                    <span>
                      -{data.currency}{" "}
                      {(
                        (data.amount * data.taxWithholding) /
                        100
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <hr
                    style={{
                      margin: "0.5rem 0",
                      border: "none",
                      borderTop: "1px solid #e2e8f0",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "600",
                    }}
                  >
                    <span>Net Amount:</span>
                    <span>
                      {data.currency}{" "}
                      {(
                        data.amount -
                        (data.amount * data.taxWithholding) / 100
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </>
              )}

            {data.taxExempt && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "600",
                }}
              >
                <span>Net Amount:</span>
                <span>
                  {data.currency}{" "}
                  {data.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTaxStep;
