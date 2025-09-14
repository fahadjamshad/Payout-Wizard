import React from "react";
import { PayoutData } from "../../types/payout";
import { formatCurrency, formatDate } from "../../utils/validation";

interface ReviewStepProps {
  data: Partial<PayoutData>;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ data }) => {
  const getPayoutTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      salary: "Salary",
      bonus: "Bonus",
      commission: "Commission",
      reimbursement: "Reimbursement",
      other: "Other",
    };
    return labels[type] || type;
  };

  const getRecipientTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      employee: "Employee",
      contractor: "Contractor",
      vendor: "Vendor",
    };
    return labels[type] || type;
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: { [key: string]: string } = {
      bank_transfer: "Bank Transfer",
      paypal: "PayPal",
      crypto: "Cryptocurrency",
      check: "Check (Mail)",
    };
    return labels[method] || method;
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels: { [key: string]: string } = {
      one_time: "One Time",
      weekly: "Weekly",
      bi_weekly: "Bi-weekly",
      monthly: "Monthly",
      quarterly: "Quarterly",
    };
    return labels[frequency] || frequency;
  };

  const getCryptoTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      bitcoin: "Bitcoin (BTC)",
      ethereum: "Ethereum (ETH)",
      usdc: "USD Coin (USDC)",
    };
    return labels[type] || type;
  };

  const getAccountTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      checking: "Checking",
      savings: "Savings",
    };
    return labels[type] || type;
  };

  const calculateNetAmount = () => {
    if (!data.amount || !data.currency) return null;

    const grossAmount = data.amount;
    const taxWithholding = data.taxExempt ? 0 : data.taxWithholding || 0;
    const netAmount = grossAmount - (grossAmount * taxWithholding) / 100;

    return {
      gross: grossAmount,
      taxWithholding: (grossAmount * taxWithholding) / 100,
      net: netAmount,
      currency: data.currency,
    };
  };

  const netAmount = calculateNetAmount();

  return (
    <div>
      <h2 className="step-title">Review Your Payout</h2>
      <p className="step-description">
        Please review all the information below before creating the payout.
      </p>

      {/* Basic Information */}
      <div className="review-section">
        <h3 className="review-section-title">
          <span role="img" aria-label="Information">
            ℹ️
          </span>
          Basic Information
        </h3>

        <div className="review-item">
          <span className="review-label">Payout Type:</span>
          <span className="review-value">
            {getPayoutTypeLabel(data.payoutType || "")}
          </span>
        </div>

        <div className="review-item">
          <span className="review-label">Amount:</span>
          <span className="review-value">
            {data.currency}{" "}
            {data.amount?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="review-item">
          <span className="review-label">Description:</span>
          <span className="review-value">{data.description}</span>
        </div>
      </div>

      {/* Recipient Information */}
      <div className="review-section">
        <h3 className="review-section-title">
          <span role="img" aria-label="Person">
            👤
          </span>
          Recipient Information
        </h3>

        <div className="review-item">
          <span className="review-label">Recipient Type:</span>
          <span className="review-value">
            {getRecipientTypeLabel(data.recipientType || "")}
          </span>
        </div>

        <div className="review-item">
          <span className="review-label">Name:</span>
          <span className="review-value">
            {data.firstName} {data.lastName}
          </span>
        </div>

        <div className="review-item">
          <span className="review-label">Email:</span>
          <span className="review-value">{data.email}</span>
        </div>

        <div className="review-item">
          <span className="review-label">Phone:</span>
          <span className="review-value">{data.phone}</span>
        </div>

        {data.address && (
          <div className="review-item">
            <span className="review-label">Address:</span>
            <span className="review-value">
              {data.address.street}
              <br />
              {data.address.city}, {data.address.state} {data.address.zipCode}
              <br />
              {data.address.country}
            </span>
          </div>
        )}
      </div>

      {/* Payment Details */}
      <div className="review-section">
        <h3 className="review-section-title">
          <span role="img" aria-label="Payment">
            💳
          </span>
          Payment Details
        </h3>

        <div className="review-item">
          <span className="review-label">Payment Method:</span>
          <span className="review-value">
            {getPaymentMethodLabel(data.paymentMethod || "")}
          </span>
        </div>

        {data.paymentMethod === "bank_transfer" && data.bankDetails && (
          <>
            <div className="review-item">
              <span className="review-label">Bank Name:</span>
              <span className="review-value">{data.bankDetails.bankName}</span>
            </div>

            <div className="review-item">
              <span className="review-label">Account Number:</span>
              <span className="review-value">
                ****{data.bankDetails.accountNumber?.slice(-4)}
              </span>
            </div>

            <div className="review-item">
              <span className="review-label">Routing Number:</span>
              <span className="review-value">
                {data.bankDetails.routingNumber}
              </span>
            </div>

            <div className="review-item">
              <span className="review-label">Account Type:</span>
              <span className="review-value">
                {getAccountTypeLabel(data.bankDetails.accountType || "")}
              </span>
            </div>
          </>
        )}

        {data.paymentMethod === "paypal" && data.paypalEmail && (
          <div className="review-item">
            <span className="review-label">PayPal Email:</span>
            <span className="review-value">{data.paypalEmail}</span>
          </div>
        )}

        {data.paymentMethod === "crypto" && (
          <>
            <div className="review-item">
              <span className="review-label">Cryptocurrency:</span>
              <span className="review-value">
                {getCryptoTypeLabel(data.cryptoType || "")}
              </span>
            </div>

            <div className="review-item">
              <span className="review-label">Wallet Address:</span>
              <span
                className="review-value"
                style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
              >
                {data.cryptoAddress}
              </span>
            </div>
          </>
        )}

        {data.paymentMethod === "check" && (
          <div className="review-item">
            <span className="review-label">Delivery:</span>
            <span className="review-value">
              Physical check will be mailed to recipient's address
            </span>
          </div>
        )}
      </div>

      {/* Schedule & Tax */}
      <div className="review-section">
        <h3 className="review-section-title">
          <span role="img" aria-label="Calendar">
            📅
          </span>
          Schedule & Tax Information
        </h3>

        <div className="review-item">
          <span className="review-label">Payment Date:</span>
          <span className="review-value">
            {data.paymentDate ? formatDate(data.paymentDate) : ""}
          </span>
        </div>

        <div className="review-item">
          <span className="review-label">Frequency:</span>
          <span className="review-value">
            {getFrequencyLabel(data.frequency || "")}
          </span>
        </div>

        <div className="review-item">
          <span className="review-label">Tax Exempt:</span>
          <span className="review-value">{data.taxExempt ? "Yes" : "No"}</span>
        </div>

        {!data.taxExempt && data.taxWithholding && data.taxWithholding > 0 && (
          <div className="review-item">
            <span className="review-label">Tax Withholding:</span>
            <span className="review-value">{data.taxWithholding}%</span>
          </div>
        )}

        {data.notes && (
          <div className="review-item">
            <span className="review-label">Notes:</span>
            <span className="review-value">{data.notes}</span>
          </div>
        )}
      </div>

      {/* Payment Summary */}
      {netAmount && (
        <div
          className="review-section"
          style={{ background: "#f0f9ff", border: "2px solid #3b82f6" }}
        >
          <h3 className="review-section-title" style={{ color: "#1e40af" }}>
            <span role="img" aria-label="Money">
              💰
            </span>
            Payment Summary
          </h3>

          <div className="review-item">
            <span className="review-label">Gross Amount:</span>
            <span className="review-value" style={{ fontWeight: "600" }}>
              {formatCurrency(netAmount.gross, netAmount.currency)}
            </span>
          </div>

          {!data.taxExempt && netAmount.taxWithholding > 0 && (
            <>
              <div className="review-item">
                <span className="review-label">Tax Withholding:</span>
                <span className="review-value" style={{ color: "#dc2626" }}>
                  -
                  {formatCurrency(netAmount.taxWithholding, netAmount.currency)}
                </span>
              </div>

              <hr
                style={{
                  margin: "1rem 0",
                  border: "none",
                  borderTop: "2px solid #3b82f6",
                }}
              />

              <div className="review-item">
                <span
                  className="review-label"
                  style={{ fontSize: "1.125rem", fontWeight: "700" }}
                >
                  Net Amount:
                </span>
                <span
                  className="review-value"
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "700",
                    color: "#1e40af",
                  }}
                >
                  {formatCurrency(netAmount.net, netAmount.currency)}
                </span>
              </div>
            </>
          )}

          {data.taxExempt && (
            <div className="review-item">
              <span
                className="review-label"
                style={{ fontSize: "1.125rem", fontWeight: "700" }}
              >
                Net Amount:
              </span>
              <span
                className="review-value"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "700",
                  color: "#1e40af",
                }}
              >
                {formatCurrency(netAmount.net, netAmount.currency)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Important Notice */}
      <div
        style={{
          padding: "1rem",
          background: "#fef3c7",
          border: "1px solid #f59e0b",
          borderRadius: "8px",
          marginTop: "2rem",
        }}
      >
        <p style={{ margin: 0, color: "#92400e" }}>
          <strong>⚠️ Important:</strong> Please verify all information is
          correct before proceeding. Once created, payout details cannot be
          modified without contacting support.
        </p>
      </div>
    </div>
  );
};

export default ReviewStep;
