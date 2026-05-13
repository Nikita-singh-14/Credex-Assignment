"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ToolData = { plan: string; spend: number; seats: number };
type ToolsConfig = {
  cursor: ToolData;
  copilot: ToolData;
  claude: ToolData;
  chatgpt: ToolData;
  anthropicApi: ToolData;
  openaiApi: ToolData;
  gemini: ToolData;
  windsurf: ToolData;
};

type FormDataState = {
  teamSize: number;
  useCase: string;
  tools: ToolsConfig;
  email: string;
};

const DEFAULT_DATA: FormDataState = {
  teamSize: 1,
  useCase: "coding",
  tools: {
    cursor: { plan: "Pro", spend: 0, seats: 0 },
    copilot: { plan: "Individual", spend: 0, seats: 0 },
    claude: { plan: "Pro", spend: 0, seats: 0 },
    chatgpt: { plan: "Plus", spend: 0, seats: 0 },
    anthropicApi: { plan: "API direct", spend: 0, seats: 0 },
    openaiApi: { plan: "API direct", spend: 0, seats: 0 },
    gemini: { plan: "Pro", spend: 0, seats: 0 },
    windsurf: { plan: "Pro", spend: 0, seats: 0 }
  },
  email: ""
};

const PLANS = {
  cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  copilot: ["Individual", "Business", "Enterprise"],
  claude: ["Free", "Pro", "Max", "Team", "Enterprise", "API direct"],
  chatgpt: ["Plus", "Team", "Enterprise", "API direct"],
  anthropicApi: ["API direct"],
  openaiApi: ["API direct"],
  gemini: ["Pro", "Ultra", "API"],
  windsurf: ["Free", "Pro", "Enterprise"] // assuming typical plans
};

const TOOL_LABELS: Record<keyof ToolsConfig, string> = {
  cursor: "Cursor",
  copilot: "GitHub Copilot",
  claude: "Claude",
  chatgpt: "ChatGPT",
  anthropicApi: "Anthropic API",
  openaiApi: "OpenAI API",
  gemini: "Gemini",
  windsurf: "Windsurf"
};

export function AuditWizard() {
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormDataState>(DEFAULT_DATA);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("auditWizardData");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data");
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("auditWizardData", JSON.stringify(data));
    }
  }, [data, isClient]);

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleToolChange = (toolKey: keyof ToolsConfig, field: keyof ToolData, value: string | number) => {
    setData({
      ...data,
      tools: {
        ...data.tools,
        [toolKey]: {
          ...data.tools[toolKey],
          [field]: value
        }
      }
    });
  };

  // Prevent hydration mismatch by returning empty div on server
  if (!isClient) return <div className="min-h-[400px]"></div>;

  return (
    <Card className="shadow-xl shadow-blue-500/5 border-slate-200">
      <CardHeader>
        <CardTitle className="text-3xl text-slate-900 tracking-tight">Run Free AI Spend Audit</CardTitle>
        <CardDescription className="text-base text-slate-500">Step {step} of 4</CardDescription>
        <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 min-h-[400px] flex flex-col justify-center">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Company Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="teamSize" className="text-sm font-semibold text-slate-700">Team Size</Label>
                <Input 
                  id="teamSize" 
                  name="teamSize" 
                  type="number" 
                  min="1" 
                  value={data.teamSize} 
                  onChange={handleBaseChange} 
                  className="text-lg bg-slate-50 focus-visible:bg-white" 
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="useCase" className="text-sm font-semibold text-slate-700">Primary Use Case</Label>
                <select 
                  id="useCase"
                  name="useCase"
                  value={data.useCase}
                  onChange={handleBaseChange}
                  className="flex h-11 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-lg ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  <option value="coding">Coding</option>
                  <option value="writing">Writing</option>
                  <option value="data">Data</option>
                  <option value="research">Research</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Subscriptions & Tools</h3>
            <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-4">
              {(['cursor', 'copilot', 'claude', 'chatgpt', 'gemini', 'windsurf'] as Array<keyof ToolsConfig>).map((tool) => (
                <div key={tool} className="p-4 rounded-lg border border-slate-100 bg-slate-50/50 space-y-4">
                  <h4 className="font-semibold text-slate-800">{TOOL_LABELS[tool]}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">Plan</Label>
                      <select 
                        value={data.tools[tool].plan}
                        onChange={(e) => handleToolChange(tool, 'plan', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                      >
                        {PLANS[tool].map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">Monthly Spend ($)</Label>
                      <Input 
                        type="number" min="0" 
                        value={data.tools[tool].spend} 
                        onChange={(e) => handleToolChange(tool, 'spend', parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">Seats</Label>
                      <Input 
                        type="number" min="0" 
                        value={data.tools[tool].seats} 
                        onChange={(e) => handleToolChange(tool, 'seats', parseInt(e.target.value) || 0)} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">API Usage</h3>
            <div className="space-y-8">
              {(['openaiApi', 'anthropicApi'] as Array<keyof ToolsConfig>).map((tool) => (
                <div key={tool} className="p-4 rounded-lg border border-slate-100 bg-slate-50/50 space-y-4">
                  <h4 className="font-semibold text-slate-800">{TOOL_LABELS[tool]}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">Plan</Label>
                      <select 
                        value={data.tools[tool].plan}
                        onChange={(e) => handleToolChange(tool, 'plan', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                      >
                        {PLANS[tool].map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">Monthly Spend ($)</Label>
                      <Input 
                        type="number" min="0" 
                        value={data.tools[tool].spend} 
                        onChange={(e) => handleToolChange(tool, 'spend', parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                    <div className="space-y-2 opacity-50 pointer-events-none">
                      <Label className="text-xs text-slate-500">Seats (N/A)</Label>
                      <Input type="number" value="0" readOnly />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">We've crunched the numbers.</h3>
            <p className="text-sm text-slate-500 mb-6">Enter your startup email to see your personalized savings report.</p>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Work Email</Label>
              <Input id="email" name="email" type="email" required placeholder="founder@startup.com" value={data.email} onChange={handleBaseChange} className="text-lg py-6 bg-slate-50 focus-visible:bg-white" />
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
        
        {step < 4 ? (
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm" onClick={() => setStep(step + 1)}>Continue</Button>
        ) : (
          <form action="/api/audit" method="POST" className="inline-block">
            <input type="hidden" name="payload" value={JSON.stringify(data)} />
            <Button size="lg" type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">Show My Savings</Button>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}
