Results Page UI Redesign & Engine Polish Plan
This plan details the UI overhaul for the Results page to make it highly shareable, visually stunning, and honest based on the calculated savings. It also updates the Audit Engine to output specific per-tool breakdowns.

Proposed Changes
1. src/lib/audit-engine.ts
[MODIFY] src/lib/audit-engine.ts:
Update AuditResult to include a toolBreakdown array: { tool: string; currentSpend: number; recommendedAction: string; reason: string; savings: number; isOptimized: boolean }.
Add logic to evaluate each tool individually to populate the breakdown:
Determine exact savings amounts per tool based on the rules (e.g., switching from Team to Pro saves $10/user).
If a tool is perfectly configured, label it as "Optimal" with $0 savings.
Keep the overall calculation for Credex discounts but ensure the breakdown specifically addresses the user's manual configuration errors.
2. src/app/results/[id]/page.tsx
[MODIFY] src/app/results/[id]/page.tsx:
Hero Section: Complete redesign. Massive, clear typography highlighting Total Monthly Savings and Total Annual Savings. Use modern gradients and glassmorphism.
Dynamic Messaging based on Savings:
Savings > $500/mo: Show an aggressive, prominent Credex CTA ("You're leaving $X on the table. Capture it now with unified billing").
Savings < $100/mo: Show an honest hero ("You're spending well. Your stack is highly optimized."). Replace the heavy Credex pitch with a "Join Waitlist / Notify Me" form to capture the lead for future optimizations.
Per-Tool Breakdown Table/Grid:
Create a sleek, visual breakdown list below the hero.
Each row shows the Tool Logo/Name, Current Spend, Recommended Action, Reason (1 sentence), and specific Savings.
Highlight optimized tools with green checkmarks and unoptimized ones with warning colors.
Verification Plan
Build the app to ensure TS type safety.
Test multiple form submissions locally:
Case A: Highly unoptimized stack (>$500/mo savings). Verify aggressive CTA and heavy tool recommendations.
Case B: Highly optimized stack (<$100/mo savings). Verify the honest messaging and "Notify Me" lead capture.
Validate the aesthetic polish to ensure it feels premium and shareable.

