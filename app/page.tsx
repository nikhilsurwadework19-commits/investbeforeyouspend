"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HomePage() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // cursor
      const cursor = document.querySelector(".cursor") as HTMLElement;
      if (cursor) {
        document.addEventListener("mousemove", (e) => {
          gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
        });
        document.querySelectorAll("a,button,.step-card,.invest-card,.test-card").forEach(el => {
          el.addEventListener("mouseenter", () => cursor.classList.add("expand"));
          el.addEventListener("mouseleave", () => cursor.classList.remove("expand"));
        });
      }

      // nav scroll
      ScrollTrigger.create({
        start: "80px top",
        onEnter: () => navRef.current?.classList.add("scrolled"),
        onLeaveBack: () => navRef.current?.classList.remove("scrolled"),
      });

      // hero entrance
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(".hero-tag", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0);
      tl.from(".title-word", { y: "110%", opacity: 0, duration: 1, stagger: 0.14, ease: "power4.out" }, 0.3);
      tl.to(".hero-sub", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.9);
      tl.to(".hero-actions", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.1);
      tl.to(".hero-stats", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.3);
      tl.to(".hero-scroll-hint", { opacity: 1, duration: 1 }, 1.8);

      // parallax orbs
      gsap.to(".hero-orb-1", { y: -120, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 2 } });
      gsap.to(".hero-orb-2", { y: -70, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.5 } });

      // stat counters
      document.querySelectorAll("[data-count]").forEach((el: any) => {
        const target = parseFloat(el.dataset.count);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const dec = parseInt(el.dataset.decimals || "0");
        ScrollTrigger.create({
          trigger: el, start: "top 88%", once: true,
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target, duration: 2.5, ease: "power2.out",
              onUpdate() { el.textContent = prefix + obj.val.toFixed(dec) + suffix; }
            });
          }
        });
      });

      // reveal on scroll
      const reveals: [string, object][] = [
        [".reveal", { opacity: 0, y: 40 }],
        [".reveal-left", { opacity: 0, x: -40 }],
        [".reveal-right", { opacity: 0, x: 40 }],
      ];
      reveals.forEach(([sel, from]) => {
        gsap.utils.toArray(sel).forEach((el: any) => {
          gsap.from(el, { ...from, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
        });
      });

      // staggered entries
      gsap.from(".step-card", { opacity: 0, y: 70, duration: 0.9, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: ".steps-grid", start: "top 85%" } });
      gsap.from(".invest-card", { opacity: 0, scale: 0.94, y: 40, duration: 0.9, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".invest-grid", start: "top 85%" } });
      gsap.from(".num-cell", { opacity: 0, y: 60, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".numbers-grid", start: "top 85%" } });
      gsap.from(".test-card", { opacity: 0, y: 50, duration: 0.9, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".test-grid", start: "top 85%" } });

      // horizontal drag scroll
      const slider = document.querySelector(".h-scroll-inner") as HTMLElement;
      if (slider) {
        let isDown = false, startX = 0, scrollLeft = 0;
        slider.addEventListener("mousedown", e => { isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
        slider.addEventListener("mouseleave", () => (isDown = false));
        slider.addEventListener("mouseup", () => (isDown = false));
        slider.addEventListener("mousemove", e => { if (!isDown) return; e.preventDefault(); slider.scrollLeft = scrollLeft - (e.pageX - slider.offsetLeft - startX) * 1.5; });
      }
    }
    init();
  }, []);

  const marqueeItems = ["Goal-Based Savings","Investment Education","Dealer Marketplace","S&P 500 ETFs","US Treasury Bonds","AI Financial Chat","High-Yield Savings","Real Estate ETFs","Smart Purchasing"];

  const featureCards = [
    { icon: "🎯", title: "2-Minute Goal Quiz", desc: "Tell us what you want to buy. Get your complete savings plan instantly." },
    { icon: "📈", title: "Investment Matching", desc: "We match your timeline to bonds, ETFs, or savings accounts — exactly right." },
    { icon: "🤖", title: "AI Financial Chat", desc: "Ask any money question. Get clear, jargon-free answers powered by Claude." },
    { icon: "🤝", title: "Dealer Marketplace", desc: "Vetted dealers compete to give you the best price on your purchase." },
    { icon: "📚", title: "Education Library", desc: "Learn how stocks, bonds, ETFs and real estate actually work — plainly." },
    { icon: "⭐", title: "Premium Tracking", desc: "Track savings progress, get milestone alerts, and never miss your goal." },
  ];

  return (
    <>
      <div className="cursor" />
      <nav className="nav" ref={navRef}>
        <Link href="/" className="nav-logo">Invest<span>Before</span>YouSpend</Link>
        <div className="nav-links">
          <Link href="/goal" className="nav-link">Set a Goal</Link>
          <Link href="/invest" className="nav-link">How to Invest</Link>
          <Link href="/learn" className="nav-link">Learn</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/goal" className="nav-cta">Start Free →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-orb hero-orb-1" style={{width:700,height:700,top:-200,right:-100,position:"absolute",borderRadius:"50%",background:"radial-gradient(circle, rgba(95,202,138,0.1) 0%, transparent 70%)",pointerEvents:"none"}}/>
        <div className="hero-orb hero-orb-2" style={{width:400,height:400,bottom:-80,left:-60,position:"absolute",borderRadius:"50%",background:"radial-gradient(circle, rgba(26,92,58,0.5) 0%, transparent 70%)",pointerEvents:"none"}}/>
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-dot"/>
            Educational Platform · Not Financial Advice
          </div>
          <h1 className="hero-title">
            <span className="title-line"><span className="title-word">Save smarter.</span></span>
            <span className="title-line"><span className="title-word" style={{color:"#A8D5B5",fontStyle:"italic"}}>Buy better.</span></span>
            <span className="title-line"><span className="title-word">Start now.</span></span>
          </h1>
          <p className="hero-sub">Set a purchase goal, grow your savings in the right investments while you wait, then get matched with the best deal when you're ready.</p>
          <div className="hero-actions">
            <Link href="/goal" className="btn-hero">Set my goal — it's free</Link>
            <a href="#how" className="btn-ghost">See how it works <span className="arrow">↓</span></a>
          </div>
          <div className="hero-stats">
            {[
              {count:"10",pre:"",suf:"%",dec:"0",label:"vs 0.01% in a bank account",init:"4%"},
              {count:"1200",pre:"$",suf:"+",dec:"0",label:"avg saved on car purchases",init:"$0"},
              {count:"2",pre:"",suf:" min",dec:"0",label:"to your personalized plan",init:"0 min"},
            ].map((s,i) => (
              <div key={i}>
                <div className="stat-val" data-count={s.count} data-prefix={s.pre} data-suffix={s.suf} data-decimals={s.dec}>{s.init}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line"/>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems,...marqueeItems].map((item,i) => (
            <span key={i} className="marquee-item"><span className="marquee-dot"/>{item}</span>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <section className="intro-section">
        <div>
          <span className="section-label reveal">The Idea</span>
          <h2 className="intro-headline reveal">Most people save,<br/>then buy on <em>impulse.</em><br/>We flip that.</h2>
        </div>
        <div className="intro-body reveal-right">
          <p>When you know <strong>what you want to buy</strong> and <strong>when you need it</strong>, we put your savings in exactly the right place to grow. Not a bank account earning 0.01%. The right instrument, matched to your timeline.</p>
          <p>And when you're ready — car, home, vacation — our dealer network competes for your business. <strong>You arrive with money saved and the power to negotiate.</strong></p>
          <Link href="/goal" className="intro-link">Set your first goal →</Link>
        </div>
      </section>

      {/* STEPS */}
      <section className="steps-section" id="how">
        <div className="steps-header">
          <span className="section-label reveal">How it works</span>
          <h2 className="intro-headline reveal" style={{fontSize:48,marginTop:12}}>Three steps to a smarter purchase</h2>
        </div>
        <div className="steps-grid">
          {[
            {num:"01",icon:"🎯",title:"Tell us what you want",desc:"A 2-minute quiz captures your goal, budget, timeline, and monthly savings capacity. We build your personalized plan instantly — no account needed.",link:"Take the quiz",href:"/goal"},
            {num:"02",icon:"📈",title:"We put your money to work",desc:"Based on your timeline we recommend exactly where to save — high-yield accounts, bonds, or index ETFs. Your savings earn 4–10% instead of near zero.",link:"Investment guide",href:"/invest"},
            {num:"03",icon:"🤝",title:"Get the best deal",desc:"When you're ready, vetted dealers see your savings profile and compete for your business. You show up with money saved and the power to negotiate.",link:"See marketplace",href:"/marketplace"},
          ].map((step,i) => (
            <div key={i} className="step-card" style={{position:"relative"}}>
              {i < 2 && <div className="step-connector">→</div>}
              <div className="step-num">{step.num}</div>
              <div className="step-icon-wrap">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              <Link href={step.href} style={{display:"inline-flex",alignItems:"center",gap:6,color:"#1A5C3A",fontSize:13,textDecoration:"none",borderBottom:"1px solid rgba(26,92,58,0.3)",paddingBottom:2,marginTop:24}}>
                {step.link} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* HORIZONTAL FEATURES */}
      <div className="h-scroll-outer">
        <h3 className="reveal" style={{fontFamily:"Georgia,serif",fontSize:32,fontWeight:400,paddingLeft:64,marginBottom:36,color:"#1C2B1E",letterSpacing:-1}}>
          Everything you need, <em style={{fontStyle:"italic",color:"#1A5C3A"}}>nothing you don't</em>
        </h3>
        <div className="h-scroll-inner" style={{overflowX:"auto",scrollbarWidth:"none" as any}}>
          {featureCards.map((card,i) => (
            <div key={i} className="h-card">
              <div className="h-card-icon">{card.icon}</div>
              <h4 className="h-card-title">{card.title}</h4>
              <p className="h-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
        <p style={{textAlign:"center",fontSize:11,color:"#9A9A8A",marginTop:24,letterSpacing:1}}>← DRAG TO EXPLORE →</p>
      </div>

      {/* INVESTMENTS */}
      <section className="invest-section">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center",marginBottom:0}}>
          <div>
            <span className="section-label reveal">Where your money goes</span>
            <h2 className="intro-headline reveal" style={{marginTop:12}}>The right investment for your <em>timeline</em></h2>
          </div>
          <p className="reveal-right" style={{fontSize:16,color:"#7A8B7C",lineHeight:1.8}}>We earn a small referral fee from investment platforms when you open an account through our links. This keeps the platform free for you — and we only recommend what genuinely fits your goal.</p>
        </div>
        <div className="invest-grid">
          {[
            {ret:"~4.8%",yield_:"annual yield",name:"High-Yield Savings Account",desc:"FDIC-insured. Zero market risk. Earn 4-5% APY while your money stays fully liquid. Perfect for goals under 12 months.",risk:"No risk · Under 1 year",bar:"#1A5C3A"},
            {ret:"~4.5%",yield_:"annual yield",name:"US Treasury Bonds (BND)",desc:"Backed by the US government. Buy at TreasuryDirect.gov with zero fees. Best for 1-3 year goals with safety in mind.",risk:"Very Low Risk · 1-3 years",bar:"#C4973A"},
            {ret:"~10%",yield_:"avg annual return",name:"S&P 500 Index ETF (VOO)",desc:"Own the 500 largest US companies in one fund. Lowest fees, best long-term track record. Ideal for goals 3-5+ years away.",risk:"Medium Risk · 3+ years",bar:"#2B6CB0"},
            {ret:"~9%",yield_:"avg annual return",name:"Real Estate ETF (VNQ)",desc:"Invest in hundreds of properties without a mortgage. Pays regular dividends. Long-term wealth building alongside your goal.",risk:"Medium Risk · Long-term",bar:"#0D3D23"},
          ].map((inv,i) => (
            <div key={i} className="invest-card">
              <div className="invest-bar" style={{background:inv.bar}}/>
              <div className="invest-return" style={{color:inv.bar}}>{inv.ret}</div>
              <div className="invest-yield">{inv.yield_}</div>
              <div className="invest-name">{inv.name}</div>
              <div className="invest-desc">{inv.desc}</div>
              <span className="invest-chip">{inv.risk}</span>
            </div>
          ))}
        </div>
        <p style={{fontSize:11,color:"#9A9A8A",textAlign:"center",marginTop:28}}>Past returns are estimates. Not financial advice. Consult a licensed advisor.</p>
      </section>

      {/* NUMBERS */}
      <section className="numbers-section">
        <div className="numbers-label reveal">By the numbers</div>
        <h2 className="numbers-headline reveal">Why this matters</h2>
        <div className="numbers-grid">
          {[
            {val:45,pre:"",suf:"M",dec:0,label:"Americans planning a big purchase this year"},
            {val:2500,pre:"$",suf:"+",dec:0,label:"average car overpayment without a plan or leverage"},
            {val:0.01,pre:"",suf:"%",dec:2,label:"what a typical bank savings account earns you"},
            {val:74,pre:"",suf:"%",dec:0,label:"of buyers regret a major purchase made without preparation"},
          ].map((n,i) => (
            <div key={i} className="num-cell">
              <div className="num-val" data-count={n.val} data-prefix={n.pre} data-suffix={n.suf} data-decimals={n.dec}>{n.pre}0{n.suf}</div>
              <div className="num-desc">{n.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="test-section">
        <span className="section-label reveal">Real results</span>
        <h2 className="intro-headline reveal" style={{marginTop:12}}>Real goals, real savings</h2>
        <div className="test-grid">
          {[
            {stars:"★★★★★",text:"I saved an extra $4,200 on my Tesla Model 3 because the platform helped me time my purchase right and gave me real negotiating power with the dealer.",name:"Sarah M.",role:"Tesla Model 3 buyer"},
            {stars:"★★★★★",text:"I never invested before in my life. The quiz told me exactly where to put my down payment savings. I had $8,000 more than expected when I was ready to buy.",name:"David K.",role:"First-time home buyer"},
            {stars:"★★★★★",text:"We used the 18-month savings plan for our family vacation. The ETF recommendation earned us $2,000 extra — we upgraded to business class with that money.",name:"Priya R.",role:"Family vacation planner"},
          ].map((t,i) => (
            <div key={i} className="test-card">
              <div className="test-stars">{t.stars}</div>
              <p className="test-text">"{t.text}"</p>
              <div className="test-name">{t.name}</div>
              <div className="test-role">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-headline">Ready to buy <em>smarter?</em></h2>
        <p className="cta-sub">Set your goal in 2 minutes. We'll build your personalized savings plan — completely free.</p>
        <div className="cta-btns">
          <Link href="/goal" className="btn-dark">Set my goal now</Link>
          <Link href="/learn" className="btn-outline">Learn how it works</Link>
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
