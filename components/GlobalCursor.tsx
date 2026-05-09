"use client";
import { useEffect, useRef } from "react";

export default function GlobalCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return; // desktop only

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });

    let rafId: number;
    function animate() {
      dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.transform = `translate(${rx - 18}px,${ry - 18}px)`;
      rafId = requestAnimationFrame(animate);
    }
    animate();

    // Expand on interactive elements
    const onEnter = () => { dot.classList.add("expand"); ring.classList.add("expand"); };
    const onLeave = () => { dot.classList.remove("expand"); ring.classList.remove("expand"); };

    const observe = () => {
      document.querySelectorAll("a,button,.inv-card,.step-card,.scard,.icard,.ncell,.test-card,.h-card").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    observe();

    // Re-observe after navigation
    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} id="cdot" style={{
        width: 8, height: 8, background: "#B47FFF", borderRadius: "50%",
        position: "fixed", top: 0, left: 0, pointerEvents: "none",
        zIndex: 99999, transition: "width .25s, height .25s, background .25s"
      }} />
      <div ref={ringRef} id="cring" style={{
        width: 36, height: 36, border: "1px solid rgba(180,127,255,0.45)",
        borderRadius: "50%", position: "fixed", top: 0, left: 0,
        pointerEvents: "none", zIndex: 99998,
        transition: "width .3s, height .3s, border-color .3s"
      }} />
      <style>{`
        #cdot.expand { width: 6px !important; height: 6px !important; background: #fff !important; }
        #cring.expand { width: 50px !important; height: 50px !important; border-color: rgba(180,127,255,0.7) !important; }
        @media (max-width: 768px) { #cdot, #cring { display: none !important; } }
      `}</style>
    </>
  );
}
