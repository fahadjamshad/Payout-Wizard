import React from "react";

interface SuccessStepProps {
  payoutId: string | null;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ payoutId }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleNewPayout = () => {
    window.location.reload();
  };

  return (
    <div className="success-state">
      <div className="success-icon" role="img" aria-label="Success checkmark">
        ✓
      </div>

      <h1 className="success-title">Payout Created Successfully!</h1>

      <p className="success-message">
        Your payout has been created and is being processed.
        {payoutId && (
          <>
            <br />
            <strong>Payout ID: {payoutId}</strong>
          </>
        )}
      </p>

      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "1.5rem",
          marginBottom: "2rem",
          textAlign: "left",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            fontSize: "1.125rem",
            fontWeight: "600",
          }}
        >
          What happens next?
        </h3>

        <ul style={{ margin: 0, paddingLeft: "1.5rem", color: "#6b7280" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            You'll receive a confirmation email with payout details
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            The recipient will be notified via email and/or SMS
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Processing time varies by payment method (see details below)
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            You can track the payout status in your dashboard
          </li>
        </ul>
      </div>

      <div
        style={{
          background: "#f0f9ff",
          border: "1px solid #bae6fd",
          borderRadius: "8px",
          padding: "1.5rem",
          marginBottom: "2rem",
          textAlign: "left",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#1e40af",
          }}
        >
          Processing Times
        </h3>

        <div style={{ display: "grid", gap: "0.5rem", color: "#1e40af" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Bank Transfer:</span>
            <span>1-3 business days</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>PayPal:</span>
            <span>Instant to 1 business day</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Cryptocurrency:</span>
            <span>10-30 minutes</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Check (Mail):</span>
            <span>5-7 business days</span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePrint}
          aria-label="Print payout confirmation"
        >
          🖨️ Print Confirmation
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={handleNewPayout}
          aria-label="Create another payout"
        >
          ➕ Create Another Payout
        </button>
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "8px",
          textAlign: "left",
        }}
      >
        <p style={{ margin: 0, color: "#166534", fontSize: "0.875rem" }}>
          <strong>💡 Tip:</strong> Save this payout ID for your records. You can
          use it to track the payout status or contact support if needed.
        </p>
      </div>
    </div>
  );
};

export default SuccessStep;
