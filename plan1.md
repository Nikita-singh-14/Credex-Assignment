AI Spend Audit - Implementation Plan (Days 2 & 3)
The project has successfully completed the Day 1 requirements (Setup, Frontend Foundation, UI/UX, Light-mode enterprise aesthetic) and parts of Day 2 (Audit Engine logic and Supabase stub).

To fully complete the assignment "day by day", we will execute the remaining requirements for Day 2 and Day 3.

User Review Required
IMPORTANT

Anthropic API Key: Day 3 requires the Anthropic API to generate summaries. I will install the SDK and use process.env.ANTHROPIC_API_KEY. For local testing, you will need to add this key to a .env.local file (which I will create with a placeholder if it doesn't exist).

Database Stub: Since Supabase credentials are not provided in the environment, the app is currently using a clever base64 payload to pass data between the form and the results page. I will continue using this fallback so you can test the entire flow locally without setting up a real Supabase database.

Proposed Changes
Day 2: Viral Loop (OpenGraph Metadata)
To complete the Viral Loop requirement from Day 2, we need to generate dynamic preview images when users share their results on X/Twitter.

[NEW] src/app/api/og/route.tsx
Create an OpenGraph image generation endpoint using next/og (ImageResponse).
It will read the savings data (via id or the data base64 payload) and render a beautiful 1200x630 image showing the exact dollar amount the startup is saving.
[MODIFY] src/app/results/[id]/page.tsx
Update the generateMetadata function to correctly pass the base64 data payload to the new /api/og endpoint, ensuring the OG image can render without a database connection.
Day 3: AI Integration & Final Polish
We will integrate Claude (Anthropic API) to generate personalized financial summaries for the user's savings report.

[NEW] Dependency Installation
Install @anthropic-ai/sdk.
[MODIFY] src/app/api/audit/route.ts
Add logic to call the Anthropic API using claude-3-5-sonnet-20241022 (or the latest available).
The prompt will instruct Claude to act as a financial advisor and write a personalized ~100-word summary highlighting the strategic value of the calculated savings (e.g., "Saving $5,000 a year is equivalent to...").
Append the generated AI text to the payload sent to the results page.
[MODIFY] src/app/results/[id]/page.tsx
Replace the hardcoded AI summary placeholder with the dynamically generated aiSummary from the payload.
Polish any remaining UI glitches.
Verification Plan
Automated Tests
(If requested) Provide instructions to run tests, though manual verification is prioritized for this interactive UI.
Manual Verification
Open the local dev server.
Fill out the multi-step form with realistic inputs.
Submit the form, verify that the Anthropic API generates a dynamic summary (if a valid key is provided in .env.local), or handles a missing key gracefully.
Verify the redirect to /results/[id].
Check the og:image meta tag in the head of the results page to ensure the dynamic OG image URL is correctly formed and functional.