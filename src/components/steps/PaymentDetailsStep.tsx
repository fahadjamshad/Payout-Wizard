import React from "react";
import { PayoutData, ValidationErrors } from "../../types/payout";

interface PaymentDetailsStepProps {
  data: Partial<PayoutData>;
  errors: ValidationErrors;
  updateData: (updates: Partial<PayoutData>) => void;
}

const PaymentDetailsStep: React.FC<PaymentDetailsStepProps> = ({
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

  const handleBankDetailsChange = (
    field: keyof NonNullable<PayoutData["bankDetails"]>,
    value: string
  ) => {
    const currentBankDetails = data.bankDetails || {
      accountNumber: "",
      routingNumber: "",
      bankName: "",
      accountType: "checking" as const,
    };

    updateData({
      bankDetails: {
        ...currentBankDetails,
        [field]: value,
      },
    });
  };

  const renderPaymentMethodFields = () => {
    switch (data.paymentMethod) {
      case "bank_transfer":
        return (
          <fieldset
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <legend style={{ padding: "0 0.5rem", fontWeight: "600" }}>
              Bank Account Details *
            </legend>

            <div className="form-group">
              <label htmlFor="bankName" className="form-label">
                Bank Name *
              </label>
              <input
                type="text"
                id="bankName"
                name="bankDetails.bankName"
                value={data.bankDetails?.bankName || ""}
                onChange={(e) =>
                  handleBankDetailsChange("bankName", e.target.value)
                }
                className={`form-input ${
                  errors["bankDetails.bankName"] ? "error" : ""
                }`}
                placeholder="Chase Bank"
                aria-describedby={
                  errors["bankDetails.bankName"] ? "bankName-error" : undefined
                }
                aria-invalid={!!errors["bankDetails.bankName"]}
              />
              {errors["bankDetails.bankName"] && (
                <div id="bankName-error" className="form-error" role="alert">
                  {errors["bankDetails.bankName"]}
                </div>
              )}
            </div>

            <div className="bank-details-grid">
              <div className="form-group">
                <label htmlFor="accountNumber" className="form-label">
                  Account Number *
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="bankDetails.accountNumber"
                  value={data.bankDetails?.accountNumber || ""}
                  onChange={(e) =>
                    handleBankDetailsChange("accountNumber", e.target.value)
                  }
                  className={`form-input ${
                    errors["bankDetails.accountNumber"] ? "error" : ""
                  }`}
                  placeholder="1234567890"
                  aria-describedby={
                    errors["bankDetails.accountNumber"]
                      ? "accountNumber-error"
                      : "accountNumber-help"
                  }
                  aria-invalid={!!errors["bankDetails.accountNumber"]}
                />
                {errors["bankDetails.accountNumber"] && (
                  <div
                    id="accountNumber-error"
                    className="form-error"
                    role="alert"
                  >
                    {errors["bankDetails.accountNumber"]}
                  </div>
                )}
                <div id="accountNumber-help" className="form-help">
                  8-17 digits
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="routingNumber" className="form-label">
                  Routing Number *
                </label>
                <input
                  type="text"
                  id="routingNumber"
                  name="bankDetails.routingNumber"
                  value={data.bankDetails?.routingNumber || ""}
                  onChange={(e) =>
                    handleBankDetailsChange("routingNumber", e.target.value)
                  }
                  className={`form-input ${
                    errors["bankDetails.routingNumber"] ? "error" : ""
                  }`}
                  placeholder="021000021"
                  aria-describedby={
                    errors["bankDetails.routingNumber"]
                      ? "routingNumber-error"
                      : "routingNumber-help"
                  }
                  aria-invalid={!!errors["bankDetails.routingNumber"]}
                />
                {errors["bankDetails.routingNumber"] && (
                  <div
                    id="routingNumber-error"
                    className="form-error"
                    role="alert"
                  >
                    {errors["bankDetails.routingNumber"]}
                  </div>
                )}
                <div id="routingNumber-help" className="form-help">
                  9 digits
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="accountType" className="form-label">
                Account Type *
              </label>
              <select
                id="accountType"
                name="bankDetails.accountType"
                value={data.bankDetails?.accountType || ""}
                onChange={(e) =>
                  handleBankDetailsChange("accountType", e.target.value)
                }
                className={`form-select ${
                  errors["bankDetails.accountType"] ? "error" : ""
                }`}
                aria-describedby={
                  errors["bankDetails.accountType"]
                    ? "accountType-error"
                    : undefined
                }
                aria-invalid={!!errors["bankDetails.accountType"]}
              >
                <option value="">Select account type</option>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
              {errors["bankDetails.accountType"] && (
                <div id="accountType-error" className="form-error" role="alert">
                  {errors["bankDetails.accountType"]}
                </div>
              )}
            </div>
          </fieldset>
        );

      case "paypal":
        return (
          <div className="form-group">
            <label htmlFor="paypalEmail" className="form-label">
              PayPal Email Address *
            </label>
            <input
              type="email"
              id="paypalEmail"
              name="paypalEmail"
              value={data.paypalEmail || ""}
              onChange={(e) => handleInputChange("paypalEmail", e.target.value)}
              className={`form-input ${errors.paypalEmail ? "error" : ""}`}
              placeholder="recipient@paypal.com"
              aria-describedby={
                errors.paypalEmail ? "paypalEmail-error" : "paypalEmail-help"
              }
              aria-invalid={!!errors.paypalEmail}
            />
            {errors.paypalEmail && (
              <div id="paypalEmail-error" className="form-error" role="alert">
                {errors.paypalEmail}
              </div>
            )}
            <div id="paypalEmail-help" className="form-help">
              The email address associated with the recipient's PayPal account
            </div>
          </div>
        );

      case "crypto":
        return (
          <fieldset
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <legend style={{ padding: "0 0.5rem", fontWeight: "600" }}>
              Cryptocurrency Details *
            </legend>

            <div className="form-group">
              <label htmlFor="cryptoType" className="form-label">
                Cryptocurrency Type *
              </label>
              <select
                id="cryptoType"
                name="cryptoType"
                value={data.cryptoType || ""}
                onChange={(e) =>
                  handleInputChange("cryptoType", e.target.value)
                }
                className={`form-select ${errors.cryptoType ? "error" : ""}`}
                aria-describedby={
                  errors.cryptoType ? "cryptoType-error" : undefined
                }
                aria-invalid={!!errors.cryptoType}
              >
                <option value="">Select cryptocurrency</option>
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="usdc">USD Coin (USDC)</option>
              </select>
              {errors.cryptoType && (
                <div id="cryptoType-error" className="form-error" role="alert">
                  {errors.cryptoType}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cryptoAddress" className="form-label">
                Wallet Address *
              </label>
              <input
                type="text"
                id="cryptoAddress"
                name="cryptoAddress"
                value={data.cryptoAddress || ""}
                onChange={(e) =>
                  handleInputChange("cryptoAddress", e.target.value)
                }
                className={`form-input ${errors.cryptoAddress ? "error" : ""}`}
                placeholder="Enter wallet address"
                aria-describedby={
                  errors.cryptoAddress
                    ? "cryptoAddress-error"
                    : "cryptoAddress-help"
                }
                aria-invalid={!!errors.cryptoAddress}
              />
              {errors.cryptoAddress && (
                <div
                  id="cryptoAddress-error"
                  className="form-error"
                  role="alert"
                >
                  {errors.cryptoAddress}
                </div>
              )}
              <div id="cryptoAddress-help" className="form-help">
                Enter the recipient's cryptocurrency wallet address
              </div>
            </div>
          </fieldset>
        );

      case "check":
        return (
          <div
            style={{
              padding: "1rem",
              background: "#f0f9ff",
              border: "1px solid #bae6fd",
              borderRadius: "8px",
              marginTop: "1rem",
            }}
          >
            <p style={{ margin: 0, color: "#1e40af" }}>
              <strong>Check Payment:</strong> A physical check will be mailed to
              the recipient's address.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="step-title">Payment Details</h2>
      <p className="step-description">
        Choose how the recipient will receive their payment.
      </p>

      <div className="form-group">
        <label htmlFor="paymentMethod" className="form-label">
          Payment Method *
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={data.paymentMethod || ""}
          onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
          className={`form-select ${errors.paymentMethod ? "error" : ""}`}
          aria-describedby={
            errors.paymentMethod ? "paymentMethod-error" : "paymentMethod-help"
          }
          aria-invalid={!!errors.paymentMethod}
        >
          <option value="">Select payment method</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="paypal">PayPal</option>
          <option value="crypto">Cryptocurrency</option>
          <option value="check">Check (Mail)</option>
        </select>
        {errors.paymentMethod && (
          <div id="paymentMethod-error" className="form-error" role="alert">
            {errors.paymentMethod}
          </div>
        )}
        <div id="paymentMethod-help" className="form-help">
          Choose the preferred payment method for the recipient
        </div>
      </div>

      {renderPaymentMethodFields()}

      {data.paymentMethod && (
        <div
          style={{
            padding: "1rem",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "8px",
            marginTop: "1.5rem",
          }}
        >
          <p style={{ margin: 0, color: "#166534" }}>
            <strong>Processing Time:</strong>{" "}
            {data.paymentMethod === "bank_transfer"
              ? "1-3 business days"
              : data.paymentMethod === "paypal"
              ? "Instant to 1 business day"
              : data.paymentMethod === "crypto"
              ? "10-30 minutes"
              : data.paymentMethod === "check"
              ? "5-7 business days"
              : "Varies by method"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsStep;
