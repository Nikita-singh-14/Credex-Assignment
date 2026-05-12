import { describe, it, expect } from 'vitest';
import { calculateAudit } from './audit-engine';

describe('Audit Engine', () => {
  it('should calculate zero savings for zero usage', () => {
    const result = calculateAudit({
      cursor: 0,
      chatgpt: 0,
      claude: 0,
      openai: 0,
      anthropic: 0,
    });
    
    expect(result.standardMonthlyTotal).toBe(0);
    expect(result.credexMonthlyTotal).toBe(0);
    expect(result.monthlySavings).toBe(0);
    expect(result.annualSavings).toBe(0);
  });

  it('should correctly calculate a 20% discount on seats', () => {
    const result = calculateAudit({
      cursor: 1, // $20
      chatgpt: 1, // $20
      claude: 1, // $20
      openai: 0,
      anthropic: 0,
    });
    
    // Total standard cost = 3 * 20 = $60
    // Total credex cost = $60 * 0.8 = $48
    // Savings = $12
    expect(result.standardMonthlyTotal).toBe(60);
    expect(result.credexMonthlyTotal).toBe(48);
    expect(result.monthlySavings).toBe(12);
  });

  it('should correctly calculate a 15% discount on API usage', () => {
    const result = calculateAudit({
      cursor: 0,
      chatgpt: 0,
      claude: 0,
      openai: 100,
      anthropic: 100,
    });
    
    // Total standard cost = $200
    // Total credex cost = $200 * 0.85 = $170
    // Savings = $30
    expect(result.standardMonthlyTotal).toBe(200);
    expect(result.credexMonthlyTotal).toBe(170);
    expect(result.monthlySavings).toBe(30);
  });

  it('should calculate combined discounts accurately', () => {
    const result = calculateAudit({
      cursor: 10, // $200
      chatgpt: 0,
      claude: 5,  // $100
      openai: 1000,
      anthropic: 500,
    });
    
    // Seats: 15 * 20 = $300. Credex: $240 (Save 60)
    // API: $1500. Credex: $1275 (Save 225)
    // Total Save: 285/mo. Annual: 3420
    
    expect(result.standardMonthlyTotal).toBe(1800);
    expect(result.credexMonthlyTotal).toBe(1515);
    expect(result.monthlySavings).toBe(285);
    expect(result.annualSavings).toBe(3420);
  });

  it('should round numbers to 2 decimal places to avoid floating point errors', () => {
    const result = calculateAudit({
      cursor: 0,
      chatgpt: 0,
      claude: 0,
      openai: 33.33,
      anthropic: 0,
    });
    
    // Standard: 33.33
    // Credex: 33.33 * 0.85 = 28.3305 -> 28.33
    // Savings: 33.33 - 28.33 = 5.00
    
    expect(result.standardMonthlyTotal).toBe(33.33);
    expect(result.credexMonthlyTotal).toBe(28.33);
    expect(result.monthlySavings).toBe(5);
  });
});
