import { NextRequest, NextResponse } from "next/server";
import { calculateAudit } from "@/lib/audit-engine";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import Anthropic from "@anthropic-ai/sdk";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "mock-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const payloadStr = formData.get("payload") as string;
    
    if (!payloadStr) {
      return NextResponse.json({ error: "Missing payload data" }, { status: 400 });
    }

    const input = JSON.parse(payloadStr);
    const email = input.email || "";
    
    // Run the engine calculation
    let results: any = calculateAudit(input);
    
    // Generate AI Summary
    const inefficiencies = results.toolBreakdown
      .filter((t: any) => !t.isOptimized)
      .map((t: any) => `- ${t.name}: ${t.reason}`)
      .join("\n");
      
    const aiPrompt = `You are analyzing an AI spend audit for a startup founder.

Their current standard monthly spend is $${results.standardMonthlyTotal}.
By switching to Credex's unified billing and optimizing their stack, they will save $${results.monthlySavings} per month (which is $${results.annualSavings} per year).

Here is the breakdown of their inefficiencies:
${inefficiencies || "None. Their stack is already highly optimized."}

Write a ~100-word personalized financial summary. 
- Do NOT just list the numbers back to them. 
- Highlight the strategic value of this specific annual savings (e.g., what they can buy, who they can hire, or how it extends their runway).
- Be direct, professional, but slightly provocative about the "startup AI tax" and how optimizing their stack is a high-leverage move.
- Reference their specific inefficiencies (e.g., if they are paying retail for APIs or over-provisioned on seats) to make it feel highly tailored.
- Do not use quotes around your response.`;

    let aiSummary = "";
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 250,
          system: "You are an expert AI financial advisor helping startup founders optimize their tool spend.",
          messages: [{ role: "user", content: aiPrompt }]
        });
        
        if (response.content && response.content[0] && response.content[0].type === 'text') {
           aiSummary = response.content[0].text;
        }
      } catch (err) {
        console.error("Anthropic API error:", err);
      }
    }
    
    // Graceful Fallback for API failure or missing key
    if (!aiSummary) {
      if (results.monthlySavings < 100) {
        aiSummary = `Your AI stack is remarkably efficient, but the ecosystem moves fast. Stay sharp and let us monitor the market for new enterprise discounts and purpose-built alternatives so your runway stays protected.`;
      } else {
        aiSummary = `You are paying a massive "startup AI tax". By failing to consolidate your billing and optimize your seat counts, you are burning $${results.annualSavings} annually. That's capital that should be extending your runway or funding growth, not subsidizing SaaS vendors. Stop leaking cash and shift to unified billing.`;
      }
    }
    
    if (aiSummary) {
      results.aiSummary = aiSummary;
    }
    
    // Generate unique ID for Viral Loop
    const auditId = crypto.randomUUID();
    
    // Attempt Database Persistence
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await supabase.from("audits").insert({
        id: auditId,
        email,
        input_data: input,
        results: results,
        created_at: new Date().toISOString()
      });
    }
    
    const url = req.nextUrl.clone();
    url.pathname = `/results/${auditId}`;
    
    // For MVP testing without DB credentials, inject via param so UI still works locally
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
       const payload = Buffer.from(JSON.stringify({ input, results })).toString('base64');
       url.searchParams.set("data", payload);
    }

    return NextResponse.redirect(url, { status: 303 });
  } catch (error) {
    console.error("Audit processing error:", error);
    return NextResponse.json({ error: "Failed to process audit" }, { status: 500 });
  }
}
