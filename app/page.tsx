"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HomePage() {
  const navRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ── Star field ──
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const resize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; drawStars(); };
    window.addEventListener("resize", resize);

    interface Star { x: number; y: number; r: number; a: number; speed: number; }
    const stars: Star[] = Array.from({ length: 220 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4,
      a: Math.random() * 0.8 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
    }));

    function drawStars() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`; ctx.fill();
      });
    }

    let animId: number;
    function animStars() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a += Math.sin(Date.now() * 0.001 * s.speed) * 0.003;
        s.a = Math.max(0.05, Math.min(0.9, s.a));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`; ctx.fill();
      });
      animId = requestAnimationFrame(animStars);
    }
    animStars();

    // ── Cursor ──
    const dot = document.querySelector(".cursor-dot") as HTMLElement;
    const ring = document.querySelector(".cursor-ring") as HTMLElement;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
    function animCursor() {
      if (dot) { dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`; }
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ring) ring.style.transform = `translate(${rx - 18}px,${ry - 18}px)`;
      requestAnimationFrame(animCursor);
    }
    animCursor();
    document.querySelectorAll("a,button,.step-card,.inv-card,.num-cell").forEach(el => {
      el.addEventListener("mouseenter", () => { dot?.classList.add("expand"); ring?.classList.add("expand"); });
      el.addEventListener("mouseleave", () => { dot?.classList.remove("expand"); ring?.classList.remove("expand"); });
    });

    // ── GSAP ──
    async function initGSAP() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Nav
      ScrollTrigger.create({
        start: "80px top",
        onEnter: () => navRef.current?.classList.add("solid"),
        onLeaveBack: () => navRef.current?.classList.remove("solid"),
      });

      // ── HERO entrance ──
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".hero-badge", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0);
      tl.from(".hero-h1 .word", { y: "110%", opacity: 0, duration: 1.1, stagger: 0.12, ease: "power4.out" }, 0.4);
      tl.to(".hero-sub", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.9);
      tl.to(".hero-btns", { opacity: 1, y: 0, duration: .9, ease: "power3.out" }, 1.1);
      tl.to(".hero-stats", { opacity: 1, y: 0, duration: .9, ease: "power3.out" }, 1.3);
      tl.to(".scroll-hint", { opacity: 1, duration: 1.2 }, 1.8);

      // Float cards entrance
      gsap.from(".float-card", { opacity: 0, scale: .85, y: 30, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 1.2 });

      // Hero parallax on scroll
      gsap.to(".hero-glow", { y: -200, scrollTrigger: { trigger: ".hero-panel", start: "top top", end: "bottom top", scrub: 2 } });
      gsap.to(".hero-glow2", { y: -120, scrollTrigger: { trigger: ".hero-panel", start: "top top", end: "bottom top", scrub: 1.5 } });
      gsap.to(".float-card", { y: -80, stagger: .1, scrollTrigger: { trigger: ".hero-panel", start: "top top", end: "bottom top", scrub: 1 } });

      // ── Hero stat counters ──
      document.querySelectorAll("[data-count]").forEach((el: any) => {
        const target = parseFloat(el.dataset.count);
        const pre = el.dataset.prefix || ""; const suf = el.dataset.suffix || "";
        const dec = parseInt(el.dataset.decimals || "0");
        ScrollTrigger.create({
          trigger: el, start: "top 88%", once: true,
          onEnter: () => {
            const obj = { v: 0 };
            gsap.to(obj, { v: target, duration: 2.8, ease: "power2.out", onUpdate() { el.textContent = pre + obj.v.toFixed(dec) + suf; } });
          }
        });
      });

      // ── INTRO: words fly in ──
      gsap.from(".intro-word", {
        y: "100%", opacity: 0, duration: 1.1, stagger: 0.08, ease: "power4.out",
        scrollTrigger: { trigger: ".intro-panel", start: "top 75%" }
      });
      gsap.to(".section-eyebrow", { opacity: 1, y: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: ".intro-panel", start: "top 80%" } });
      gsap.from(".intro-body", { opacity: 0, x: 50, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".intro-panel", start: "top 78%" } });

      // ── STEPS: theatrical reveal ──
      gsap.from(".steps-top", { opacity: 0, y: 60, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".steps-panel", start: "top 80%" } });
      gsap.from(".step-card", {
        opacity: 0, y: 100, rotationX: 15, duration: 1.1, stagger: 0.2, ease: "power4.out",
        scrollTrigger: { trigger: ".steps-grid", start: "top 85%" }
      });

      // ── INVEST: cards wipe in ──
      gsap.from(".invest-inner .invest-top", { opacity: 0, y: 50, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".invest-panel", start: "top 80%" } });
      gsap.from(".inv-card", {
        opacity: 0, y: 60, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".invest-grid", start: "top 88%" }
      });
      // each bar wipes from left
      document.querySelectorAll(".inv-top-bar").forEach((bar: any, i) => {
        ScrollTrigger.create({
          trigger: bar.closest(".inv-card"), start: "top 85%",
          onEnter: () => gsap.to(bar, { scaleX: 1, duration: .8, delay: i * 0.1, ease: "power2.out" })
        });
      });

      // ── NUMBERS: dramatic scale-up ──
      gsap.from(".numbers-inner .numbers-h", { opacity: 0, y: 60, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: ".numbers-panel", start: "top 80%" } });
      gsap.from(".num-cell", {
        opacity: 0, scale: .9, y: 40, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".num-grid", start: "top 88%" }
      });

      // ── CTA: big theatrical entrance ──
      gsap.from(".cta-h", { opacity: 0, y: 80, duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: ".cta-panel", start: "top 80%" } });
      gsap.from(".cta-sub", { opacity: 0, y: 40, duration: 1, ease: "power3.out", delay: .2, scrollTrigger: { trigger: ".cta-panel", start: "top 82%" } });
      gsap.from(".cta-btns", { opacity: 0, y: 30, duration: .9, ease: "power3.out", delay: .4, scrollTrigger: { trigger: ".cta-panel", start: "top 84%" } });

      // ── Canvas parallax: stars drift on scroll ──
      ScrollTrigger.create({
        start: "top top", end: "9999px top", scrub: 1,
        onUpdate: (self) => {
          const offset = self.progress * H * 0.3;
          ctx.setTransform(1, 0, 0, 1, 0, offset % H);
        }
      });
    }
    initGSAP();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const marqueeItems = ["Goal-Based Savings", "Investment Education", "Dealer Marketplace", "S&P 500 Index ETFs", "US Treasury Bonds", "AI Financial Chat", "High-Yield Savings", "Real Estate ETFs", "Smart Purchasing", "Wealth Building"];

  return (
    <>
      <canvas id="space-canvas" ref={canvasRef} />
      <div className="cursor-dot" />
      <div className="cursor-ring" />

      {/* NAV */}
      <nav className="nav" ref={navRef}>
        <Link href="/" className="logo">Invest<span>Before</span>YouSpend</Link>
        <div className="nav-links">
          <Link href="/goal" className="nav-link">Set a Goal</Link>
          <Link href="/invest" className="nav-link">How to Invest</Link>
          <Link href="/learn" className="nav-link">Learn</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/goal" className="nav-cta">Start Free →</Link>
        </div>
      </nav>

      {/* ── HERO PANEL ── */}
      <section className="panel hero-panel" style={{ minHeight: "100vh" }}>
        <div className="hero-glow" />
        <div className="hero-glow2" />

        {/* Floating data cards */}
        <div className="float-card" style={{ top: "22%", right: "8%", opacity: 0 }}>
          <div className="fc-lbl">S&P 500 ETF</div>
          <div className="fc-val green">+10.2% avg/yr</div>
        </div>
        <div className="float-card" style={{ top: "50%", right: "5%", opacity: 0 }}>
          <div className="fc-lbl">Your goal</div>
          <div className="fc-val">$25,000</div>
        </div>
        <div className="float-card" style={{ top: "35%", right: "22%", opacity: 0 }}>
          <div className="fc-lbl">Time saved</div>
          <div className="fc-val gold">3 months early</div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Educational Platform · Not Financial Advice
          </div>
          <h1 className="hero-h1">
            <span className="line"><span className="word">Save smarter.</span></span>
            <span className="line"><em className="word">Buy better.</em></span>
            <span className="line"><span className="word">Start now.</span></span>
          </h1>
          <p className="hero-sub">Set a purchase goal, grow your savings in the right investments while you wait, then get matched with the best deal when you're ready.</p>
          <div className="hero-btns">
            <Link href="/goal" className="btn-primary">Set my goal — it's free</Link>
            <a href="#intro" className="btn-ghost">See how it works <span className="arr">↓</span></a>
          </div>
          <div className="hero-stats">
            {[
              { count: "10", pre: "", suf: "%", dec: "0", init: "0%", lbl: "vs 0.01% in a bank" },
              { count: "1200", pre: "$", suf: "+", dec: "0", init: "$0", lbl: "avg saved on car purchases" },
              { count: "2", pre: "", suf: " min", dec: "0", init: "0 min", lbl: "to your personalized plan" },
            ].map((s, i) => (
              <div key={i}>
                <div className="stat-val" data-count={s.count} data-prefix={s.pre} data-suffix={s.suf} data-decimals={s.dec}>{s.init}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-hint">
          <span className="scroll-txt">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="m-item"><span className="m-dot" />{item}</span>
          ))}
        </div>
      </div>

      {/* ── INTRO PANEL ── */}
      <section className="panel intro-panel" id="intro">
        <div className="intro-inner">
          <div>
            <span className="section-eyebrow">The Idea</span>
            <h2 className="intro-h">
              <span className="intro-line"><span className="intro-word">Most people save,</span></span>
              <span className="intro-line"><span className="intro-word">then buy on</span> <em className="intro-word"> impulse.</em></span>
              <span className="intro-line"><span className="intro-word">We flip that.</span></span>
            </h2>
          </div>
          <div className="intro-body">
            <p>When you know <strong>what you want to buy</strong> and <strong>when you need it</strong>, we put your savings in exactly the right investment. Not a bank account earning 0.01%. The right instrument, matched to your exact timeline.</p>
            <p>And when you're ready — car, home, vacation — our dealer network competes for your business. <strong>You arrive with money saved and the power to negotiate.</strong></p>
            <Link href="/goal" className="intro-link">Set your first goal →</Link>
          </div>
        </div>
      </section>

      {/* ── STEPS PANEL ── */}
      <section className="panel steps-panel" id="how">
        <div className="steps-inner">
          <div className="steps-top">
            <span className="section-eyebrow" style={{ opacity: 1 }}>How it works</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: "#fff", letterSpacing: -1.5, marginTop: 12 }}>
              Three steps to a smarter purchase
            </h2>
          </div>
          <div className="steps-grid">
            {[
              { num: "01", icon: "🎯", title: "Tell us what you want", desc: "A 2-minute quiz captures your goal, budget, timeline, and monthly savings capacity. We build your personalized plan instantly — no account needed.", link: "Take the quiz", href: "/goal" },
              { num: "02", icon: "📈", title: "We put your money to work", desc: "Based on your timeline we recommend exactly where to save — high-yield accounts, bonds, or index ETFs. Your savings earn 4–10% instead of near zero.", link: "Investment guide", href: "/invest" },
              { num: "03", icon: "🤝", title: "Get the best deal", desc: "When you're ready, vetted dealers see your savings profile and compete for your business. You show up with money saved and the power to negotiate.", link: "See marketplace", href: "/marketplace" },
            ].map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-glow" />
                <div className="step-num">{step.num}</div>
                <div className="step-icon-ring">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                <Link href={step.href} className="step-link">{step.link} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVEST PANEL ── */}
      <section className="panel invest-panel">
        <div className="invest-inner">
          <div className="invest-top">
            <div>
              <span className="section-eyebrow" style={{ opacity: 1 }}>Where your money goes</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: "#fff", letterSpacing: -1.5, marginTop: 12, lineHeight: 1.1 }}>
                The right investment<br /><em style={{ fontStyle: "italic", color: "#B47FFF" }}>for your timeline</em>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.32)", lineHeight: 1.85 }}>
              We earn a small referral fee from investment platforms when you open an account through our links. This keeps our platform free — and we only recommend what genuinely fits your goal.
            </p>
          </div>
          <div className="invest-grid">
            {[
              { ret: "~4.8%", yld: "annual yield", name: "High-Yield Savings Account", risk: "No risk · Under 1 year", color: "#6347FF" },
              { ret: "~4.5%", yld: "annual yield", name: "US Treasury Bonds (BND)", risk: "Very Low Risk · 1–3 years", color: "#7B5FFF" },
              { ret: "~10%", yld: "avg annual return", name: "S&P 500 Index ETF (VOO)", risk: "Medium Risk · 3+ years", color: "#9B89FF" },
              { ret: "~9%", yld: "avg annual return", name: "Real Estate ETF (VNQ)", risk: "Medium Risk · Long-term", color: "#B47FFF" },
            ].map((inv, i) => (
              <div key={i} className="inv-card">
                <div className="inv-top-bar" style={{ background: `linear-gradient(90deg, ${inv.color}, #B47FFF)` }} />
                <div className="inv-ret">{inv.ret}</div>
                <div className="inv-yld">{inv.yld}</div>
                <div className="inv-name">{inv.name}</div>
                <div className="inv-risk">{inv.risk}</div>
              </div>
            ))}
          </div>
          <p className="inv-disclaimer">Past returns are estimates. Not financial advice. Always consult a licensed financial advisor before investing.</p>
        </div>
      </section>

      {/* ── NUMBERS PANEL ── */}
      <section className="panel numbers-panel">
        <div className="numbers-inner">
          <h2 className="numbers-h">
            Why this <em>matters</em>
          </h2>
          <div className="num-grid">
            {[
              { val: 45, pre: "", suf: "M", dec: 0, desc: "Americans planning a big purchase this year" },
              { val: 2500, pre: "$", suf: "+", dec: 0, desc: "average car overpayment without a plan or leverage" },
              { val: 0.01, pre: "", suf: "%", dec: 2, desc: "what a typical bank savings account earns you" },
              { val: 74, pre: "", suf: "%", dec: 0, desc: "of buyers regret a major purchase made without preparation" },
            ].map((n, i) => (
              <div key={i} className="num-cell">
                <div className="num-val" data-count={n.val} data-prefix={n.pre} data-suffix={n.suf} data-decimals={n.dec}>
                  {n.pre}0{n.suf}
                </div>
                <div className="num-desc">{n.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PANEL ── */}
      <section className="panel cta-panel">
        <div className="cta-inner">
          <h2 className="cta-h">Ready to buy <em>smarter?</em></h2>
          <p className="cta-sub">Set your goal in 2 minutes. We'll build your personalized savings plan — completely free.</p>
          <div className="cta-btns">
            <Link href="/goal" className="btn-primary">Set my goal now</Link>
            <Link href="/learn" className="btn-outline">Learn how it works</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div>
          <div className="footer-brand">InvestBeforeYouSpend</div>
          <div className="footer-tagline">Invest First. Then Buy Smarter.</div>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <Link href="/goal">Set a Goal</Link>
          <Link href="/invest">How to Invest</Link>
          <Link href="/marketplace">Dealer Marketplace</Link>
          <Link href="/chat">AI Chat</Link>
        </div>
        <div className="footer-col">
          <h4>Learn</h4>
          <Link href="/learn">Education</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© 2025 InvestBeforeYouSpend. Educational purposes only.</span>
        <span>Not financial advice · Not a licensed broker</span>
      </div>
    </>
  );
}
