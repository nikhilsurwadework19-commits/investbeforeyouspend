"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ── Star field canvas ──
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const onResize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("resize", onResize);

    interface Star { x: number; y: number; r: number; a: number; speed: number; }
    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.3 + 0.2,
      a: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.4 + 0.05,
    }));

    let animId: number;
    const t0 = Date.now();
    function draw() {
      const t = (Date.now() - t0) * 0.001;
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        const a = s.a + Math.sin(t * s.speed) * 0.2;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.05, Math.min(0.9, a))})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    // ── Cursor (desktop only) ──
    const dot = document.getElementById("cdot") as HTMLElement;
    const ring = document.getElementById("cring") as HTMLElement;
    if (dot && ring && window.innerWidth > 768) {
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
      const ac = () => {
        dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
        rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
        ring.style.transform = `translate(${rx - 18}px,${ry - 18}px)`;
        requestAnimationFrame(ac);
      };
      ac();
      document.querySelectorAll("a,button").forEach(el => {
        el.addEventListener("mouseenter", () => { dot.classList.add("expand"); ring.classList.add("expand"); });
        el.addEventListener("mouseleave", () => { dot.classList.remove("expand"); ring.classList.remove("expand"); });
      });
    }

    // ── GSAP ──
    async function gsapInit() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Nav solid on scroll
      ScrollTrigger.create({
        start: "80px top",
      });

      // Hero entrance
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to("#hero-badge", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0);
      tl.from(".hw", { y: "110%", opacity: 0, duration: 1.1, stagger: 0.1, ease: "power4.out" }, 0.3);
      tl.to("#hero-sub", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.8);
      tl.to("#hero-btns", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.0);
      tl.to("#hero-stats", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.2);
      tl.to("#scroll-hint", { opacity: 1, duration: 1 }, 1.7);
      gsap.from(".fcard", { opacity: 0, scale: 0.85, y: 30, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 1.2 });

      // Parallax
      gsap.to("#glow1", { y: -180, scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 2 } });
      gsap.to("#glow2", { y: -100, scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1.5 } });
      gsap.to(".fcard", { y: -60, stagger: 0.08, scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1 } });

      // Counters
      document.querySelectorAll("[data-count]").forEach((el: any) => {
        const target = parseFloat(el.dataset.count);
        const pre = el.dataset.prefix || ""; const suf = el.dataset.suffix || "";
        const dec = parseInt(el.dataset.decimals || "0");
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true,
          onEnter: () => { const o = { v: 0 }; gsap.to(o, { v: target, duration: 2.5, ease: "power2.out", onUpdate() { el.textContent = pre + o.v.toFixed(dec) + suf; } }); }
        });
      });

      // Section reveals
      gsap.from(".intro-word", { y: "100%", opacity: 0, duration: 1.1, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: "#intro", start: "top 78%" } });
      gsap.from("#intro-body", { opacity: 0, x: 60, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: "#intro", start: "top 80%" } });
      gsap.from(".sec-eye", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: "#intro", start: "top 82%" } });
      gsap.from(".scard", { opacity: 0, y: 80, rotationX: 10, duration: 1, stagger: 0.18, ease: "power4.out", scrollTrigger: { trigger: "#steps", start: "top 82%" } });
      gsap.from(".icard", { opacity: 0, y: 60, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: "#invest", start: "top 82%" } });
      gsap.from(".ncell", { opacity: 0, scale: 0.88, y: 40, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: "#numbers", start: "top 82%" } });
      gsap.from("#cta-h", { opacity: 0, y: 80, duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: "#cta", start: "top 80%" } });
      gsap.from("#cta-sub", { opacity: 0, y: 40, duration: 1, ease: "power3.out", delay: 0.2, scrollTrigger: { trigger: "#cta", start: "top 82%" } });
      gsap.from("#cta-btns", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out", delay: 0.4, scrollTrigger: { trigger: "#cta", start: "top 84%" } });
    }
    gsapInit();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);

  const marqueeItems = ["Goal-Based Savings","Investment Education","Dealer Marketplace","S&P 500 ETFs","US Treasury Bonds","AI Financial Chat","High-Yield Savings","Real Estate ETFs","Smart Purchasing"];

  const S: Record<string, React.CSSProperties> = {
    // Layout
    page: { background: "#050818", minHeight: "100vh", overflowX: "hidden" },
    // Hero
    hero: { position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
    glow: { position: "absolute", borderRadius: "50%", pointerEvents: "none" },
    heroContent: { position: "relative", zIndex: 2, maxWidth: 860, textAlign: "center", padding: "100px 24px 80px" },
    badge: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(180,127,255,0.08)", border: "1px solid rgba(180,127,255,0.2)", color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: 2, padding: "7px 18px", borderRadius: 30, marginBottom: 44, textTransform: "uppercase" as const, opacity: 0 },
    h1: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(52px,8vw,88px)", lineHeight: 1, fontWeight: 300, letterSpacing: -3, marginBottom: 32, overflow: "hidden" },
    line: { display: "block", overflow: "hidden" },
    word: { display: "inline-block" },
    sub: { fontSize: "clamp(15px,2vw,18px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 500, margin: "0 auto 48px", opacity: 0 },
    btns: { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" as const, opacity: 0 },
    btnPrimary: { background: "linear-gradient(135deg,#6347FF,#B47FFF)", color: "#fff", padding: "15px 34px", borderRadius: 30, fontSize: 15, fontWeight: 500, textDecoration: "none", display: "inline-block" },
    btnGhost: { color: "rgba(255,255,255,0.4)", fontSize: 15, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" },
    stats: { display: "flex", gap: "clamp(24px,5vw,64px)", justifyContent: "center", marginTop: 72, paddingTop: 44, borderTop: "1px solid rgba(255,255,255,0.06)", opacity: 0, flexWrap: "wrap" as const },
    statVal: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 300, color: "#fff", lineHeight: 1 },
    statLbl: { fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 5 },
    // Float cards
    fcard: { position: "absolute" as const, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 20px", backdropFilter: "blur(12px)", zIndex: 3 },
    fcLbl: { fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 4 },
    fcVal: { fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: "#fff" },
    // Scroll hint
    scrollHint: { position: "absolute" as const, bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 8, opacity: 0, zIndex: 2 },
    scrollTxt: { fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase" as const },
    // Marquee
    marquee: { background: "rgba(5,8,24,0.8)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(180,127,255,0.08)", borderBottom: "1px solid rgba(180,127,255,0.08)", padding: "13px 0", overflow: "hidden" },
    // Section common
    section: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" as const, overflow: "hidden", padding: "80px 0" },
    container: { maxWidth: 1200, width: "100%", padding: "0 clamp(24px,5vw,64px)", margin: "0 auto" },
    eyebrow: { fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, color: "#7B5FFF", marginBottom: 16, display: "block" },
    sectionH: { fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, color: "#fff", letterSpacing: -1.5, lineHeight: 1.1 },
    // Steps
    stepCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "clamp(28px,4vw,52px) clamp(24px,3vw,44px)", position: "relative" as const, overflow: "hidden" },
    stepNum: { fontFamily: "'Cormorant Garamond',serif", fontSize: 56, color: "rgba(255,255,255,0.04)", fontWeight: 300, lineHeight: 1, marginBottom: 24, letterSpacing: -2 },
    stepRing: { width: 52, height: 52, border: "1px solid rgba(180,127,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 },
    stepTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(18px,2vw,24px)", fontWeight: 300, color: "#fff", marginBottom: 12, letterSpacing: -0.5 },
    stepDesc: { fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.75 },
    stepLink: { display: "inline-flex", alignItems: "center", gap: 6, color: "#7B5FFF", fontSize: 11, letterSpacing: 0.5, textDecoration: "none", textTransform: "uppercase" as const, marginTop: 24 },
    // Invest
    invCard: { background: "#050818", padding: "clamp(24px,3vw,36px) clamp(20px,2vw,28px)", position: "relative" as const, overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.04)" },
    invRet: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,3vw,40px)", color: "#C4BEFF", fontWeight: 300, lineHeight: 1, marginBottom: 4 },
    invYld: { fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 0.5, marginBottom: 18 },
    invName: { fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 400, marginBottom: 6 },
    invRisk: { fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 1, textTransform: "uppercase" as const },
    // Numbers
    numCell: { background: "#050818", padding: "clamp(32px,4vw,56px) clamp(16px,2vw,24px)", textAlign: "center" as const, position: "relative" as const, overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.04)" },
    numVal: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,5vw,60px)", fontWeight: 300, color: "#fff", lineHeight: 1, marginBottom: 14, letterSpacing: -2 },
    numDesc: { fontSize: 12, color: "rgba(255,255,255,0.28)", lineHeight: 1.6 },
    // CTA
    ctaH: { fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(44px,6vw,72px)", fontWeight: 300, color: "#fff", letterSpacing: -2, lineHeight: 1, marginBottom: 24 },
    ctaSub: { fontSize: 16, color: "rgba(255,255,255,0.35)", lineHeight: 1.8, marginBottom: 44, maxWidth: 400, marginLeft: "auto", marginRight: "auto" },
    // Footer
    footer: { background: "rgba(3,4,14,0.95)", borderTop: "1px solid rgba(180,127,255,0.08)", padding: "clamp(40px,5vw,64px)", display: "flex", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 40 },
    footerBrand: { fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "#fff", fontWeight: 300, marginBottom: 6 },
    footerTagline: { fontSize: 12, color: "rgba(255,255,255,0.2)" },
    footerColH: { fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)", marginBottom: 14, display: "block" },
    footerLink: { display: "block", fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none", marginBottom: 10 },
    footerBottom: { background: "#02030D", padding: "18px clamp(24px,5vw,64px)", display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.15)", flexWrap: "wrap" as const, gap: 8 },
    btnOutline: { border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", padding: "15px 34px", borderRadius: 30, fontSize: 15, textDecoration: "none", display: "inline-block" },
  };

  return (
    <div style={S.page}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
      <div id="cdot" style={{ width: 8, height: 8, background: "#B47FFF", borderRadius: "50%", position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99999 }} />
      <div id="cring" style={{ width: 36, height: 36, border: "1px solid rgba(180,127,255,0.4)", borderRadius: "50%", position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99998 }} />

      <section id="hero" style={S.hero}>
        <div id="glow1" style={{ ...S.glow, width: 700, height: 700, background: "radial-gradient(circle,rgba(99,71,255,.14) 0%,transparent 65%)", top: -200, right: -150 }} />
        <div id="glow2" style={{ ...S.glow, width: 450, height: 450, background: "radial-gradient(circle,rgba(180,100,255,.1) 0%,transparent 65%)", bottom: -80, left: -80 }} />

        {/* Float cards - hide on mobile */}
        <div className="fcard desktop-only" style={{ ...S.fcard, top: "22%", right: "6%" }}>
          <div style={S.fcLbl}>S&P 500 ETF</div>
          <div style={{ ...S.fcVal, color: "#A8FFD0" }}>+10.2% avg/yr</div>
        </div>
        <div className="fcard desktop-only" style={{ ...S.fcard, top: "52%", right: "4%" }}>
          <div style={S.fcLbl}>Your goal</div>
          <div style={S.fcVal}>$25,000</div>
        </div>
        <div className="fcard desktop-only" style={{ ...S.fcard, top: "36%", right: "20%" }}>
          <div style={S.fcLbl}>Time saved</div>
          <div style={{ ...S.fcVal, color: "#FFD080" }}>3 months early</div>
        </div>

        <div style={S.heroContent}>
          <div id="hero-badge" style={S.badge}>
            <span style={{ width: 5, height: 5, background: "#B47FFF", borderRadius: "50%", flexShrink: 0 }} />
            Educational Platform · Not Financial Advice
          </div>
          <h1 style={S.h1}>
            <span style={S.line}><span className="hw" style={S.word}>Save smarter.</span></span>
            <span style={S.line}><em className="hw" style={{ ...S.word, fontStyle: "italic", color: "#C4BEFF" }}>Buy better.</em></span>
            <span style={S.line}><span className="hw" style={S.word}>Start now.</span></span>
          </h1>
          <p id="hero-sub" style={S.sub}>Set a purchase goal, grow your savings in the right investments while you wait, then get matched with the best deal when you're ready.</p>
          <div id="hero-btns" style={S.btns}>
            <Link href="/goal" style={S.btnPrimary}>Set my goal — it's free</Link>
            <a href="#intro" style={S.btnGhost}>See how it works <span>↓</span></a>
          </div>
          <div id="hero-stats" style={S.stats}>
            {[
              { count: "10", pre: "", suf: "%", dec: "0", init: "0%", lbl: "vs 0.01% in a bank" },
              { count: "1200", pre: "$", suf: "+", dec: "0", init: "$0", lbl: "avg saved on car purchases" },
              { count: "2", pre: "", suf: " min", dec: "0", init: "0 min", lbl: "to your personalized plan" },
            ].map((s, i) => (
              <div key={i}>
                <div style={S.statVal} data-count={s.count} data-prefix={s.pre} data-suffix={s.suf} data-decimals={s.dec}>{s.init}</div>
                <div style={S.statLbl}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div id="scroll-hint" style={S.scrollHint}>
          <span style={S.scrollTxt}>Scroll</span>
          <div style={{ width: 1, height: 55, background: "linear-gradient(to bottom,rgba(180,127,255,.5),transparent)", animation: "drip 2.5s ease-in-out infinite" }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div style={S.marquee}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "marquee 28s linear infinite" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "0 30px", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 2, textTransform: "uppercase" }}>
              <span style={{ width: 3, height: 3, background: "#6347FF", borderRadius: "50%", flexShrink: 0 }} />{item}
            </span>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <section id="intro" style={S.section}>
        <div style={S.container}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(40px,6vw,100px)", alignItems: "center" }}>
            <div>
              <span className="sec-eye" style={S.eyebrow}>The Idea</span>
              <h2 style={{ ...S.sectionH, fontSize: "clamp(36px,4vw,54px)" }}>
                <span style={{ display: "block", overflow: "hidden" }}><span className="intro-word" style={{ display: "inline-block" }}>Most people save,</span></span>
                <span style={{ display: "block", overflow: "hidden" }}><span className="intro-word" style={{ display: "inline-block" }}>then buy on </span><em className="intro-word" style={{ display: "inline-block", fontStyle: "italic", color: "#B47FFF" }}>impulse.</em></span>
                <span style={{ display: "block", overflow: "hidden" }}><span className="intro-word" style={{ display: "inline-block" }}>We flip that.</span></span>
              </h2>
            </div>
            <div id="intro-body">
              <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "rgba(255,255,255,0.38)", lineHeight: 1.85, marginBottom: 20 }}>When you know <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>what you want to buy</strong> and <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>when you need it</strong>, we put your savings in exactly the right investment. Not a bank earning 0.01%. The right instrument, matched to your exact timeline.</p>
              <p style={{ fontSize: "clamp(14px,1.5vw,16px)", color: "rgba(255,255,255,0.38)", lineHeight: 1.85, marginBottom: 24 }}>When you're ready — car, home, vacation — our dealer network competes for your business. <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>You arrive with money saved and the power to negotiate.</strong></p>
              <Link href="/goal" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#9B89FF", fontSize: 14, textDecoration: "none", borderBottom: "1px solid rgba(155,137,255,0.3)", paddingBottom: 3 }}>Set your first goal →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="steps" style={S.section}>
        <div style={S.container}>
          <div style={{ marginBottom: 52 }}>
            <span style={S.eyebrow}>How it works</span>
            <h2 style={{ ...S.sectionH, fontSize: "clamp(32px,4vw,52px)", marginTop: 12 }}>Three steps to a smarter purchase</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 2 }}>
            {[
              { num: "01", icon: "🎯", title: "Tell us what you want", desc: "A 2-minute quiz captures your goal, budget, timeline, and monthly savings. We build your personalized plan instantly — no account needed.", link: "Take the quiz", href: "/goal" },
              { num: "02", icon: "📈", title: "We put your money to work", desc: "Based on your timeline we recommend exactly where to save — HYSA, bonds, or index ETFs. Your savings earn 4–10% instead of near zero.", link: "Investment guide", href: "/invest" },
              { num: "03", icon: "🤝", title: "Get the best deal", desc: "When you're ready, vetted dealers compete for your business based on your savings profile. You negotiate from a position of real strength.", link: "See marketplace", href: "/marketplace" },
            ].map((step, i) => (
              <div key={i} className="scard" style={S.stepCard}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(99,71,255,0.4),transparent)", opacity: 0.6 }} />
                <div style={S.stepNum}>{step.num}</div>
                <div style={S.stepRing}>{step.icon}</div>
                <h3 style={S.stepTitle}>{step.title}</h3>
                <p style={S.stepDesc}>{step.desc}</p>
                <Link href={step.href} style={S.stepLink}>{step.link} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVEST */}
      <section id="invest" style={{ ...S.section, background: "rgba(8,4,20,0.7)" }}>
        <div style={S.container}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(32px,5vw,80px)", alignItems: "end", marginBottom: 44 }}>
            <div>
              <span style={S.eyebrow}>Where your money goes</span>
              <h2 style={{ ...S.sectionH, fontSize: "clamp(32px,4vw,52px)", marginTop: 12 }}>The right investment<br /><em style={{ fontStyle: "italic", color: "#B47FFF" }}>for your timeline</em></h2>
            </div>
            <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,0.32)", lineHeight: 1.85 }}>We earn a small referral fee from investment platforms when you open an account through our links. This keeps IBYS free for you — and we only recommend what fits your goal.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 1, background: "rgba(255,255,255,0.04)" }}>
            {[
              { ret: "~4.8%", yld: "annual yield", name: "High-Yield Savings", risk: "No risk · Under 1 year", color: "#6347FF" },
              { ret: "~4.5%", yld: "annual yield", name: "US Treasury Bonds", risk: "Very Low · 1–3 years", color: "#7B5FFF" },
              { ret: "~10%", yld: "avg annual return", name: "S&P 500 ETF (VOO)", risk: "Medium · 3+ years", color: "#9B89FF" },
              { ret: "~9%", yld: "avg annual return", name: "Real Estate ETF (VNQ)", risk: "Medium · Long-term", color: "#B47FFF" },
            ].map((inv, i) => (
              <div key={i} className="icard" style={S.invCard}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${inv.color},#B47FFF)` }} />
                <div style={S.invRet}>{inv.ret}</div>
                <div style={S.invYld}>{inv.yld}</div>
                <div style={S.invName}>{inv.name}</div>
                <div style={S.invRisk}>{inv.risk}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", textAlign: "center", marginTop: 20, fontStyle: "italic" }}>Past returns are estimates. Not financial advice. Always consult a licensed financial advisor.</p>
        </div>
      </section>

      {/* NUMBERS */}
      <section id="numbers" style={S.section}>
        <div style={S.container}>
          <h2 style={{ ...S.sectionH, fontSize: "clamp(36px,5vw,58px)", textAlign: "center", marginBottom: 72 }}>Why this <em style={{ fontStyle: "italic", color: "#B47FFF" }}>matters</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 1, background: "rgba(255,255,255,0.06)" }}>
            {[
              { val: 45, pre: "", suf: "M", dec: 0, desc: "Americans planning a big purchase this year" },
              { val: 2500, pre: "$", suf: "+", dec: 0, desc: "average car overpayment without a plan" },
              { val: 0.01, pre: "", suf: "%", dec: 2, desc: "what a typical bank savings account earns" },
              { val: 74, pre: "", suf: "%", dec: 0, desc: "of buyers regret major purchases made without preparation" },
            ].map((n, i) => (
              <div key={i} className="ncell" style={S.numCell}>
                <div style={S.numVal} data-count={n.val} data-prefix={n.pre} data-suffix={n.suf} data-decimals={n.dec}>{n.pre}0{n.suf}</div>
                <div style={S.numDesc}>{n.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ ...S.section, textAlign: "center" }}>
        <div style={{ ...S.container, textAlign: "center" }}>
          <h2 id="cta-h" style={S.ctaH}>Ready to buy <em style={{ fontStyle: "italic", color: "#B47FFF" }}>smarter?</em></h2>
          <p id="cta-sub" style={S.ctaSub}>Set your goal in 2 minutes. We'll build your personalized savings plan — completely free.</p>
          <div id="cta-btns" style={{ ...S.btns, opacity: 1 }}>
            <Link href="/goal" style={S.btnPrimary}>Set my goal now</Link>
            <Link href="/learn" style={S.btnOutline}>Learn how it works</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div>
          <div style={S.footerBrand}>InvestBeforeYouSpend</div>
          <div style={S.footerTagline}>Invest First. Then Buy Smarter.</div>
        </div>
        <div><span style={S.footerColH}>Platform</span>
          {[["Set a Goal","/goal"],["How to Invest","/invest"],["Marketplace","/marketplace"],["AI Chat","/chat"]].map(([l,h]) => <Link key={h} href={h} style={S.footerLink}>{l}</Link>)}
        </div>
        <div><span style={S.footerColH}>Learn</span>
          {[["Education","/learn"],["Blog","/blog"],["Pricing","/pricing"]].map(([l,h]) => <Link key={h} href={h} style={S.footerLink}>{l}</Link>)}
        </div>
        <div><span style={S.footerColH}>Legal</span>
          {[["Disclaimer","/disclaimer"],["Privacy","/privacy"],["Terms","/terms"]].map(([l,h]) => <Link key={h} href={h} style={S.footerLink}>{l}</Link>)}
        </div>
      </footer>
      <div style={S.footerBottom}>
        <span>© 2025 InvestBeforeYouSpend. Educational purposes only.</span>
        <span>Not financial advice · Not a licensed broker</span>
      </div>

      <style>{`
        @keyframes drip { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .desktop-only { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
        * { cursor: none !important; }
        a:hover, button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
