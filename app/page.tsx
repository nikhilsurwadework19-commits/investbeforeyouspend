import Link from "next/link";
import { ArrowRight, Target, TrendingUp, Handshake, BookOpen, Shield } from "lucide-react";

const steps = [
  { num:"01", icon:"🎯", title:"Set your goal", desc:"Tell us what you want to buy — car, home, or vacation. Take our 2-minute quiz.", href:"/goal", color:"bg-brand-50 border-brand-100" },
  { num:"02", icon:"📈", title:"We build your plan", desc:"Get a personalized savings & investment plan tailored to your timeline and budget.", href:"/invest", color:"bg-blue-50 border-blue-100" },
  { num:"03", icon:"🤝", title:"Get the best deal", desc:"When you're ready, we connect you with vetted dealers and sellers competing for your business.", href:"/marketplace", color:"bg-purple-50 border-purple-100" },
];

const whyCards = [
  { emoji:"💸", title:"Stop impulse buying", desc:"Our goal quiz makes you pause, plan, and actually get the best deal instead of an impulse you regret." },
  { emoji:"📈", title:"Your money grows while you save", desc:"We guide you into investments that beat inflation — your savings work hard while you wait." },
  { emoji:"🤝", title:"Dealers compete for you", desc:"When it's time to buy, dealers see your savings profile and compete to give you the best price." },
];

const investments = [
  { name:"High-Yield Savings", ret:"~4.8% APY", risk:"None", best:"Under 1 year" },
  { name:"US Treasury Bonds", ret:"~4.5% APY", risk:"Very Low", best:"1-3 year goals" },
  { name:"S&P 500 ETF (VOO)", ret:"~10% avg/yr", risk:"Medium", best:"3-5+ years" },
  { name:"Real Estate ETF (VNQ)", ret:"~9% avg/yr", risk:"Medium", best:"Long-term wealth" },
];

const testimonials = [
  { name:"Sarah M.", role:"Bought a Tesla Model 3", text:"I saved $4,200 extra because the platform helped me time my purchase and negotiate better." },
  { name:"David K.", role:"First-time home buyer", text:"The savings plan was eye-opening. I grew my down payment fund with ETFs while I waited." },
  { name:"Priya R.", role:"Family vacation", text:"We used the investment plan 18 months and had $2,000 more than expected for our trip." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-white px-4 py-24 text-center border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-brand-100">
            <Shield className="w-3.5 h-3.5" /> Educational platform · Not financial advice
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Invest first.<br /><span className="text-brand-600">Then buy smarter.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Set a purchase goal, build a smart savings plan, grow your money while you wait, and get matched with the best deal when ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/goal" className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-brand-700 transition-colors text-lg shadow-lg shadow-brand-100">
              Set my goal — free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/learn" className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-medium px-8 py-4 rounded-2xl hover:bg-slate-50 transition-colors text-lg">
              <BookOpen className="w-5 h-5" /> Learn first
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">No credit card. No broker account needed to start.</p>
        </div>
      </section>

      <section className="px-4 py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How it works</h2>
            <p className="text-slate-500">Three steps from impulse to intentional purchase</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <Link key={s.num} href={s.href} className={`bg-white rounded-2xl p-8 border hover:shadow-md transition-shadow group ${s.color}`}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-xs font-bold text-slate-400 mb-1">{s.num}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your money grows while you save</h2>
              <p className="text-slate-500 mb-6 leading-relaxed">Instead of sitting in a 0.01% bank account, your savings go into investments matched to your timeline. We earn a small referral fee from investment partners — so the platform stays free for you.</p>
              <Link href="/invest" className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:underline">
                See all investment options <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {investments.map((inv) => (
                <div key={inv.name} className="flex items-center justify-between bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div><p className="font-semibold text-slate-900 text-sm">{inv.name}</p><p className="text-xs text-slate-400">{inv.best}</p></div>
                  <div className="text-right"><p className="font-bold text-brand-600 text-sm">{inv.ret}</p><p className="text-xs text-slate-400">Risk: {inv.risk}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why InvestBeforeYouSpend?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 border border-slate-100">
                <div className="text-3xl mb-4">{c.emoji}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{c.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Real goals, real results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="text-brand-500 text-sm mb-3">★★★★★</div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 bg-brand-600">
        <div className="max-w-2xl mx-auto text-center">
          <TrendingUp className="w-10 h-10 text-brand-200 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Ready to buy smarter?</h2>
          <p className="text-brand-100 mb-8 text-lg">Set your goal in 2 minutes. We'll build your personalized savings plan — free.</p>
          <Link href="/goal" className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-2xl hover:bg-brand-50 transition-colors shadow-lg text-lg">
            Set my goal now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="py-12 px-4 bg-slate-900 text-slate-400 text-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div>
              <div className="font-bold text-white mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-brand-400" /> InvestBeforeYouSpend</div>
              <p className="text-xs max-w-xs leading-relaxed">Educational platform. Not a broker or financial advisor. We earn referral fees from partners.</p>
            </div>
            <div className="flex gap-12">
              <div className="space-y-2">{[["/goal","Set a Goal"],["/invest","How to Invest"],["/learn","Learn"],["/chat","AI Chat"],["/blog","Blog"]].map(([h,l])=><a key={h} href={h} className="block hover:text-white transition-colors">{l}</a>)}</div>
              <div className="space-y-2">{[["/marketplace","Marketplace"],["/pricing","Pricing"],["/disclaimer","Disclaimer"],["/privacy","Privacy"],["/terms","Terms"]].map(([h,l])=><a key={h} href={h} className="block hover:text-white transition-colors">{l}</a>)}</div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-xs text-center text-slate-600">
            © 2025 InvestBeforeYouSpend. Educational purposes only. Not financial advice. Not affiliated with any brokerage.
          </div>
        </div>
      </footer>
    </div>
  );
}
