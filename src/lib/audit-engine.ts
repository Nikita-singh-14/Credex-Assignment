// src/lib/audit-engine.ts

export interface AuditInput {
  cursor: number;
  chatgpt: number;
  claude: number;
  openai: number;
  anthropic: number;
}

export interface AuditResult {
  standardMonthlyTotal: number;
  credexMonthlyTotal: number;
  monthlySavings: number;
  annualSavings: number;
}

const SEAT_PRICE = 20;
const CREDEX_SEAT_DISCOUNT = 0.20;
const CREDEX_API_DISCOUNT = 0.15;

/**
 * Deterministic mathematical engine to calculate the AI spend savings based on PRICING_DATA.md
 */
export function calculateAudit(input: AuditInput): AuditResult {
  const numSeats = input.cursor + input.chatgpt + input.claude;
  const standardSeatCost = numSeats * SEAT_PRICE;
  const standardApiCost = input.openai + input.anthropic;
  
  const standardMonthlyTotal = standardSeatCost + standardApiCost;
  
  const credexSeatCost = standardSeatCost * (1 - CREDEX_SEAT_DISCOUNT);
  const credexApiCost = standardApiCost * (1 - CREDEX_API_DISCOUNT);
  
  const credexMonthlyTotal = credexSeatCost + credexApiCost;
  
  const monthlySavings = standardMonthlyTotal - credexMonthlyTotal;
  const annualSavings = monthlySavings * 12;
  
  return {
    // We round everything to 2 decimal places to avoid floating point weirdness
    standardMonthlyTotal: Math.round(standardMonthlyTotal * 100) / 100,
    credexMonthlyTotal: Math.round(credexMonthlyTotal * 100) / 100,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    annualSavings: Math.round(annualSavings * 100) / 100
  };
}
