"use client";
import { blogPosts } from "@/lib/data";
import Link from "next/link";
import { useEffect } from "react";

export default function BlogPage() {
  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".blog-card", { opacity: 0, y: 70, duration: 0.9, stagger: 0.15, ease: "power3.out", delay: 0.2 });
      gsap.from(".page-title", { opacity: 0, y: 50, duration: 1.1, ease: "power4.out", delay: 0.1 });
    }
    init();
  }, []);

  return (
    <div className="space-page">
      <div className="page-hero">
        <span className="page-eyebrow">Journal</span>
        <h1 className="page-title">Money Tips <em>&</em> Guides</h1>
        <p className="page-subtitle">Practical advice to help you save, invest, and buy smarter. Written for people, not economists.</p>
      </div>

      <div className="section-divider" />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(40px,5vw,80px) clamp(24px,5vw,64px)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {blogPosts.map((p, i) => (
            <Link key={p.id} href={`/blog/${p.id}`} className="blog-card space-card" style={{ padding: "clamp(28px,3vw,44px)", textDecoration: "none", display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center" }}>
              <div className="space-card-top" style={{ gridColumn: "1/-1" }} />
              <div style={{ fontSize: 40 }}>{p.emoji}</div>
              <div>
                <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#7B5FFF" }}>{p.category} · {p.readTime}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 300, color: "#fff", margin: "10px 0 8px", letterSpacing: -0.5 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
