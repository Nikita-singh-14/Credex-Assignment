"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuditWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    cursor: 0,
    chatgpt: 0,
    claude: 0,
    openai: 0,
    anthropic: 0,
    email: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Card className="shadow-xl shadow-blue-500/5 border-slate-200">
      <CardHeader>
        <CardTitle className="text-3xl text-slate-900 tracking-tight">Run Free AI Spend Audit</CardTitle>
        <CardDescription className="text-base text-slate-500">Step {step} of 3</CardDescription>
        <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 min-h-[250px] flex flex-col justify-center">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">How many developer seats are you paying for?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label htmlFor="cursor" className="text-sm font-semibold text-slate-700">Cursor Pro</Label>
                <Input id="cursor" name="cursor" type="number" min="0" value={data.cursor} onChange={handleChange} className="text-lg bg-slate-50 focus-visible:bg-white" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="chatgpt" className="text-sm font-semibold text-slate-700">ChatGPT Plus</Label>
                <Input id="chatgpt" name="chatgpt" type="number" min="0" value={data.chatgpt} onChange={handleChange} className="text-lg bg-slate-50 focus-visible:bg-white" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="claude" className="text-sm font-semibold text-slate-700">Claude Pro</Label>
                <Input id="claude" name="claude" type="number" min="0" value={data.claude} onChange={handleChange} className="text-lg bg-slate-50 focus-visible:bg-white" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">What's your monthly API usage?</h3>
            <p className="text-sm text-slate-500 mb-6">Estimate your combined spend on OpenAI and Anthropic APIs.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="openai" className="text-sm font-semibold text-slate-700">OpenAI Monthly Spend ($)</Label>
                <Input id="openai" name="openai" type="number" min="0" value={data.openai} onChange={handleChange} className="text-lg bg-slate-50 focus-visible:bg-white" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="anthropic" className="text-sm font-semibold text-slate-700">Anthropic Monthly Spend ($)</Label>
                <Input id="anthropic" name="anthropic" type="number" min="0" value={data.anthropic} onChange={handleChange} className="text-lg bg-slate-50 focus-visible:bg-white" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">We've crunched the numbers.</h3>
            <p className="text-sm text-slate-500 mb-6">Enter your startup email to see your personalized savings report.</p>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Work Email</Label>
              <Input id="email" name="email" type="email" required placeholder="founder@startup.com" value={data.email} onChange={handleChange} className="text-lg py-6 bg-slate-50 focus-visible:bg-white" />
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-slate-50/80 border-t p-6 flex justify-between items-center rounded-b-xl border-slate-200">
        {step > 1 ? (
          <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100" onClick={() => setStep(step - 1)}>Back</Button>
        ) : (
          <div></div> // Spacer
        )}
        
        {step < 3 ? (
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm" onClick={() => setStep(step + 1)}>Continue</Button>
        ) : (
          <form action="/api/audit" method="POST" className="inline-block">
            <input type="hidden" name="cursor" value={data.cursor} />
            <input type="hidden" name="chatgpt" value={data.chatgpt} />
            <input type="hidden" name="claude" value={data.claude} />
            <input type="hidden" name="openai" value={data.openai} />
            <input type="hidden" name="anthropic" value={data.anthropic} />
            <input type="hidden" name="email" value={data.email} />
            <Button size="lg" type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">Show My Savings</Button>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}
