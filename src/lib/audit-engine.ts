// src/lib/audit-engine.ts

export interface ToolData {
  plan: string;
  spend: number;
  seats: number;
}

export interface AuditInput {
  teamSize: number;
  useCase: string;
  tools: {
    cursor: ToolData;
    copilot: ToolData;
    claude: ToolData;
    chatgpt: ToolData;
    anthropicApi: ToolData;
    openaiApi: ToolData;
    gemini: ToolData;
    windsurf: ToolData;
  };
  email?: string;
}

export interface ToolBreakdown {
  tool: string;
  name: string;
  currentSpend: number;
  recommendedAction: string;
  reason: string;
  savings: number;
  isOptimized: boolean;
}

export interface AuditResult {
  standardMonthlyTotal: number;
  credexMonthlyTotal: number;
  monthlySavings: number;
  annualSavings: number;
  toolBreakdown: ToolBreakdown[];
}

const CREDEX_SEAT_DISCOUNT = 0.20;
const CREDEX_API_DISCOUNT = 0.15;

export function generateBreakdown(input: AuditInput): ToolBreakdown[] {
  const breakdown: ToolBreakdown[] = [];
  const t = input.tools;

  // Cursor
  if (t.cursor && t.cursor.spend > 0) {
    if (t.cursor.plan === "Business" && t.cursor.seats > 0 && (t.cursor.spend / t.cursor.seats) > 40) {
      breakdown.push({
        tool: "cursor",
        name: "Cursor",
        currentSpend: t.cursor.spend,
        recommendedAction: "Audit Cursor Billing",
        reason: "You are spending above retail ($40/user). Check for legacy tiers.",
        savings: t.cursor.spend - (t.cursor.seats * 40),
        isOptimized: false
      });
    } else {
      breakdown.push({
        tool: "cursor",
        name: "Cursor",
        currentSpend: t.cursor.spend,
        recommendedAction: "Keep current plan",
        reason: "Your Cursor configuration is optimal.",
        savings: 0,
        isOptimized: true
      });
    }
  }

  // Claude
  if (t.claude && t.claude.spend > 0) {
    if (t.claude.plan === "Team" && t.claude.seats > 0 && t.claude.seats < 5) {
      const properSpend = t.claude.seats * 20; // Pro is 20
      breakdown.push({
        tool: "claude",
        name: "Claude",
        currentSpend: t.claude.spend,
        recommendedAction: "Downgrade to Claude Pro",
        reason: `Team plan requires 5 seats. Downgrade to Pro ($20/seat) to match your ${t.claude.seats} user(s).`,
        savings: Math.max(0, t.claude.spend - properSpend),
        isOptimized: false
      });
    } else {
      breakdown.push({
        tool: "claude",
        name: "Claude",
        currentSpend: t.claude.spend,
        recommendedAction: "Keep current plan",
        reason: "Your Claude configuration is optimal.",
        savings: 0,
        isOptimized: true
      });
    }
  }

  // ChatGPT
  if (t.chatgpt && t.chatgpt.spend > 0) {
    if (t.chatgpt.plan === "Team" && t.chatgpt.seats > 0 && t.chatgpt.seats < 2) {
      const properSpend = t.chatgpt.seats * 20;
      breakdown.push({
        tool: "chatgpt",
        name: "ChatGPT",
        currentSpend: t.chatgpt.spend,
        recommendedAction: "Downgrade to ChatGPT Plus",
        reason: "Team plan requires 2 seats. Switch to Plus ($20/mo).",
        savings: Math.max(0, t.chatgpt.spend - properSpend),
        isOptimized: false
      });
    } else if (input.useCase === "coding" && (!t.cursor || t.cursor.spend === 0) && (!t.windsurf || t.windsurf.spend === 0) && (!t.copilot || t.copilot.spend === 0)) {
      breakdown.push({
        tool: "chatgpt",
        name: "ChatGPT",
        currentSpend: t.chatgpt.spend,
        recommendedAction: "Switch to Windsurf or Copilot",
        reason: "For coding, purpose-built tools like Windsurf Pro ($15/mo) or Copilot ($10/mo) are cheaper and better.",
        savings: Math.max(0, t.chatgpt.spend - (t.chatgpt.seats > 0 ? t.chatgpt.seats * 15 : 15)),
        isOptimized: false
      });
    } else {
      breakdown.push({
        tool: "chatgpt",
        name: "ChatGPT",
        currentSpend: t.chatgpt.spend,
        recommendedAction: "Keep current plan",
        reason: "Your ChatGPT configuration is optimal.",
        savings: 0,
        isOptimized: true
      });
    }
  }

  // APIs
  const totalApiSpend = (t.openaiApi?.spend || 0) + (t.anthropicApi?.spend || 0);
  if (t.openaiApi && t.openaiApi.spend > 0) {
    if (totalApiSpend > 1000) {
      breakdown.push({
        tool: "openaiApi",
        name: "OpenAI API",
        currentSpend: t.openaiApi.spend,
        recommendedAction: "Negotiate Enterprise or Buy Credits",
        reason: "At >$1k/mo, retail pay-as-you-go is inefficient. Bulk credits yield discounts.",
        savings: t.openaiApi.spend * 0.15, // estimated 15% savings via credits/discount
        isOptimized: false
      });
    } else {
      breakdown.push({
        tool: "openaiApi",
        name: "OpenAI API",
        currentSpend: t.openaiApi.spend,
        recommendedAction: "Keep pay-as-you-go",
        reason: "Your volume is appropriate for standard retail API pricing.",
        savings: 0,
        isOptimized: true
      });
    }
  }

  if (t.anthropicApi && t.anthropicApi.spend > 0) {
    if (totalApiSpend > 1000) {
      breakdown.push({
        tool: "anthropicApi",
        name: "Anthropic API",
        currentSpend: t.anthropicApi.spend,
        recommendedAction: "Purchase Volume Credits via AWS/GCP",
        reason: "At your volume, marketplace commitments are cheaper than retail.",
        savings: t.anthropicApi.spend * 0.15,
        isOptimized: false
      });
    } else {
      breakdown.push({
        tool: "anthropicApi",
        name: "Anthropic API",
        currentSpend: t.anthropicApi.spend,
        recommendedAction: "Keep pay-as-you-go",
        reason: "Your volume is appropriate for standard retail API pricing.",
        savings: 0,
        isOptimized: true
      });
    }
  }

  // Copilot, Gemini, Windsurf
  const generics = [
    { key: "copilot", name: "GitHub Copilot" },
    { key: "gemini", name: "Gemini" },
    { key: "windsurf", name: "Windsurf" }
  ];
  
  generics.forEach(g => {
    const td = t[g.key as keyof typeof t] as ToolData;
    if (td && td.spend > 0) {
      breakdown.push({
        tool: g.key,
        name: g.name,
        currentSpend: td.spend,
        recommendedAction: "Keep current plan",
        reason: `Your ${g.name} configuration is optimal.`,
        savings: 0,
        isOptimized: true
      });
    }
  });

  return breakdown;
}

