import { AuditWizard } from "@/components/AuditWizard";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 selection:bg-blue-100 font-sans">
      <main className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12">
        {/* Hero Section */}
        <div className="space-y-8 text-left">
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/50 text-blue-700 text-sm font-semibold tracking-wide uppercase shadow-sm">
            Credex 2026 Internship Assignment
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Stop paying <span className="underline decoration-blue-200 decoration-8 underline-offset-4">retail</span><br />
            for your AI Stack.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
            Join 1,000+ startups saving 20% on Cursor, OpenAI, and Claude with Credex's unified billing. Find out exactly how much you're overpaying in 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 text-sm text-slate-600 font-medium pb-4 border-b border-slate-100">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg> 
              No credit card required
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg> 
              Instant savings calculated
            </span>
          </div>
          <div className="pt-2 flex items-center space-x-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">AB</div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">CD</div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">EF</div>
            </div>
            <p className="text-sm text-slate-500 font-medium">Loved by top founders.</p>
          </div>
        </div>

        {/* Audit Form Section */}
        <div className="w-full order-first lg:order-last">
          <AuditWizard />
        </div>
      </main>
      <footer className="mt-auto py-8 text-slate-400 text-sm font-medium">
        (c) 2026 Credex Internship Project.
      </footer>
    </div>
  );
}
