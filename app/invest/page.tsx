import { investmentOptions } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Shield, ExternalLink } from "lucide-react";

const platforms = [
  { name:"Fidelity", url:"https://fidelity.com", note:"$0 commission · No minimums · Best for beginners", bonus:"$100 cash for $50 deposit (new accounts)" },
  { name:"Charles Schwab", url:"https://schwab.com", note:"$0 commission · 24/7 support · Great research tools", bonus:"Up to $500 for qualifying deposits" },
  { name:"Marcus by Goldman Sachs", url:"https://marcus.com", note:"5.0% APY savings · FDIC insured · No fees", bonus:"Rate guaranteed for 90 days" },
  { name:"TreasuryDirect.gov", url:"https://treasurydirect.gov", note:"Buy US Treasuries directly · No fees at all", bonus:"Backed by the US government" },
];

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">How to invest for your goal</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Matched to your timeline. No broker account required to browse — we'll show you exactly where and how to get started.</p>
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-2 rounded-full mt-4">
            <Shield className="w-3.5 h-3.5" /> We earn a small referral fee from partners when you open an account. This doesn't change your rates.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {investmentOptions.map((inv) => (
            <div key={inv.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{inv.emoji}</div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${inv.risk === "None" ? "bg-brand-100 text-brand-700" : inv.risk === "Very Low" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                      {inv.risk} risk
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{inv.name}</h3>
                <p className="text-2xl font-bold text-brand-600 mb-1">~{inv.avgReturn}% <span className="text-sm font-normal text-slate-400">avg annual return</span></p>
                <p className="text-xs text-slate-400 mb-3">Best for: {inv.bestFor} · Timeframe: {inv.timeframe}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{inv.description}</p>
                <div className="bg-slate-50 rounded-xl px-3 py-2 text-xs text-slate-500 border border-slate-100">
                  Platform: {inv.platform}
                </div>
              </div>
              <div className="border-t border-slate-100 px-6 py-3 bg-brand-50 flex items-center justify-between">
                <p className="text-xs text-brand-600">{inv.referralNote}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recommended platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow group flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1">{p.name}</h3>
                  <p className="text-xs text-slate-500 mb-2">{p.note}</p>
                  <span className="inline-block bg-brand-50 text-brand-700 text-xs font-semibold px-2 py-1 rounded-lg">{p.bonus}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-brand-400 transition-colors mt-1 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Not sure which is right for you?</h2>
          <p className="text-slate-400 mb-6">Take our 2-minute goal quiz and we'll recommend the exact investment strategy for your timeline and budget.</p>
          <Link href="/goal" className="inline-flex items-center gap-2 bg-brand-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-400 transition-colors">
            Take the goal quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-slate-400 text-center mt-8 leading-relaxed">
          Past returns are not indicative of future results. This page is for educational purposes only and is not financial advice. Always consult a qualified financial advisor before investing.
        </p>
      </div>
    </div>
  );
}
