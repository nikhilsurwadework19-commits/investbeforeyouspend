"use client";
import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    interface Star { x: number; y: number; r: number; a: number; speed: number; }
    const stars: Star[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.1,
      a: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.5 + 0.05,
    }));

    const t0 = Date.now();
    let rafId: number;

    function draw() {
      const t = (Date.now() - t0) * 0.001;
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        const a = Math.max(0.05, Math.min(0.85, s.a + Math.sin(t * s.speed) * 0.2));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        pointerEvents: "none", background: "#050818"
      }}
    />
  );
}
