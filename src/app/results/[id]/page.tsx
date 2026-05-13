import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      title: "I just slashed my startup's AI spend with Credex.",
      description: "See how much you can save on your AI stack.",
      images: [{ url: ogUrl.toString() }],
    },
    twitter: {
      card: "summary_large_image",
      title: "I just slashed my startup's AI spend with Credex.",
      images: [{ url: ogUrl.toString() }],
    }
  }
}

export default async function ResultsPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { data } = await searchParams;
  
  let auditData = null;
  
  if (data) {
    auditData = JSON.parse(Buffer.from(data, 'base64').toString());
  }
  
  if (!auditData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
         <p className="text-xl font-medium text-slate-500">Audit session not found or DB disconnected.</p>
      </div>
    );
  }
  
  const { input, results } = auditData;
  const isOptimal = results.monthlySavings < 100;
  
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden selection:bg-emerald-500/30">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <main className="max-w-4xl w-full py-12 relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white mb-8 transition-colors group">
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Start New Audit
        </Link>

        {/* Dynamic Hero Section */}
        <div className="text-center mb-12 animate-in slide-in-from-bottom-8 duration-700 fade-in">
          {isOptimal ? (
             <div className="space-y-4">
               <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-2">
                 Stack Optimized
               </div>
               <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">You're spending well.</h1>
               <p className="text-xl text-slate-400 max-w-2xl mx-auto">Your stack is highly optimized. We couldn't find major inefficiencies, which is rare. Great job!</p>
               <div className="mt-8 flex justify-center gap-6 text-center">
                 <div>
                   <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Standard Spend</p>
                   <p className="text-3xl font-light text-slate-300">${results.standardMonthlyTotal}<span className="text-lg text-slate-500">/mo</span></p>
                 </div>
                 <div className="w-px bg-slate-800"></div>
                 <div>
                   <p className="text-emerald-500 text-sm font-semibold uppercase tracking-wider mb-1">Minor Savings</p>
                   <p className="text-3xl font-light text-emerald-400">${results.monthlySavings}<span className="text-lg text-emerald-500/50">/mo</span></p>
                 </div>
               </div>
             </div>
          ) : (
             <div className="space-y-6">
               <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                 Inefficiencies Detected
               </div>
               <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 tracking-tight leading-tight">
                 ${results.annualSavings.toLocaleString()} <span className="text-3xl md:text-4xl text-slate-300 font-medium tracking-normal">/ year</span>
               </h1>
               <p className="text-2xl text-slate-300 max-w-2xl mx-auto font-light">
                 You are leaving <strong className="text-white">${results.monthlySavings.toLocaleString()}/mo</strong> on the table.
               </p>
             </div>
          )}
        </div>

        {/* Per-Tool Breakdown UI */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-10 mb-8 shadow-2xl animate-in slide-in-from-bottom-12 duration-1000 fade-in delay-150">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <svg className="w-5 h-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            Stack Breakdown
          </h2>
          
          <div className="space-y-4">
            {results.toolBreakdown?.map((tool: any, idx: number) => (
              <div key={idx} className={`relative overflow-hidden rounded-2xl p-5 border ${tool.isOptimized ? 'bg-slate-800/30 border-slate-700/50' : 'bg-gradient-to-r from-amber-500/5 to-transparent border-amber-500/20'}`}>
                {/* Visual Indicator Line */}
                {!tool.isOptimized && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>}
                {tool.isOptimized && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50"></div>}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ml-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-slate-200">{tool.name}</h3>
                      <span className="text-sm font-medium text-slate-500">${tool.currentSpend}/mo</span>
                    </div>
                    <p className={`text-sm ${tool.isOptimized ? 'text-slate-400' : 'text-amber-200/80 font-medium'}`}>{tool.recommendedAction}</p>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{tool.reason}</p>
                  </div>
                  
                  <div className="md:text-right shrink-0">
                    {tool.savings > 0 ? (
                      <div className="inline-flex flex-col items-end">
                        <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">Potential Savings</span>
                        <span className="text-2xl font-bold text-amber-400">+${Math.round(tool.savings)}<span className="text-sm text-amber-500/50">/mo</span></span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        Optimized
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic CTA Section */}
        <div className="animate-in slide-in-from-bottom-16 duration-1000 fade-in delay-300">
          {isOptimal ? (
            <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700 shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-white">Stay Ahead of Pricing Changes</CardTitle>
                <CardDescription className="text-slate-400 text-base">We'll notify you when new AI tools or pricing changes create optimization opportunities for your specific stack.</CardDescription>
              </CardHeader>
              <CardContent className="max-w-md mx-auto w-full">
                <form className="flex gap-2" action="#">
                  <Input type="email" placeholder="founder@startup.com" className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500" required />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20">Notify Me</Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl border border-emerald-500/30 shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none"></div>
              <CardContent className="p-8 md:p-12 text-center relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">Capture these savings today.</h3>
                <p className="text-lg text-emerald-100/70 mb-8 max-w-xl mx-auto">
                  By switching to Credex's unified billing, you automatically get wholesale rates and enforce team minimums without lifting a finger. Stop paying retail.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-lg px-8 py-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                    Get Unified Billing
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200 text-lg px-8 py-6 transition-all">
                    Share Audit on X
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

      </main>
    </div>
  )
}
