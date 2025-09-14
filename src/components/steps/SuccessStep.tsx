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

      <div className="success-info-box">
        <h3>
          <span role="img" aria-label="Next steps">
            📋
          </span>
          What happens next?
        </h3>

        <ul>
          <li>You'll receive a confirmation email with payout details</li>
          <li>The recipient will be notified via email and/or SMS</li>
          <li>Processing time varies by payment method (see details below)</li>
          <li>You can track the payout status in your dashboard</li>
        </ul>
      </div>

      <div className="success-processing-box">
        <h3>
          <span role="img" aria-label="Processing times">
            ⏱️
          </span>
          Processing Times
        </h3>

        <div className="success-processing-grid">
          <div className="success-processing-item">
            <span>Bank Transfer:</span>
            <span>1-3 business days</span>
          </div>
          <div className="success-processing-item">
            <span>PayPal:</span>
            <span>Instant to 1 business day</span>
          </div>
          <div className="success-processing-item">
            <span>Cryptocurrency:</span>
            <span>10-30 minutes</span>
          </div>
          <div className="success-processing-item">
            <span>Check (Mail):</span>
            <span>5-7 business days</span>
          </div>
        </div>
      </div>

      <div className="success-actions">
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

      <div className="success-tip-box">
        <p>
          <strong>💡 Tip:</strong> Save this payout ID for your records. You can
          use it to track the payout status or contact support if needed.
        </p>
      </div>
    </div>
  );
};

export default SuccessStep;
