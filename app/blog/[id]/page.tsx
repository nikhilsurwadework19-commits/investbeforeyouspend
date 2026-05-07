import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogPosts.find(p => p.id === id);
  if (!post) notFound();
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:underline mb-6"><ArrowLeft className="w-4 h-4"/>Back to Blog</Link>
        <div className="bg-white rounded-2xl border border-slate-100 p-8">
          <div className="text-4xl mb-3">{post!.emoji}</div>
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-6">{post!.title}</h1>
          <div>
            {post!.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-slate-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{__html:para.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}} />
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link href="/goal" className="inline-flex items-center gap-2 bg-brand-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors text-sm">Set my goal</Link>
        </div>
      </div>
    </div>
  );
}