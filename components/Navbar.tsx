"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const router = useRouter();

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "transparent" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 64px", height: 80, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: "#fff", textDecoration: "none" }}>
          Invest<span style={{ color: "#B47FFF" }}>Before</span>YouSpend
        </Link>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {user ? (
            <>
              <Link href="/dashboard" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Dashboard</Link>
              <button onClick={() => { logout(); router.push("/"); }} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer" }}>Log out</button>
            </>
          ) : (
            <>
              <Link href="/auth" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Log in</Link>
              <Link href="/goal" style={{ background: "rgba(180,127,255,0.12)", border: "1px solid rgba(180,127,255,0.3)", color: "#C4BEFF", padding: "10px 24px", borderRadius: 30, fontSize: 13, textDecoration: "none" }}>Start Free →</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
