/**
 * Calculate the final price after applying a discount
 * @param basePrice - The original price
 * @param discountPercent - The discount percentage (0-100)
 * @returns The final price after discount
 */
export function calculateDiscount(basePrice: number, discountPercent: number): number {
  // BUG: Missing validation for discount percentage
  // This will cause incorrect calculations for discounts > 100
  const discountAmount = basePrice * (discountPercent / 100);
  return basePrice - discountAmount;
}
