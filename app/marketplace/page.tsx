"use client";
import { useState } from "react";
import { goalOptions } from "@/lib/data";
import { ArrowRight, CheckCircle, Star, Phone, MapPin, Clock } from "lucide-react";

const carDealers = [
  { id:1, name:"AutoNation Toyota", location:"Chicago, IL", rating:4.8, reviews:342, specialty:"New & Certified Pre-owned", phone:"(312) 555-0124", avgSavings:"$1,200", responseTime:"< 2 hours" },
  { id:2, name:"CarMax", location:"Nationwide", rating:4.6, reviews:1820, specialty:"No-haggle pricing, all makes", phone:"1-800-CAR-MAX", avgSavings:"$800", responseTime:"Instant" },
  { id:3, name:"TrueCar Network", location:"Online + local", rating:4.7, reviews:956, specialty:"Price transparency, compete bids", phone:"Dealer contacts you", avgSavings:"$1,500", responseTime:"< 4 hours" },
];

const homeAgents = [
  { id:1, name:"Redfin Agents", location:"Major US cities", rating:4.8, reviews:2100, specialty:"Lower commission, tech-first", phone:"Online", avgSavings:"$7,000", responseTime:"Same day" },
  { id:2, name:"Keller Williams", location:"Nationwide", rating:4.7, reviews:3400, specialty:"Full service, negotiation experts", phone:"Local agent", avgSavings:"Varies", responseTime:"< 24 hours" },
];

export default function MarketplacePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const goalObj = goalOptions.find(g => g.id === selected);
  const dealers = selected === "car" ? carDealers : selected === "home" ? homeAgents : [];

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-20 text-center">
        <div className="max-w-lg mx-auto">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">You're on the list!</h1>
          <p className="text-slate-500 mb-6">We've shared your savings profile with our dealer network. Expect to hear back within 2-4 hours with competitive offers — no obligation to buy.</p>
          <div className="bg-white rounded-2xl border border-slate-100 p-6 text-left mb-6">
            <h3 className="font-bold text-slate-900 mb-3">What happens next:</h3>
            <div className="space-y-3">
              {["Dealers receive your goal profile (no personal financial data shared)","They compete to send you their best quote","You compare offers in your dashboard — no pressure","If you like an offer, we connect you directly"].map((s,i)=>(
                <div key={i} className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" /><p className="text-sm text-slate-600">{s}</p></div>
              ))}
            </div>
          </div>
          <a href="/dashboard" className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors">
            Go to my dashboard <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Dealer Marketplace</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Tell us what you're buying, and our vetted dealer network will compete to give you the best offer. No obligation.</p>
        </div>

        {!selected ? (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">What are you ready to buy?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {goalOptions.filter(g => g.dealers).map((opt) => (
                <button key={opt.id} onClick={() => setSelected(opt.id)}
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 text-center hover:border-brand-400 hover:shadow-md transition-all group">
                  <div className="text-3xl mb-2">{opt.emoji}</div>
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-brand-700">{opt.label}</p>
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-slate-400 mt-6">Marketplace currently supports cars and homes. More categories coming soon.</p>
          </div>
        ) : (
          <div>
            <button onClick={() => setSelected(null)} className="text-sm text-brand-600 hover:underline mb-6 flex items-center gap-1">
              ← Change goal type
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Vetted {goalObj?.label} Dealers</h2>
            <p className="text-slate-500 text-sm mb-6">These partners have agreed to our code of conduct: no high-pressure tactics, transparent pricing, and honest quotes only.</p>

            <div className="space-y-4 mb-10">
              {dealers.map((d) => (
                <div key={d.id} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{d.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /><span className="text-sm font-semibold text-slate-700">{d.rating}</span><span className="text-xs text-slate-400">({d.reviews.toLocaleString()} reviews)</span></div>
                      </div>
                    </div>
                    <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full">Avg save: {d.avgSavings}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500"><MapPin className="w-3.5 h-3.5" />{d.location}</div>
                    <div className="flex items-center gap-1.5 text-slate-500"><Clock className="w-3.5 h-3.5" />Response: {d.responseTime}</div>
                    <div className="flex items-center gap-1.5 text-slate-500"><Phone className="w-3.5 h-3.5" />{d.phone}</div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Specialty: {d.specialty}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Get competing quotes</h3>
              <p className="text-slate-500 text-sm mb-6">Share your savings goal with our network. Dealers will contact you with offers — no obligation, no spam, no high-pressure calls.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Your name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} placeholder="First name" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">Email address</label>
                  <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@email.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
                </div>
              </div>
              <button onClick={() => name && email && setSubmitted(true)}
                disabled={!name || !email}
                className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                Get my quotes — free <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-slate-400 text-center mt-3">We share only your goal amount and timeline with dealers — never your income, savings, or contact info without permission.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
