import { blogPosts } from "@/lib/data";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Money Tips & Guides</h1>
          <p className="text-slate-500">Practical advice to help you save, invest, and buy smarter.</p>
        </div>
        <div className="space-y-4">
          {blogPosts.map(p => (
            <Link key={p.id} href={`/blog/${p.id}`} className="bg-white rounded-2xl border border-slate-100 p-6 flex gap-4 hover:shadow-md transition-shadow group">
              <div className="text-3xl">{p.emoji}</div>
              <div>
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{p.category} · {p.readTime}</span>
                <h3 className="font-bold text-slate-900 text-lg mt-2 mb-1 group-hover:text-brand-600 transition-colors">{p.title}</h3>
                <p className="text-slate-500 text-sm">{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
