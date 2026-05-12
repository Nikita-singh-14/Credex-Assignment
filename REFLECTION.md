# Reflection

**1. The hardest bug you hit this week, and how you debugged it**
The hardest bug was getting the dynamic OpenGraph images (`/api/og`) to render properly. I initially used Tailwind CSS classes within the `ImageResponse` JSX, but the generated image was completely unstyled. My hypothesis was that `@vercel/og` (Satori) does not fully support the experimental Tailwind v4 compiler used in this project. I tested this by swapping a Tailwind class (`bg-blue-500`) for an inline style (`backgroundColor: '#3b82f6'`). It worked. I resolved the issue by rewriting the entire OG template using strict, supported inline CSS properties.

**2. A decision you reversed mid-week, and what made you reverse it**
I originally planned to wire up Supabase to save leads and generate UUIDs for the results page. However, mid-implementation, I realized that reviewers cloning the repo wouldn't have my Supabase credentials. This would break the core app flow locally. I reversed the decision, opting instead to serialize the audit data into a Base64 string passed via a URL parameter. This ensured the app remained 100% functional and testable offline.

**3. What you would build in week 2 if you had it**
I would build an interactive "ROI Slider" on the results page. Instead of just showing static savings, founders could drag a slider predicting their team growth over the next 12 months, dynamically updating the AI summary and savings projection via React Server Components to show the compounding value of Credex.

**4. How you used AI tools**
I used Claude 3.5 Sonnet to help brainstorm the financial summary prompt. I asked it: "If you were a startup founder, what tone would make you want to click a CTA?" I trusted it for copy ideation. I specifically *did not* trust it to write the mathematical logic for the `audit-engine.ts`, because LLMs often hallucinate basic arithmetic in code. I wrote the math engine manually and verified it with Vitest.

**5. Self-rating (1–10)**
- **Discipline (9/10):** I adhered strictly to the day-by-day plan and shipped the complete feature set without scope creep.
- **Code Quality (8/10):** The Next.js architecture is clean and componentized, though the MVP relies on a Base64 workaround.
- **Design Sense (9/10):** The app genuinely feels like a premium, enterprise-grade B2B tool with smooth animations and polished typography.
- **Problem Solving (8/10):** Finding the Satori inline-style workaround for the OG bug showed strong adaptability.
- **Entrepreneurial Thinking (9/10):** I prioritized the Viral Loop and LTV/CAC metrics, treating this as a real business rather than just a coding exercise.