"use client";
import { investmentOptions } from "@/lib/data";
import Link from "next/link";
import { useEffect } from "react";

const platforms = [
  { name: "Fidelity", url: "https://fidelity.com", note: "$0 commission · No minimums · Best for beginners", bonus: "$100 for new accounts" },
  { name: "Charles Schwab", url: "https://schwab.com", note: "$0 commission · 24/7 support", bonus: "Up to $500 bonus" },
  { name: "Marcus by Goldman", url: "https://marcus.com", note: "~5% APY savings · FDIC insured", bonus: "Rate locked 90 days" },
  { name: "TreasuryDirect.gov", url: "https://treasurydirect.gov", note: "US Treasuries direct · Zero fees", bonus: "US Government backed" },
];

export default function InvestPage() {
  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".page-title", { opacity: 0, y: 50, duration: 1.1, ease: "power4.out", delay: 0.1 });
      gsap.from(".inv-opt", { opacity: 0, y: 60, duration: 0.9, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".inv-grid", start: "top 85%" } });
      gsap.from(".plat-card", { opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".plat-grid", start: "top 85%" } });
    }
    init();
  }, []);

  return (
    <div className="space-page">
      <div className="page-hero">
        <span className="page-eyebrow">How to Invest</span>
        <h1 className="page-title">The right investment<br /><em>for your timeline</em></h1>
        <p className="page-subtitle">Matched to your goal. We earn a small referral fee from partners — disclosed on every card. Your rates are never affected.</p>
      </div>

      <div className="section-divider" />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,5vw,80px) clamp(24px,5vw,64px)" }}>
        <span className="s-eye">Investment Options</span>
        <div className="inv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 2, marginBottom: 80 }}>
          {investmentOptions.map((inv, i) => (
            <div key={inv.id} className="inv-opt space-card" style={{ padding: "clamp(28px,3vw,40px)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,#6347FF,#B47FFF)`, opacity: 0.8 }} />
              <div style={{ fontSize: 32, marginBottom: 16, marginTop: 8 }}>{inv.emoji}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,3.5vw,44px)", color: "#C4BEFF", fontWeight: 300, lineHeight: 1, marginBottom: 4 }}>~{inv.avgReturn}%</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 0.5, marginBottom: 18 }}>avg annual return</div>
              <h3 style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", fontWeight: 400, marginBottom: 8 }}>{inv.name}</h3>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: 16 }}>{inv.description}</p>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 1, textTransform: "uppercase" }}>{inv.timeframe} · {inv.risk} risk</span>
            </div>
          ))}
        </div>

        <div className="section-divider" style={{ marginBottom: 60 }} />

        <span className="s-eye">Recommended Platforms</span>
        <div className="plat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 2 }}>
          {platforms.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="plat-card space-card" style={{ padding: "clamp(24px,3vw,36px)", textDecoration: "none", display: "block" }}>
              <div className="space-card-top" />
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: "#fff", marginBottom: 8, marginTop: 12 }}>{p.name}</h3>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 14 }}>{p.note}</p>
              <span style={{ fontSize: 11, color: "#A8FFD0", letterSpacing: 0.5 }}>{p.bonus}</span>
              <div style={{ marginTop: 20, fontSize: 11, color: "#7B5FFF", letterSpacing: 1, textTransform: "uppercase" }}>Open account →</div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link href="/goal" style={{ background: "linear-gradient(135deg,#6347FF,#B47FFF)", color: "#fff", padding: "15px 36px", borderRadius: 30, fontSize: 15, textDecoration: "none", display: "inline-block" }}>
            Take the goal quiz first →
          </Link>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 14, fontStyle: "italic" }}>Not financial advice. Always consult a licensed advisor before investing.</p>
        </div>
      </div>
    </div>
  );
}
