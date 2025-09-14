import { PayoutData, ValidationErrors } from "../types/payout";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (supports various formats)
const PHONE_REGEX = /^[+]?[1-9][\d]{0,15}$/;

// Bank account validation
const ACCOUNT_NUMBER_REGEX = /^\d{8,17}$/;
const ROUTING_NUMBER_REGEX = /^\d{9}$/;

// Crypto address validation (basic)
const BITCOIN_ADDRESS_REGEX =
  /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/;
const ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const validatePayoutData = (
  data: Partial<PayoutData>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Step 1: Basic Information validation
  if (!data.payoutType) {
    errors.payoutType = "Payout type is required";
  }

  if (!data.amount || data.amount <= 0) {
    errors.amount = "Amount must be greater than 0";
  } else if (data.amount > 1000000) {
    errors.amount = "Amount cannot exceed $1,000,000";
  }

  if (!data.currency) {
    errors.currency = "Currency is required";
  }

  if (!data.description || data.description.trim().length < 3) {
    errors.description = "Description must be at least 3 characters";
  }

  // Step 2: Recipient Information validation
  if (!data.recipientType) {
    errors.recipientType = "Recipient type is required";
  }

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.phone || !PHONE_REGEX.test(data.phone.replace(/[\s\-()]/g, ""))) {
    errors.phone = "Please enter a valid phone number";
  }

  // Address validation
  if (data.address) {
    if (!data.address.street || data.address.street.trim().length < 5) {
      errors["address.street"] = "Street address must be at least 5 characters";
    }

    if (!data.address.city || data.address.city.trim().length < 2) {
      errors["address.city"] = "City is required";
    }

    if (!data.address.state || data.address.state.trim().length < 2) {
      errors["address.state"] = "State is required";
    }

    if (!data.address.zipCode || data.address.zipCode.trim().length < 5) {
      errors["address.zipCode"] = "ZIP code must be at least 5 characters";
    }

    if (!data.address.country || data.address.country.trim().length < 2) {
      errors["address.country"] = "Country is required";
    }
  }

  // Step 3: Payment Details validation
  if (!data.paymentMethod) {
    errors.paymentMethod = "Payment method is required";
  }

  // Bank transfer validation
  if (data.paymentMethod === "bank_transfer" && data.bankDetails) {
    if (
      !data.bankDetails.accountNumber ||
      !ACCOUNT_NUMBER_REGEX.test(data.bankDetails.accountNumber)
    ) {
      errors["bankDetails.accountNumber"] =
        "Please enter a valid account number (8-17 digits)";
    }

    if (
      !data.bankDetails.routingNumber ||
      !ROUTING_NUMBER_REGEX.test(data.bankDetails.routingNumber)
    ) {
      errors["bankDetails.routingNumber"] =
        "Please enter a valid routing number (9 digits)";
    }

    if (
      !data.bankDetails.bankName ||
      data.bankDetails.bankName.trim().length < 2
    ) {
      errors["bankDetails.bankName"] = "Bank name is required";
    }

    if (!data.bankDetails.accountType) {
      errors["bankDetails.accountType"] = "Account type is required";
    }
  }

  // PayPal validation
  if (data.paymentMethod === "paypal") {
    if (!data.paypalEmail || !EMAIL_REGEX.test(data.paypalEmail)) {
      errors.paypalEmail = "Please enter a valid PayPal email address";
    }
  }

  // Crypto validation
  if (data.paymentMethod === "crypto") {
    if (!data.cryptoAddress) {
      errors.cryptoAddress = "Crypto address is required";
    } else if (
      data.cryptoType === "bitcoin" &&
      !BITCOIN_ADDRESS_REGEX.test(data.cryptoAddress)
    ) {
      errors.cryptoAddress = "Please enter a valid Bitcoin address";
    } else if (
      data.cryptoType === "ethereum" &&
      !ETHEREUM_ADDRESS_REGEX.test(data.cryptoAddress)
    ) {
      errors.cryptoAddress = "Please enter a valid Ethereum address";
    }

    if (!data.cryptoType) {
      errors.cryptoType = "Cryptocurrency type is required";
    }
  }

  // Step 4: Schedule & Tax validation
  if (!data.paymentDate) {
    errors.paymentDate = "Payment date is required";
  } else {
    const paymentDate = new Date(data.paymentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (paymentDate < today) {
      errors.paymentDate = "Payment date cannot be in the past";
    }
  }

  if (!data.frequency) {
    errors.frequency = "Payment frequency is required";
  }

  if (
    data.taxWithholding !== undefined &&
    (data.taxWithholding < 0 || data.taxWithholding > 100)
  ) {
    errors.taxWithholding = "Tax withholding must be between 0 and 100 percent";
  }

  return errors;
};

