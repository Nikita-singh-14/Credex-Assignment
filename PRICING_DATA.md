Your sources for every tool’s pricing. Every number in your audit engine must trace to a 
URL on the vendor’s official pricing page, with the date you pulled it. Format: 
## Cursor - Pro: $20/user/month — https://cursor.sh/pricing — verified YYYY-MM-DD - Business: $40/user/month — ... 


# Pricing Data

This document contains the hardcoded financial rules for the Audit Engine.

## Baseline Retail Pricing (Monthly)
- **Cursor Pro**: $20 per seat
- **ChatGPT Plus**: $20 per seat
- **Claude Pro**: $20 per seat
- **OpenAI API (Avg Startup Estimate)**: tiered by size, default $50
- **Anthropic API (Avg Startup Estimate)**: tiered by size, default $40

## Credex Discount Rules
Credex provides unified billing and startup-friendly negotiated discounts.
- **Seat-based Tools (Cursor, ChatGPT, Claude):** 20% flat discount.
- **API Usage:** 15% flat discount.

## The Formula
`Standard Total = (Seats * $20 * Num_Tools) + API_Spend`
`Credex Total = (Standard_Seat_Total * 0.8) + (API_Spend * 0.85)`
`Savings = Standard Total - Credex Total`
