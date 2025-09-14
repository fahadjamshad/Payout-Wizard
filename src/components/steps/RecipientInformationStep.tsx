import React from "react";
import { PayoutData, ValidationErrors } from "../../types/payout";

interface RecipientInformationStepProps {
  data: Partial<PayoutData>;
  errors: ValidationErrors;
  updateData: (updates: Partial<PayoutData>) => void;
}

const RecipientInformationStep: React.FC<RecipientInformationStepProps> = ({
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

  const handleAddressChange = (
    field: keyof NonNullable<PayoutData["address"]>,
    value: string
  ) => {
    const currentAddress = data.address || {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    };

    updateData({
      address: {
        ...currentAddress,
        [field]: value,
      },
    });
  };

  return (
    <div>
      <h2 className="step-title">Recipient Information</h2>
      <p className="step-description">
        Provide the recipient's contact and address information.
      </p>

      <div className="form-group">
        <label htmlFor="recipientType" className="form-label">
          Recipient Type *
        </label>
        <select
          id="recipientType"
          name="recipientType"
          value={data.recipientType || ""}
          onChange={(e) => handleInputChange("recipientType", e.target.value)}
          className={`form-select ${errors.recipientType ? "error" : ""}`}
          aria-describedby={
            errors.recipientType ? "recipientType-error" : "recipientType-help"
          }
          aria-invalid={!!errors.recipientType}
        >
          <option value="">Select recipient type</option>
          <option value="employee">Employee</option>
          <option value="contractor">Contractor</option>
          <option value="vendor">Vendor</option>
        </select>
        {errors.recipientType && (
          <div id="recipientType-error" className="form-error" role="alert">
            {errors.recipientType}
          </div>
        )}
        <div id="recipientType-help" className="form-help">
          Choose the type of recipient for this payout
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={data.firstName || ""}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={`form-input ${errors.firstName ? "error" : ""}`}
            placeholder="Enter first name"
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <div id="firstName-error" className="form-error" role="alert">
              {errors.firstName}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName || ""}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={`form-input ${errors.lastName ? "error" : ""}`}
            placeholder="Enter last name"
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <div id="lastName-error" className="form-error" role="alert">
              {errors.lastName}
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email || ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`form-input ${errors.email ? "error" : ""}`}
          placeholder="recipient@example.com"
          aria-describedby={errors.email ? "email-error" : "email-help"}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <div id="email-error" className="form-error" role="alert">
            {errors.email}
          </div>
        )}
        <div id="email-help" className="form-help">
          We'll send payment notifications to this email address
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={data.phone || ""}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className={`form-input ${errors.phone ? "error" : ""}`}
          placeholder="+1 (555) 123-4567"
          aria-describedby={errors.phone ? "phone-error" : "phone-help"}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <div id="phone-error" className="form-error" role="alert">
            {errors.phone}
          </div>
        )}
        <div id="phone-help" className="form-help">
          Include country code for international numbers
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
          Address Information *
        </legend>

        <div className="form-group">
          <label htmlFor="street" className="form-label">
            Street Address *
          </label>
          <input
            type="text"
            id="street"
            name="address.street"
            value={data.address?.street || ""}
            onChange={(e) => handleAddressChange("street", e.target.value)}
            className={`form-input ${errors["address.street"] ? "error" : ""}`}
            placeholder="123 Main Street, Apt 4B"
            aria-describedby={
              errors["address.street"] ? "street-error" : undefined
            }
            aria-invalid={!!errors["address.street"]}
          />
          {errors["address.street"] && (
            <div id="street-error" className="form-error" role="alert">
              {errors["address.street"]}
            </div>
          )}
        </div>

        <div className="address-grid">
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={data.address?.city || ""}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className={`form-input ${errors["address.city"] ? "error" : ""}`}
              placeholder="New York"
              aria-describedby={
                errors["address.city"] ? "city-error" : undefined
              }
              aria-invalid={!!errors["address.city"]}
            />
            {errors["address.city"] && (
              <div id="city-error" className="form-error" role="alert">
                {errors["address.city"]}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="zipCode" className="form-label">
              ZIP Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="address.zipCode"
              value={data.address?.zipCode || ""}
              onChange={(e) => handleAddressChange("zipCode", e.target.value)}
              className={`form-input ${
                errors["address.zipCode"] ? "error" : ""
              }`}
              placeholder="10001"
              aria-describedby={
                errors["address.zipCode"] ? "zipCode-error" : undefined
              }
              aria-invalid={!!errors["address.zipCode"]}
            />
            {errors["address.zipCode"] && (
              <div id="zipCode-error" className="form-error" role="alert">
                {errors["address.zipCode"]}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div className="form-group">
            <label htmlFor="state" className="form-label">
              State/Province *
            </label>
            <input
              type="text"
              id="state"
              name="address.state"
              value={data.address?.state || ""}
              onChange={(e) => handleAddressChange("state", e.target.value)}
              className={`form-input ${errors["address.state"] ? "error" : ""}`}
              placeholder="NY"
              aria-describedby={
                errors["address.state"] ? "state-error" : undefined
              }
              aria-invalid={!!errors["address.state"]}
            />
            {errors["address.state"] && (
              <div id="state-error" className="form-error" role="alert">
                {errors["address.state"]}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country *
            </label>
            <select
              id="country"
              name="address.country"
              value={data.address?.country || "US"}
              onChange={(e) => handleAddressChange("country", e.target.value)}
              className={`form-select ${
                errors["address.country"] ? "error" : ""
              }`}
              aria-describedby={
                errors["address.country"] ? "country-error" : undefined
              }
              aria-invalid={!!errors["address.country"]}
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="NL">Netherlands</option>
              <option value="SE">Sweden</option>
            </select>
            {errors["address.country"] && (
              <div id="country-error" className="form-error" role="alert">
                {errors["address.country"]}
              </div>
            )}
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default RecipientInformationStep;
