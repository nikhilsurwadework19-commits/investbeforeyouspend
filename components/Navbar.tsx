"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    padding: "0 clamp(20px,4vw,64px)",
    background: scrolled ? "rgba(5,8,24,0.95)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(180,127,255,0.1)" : "none",
    transition: "all 0.4s ease",
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1200, margin: "0 auto", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, fontWeight: 300, color: "#fff", textDecoration: "none", letterSpacing: -0.3 }}>
          Invest<span style={{ color: "#B47FFF" }}>Before</span>YouSpend
        </Link>

        {/* Desktop */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontSize: 13, textDecoration: "none", letterSpacing: 0.3, transition: "color 0.2s",
              color: pathname === l.href ? "#C4BEFF" : "rgba(255,255,255,0.45)",
              borderBottom: pathname === l.href ? "1px solid rgba(180,127,255,0.4)" : "none",
              paddingBottom: 2
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }} className="desktop-nav">
          {user ? (
            <>
              <Link href="/dashboard" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Dashboard</Link>
              <button onClick={() => { logout(); router.push("/"); }} style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer" }}>Log out</button>
            </>
          ) : (
            <>
              <Link href="/auth" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Log in</Link>
              <Link href="/goal" style={{ background: "rgba(180,127,255,0.12)", border: "1px solid rgba(180,127,255,0.3)", color: "#C4BEFF", padding: "9px 22px", borderRadius: 30, fontSize: 13, textDecoration: "none", transition: "all 0.3s" }}>
                Start Free →
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="mobile-menu-btn" style={{ background: "none", border: "1px solid rgba(180,127,255,0.2)", color: "#C4BEFF", cursor: "pointer", fontSize: 18, padding: "6px 12px", borderRadius: 8, display: "none" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "rgba(5,8,24,0.98)", padding: "16px 24px 24px", borderTop: "1px solid rgba(180,127,255,0.1)" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", color: pathname === l.href ? "#C4BEFF" : "rgba(255,255,255,0.55)", textDecoration: "none", padding: "13px 0", fontSize: 16, borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Cormorant Garamond',serif", fontWeight: 300 }}>
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "center" }}>
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Dashboard</Link>
                <button onClick={() => { logout(); setOpen(false); }} style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer" }}>Log out</button>
              </>
            ) : (
              <>
                <Link href="/auth" onClick={() => setOpen(false)} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Log in</Link>
                <Link href="/goal" onClick={() => setOpen(false)} style={{ background: "rgba(180,127,255,0.12)", border: "1px solid rgba(180,127,255,0.3)", color: "#C4BEFF", padding: "9px 22px", borderRadius: 30, fontSize: 13, textDecoration: "none" }}>Start Free →</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