export const validateStep = (
  step: number,
  data: Partial<PayoutData>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  switch (step) {
    case 1:
      // Basic Information
      if (!data.payoutType) {
        errors.payoutType = "Payout type is required";
      }
      if (!data.amount || data.amount <= 0) {
        errors.amount = "Amount must be greater than 0";
      }
      if (data.amount && data.amount > 1000000) {
        errors.amount = "Amount cannot exceed $1,000,000";
      }
      if (!data.currency) {
        errors.currency = "Currency is required";
      }
      if (!data.description || data.description.trim().length < 3) {
        errors.description = "Description must be at least 3 characters";
      }
      break;

    case 2:
      // Recipient Information
      if (!data.recipientType)
        errors.recipientType = "Recipient type is required";
      if (!data.firstName || data.firstName.trim().length < 2) {
        errors.firstName = "First name must be at least 2 characters";
      }
      if (!data.lastName || data.lastName.trim().length < 2) {
        errors.lastName = "Last name must be at least 2 characters";
      }
      if (!data.email || !EMAIL_REGEX.test(data.email)) {
        errors.email = "Please enter a valid email address";
      }
      if (
        !data.phone ||
        !PHONE_REGEX.test(data.phone.replace(/[\s\-()]/g, ""))
      ) {
        errors.phone = "Please enter a valid phone number";
      }
      if (data.address) {
        if (!data.address.street || data.address.street.trim().length < 5) {
          errors["address.street"] =
            "Street address must be at least 5 characters";
        }
        if (!data.address.city || data.address.city.trim().length < 2) {
          errors["address.city"] = "City is required";
        }
        if (!data.address.state || data.address.state.trim().length < 2) {
          errors["address.state"] = "State is required";
        }
        if (!data.address.zipCode || data.address.zipCode.trim().length < 5) {
          errors["address.zipCode"] = "ZIP code must be at least 5 characters";
        }
        if (!data.address.country || data.address.country.trim().length < 2) {
          errors["address.country"] = "Country is required";
        }
      }
      break;

    case 3:
      // Payment Details
      if (!data.paymentMethod)
        errors.paymentMethod = "Payment method is required";

      if (data.paymentMethod === "bank_transfer" && data.bankDetails) {
        if (
          !data.bankDetails.accountNumber ||
          !ACCOUNT_NUMBER_REGEX.test(data.bankDetails.accountNumber)
        ) {
          errors["bankDetails.accountNumber"] =
            "Please enter a valid account number (8-17 digits)";
        }
        if (
          !data.bankDetails.routingNumber ||
          !ROUTING_NUMBER_REGEX.test(data.bankDetails.routingNumber)
        ) {
          errors["bankDetails.routingNumber"] =
            "Please enter a valid routing number (9 digits)";
        }
        if (
          !data.bankDetails.bankName ||
          data.bankDetails.bankName.trim().length < 2
        ) {
          errors["bankDetails.bankName"] = "Bank name is required";
        }
        if (!data.bankDetails.accountType) {
          errors["bankDetails.accountType"] = "Account type is required";
        }
      }

      if (data.paymentMethod === "paypal") {
        if (!data.paypalEmail || !EMAIL_REGEX.test(data.paypalEmail)) {
          errors.paypalEmail = "Please enter a valid PayPal email address";
        }
      }

      if (data.paymentMethod === "crypto") {
        if (!data.cryptoAddress) {
          errors.cryptoAddress = "Crypto address is required";
        } else if (
          data.cryptoType === "bitcoin" &&
          !BITCOIN_ADDRESS_REGEX.test(data.cryptoAddress)
        ) {
          errors.cryptoAddress = "Please enter a valid Bitcoin address";
        } else if (
          data.cryptoType === "ethereum" &&
          !ETHEREUM_ADDRESS_REGEX.test(data.cryptoAddress)
        ) {
          errors.cryptoAddress = "Please enter a valid Ethereum address";
        }
        if (!data.cryptoType) {
          errors.cryptoType = "Cryptocurrency type is required";
        }
      }
      break;

    case 4:
      // Schedule & Tax
      if (!data.paymentDate) {
        errors.paymentDate = "Payment date is required";
      } else {
        const paymentDate = new Date(data.paymentDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (paymentDate < today) {
          errors.paymentDate = "Payment date cannot be in the past";
        }
      }
      if (!data.frequency) errors.frequency = "Payment frequency is required";
      if (
        data.taxWithholding !== undefined &&
        (data.taxWithholding < 0 || data.taxWithholding > 100)
      ) {
        errors.taxWithholding =
          "Tax withholding must be between 0 and 100 percent";
      }
      break;
  }

  return errors;
};

export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
