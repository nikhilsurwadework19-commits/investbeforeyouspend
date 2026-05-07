"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { goalOptions, calculateSavingsPlan } from "@/lib/data";
import { ArrowRight, ArrowLeft, CheckCircle, TrendingUp } from "lucide-react";

const budgetOptions = ["Under $5,000","$5,000 – $15,000","$15,000 – $30,000","$30,000 – $100,000","$100,000 – $300,000","Over $300,000"];
const timelineOptions = ["Within 6 months","6 months – 1 year","1 – 2 years","2 – 3 years","3 – 5 years","5+ years"];
const savingsOptions = ["Under $100/month","$100 – $300/month","$300 – $600/month","$600 – $1,000/month","$1,000 – $2,500/month","$2,500+/month"];
const incomeOptions = ["Under $2,000/month","$2,000 – $4,000","$4,000 – $7,000","$7,000 – $12,000","$12,000+"];

const budgetMidpoints: Record<string, number> = {
  "Under $5,000":2500,"$5,000 – $15,000":10000,"$15,000 – $30,000":22500,"$30,000 – $100,000":65000,
  "$100,000 – $300,000":200000,"Over $300,000":400000
};
const savingsMidpoints: Record<string, number> = {
  "Under $100/month":75,"$100 – $300/month":200,"$300 – $600/month":450,"$600 – $1,000/month":800,
  "$1,000 – $2,500/month":1750,"$2,500+/month":3000
};
const timelineYears: Record<string, number> = {
  "Within 6 months":0.5,"6 months – 1 year":1,"1 – 2 years":1.5,"2 – 3 years":2.5,"3 – 5 years":4,"5+ years":7
};

interface Answers { goal?:string; budget?:string; timeline?:string; savings?:string; income?:string; }

function getInvestRec(timeline:string) {
  const yr = timelineYears[timeline] || 2;
  if (yr <= 1) return { name:"High-Yield Savings Account", rate:4.8, reason:"Under 1 year — keep it safe and liquid" };
  if (yr <= 3) return { name:"Mix: Bonds (60%) + HYSA (40%)", rate:4.6, reason:"1-3 years — stable growth, low risk" };
  if (yr <= 5) return { name:"Mix: ETFs (40%) + Bonds (60%)", rate:6.5, reason:"3-5 years — moderate growth" };
  return { name:"Broad Index ETFs (S&P 500 / VTI)", rate:9.5, reason:"5+ years — maximize growth with time" };
}