export function calculateAudit(input: AuditInput): AuditResult {
  const t = input.tools;
  
  const standardSeatCost = 
    (t.cursor?.spend || 0) + 
    (t.copilot?.spend || 0) + 
    (t.claude?.spend || 0) + 
    (t.chatgpt?.spend || 0) + 
    (t.gemini?.spend || 0) + 
    (t.windsurf?.spend || 0);

  const standardApiCost = 
    (t.anthropicApi?.spend || 0) + 
    (t.openaiApi?.spend || 0);
  
  const standardMonthlyTotal = standardSeatCost + standardApiCost;
  
  const toolBreakdown = generateBreakdown(input);
  const toolSpecificSavings = toolBreakdown.reduce((acc, curr) => acc + (curr.savings || 0), 0);
  
  // Base savings calculated via Credex generic discount
  const credexSeatCost = standardSeatCost * (1 - CREDEX_SEAT_DISCOUNT);
  const credexApiCost = standardApiCost * (1 - CREDEX_API_DISCOUNT);
  const credexMonthlyTotal = credexSeatCost + credexApiCost;
  const baseMonthlySavings = standardMonthlyTotal - credexMonthlyTotal;
  
  // Total savings
  const monthlySavings = toolSpecificSavings > 0 ? toolSpecificSavings + ((standardMonthlyTotal - toolSpecificSavings) * 0.15) : baseMonthlySavings;
  const finalCredexTotal = standardMonthlyTotal - monthlySavings;

  const annualSavings = monthlySavings * 12;
  
  return {
    standardMonthlyTotal: Math.round(standardMonthlyTotal * 100) / 100,
    credexMonthlyTotal: Math.round(finalCredexTotal * 100) / 100,
    monthlySavings: Math.round(monthlySavings * 100) / 100,
    annualSavings: Math.round(annualSavings * 100) / 100,
    toolBreakdown
  };
}
