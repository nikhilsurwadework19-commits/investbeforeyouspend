import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
const plans = [
  { name:"Free", price:"$0", period:"forever", highlight:false, features:["Goal quiz & savings plan","5 education topics","20 AI chat messages/month","3 blog articles","Dealer marketplace access"] },
  { name:"Premium", price:"$9", period:"/month", highlight:true, features:["Everything in Free","Unlimited AI chat","Full education library","All blog articles","Priority dealer matching","Personalized dashboard","Cancel anytime"] },
];
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Simple pricing</h1>
        <p className="text-slate-500 text-lg">Start free. The goal quiz and dealer marketplace are always free.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {plans.map(p => (
          <div key={p.name} className={`bg-white rounded-2xl border-2 p-8 ${p.highlight?"border-brand-500 shadow-lg shadow-brand-100":"border-slate-200"}`}>
            {p.highlight && <div className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">Most Popular</div>}
            <h2 className="text-2xl font-bold text-slate-900">{p.name}</h2>
            <p className="text-4xl font-bold text-slate-900 mt-2">{p.price}<span className="text-base font-normal text-slate-400">{p.period}</span></p>
            <ul className="space-y-3 my-6">
              {p.features.map(f => <li key={f} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0"/>{f}</li>)}
            </ul>
            <Link href="/auth?mode=signup" className={`block text-center font-bold py-3 rounded-xl transition-colors ${p.highlight?"bg-brand-600 text-white hover:bg-brand-700":"border border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
              Get started {p.highlight && <ArrowRight className="inline w-4 h-4 ml-1"/>}
            </Link>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-slate-400 mt-8">We also earn referral fees from investment platforms and dealer partnerships — transparent and disclosed.</p>
    </div>
  );
}
