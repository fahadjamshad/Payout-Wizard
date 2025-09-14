export interface PayoutData {
  // Step 1: Basic Information
  payoutType: "salary" | "bonus" | "commission" | "reimbursement" | "other";
  amount: number;
  currency: "USD" | "EUR" | "GBP" | "CAD" | "AUD";
  description: string;

  // Step 2: Recipient Information
  recipientType: "employee" | "contractor" | "vendor";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  // Step 3: Payment Details
  paymentMethod: "bank_transfer" | "paypal" | "check" | "crypto";
  bankDetails?: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
    accountType: "checking" | "savings";
  };
  paypalEmail?: string;
  cryptoAddress?: string;
  cryptoType?: "bitcoin" | "ethereum" | "usdc";

  // Step 4: Schedule & Tax
  paymentDate: string;
  frequency: "one_time" | "weekly" | "bi_weekly" | "monthly" | "quarterly";
  taxWithholding: number;
  taxExempt: boolean;
  notes: string;
}

export interface ValidationErrors {
  [key: string]: string | undefined;
}

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType<{
    data: Partial<PayoutData>;
    errors: ValidationErrors;
    onChange: (data: Partial<PayoutData>) => void;
  }>;
}

export interface PayoutResponse {
  success: boolean;
  payoutId?: string;
  message: string;
  errors?: string[];
}
