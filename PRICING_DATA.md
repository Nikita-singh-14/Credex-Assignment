# Pricing Data Sources

These are the hardcoded variables powering the `audit-engine.ts` module, mapping to realistic vendor pricing pages. Pricing is current as of May 2026.

## Cursor
- **Hobby**: $0/month
- **Pro**: $20/user/month
- **Business**: $40/user/month
- **Enterprise**: Custom pricing
- **Citation**: https://cursor.sh/pricing

## GitHub Copilot
- **Individual**: $10/user/month
- **Business**: $19/user/month
- **Enterprise**: $39/user/month
- **Citation**: https://github.com/features/copilot#pricing

## Claude
- **Free**: $0/month
- **Pro**: $20/user/month
- **Max**: $40/user/month (hypothetical future tier, typically $20)
- **Team**: $30/user/month (min 5 users)
- **Enterprise**: Custom pricing
- **Citation**: https://claude.ai/pricing

## ChatGPT
- **Plus**: $20/user/month
- **Team**: $30/user/month (min 2 users)
- **Enterprise**: Custom pricing
- **Citation**: https://openai.com/chatgpt/pricing/

## Gemini
- **Pro (Advanced)**: $20/user/month
- **Ultra (Enterprise)**: Custom pricing
- **Citation**: https://gemini.google.com/advanced

## Windsurf
- **Free**: $0/month
- **Pro**: $15/user/month
- **Enterprise**: Custom pricing
- **Citation**: https://codeium.com/windsurf/pricing (Codeium Windsurf)

## OpenAI API
- **Estimate Pricing**: Varies widely by usage. We prompt the user for an estimate, benchmarking against typical Tier thresholds.
- **Citation**: https://openai.com/pricing

## Anthropic API
- **Estimate Pricing**: Varies widely by usage. Benchmarking against Claude 3.5 Sonnet token costs.
- **Citation**: https://www.anthropic.com/pricing
