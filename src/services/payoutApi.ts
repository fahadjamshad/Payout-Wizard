import { PayoutData, PayoutResponse } from "../types/payout";

// API configuration
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.payout-wizard.com';
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

// Mock API delay to simulate network request (only in development)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Payout creation API
export const createPayout = async (
  payoutData: PayoutData
): Promise<PayoutResponse> => {
  // In development, use mock API with delay
  if (IS_DEVELOPMENT) {
    await delay(2000);
  }

  // Simulate validation errors for testing
  const errors: string[] = [];

  // Mock validation rules
  if (payoutData.amount <= 0) {
    errors.push("Amount must be greater than 0");
  }

  if (payoutData.amount > 1000000) {
    errors.push("Amount cannot exceed $1,000,000");
  }

  if (!payoutData.email.includes("@")) {
    errors.push("Invalid email address");
  }

  if (
    payoutData.paymentMethod === "bank_transfer" &&
    !payoutData.bankDetails?.accountNumber
  ) {
    errors.push("Bank account number is required for bank transfers");
  }

  if (payoutData.paymentMethod === "paypal" && !payoutData.paypalEmail) {
    errors.push("PayPal email is required for PayPal payments");
  }

  if (payoutData.paymentMethod === "crypto" && !payoutData.cryptoAddress) {
    errors.push("Crypto address is required for cryptocurrency payments");
  }

  // In development, simulate random failures (10% chance)
  if (IS_DEVELOPMENT) {
    const shouldFail = Math.random() < 0.1;
    if (shouldFail) {
      return {
        success: false,
        message: "Payment processing failed. Please try again.",
        errors: ["Network timeout", "Service temporarily unavailable"],
      };
    }
  }

  if (errors.length > 0) {
    return {
      success: false,
      message: "Validation failed. Please check your input.",
      errors,
    };
  }

  // Generate mock payout ID
  const payoutId = `PAY-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;

  return {
    success: true,
    payoutId,
    message: "Payout created successfully!",
  };
};

// Mock API to get payout status
export const getPayoutStatus = async (
  payoutId: string
): Promise<{
  status: "pending" | "processing" | "completed" | "failed";
  message: string;
}> => {
  await delay(1000);

  // Mock status progression
  const statuses = ["pending", "processing", "completed"] as const;
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  const messages = {
    pending: "Payout is pending approval",
    processing: "Payout is being processed",
    completed: "Payout has been completed successfully",
    failed: "Payout processing failed",
  };

  return {
    status: randomStatus,
    message: messages[randomStatus],
  };
};

// Mock API to validate bank account
export const validateBankAccount = async (
  accountNumber: string,
  routingNumber: string
): Promise<{
  valid: boolean;
  bankName?: string;
  message: string;
}> => {
  await delay(1500);

  // Mock validation - simple check for demo
  const isValid = accountNumber.length >= 8 && routingNumber.length === 9;

  if (isValid) {
    return {
      valid: true,
      bankName: "Mock Bank",
      message: "Bank account validated successfully",
    };
  }

  return {
    valid: false,
    message: "Invalid bank account details",
  };
};

// Mock API to get exchange rates
export const getExchangeRates = async (): Promise<{
  [key: string]: number;
}> => {
  await delay(500);

  return {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    CAD: 1.25,
    AUD: 1.35,
  };
};