export default function GoalPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { id:"goal", title:"What are you saving for?", subtitle:"Pick the best match for your goal", type:"grid", options:goalOptions },
    { id:"budget", title:"How much does it cost?", subtitle:"Approximate total amount needed", type:"list", options:budgetOptions },
    { id:"timeline", title:"When do you need the money?", subtitle:"Be realistic — longer timelines mean better returns", type:"list", options:timelineOptions },
    { id:"savings", title:"How much can you save per month?", subtitle:"This will power your personalized plan", type:"list", options:savingsOptions },
    { id:"income", title:"What is your monthly income?", subtitle:"Helps us calibrate what's realistic for you", type:"list", options:incomeOptions },
  ];

  const q = questions[step];
  const totalSteps = questions.length;

  function select(val: string) {
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    if (step < totalSteps - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setTimeout(() => setShowResult(true), 200);
    }
  }

  if (showResult) {
    const targetAmount = budgetMidpoints[answers.budget || ""] || 25000;
    const monthly = savingsMidpoints[answers.savings || ""] || 500;
    const rec = getInvestRec(answers.timeline || "2 – 3 years");
    const plan = calculateSavingsPlan(targetAmount, monthly, rec.rate);
    const goalObj = goalOptions.find(g => g.id === answers.goal || g.label === answers.goal);

    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Personalized Plan</h1>
            <p className="text-slate-500">Based on your goal: <strong>{goalObj?.label || answers.goal}</strong></p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6">
            <div className="bg-brand-600 px-6 py-5 text-white">
              <h2 className="font-bold text-xl mb-1">Goal Summary</h2>
              <p className="text-brand-100 text-sm">Target: <strong>${targetAmount.toLocaleString()}</strong> · Monthly savings: <strong>${monthly.toLocaleString()}</strong></p>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4 border-b border-slate-100">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">{plan.years > 0 ? `${plan.years}y` : ""}{plan.remainingMonths > 0 ? ` ${plan.remainingMonths}m` : plan.years === 0 ? `${plan.months}m` : ""}</p>
                <p className="text-xs text-slate-400 mt-1">Time to goal</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-600">${Math.round(plan.finalBalance - targetAmount).toLocaleString()}</p>
                <p className="text-xs text-slate-400 mt-1">Investment gains</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">{rec.rate}%</p>
                <p className="text-xs text-slate-400 mt-1">Est. annual return</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-slate-900 mb-3">Recommended Investment Strategy</h3>
              <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                <p className="font-bold text-brand-800">{rec.name}</p>
                <p className="text-sm text-brand-600 mt-1">{rec.reason}</p>
              </div>
              <p className="text-xs text-slate-400 mt-3">Returns are estimated averages. Past performance does not guarantee future results.</p>
            </div>
          </div>

          {goalObj?.dealers && (
            <div className="bg-purple-50 rounded-2xl border border-purple-100 p-6 mb-6">
              <h3 className="font-bold text-purple-900 mb-2">🤝 We can help you find the best {goalObj.label.toLowerCase()} deal</h3>
              <p className="text-sm text-purple-700 mb-4">When you're ready to buy, we connect you with vetted dealers who compete to give you the best price based on your saved profile.</p>
              <a href="/marketplace" className="inline-flex items-center gap-2 bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors">
                See dealer marketplace <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <a href="/invest" className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow text-center group">
              <TrendingUp className="w-6 h-6 text-brand-600 mx-auto mb-2" />
              <p className="font-semibold text-slate-900 text-sm group-hover:text-brand-600">Open investment account</p>
              <p className="text-xs text-slate-400 mt-1">Start growing your savings</p>
            </a>
            <a href="/learn" className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow text-center group">
              <span className="text-2xl block mb-2">📚</span>
              <p className="font-semibold text-slate-900 text-sm group-hover:text-brand-600">Learn about investing</p>
              <p className="text-xs text-slate-400 mt-1">Understand what to buy</p>
            </a>
          </div>

          <div className="text-center mt-6">
            <button onClick={() => { setShowResult(false); setStep(0); setAnswers({}); }} className="text-sm text-slate-400 hover:text-slate-600 underline">
              Start over with a different goal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Step {step + 1} of {totalSteps}</span>
            <span className="text-sm text-slate-400">{Math.round(((step) / totalSteps) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${((step) / totalSteps) * 100}%` }} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{q.title}</h1>
          <p className="text-slate-500">{q.subtitle}</p>
        </div>

        {q.type === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(q.options as typeof goalOptions).map((opt) => (
              <button key={opt.id} onClick={() => select(opt.id)}
                className={`bg-white border-2 rounded-2xl p-4 text-center hover:border-brand-400 hover:shadow-md transition-all group ${answers[q.id as keyof Answers] === opt.id ? "border-brand-500 bg-brand-50" : "border-slate-200"}`}>
                <div className="text-3xl mb-2">{opt.emoji}</div>
                <p className="text-xs font-semibold text-slate-700 group-hover:text-brand-700">{opt.label}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {(q.options as string[]).map((opt) => (
              <button key={opt} onClick={() => select(opt)}
                className={`w-full bg-white border-2 rounded-xl px-5 py-4 text-left font-medium hover:border-brand-400 hover:bg-brand-50 transition-all ${answers[q.id as keyof Answers] === opt ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-700"}`}>
                {opt}
              </button>
            ))}
          </div>
        )}

        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="mt-6 flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
      </div>
    </div>
  );
}
