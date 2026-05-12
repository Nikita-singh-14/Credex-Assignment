2–3 sentence summary of what you built and who it’s for 
 3+ screenshots or a 30-second screen recording (YouTube/Loom link) 
 Quick start: install, run locally, deploy 
 A “Decisions” section listing 5 trade-offs you made and why 
 Link to the deployed URL 

# The AI Spend Audit Tool

A high-polish, lead-gen web application built for the Credex 2026 Internship Assignment. The tool helps startups calculate how much money they can save on popular AI tools (Cursor, Claude, OpenAI) by leveraging Credex discounts.

## Features
- **Deterministic Math Engine:** Calculates savings instantly based on standard retail pricing vs. Credex discounts.
- **High-Converting UX/UI:** Built with Next.js, Tailwind CSS, and shadcn/ui featuring a light-mode enterprise aesthetic.
- **The Viral Loop:** Generates dynamic Results pages with unique IDs. Includes server-side generated OpenGraph meta tags for rich Twitter/X sharing.
- **AI Personalization Layer:** Features a stream/generated ~100-word financial summary using the Anthropic API.
- **Lead Generation:** Prepares data for Supabase, logging both user inputs and captured emails for sales follow-up.

## Development Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Anthropic API

## Repository Structure
Please refer to `ARCHITECTURE.md` for system diagrams and data flow.
The `DEVLOG.md` tracks our exact 3-day execution plan.
- `PRICING_DATA.md`: Mathematical rules.
- `PROMPTS.md`: AI prompting logic.
- `USER_INTERVIEWS.md`: Target mock-user validation.
- `METRICS.md`: Mock analytics for viral verification.
