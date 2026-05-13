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
    let aiSummary = "";
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 150,
          system: "You are an expert AI financial advisor helping startup founders optimize their tool spend.",
          messages: [
            {
              role: "user",
              content: `The founder is currently spending $${results.standardMonthlyTotal}/month on AI tools (Cursor, ChatGPT, Claude, OpenAI/Anthropic APIs). By switching to Credex's unified billing, they will save $${results.monthlySavings}/month, which equals $${results.annualSavings}/year. Write a punchy, personalized ~50-word financial summary highlighting the strategic value of this specific annual savings (e.g., what they can buy or hire with it). Be direct, professional, but slightly provocative about the "startup AI tax". Do not use quotes around your response.`
            }
          ]
        });
        
        if (response.content && response.content[0] && response.content[0].type === 'text') {
           aiSummary = response.content[0].text;
        }
      } catch (err) {
        console.error("Anthropic API error:", err);
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
