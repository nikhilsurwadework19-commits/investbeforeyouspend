"use client";
import { investmentTopics } from "@/lib/data";
import Link from "next/link";
import { useEffect } from "react";

export default function LearnPage() {
  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".topic-card", {
        opacity: 0, y: 60, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".topics-grid", start: "top 85%" }
      });
      gsap.from(".page-title", { opacity: 0, y: 50, duration: 1.1, ease: "power4.out", delay: 0.1 });
      gsap.from(".page-subtitle", { opacity: 0, y: 30, duration: 0.9, ease: "power3.out", delay: 0.3 });
    }
    init();
  }, []);

  return (
    <div className="space-page">
      <div className="page-hero">
        <span className="page-eyebrow">Education</span>
        <h1 className="page-title">Investment <em>Education</em></h1>
        <p className="page-subtitle">Plain-language guides to every investment type. Start anywhere — no finance degree required.</p>
      </div>

      <div className="section-divider" />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,5vw,80px) clamp(24px,5vw,64px)" }}>
        <div className="topics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2 }}>
          {investmentTopics.map(t => (
            <Link key={t.id} href={`/learn/${t.id}`} className="topic-card space-card" style={{ padding: "clamp(28px,3vw,44px)", textDecoration: "none", display: "block" }}>
              <div className="space-card-top" />
              <div style={{ fontSize: 36, marginBottom: 20, marginTop: 16 }}>{t.emoji}</div>
              <span style={{ display: "inline-block", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: t.riskLevel === "None" ? "#A8FFD0" : t.riskLevel.includes("Low") ? "#C4BEFF" : "#FFD080", marginBottom: 14 }}>
                {t.riskLevel} risk · {t.readTime}
              </span>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,2vw,26px)", fontWeight: 300, color: "#fff", marginBottom: 10, letterSpacing: -0.5 }}>{t.title}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>{t.tagline}</p>
              <div style={{ marginTop: 24, fontSize: 11, color: "#7B5FFF", letterSpacing: 1, textTransform: "uppercase" }}>Explore →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
