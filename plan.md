The AI Spend Audit Implementation Plan
Build "The AI Spend Audit" tool for the Credex 2026 Internship Assignment. A high-polish, lead-gen application designed to help startups calculate and save money on AI tools like Cursor, Claude, and OpenAI via Credex discounts.

Decisions Made
Database: Supabase
AI Provider: Anthropic API (Claude 3.5 Sonnet)
Aesthetic: Light-mode enterprise
Data: Inventing realistic mock data for USER_INTERVIEWS.md and METRICS.md
3-Day Execution Plan
Day 1: Setup & Frontend Foundation
Initialize Next.js app with Tailwind CSS and shadcn/ui.
Apply Light-mode enterprise aesthetic.
Generate root directory documents.
Build the landing page and multi-step input form.
Day 2: Core Engine & Data Layer
Build the mathematical engine computing savings from PRICING_DATA.md.
Wire up Supabase for saving leads and generating unique result IDs.
Develop the /results/[id] dynamic route and unique OpenGraph metadata (Viral Loop).
Day 3: AI Integration & Final Polish
Integrate Anthropic API for generating personalized ~100-word financial summaries.
Generate realistic mock data for USER_INTERVIEWS.md and METRICS.md.
Enforce commit conventions and finalize documentation (GTM.md, REFLECTION.md, etc.).
Verification Plan
Automated Tests
Build Jest/Vitest tests for the core financial engine.
Manual Verification
Local end-to-end form completion (DB storage, results redirect, Anthropic API generation, Meta tag validation).
