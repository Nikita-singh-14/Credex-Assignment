# Metrics

## 1. North Star Metric
**Total Annual Savings Identified ($)**
- *Why:* This metric perfectly aligns user value with business value. The higher this number, the stronger the "Aha!" moment for the founder, which directly correlates with their likelihood to convert and use Credex unified billing.

## 2. Input Metrics (Drivers)
1. **Audit Completion Rate (%)**: Percentage of landing page visitors who successfully finish the multi-step wizard.
2. **Lead Capture Rate (%)**: Percentage of completed audits that submit a valid email address.
3. **Viral Share Rate (%)**: Percentage of users who click the "Share on X" button on the results page.

## 3. What to Instrument First
The **Step-by-Step Funnel Drop-off** in the `AuditWizard` component. We must know exactly where users bounce (e.g., do they drop off at the API spend step because they don't know the numbers offhand?).

## 4. Pivot Trigger
If the **Lead Capture Rate** drops below **5%**, it indicates that the calculated savings are either not compelling enough (too low), or the AI summary is not persuasive. This would trigger a pivot in the UX—perhaps shifting the CTA from "Enter email to see results" to showing partial results upfront and asking for an email to "Claim the Discount".
