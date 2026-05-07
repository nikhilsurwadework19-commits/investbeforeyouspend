"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { TrendingUp, Menu, X, Target } from "lucide-react";

const links = [
  { href: "/goal", label: "Set a Goal" },
  { href: "/invest", label: "How to Invest" },
  { href: "/learn", label: "Learn" },
  { href: "/chat", label: "AI Chat" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:block">InvestBeforeYouSpend</span>
          <span className="sm:hidden">IBYS</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === l.href ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">Dashboard</Link>
              <button onClick={() => { logout(); router.push("/"); }} className="text-sm text-slate-500 hover:text-slate-700">Log out</button>
            </>
          ) : (
            <>
              <Link href="/auth" className="text-sm text-slate-600 hover:text-slate-900">Log in</Link>
              <Link href="/goal" className="flex items-center gap-1.5 bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-brand-700 transition-colors">
                <Target className="w-3.5 h-3.5" /> Set My Goal
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-slate-700 hover:text-brand-600 py-1.5 text-sm">{l.label}</Link>
          ))}
          <hr className="border-slate-100 my-2" />
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setOpen(false)} className="block text-brand-600 font-medium text-sm">Dashboard</Link>
              <button onClick={() => { logout(); setOpen(false); }} className="block text-slate-500 text-sm">Log out</button>
            </>
          ) : (
            <>
              <Link href="/auth" onClick={() => setOpen(false)} className="block text-slate-700 text-sm">Log in</Link>
              <Link href="/goal" onClick={() => setOpen(false)} className="block bg-brand-600 text-white text-center py-2 rounded-xl text-sm font-semibold">Set My Goal Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
