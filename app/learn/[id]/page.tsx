import { investmentTopics } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function LearnTopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = investmentTopics.find(t => t.id === id);
  if (!topic) notFound();

  return (
    <div className="space-page">
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(40px,5vw,80px) clamp(24px,5vw,64px)" }}>
        <Link href="/learn" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#7B5FFF", fontSize: 13, textDecoration: "none", letterSpacing: 1, textTransform: "uppercase", marginBottom: 48 }}>
          ← Back to Education
        </Link>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 52, marginBottom: 20 }}>{topic.emoji}</div>
          <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: topic.riskLevel === "None" ? "#A8FFD0" : topic.riskLevel.includes("Low") ? "#C4BEFF" : "#FFD080" }}>
            {topic.riskLevel} risk · {topic.readTime}
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 300, color: "#fff", letterSpacing: -2, lineHeight: 1.05, margin: "16px 0 20px" }}>
            {topic.title}
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>{topic.description}</p>
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(99,71,255,0.4),transparent)", margin: "40px 0" }} />

        <div style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.9 }}>
          {topic.content.split("\n\n").map((para, i) => {
            if (para.startsWith("**") && para.endsWith("**")) {
              return <h3 key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, color: "#fff", margin: "40px 0 14px", letterSpacing: -0.5 }}>{para.replace(/\*\*/g, "")}</h3>;
            }
            if (para.startsWith("**")) {
              return <p key={i} style={{ marginBottom: 18 }} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong style="color:rgba(255,255,255,0.8);font-weight:400">$1</strong>') }} />;
            }
            return <p key={i} style={{ marginBottom: 18 }}>{para}</p>;
          })}
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(99,71,255,0.4),transparent)", margin: "48px 0 40px" }} />

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" as const }}>
          <Link href="/goal" style={{ background: "linear-gradient(135deg,#6347FF,#B47FFF)", color: "#fff", padding: "14px 32px", borderRadius: 30, fontSize: 14, textDecoration: "none", fontWeight: 500 }}>
            Apply this to my goal →
          </Link>
          <Link href="/chat" style={{ border: "1px solid rgba(180,127,255,0.3)", color: "#C4BEFF", padding: "14px 32px", borderRadius: 30, fontSize: 14, textDecoration: "none" }}>
            Ask AI a question
          </Link>
        </div>
      </div>
    </div>
  );
}
