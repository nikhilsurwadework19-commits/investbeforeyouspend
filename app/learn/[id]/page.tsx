import { investmentTopics } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LearnTopicPage({ params }: { params: { id: string } }) {
  const topic = investmentTopics.find(t => t.id === params.id);
  if (!topic) notFound();
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:underline mb-6"><ArrowLeft className="w-4 h-4"/>Back to Learn</Link>
        <div className="bg-white rounded-2xl border border-slate-100 p-8">
          <div className="text-4xl mb-3">{topic.emoji}</div>
          <span className="text-xs font-semibold bg-brand-100 text-brand-700 px-2 py-1 rounded-full">{topic.riskLevel} risk · {topic.readTime}</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">{topic.title}</h1>
          <p className="text-slate-500 mb-8">{topic.description}</p>
          <div className="prose prose-slate max-w-none">
            {topic.content.split("\n\n").map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) return <h3 key={i} className="font-bold text-slate-900 text-lg mt-6 mb-2">{para.replace(/\*\*/g,"")}</h3>;
              if (para.startsWith("**")) return <p key={i} className="text-slate-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{__html:para.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}} />;
              return <p key={i} className="text-slate-700 leading-relaxed mb-4">{para}</p>;
            })}
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <Link href="/goal" className="flex-1 bg-brand-600 text-white font-semibold py-3 rounded-xl text-center hover:bg-brand-700 transition-colors text-sm">Apply this to my goal <ArrowRight className="inline w-4 h-4 ml-1"/></Link>
          <Link href="/chat" className="flex-1 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-center hover:bg-slate-50 transition-colors text-sm">Ask AI a question</Link>
        </div>
      </div>
    </div>
  );
}
