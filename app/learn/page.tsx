import { investmentTopics } from "@/lib/data";
import Link from "next/link";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Investment Education</h1>
          <p className="text-slate-500 text-lg">Plain-language guides to every investment type. Start anywhere.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentTopics.map(t => (
            <Link key={t.id} href={`/learn/${t.id}`} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow group">
              <div className="text-3xl mb-3">{t.emoji}</div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.riskLevel==="None"?"bg-brand-100 text-brand-700":t.riskLevel.includes("Low")?"bg-blue-100 text-blue-700":"bg-amber-100 text-amber-700"}`}>{t.riskLevel} risk</span>
              <h3 className="font-bold text-slate-900 text-lg mt-3 mb-1 group-hover:text-brand-600 transition-colors">{t.title}</h3>
              <p className="text-slate-500 text-sm">{t.tagline}</p>
              <p className="text-xs text-slate-400 mt-3">{t.readTime} read</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
