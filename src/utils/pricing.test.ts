import { calculateDiscount } from './pricing';

describe('calculateDiscount', () => {
  it('should calculate discount correctly for valid percentages', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
    expect(calculateDiscount(200, 25)).toBe(150);
  });

  it('should handle 0% discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });

  // TODO: Add test for edge cases (discount > 100, negative discounts)
});
