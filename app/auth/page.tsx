"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { TrendingUp, Mail, Lock } from "lucide-react";
import Link from "next/link";

function AuthForm() {
  const params = useSearchParams();
  const [mode, setMode] = useState<"login"|"signup">(params.get("mode")==="signup"?"signup":"login");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const { login, signup, loginWithGoogle, user } = useAuth();
  const router = useRouter();
  useEffect(() => { if (user) router.push("/dashboard"); }, [user, router]);
  const handle = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      if (mode === "login") { await login(email, password); router.push("/dashboard"); }
      else { await signup(email, password); router.push("/goal"); }
    } catch (err: unknown) { setError(err instanceof Error ? err.message.replace("Firebase: ","") : "Something went wrong"); }
    finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-slate-900 text-xl">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center"><TrendingUp className="w-5 h-5 text-white" /></div>
            InvestBeforeYouSpend
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
            {(["login","signup"] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode===m?"bg-white shadow text-slate-900":"text-slate-500"}`}>
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>
          <button onClick={async () => { try { await loginWithGoogle(); router.push("/dashboard"); } catch { setError("Google login failed"); }}}
            className="w-full border border-slate-200 rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors mb-4">
            Continue with Google
          </button>
          <div className="flex items-center gap-3 mb-4"><div className="flex-1 h-px bg-slate-100"/><span className="text-xs text-slate-400">or email</span><div className="flex-1 h-px bg-slate-100"/></div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>}
          <form onSubmit={handle} className="space-y-4">
            <div><label className="text-sm font-medium text-slate-700 block mb-1.5">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="you@email.com"/>
            </div>
            <div><label className="text-sm font-medium text-slate-700 block mb-1.5">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Min. 6 characters"/>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-60">
              {loading ? "Please wait..." : mode==="login" ? "Log in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default function AuthPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>}><AuthForm /></Suspense>;
}
