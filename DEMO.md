# Create Payout Wizard - Demo Guide

## 🎯 Demo Scenarios

### Scenario 1: Employee Salary Payout

**Test the complete flow with valid data**

1. **Basic Information**

   - Payout Type: Salary
   - Amount: 5000
   - Currency: USD
   - Description: "Monthly salary for John Doe"

2. **Recipient Information**

   - Recipient Type: Employee
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@company.com
   - Phone: +1 (555) 123-4567
   - Address: 123 Main St, New York, NY 10001, US

3. **Payment Details**

   - Payment Method: Bank Transfer
   - Bank Name: Chase Bank
   - Account Number: 1234567890
   - Routing Number: 021000021
   - Account Type: Checking

4. **Schedule & Tax**

   - Payment Date: Tomorrow's date
   - Frequency: Monthly
   - Tax Exempt: No
   - Tax Withholding: 22%

5. **Review & Submit**
   - Review all information
   - Submit payout

### Scenario 2: Contractor Bonus (PayPal)

**Test PayPal payment method**

1. **Basic Information**

   - Payout Type: Bonus
   - Amount: 1500
   - Currency: USD
   - Description: "Q4 performance bonus"

2. **Recipient Information**

   - Recipient Type: Contractor
   - First Name: Jane
   - Last Name: Smith
   - Email: jane.smith@freelancer.com
   - Phone: +1 (555) 987-6543
   - Address: 456 Oak Ave, Los Angeles, CA 90210, US

3. **Payment Details**

   - Payment Method: PayPal
   - PayPal Email: jane.smith@paypal.com

4. **Schedule & Tax**

   - Payment Date: Today's date
   - Frequency: One Time
   - Tax Exempt: Yes

5. **Review & Submit**

### Scenario 3: Crypto Payment

**Test cryptocurrency payment**

1. **Basic Information**

   - Payout Type: Commission
   - Amount: 0.5
   - Currency: USD
   - Description: "Sales commission"

2. **Recipient Information**

   - Recipient Type: Contractor
   - First Name: Alex
   - Last Name: Johnson
   - Email: alex.johnson@crypto.com
   - Phone: +1 (555) 456-7890
   - Address: 789 Pine St, Seattle, WA 98101, US

3. **Payment Details**

   - Payment Method: Cryptocurrency
   - Cryptocurrency: Bitcoin
   - Wallet Address: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa

4. **Schedule & Tax**

   - Payment Date: Today's date
   - Frequency: One Time
   - Tax Exempt: No
   - Tax Withholding: 15%

5. **Review & Submit**

## 🧪 Testing Validation

### Test Invalid Data

Try these scenarios to test validation:

1. **Empty Required Fields**

   - Leave payout type empty
   - Leave amount empty
   - Leave email empty

2. **Invalid Amounts**

   - Amount: 0
   - Amount: -100
   - Amount: 2000000 (exceeds limit)

3. **Invalid Email**

   - Email: "not-an-email"
   - Email: "missing@domain"

4. **Invalid Bank Details**

   - Account Number: "123" (too short)
   - Routing Number: "12345678" (wrong length)

5. **Invalid Dates**
   - Payment Date: Yesterday's date

## ⌨️ Keyboard Testing

### Navigation Flow

1. **Tab Navigation**

   - Press Tab to move through all form fields
   - Verify focus is visible and logical
   - Test Shift+Tab for reverse navigation

2. **Form Interaction**

   - Use Enter/Space to activate buttons
   - Use Arrow keys in select dropdowns
   - Use Escape to go back (if implemented)

3. **Step Navigation**
   - Use Tab to reach Next/Previous buttons
   - Use Enter to activate navigation

## 🎧 Screen Reader Testing

### With NVDA (Windows)

1. Start NVDA
2. Navigate to the application
3. Use Tab to move through elements
4. Listen for:
   - Step announcements
   - Form labels and descriptions
   - Error messages
   - Button states

### With VoiceOver (macOS)

1. Enable VoiceOver (Cmd+F5)
2. Navigate using VO+Arrow keys
3. Test form interaction
4. Verify all content is announced

## 📱 Mobile Testing

### Touch Interaction

1. **Form Fields**

   - Tap to focus input fields
   - Test virtual keyboard interaction
   - Verify field validation

2. **Navigation**

   - Swipe between steps (if implemented)
   - Tap buttons and links
   - Test dropdown selections

3. **Responsive Layout**
   - Rotate device to test orientation
   - Test at different zoom levels
   - Verify no horizontal scrolling

## 🔍 Accessibility Checklist Testing

### Visual Testing

- [ ] High contrast mode compatibility
- [ ] 200% zoom level functionality
- [ ] Color-blind friendly design
- [ ] Clear focus indicators

### Motor Testing

- [ ] Large touch targets (44px minimum)
- [ ] No time-based interactions
- [ ] Alternative input methods
- [ ] Error recovery options

### Cognitive Testing

- [ ] Clear instructions and labels
- [ ] Consistent navigation
- [ ] Error prevention and correction
- [ ] Logical information hierarchy

## 🚨 Error Scenarios

### Network Errors

1. **Slow Connection**

   - Test with throttled network
   - Verify loading states
   - Check timeout handling

2. **API Failures**
   - The mock API has a 10% failure rate
   - Test error message display
   - Verify retry options

### Form Errors

1. **Validation Errors**

   - Test real-time validation
   - Verify error message clarity
   - Check error recovery

2. **Submission Errors**
   - Test with invalid data
   - Verify error handling
   - Check user guidance

## 📊 Performance Testing

### Load Times

- [ ] Initial page load < 2 seconds
- [ ] Step transitions < 500ms
- [ ] Form validation < 100ms
- [ ] API calls < 3 seconds

### Memory Usage

- [ ] No memory leaks during navigation
- [ ] Efficient re-rendering
- [ ] Proper cleanup of event listeners

## 🎯 Success Criteria

### Functional Requirements

- [ ] All form fields work correctly
- [ ] Validation prevents invalid submissions
- [ ] Review step shows accurate data
- [ ] Success page displays correctly

### Accessibility Requirements

- [ ] 100% keyboard navigable
- [ ] Screen reader compatible
- [ ] WCAG 2.1 AA compliant
- [ ] Mobile accessible

### User Experience Requirements

- [ ] Intuitive navigation
- [ ] Clear error messages
- [ ] Responsive design
- [ ] Fast performance

---

**Happy Testing! 🎉**

Remember to test with actual users who rely on assistive technology for the most accurate accessibility assessment.
