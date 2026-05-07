"use client";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Target, TrendingUp, BookOpen, MessageCircle, Handshake, ArrowRight } from "lucide-react";

const cards = [
  { href:"/goal", icon:<Target className="w-6 h-6"/>, title:"My goal", desc:"Set or update your savings goal", color:"bg-brand-50 text-brand-600" },
  { href:"/invest", icon:<TrendingUp className="w-6 h-6"/>, title:"How to invest", desc:"Investment options for your timeline", color:"bg-blue-50 text-blue-600" },
  { href:"/marketplace", icon:<Handshake className="w-6 h-6"/>, title:"Dealer marketplace", desc:"Get quotes from vetted sellers", color:"bg-purple-50 text-purple-600" },
  { href:"/learn", icon:<BookOpen className="w-6 h-6"/>, title:"Learn", desc:"Investment education library", color:"bg-amber-50 text-amber-600" },
  { href:"/chat", icon:<MessageCircle className="w-6 h-6"/>, title:"AI Chat", desc:"Ask me any money question", color:"bg-emerald-50 text-emerald-600" },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !user) router.push("/auth"); }, [user, loading, router]);
  if (loading || !user) return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>;
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back 👋</h1>
          <p className="text-slate-500 mt-1">{user.email}</p>
        </div>
        <div className="bg-brand-600 rounded-2xl p-6 text-white mb-8">
          <p className="text-brand-100 text-sm mb-1">Quick action</p>
          <h2 className="text-xl font-bold mb-3">Ready to set or update your purchase goal?</h2>
          <Link href="/goal" className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors">
            Go to goal quiz <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(c => (
            <Link key={c.href} href={c.href} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.color}`}>{c.icon}</div>
              <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{c.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
