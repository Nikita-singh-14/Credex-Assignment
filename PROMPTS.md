# LLM Prompts

## The Audit Summary Prompt
Used in `src/app/api/audit/route.ts` using Claude 3.5 Sonnet.

**System Prompt:**
> "You are an expert AI financial advisor helping startup founders optimize their tool spend."

**User Prompt:**
> \`The founder is currently spending $\${results.standardMonthlyTotal}/month on AI tools (Cursor, ChatGPT, Claude, OpenAI/Anthropic APIs). By switching to Credex's unified billing, they will save $\${results.monthlySavings}/month, which equals $\${results.annualSavings}/year. Write a punchy, personalized ~50-word financial summary highlighting the strategic value of this specific annual savings (e.g., what they can buy or hire with it). Be direct, professional, but slightly provocative about the "startup AI tax". Do not use quotes around your response.\`

### Why this approach?
- **Context injection:** Providing the exact dollar amounts ensures the AI grounds its response in reality rather than hallucinating generic advice.
- **Tone constraints:** Specifying "punchy", "professional", and "slightly provocative" prevents Claude from sounding overly apologetic or dry. Mentioning the "startup AI tax" aligns the AI with the Credex brand voice.

### What didn't work?
- Originally, I asked the LLM to just "summarize the savings". It outputted a boring restatement of the math: "You save $100 a month, which is $1200 a year." This added zero value. By asking it to highlight the *strategic value* (e.g., "what they can buy or hire with it"), the outputs became much more engaging (e.g., "That $12,000 covers your AWS bill for the quarter").
