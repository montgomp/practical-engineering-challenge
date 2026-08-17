/**
 * Calculate the final price after applying a discount
 * @param basePrice - The original price
 * @param discountPercent - The discount percentage (0-100)
 * @returns The final price after discount
 */
export function calculateDiscount(basePrice: number, discountPercent: number): number {
  // BUG: Missing validation for discount percentage
  // This will cause incorrect calculations for discounts > 100
  
    // Task 1 ensure <=100 % discount.
  /*
  - Discounts > 100 should be treated as 100
  - Discounts < 0 should be treated as 0
 */
  if( discountPercent > 100) {
    discountPercent = 100;
  } else if (discountPercent < 0) {
    discountPercent = 0;
  }
  const discountAmount = basePrice * (discountPercent / 100);
  return basePrice - discountAmount;
}
