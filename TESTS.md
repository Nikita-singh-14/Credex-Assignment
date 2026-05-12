# Automated Tests

I chose **Vitest** for the test runner because of its native support for TypeScript and ESM, making it significantly faster and easier to set up in a modern Next.js environment than Jest.

## Test Suite
**Filename:** `src/lib/audit-engine.test.ts`

### What it covers (5 tests):
1. **Zero Usage:** Verifies the engine correctly outputs $0 across all fields when inputs are zero.
2. **Seat Discount Logic:** Verifies that a flat 20% discount is applied precisely to seat-based subscriptions (Cursor, ChatGPT, Claude).
3. **API Discount Logic:** Verifies that a flat 15% discount is applied accurately to API consumption.
4. **Combined Discounts:** Tests a realistic heavy-usage scenario (15 total seats, $1500 API spend) to ensure both discount tiers stack properly and calculate accurate annual savings.
5. **Floating Point Safety:** Verifies that outputs are safely rounded to 2 decimal places to prevent JavaScript floating-point errors (e.g., 28.3305 becoming 28.33).

### How to run it:
```bash
npm test
```
*(This triggers `vitest run` under the hood).*