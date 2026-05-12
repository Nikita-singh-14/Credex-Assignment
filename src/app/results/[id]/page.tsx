import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ data?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  const ogUrl = new URL(`${baseUrl}/api/og`);
  if (data) {
    ogUrl.searchParams.set("data", data);
  } else {
    ogUrl.searchParams.set("id", id);
  }
  
  return {
    title: `AI Spend Audit Result`,
    openGraph: {
      title: "I just slashed my startup's AI spend by 20% with Credex.",
      description: "See how much you can save on Cursor, OpenAI, and Claude.",
      images: [{ url: ogUrl.toString() }],
    },
    twitter: {
      card: "summary_large_image",
      title: "I just slashed my startup's AI spend by 20% with Credex.",
      images: [{ url: ogUrl.toString() }],
    }
  }
}

export default async function ResultsPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { data } = await searchParams;
  
  let auditData = null;
  
  if (data) {
    // Decoding generic mocked data param
    auditData = JSON.parse(Buffer.from(data, 'base64').toString());
  } else {
    // In production with DB, we'd fetch via UUID from Supabase:
    // const { data } = await supabase.from('audits').select().eq('id', id).single()
    // auditData = data;
  }
  
  if (!auditData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
         <p className="text-xl font-medium text-slate-500">Audit session not found or DB disconnected.</p>
      </div>
    );
  }
  
  const { input, results } = auditData;
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans selection:bg-blue-100">
      <main className="max-w-3xl w-full py-12">
      
         {/* Navigation */}
         <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Start New Audit
         </Link>

         <Card className="shadow-2xl shadow-blue-900/5 border-slate-200">
           <CardHeader className="text-center bg-emerald-50/50 border-b border-emerald-100/50 rounded-t-xl py-12">
             <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
             </div>
             <CardTitle className="text-4xl text-emerald-950 mb-3 tracking-tight">Audit Complete</CardTitle>
             <CardDescription className="text-lg text-emerald-700 font-medium">Here is your tailored AI Spend Analysis</CardDescription>
           </CardHeader>
           <CardContent className="p-8 sm:p-12 space-y-10">
             
             {/* The Metric Flex Layout */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <p className="text-slate-500 font-semibold mb-3 tracking-wide text-sm uppercase">Standard Monthly Spend</p>
                  <p className="text-5xl font-bold text-slate-800">${results.standardMonthlyTotal}</p>
               </div>
               <div className="p-8 bg-blue-50 border border-blue-200 rounded-2xl text-center shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-blue-500"></div>
                  <p className="text-blue-600 font-semibold mb-3 tracking-wide text-sm uppercase">Credex Monthly Spend</p>
                  <p className="text-5xl font-extrabold text-blue-950">${results.credexMonthlyTotal}</p>
               </div>
             </div>
             
             {/* Savings Summary */}
             <div className="text-center py-4">
                <p className="text-2xl text-slate-700 font-medium">You are currently overpaying by <span className="font-bold text-slate-900">${results.monthlySavings}/month</span>.</p>
                <div className="mt-4 inline-block px-6 py-3 bg-emerald-50 rounded-full border border-emerald-100">
                  <p className="text-xl font-medium text-emerald-800">That's <span className="font-extrabold text-emerald-600">${results.annualSavings} in annual savings</span>.</p>
                </div>
             </div>
             
             {/* AI Summary Placeholder (To be replaced in Day 3) */}
             <div className="p-8 bg-slate-900 shadow-xl shadow-slate-900/10 text-slate-100 rounded-2xl text-lg italic leading-relaxed border-l-4 border-l-emerald-400 relative overflow-hidden">
               <div className="absolute right-[-10%] top-[-20%] text-slate-800 opacity-20">
                 <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
               </div>
               <div className="relative z-10">
                 {results.aiSummary ? (
                   <>"{results.aiSummary}"</>
                 ) : (
                   <>"By shifting your team's tools to Credex's unified billing, you instantly reclaim <span className="text-emerald-400 font-bold">${results.annualSavings}</span> in runway. In today's market, that capital is equivalent to covering standard marketing expenses or hiring a contractor. Stop paying the startup AI tax."</>
                 )} 
                 <br/><span className="text-sm text-slate-400 mt-6 flex items-center font-sans not-italic font-semibold tracking-wide uppercase"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg> AI Financial Analysis</span>
               </div>
             </div>
             
             {/* Call to Actions */}
             <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
               <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-6 shadow-sm">
                 Claim Discount with Credex
               </Button>
               <Button size="lg" variant="outline" className="flex-1 bg-white text-slate-800 text-lg py-6 font-semibold shadow-sm hover:bg-slate-50 border-slate-200">
                 <svg className="w-5 h-5 mr-3 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                 Share My Audit on X
               </Button>
             </div>
           </CardContent>
         </Card>
         <footer className="mt-8 text-center text-slate-400 text-sm font-medium">
          Powered by Credex
         </footer>
      </main>
    </div>
  )
}
