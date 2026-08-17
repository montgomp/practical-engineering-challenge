import { calculateDiscount } from './pricing';

describe('calculateDiscount', () => {
  it('should calculate discount correctly for valid percentages', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
    expect(calculateDiscount(200, 25)).toBe(150);
  });

  it('should handle 0% discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });

    it('should handle 100% discount', () => {
    expect(calculateDiscount(100, 100)).toBe(0);
  })

  it('should treat negative discount as 0', () => {
    expect(calculateDiscount(100, -25)).toBe(100);
  })

  it('should treat discount percentages over 100 to be 100', () => {
    expect(calculateDiscount(100, 1000)).toBe(0);
  })
});
