"use client";
import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Bot } from "lucide-react";

interface Message { role:"user"|"assistant"; content:string; }
const starters = ["What is an ETF and should I invest in one?","How long should I save before buying a car?","What's the difference between stocks and bonds?","How much emergency fund do I need before investing?"];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  async function send(text?: string) {
    const msg = text || input.trim();
    if (!msg) return;
    const newMsgs: Message[] = [...messages, { role:"user", content:msg }];
    setMessages(newMsgs); setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ messages: newMsgs }) });
      const data = await res.json();
      setMessages([...newMsgs, { role:"assistant", content: data.content || data.error || "Sorry, something went wrong." }]);
    } catch { setMessages([...newMsgs, { role:"assistant", content:"Connection error. Please try again." }]); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="max-w-2xl w-full mx-auto flex flex-col flex-1 px-4 py-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-3"><Bot className="w-6 h-6 text-brand-600"/></div>
          <h1 className="text-2xl font-bold text-slate-900">Ask me anything about investing</h1>
          <p className="text-slate-500 text-sm mt-1">Educational guidance only · Not financial advice</p>
        </div>
        {messages.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {starters.map(s => <button key={s} onClick={() => send(s)} className="bg-white border border-slate-200 rounded-xl p-3 text-left text-sm text-slate-600 hover:border-brand-300 hover:text-brand-700 transition-colors">{s}</button>)}
          </div>
        )}
        <div className="flex-1 space-y-4 mb-4">
          {messages.map((m,i) => (
            <div key={i} className={`flex ${m.role==="user"?"justify-end":""}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role==="user"?"bg-brand-600 text-white":"bg-white border border-slate-100 text-slate-700"}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && <div className="flex"><div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 text-slate-400 text-sm animate-pulse">Thinking...</div></div>}
          <div ref={bottomRef}/>
        </div>
        <div className="flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder="Ask about investing, saving, or your goal..." className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"/>
          <button onClick={()=>send()} disabled={loading||!input.trim()} className="bg-brand-600 text-white px-4 py-3 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50">
            <Send className="w-4 h-4"/>
          </button>
        </div>
      </div>
    </div>
  );
}
