'use client';

import { useEffect, useState } from 'react';

const responses = [
  {
    keywords: ['vitaranai', 'distributor', 'distribution', 'inventory', 'orders', 'payments', 'routes'],
    text: 'VitaranAI is our distributor management product for inventory forecasting, order automation, payments tracking, and route planning.',
  },
  {
    keywords: ['cloud', 'migration', 'aws', 'azure', 'gcp'],
    text: 'Our cloud migration services move applications securely to AWS, Azure or GCP with scalable architecture and managed operations.',
  },
  {
    keywords: ['ai', 'dashboard', 'data', 'analytics', 'insights'],
    text: 'We build AI dashboards and analytics systems that help leaders make faster decisions with real-time insights.',
  },
  {
    keywords: ['product', 'development', 'saas', 'software'],
    text: 'Soxira delivers end-to-end product development from concept to launch, with modern UI, secure APIs, and rapid iteration.',
  },
  {
    keywords: ['contact', 'demo', 'consultation', 'quote'],
    text: 'You can request a demo or consultation from our contact page, and our team will reach out quickly.',
  },
];

const fallbackResponse =
  'I’m here to help with AI, cloud, product engineering, and VitaranAI distributor automation. Ask me a question and I’ll point you in the right direction.';

function getResponse(message: string) {
  const text = message.toLowerCase();
  for (const item of responses) {
    if (item.keywords.some((keyword) => text.includes(keyword))) {
      return item.text;
    }
  }
  return fallbackResponse;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function ChatBot() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hello! I'm Soxira Chat, your AI assistant. Ask me about AI, cloud migration, VitaranAI, or product development.`,
    },
  ]);

  useEffect(() => {
    const greeting = getGreeting();
    setMessages([
      {
        role: 'bot',
        text: `${greeting}! I'm Soxira Chat, your AI assistant. Ask me about AI, cloud migration, VitaranAI, or product development.`,
      },
    ]);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { role: 'user', text: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput('');

    window.setTimeout(() => {
      const botMessage = { role: 'bot', text: getResponse(trimmed) };
      setMessages((current) => [...current, botMessage]);
    }, 300);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-violet-500 to-white shadow-2xl ring-2 ring-violet-400/60 transition-all duration-300 ${open ? 'scale-110 rotate-0' : 'scale-90 rotate-12'}`}
        title={open ? 'Close Chat' : 'Open Chat'}
        style={{ boxShadow: '0 0 32px 8px rgba(139,92,246,0.18)' }}
      >
        {/* Robot face */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white border-4 border-violet-400">
          {/* Eyes */}
          <span className="absolute left-3 top-5 h-2 w-2 rounded-full bg-purple-500 animate-[blink_4s_infinite]" />
          <span className="absolute right-3 top-5 h-2 w-2 rounded-full bg-purple-500 animate-[blink_4s_infinite] delay-150" />
          {/* Smile */}
          <span className="absolute left-1/2 bottom-3 h-1 w-6 -translate-x-1/2 rounded-full bg-violet-400" />
          {/* Antenna */}
          <span className="absolute top-0 left-1/2 h-3 w-1 -translate-x-1/2 rounded bg-purple-400" />
        </div>
        {/* Male robot chin */}
        <span className="absolute bottom-1 left-1/2 h-2 w-6 -translate-x-1/2 rounded-b-xl bg-violet-200" />
      </div>
      {open ? (
        <div className="mb-3 w-[360px] max-w-full rounded-[2rem] border border-white/10 bg-slate-950/95 p-4 shadow-[0_30px_120px_rgba(15,23,42,0.55)] backdrop-blur-xl animate-fade-in-up">
          <div className="mb-4 rounded-[1.75rem] bg-slate-900/90 p-4 text-sm text-slate-300 ring-1 ring-white/10">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-violet-500 to-white ring-2 ring-violet-400/60">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-violet-400">
                  <span className="absolute left-2 top-3 h-1.5 w-1.5 rounded-full bg-purple-500 animate-[blink_4s_infinite]" />
                  <span className="absolute right-2 top-3 h-1.5 w-1.5 rounded-full bg-purple-500 animate-[blink_4s_infinite] delay-150" />
                  <span className="absolute left-1/2 bottom-2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-violet-400" />
                  <span className="absolute top-0 left-1/2 h-2 w-0.5 -translate-x-1/2 rounded bg-purple-400" />
                </div>
                <span className="absolute bottom-0 left-1/2 h-1 w-4 -translate-x-1/2 rounded-b-xl bg-violet-200" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Soxira Chat</p>
                <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">AI assistant</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">Ask anything about AI, Cloud, Product, or VitaranAI without any backend.</p>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto pr-1 text-sm">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`rounded-3xl px-4 py-3 ${
                  message.role === 'bot' ? 'bg-slate-900/90 text-slate-200' : 'bg-slate-800/95 text-slate-100 self-end'
                }`}
              >
                <p className={`text-[13px] leading-6 ${message.role === 'bot' ? 'text-slate-300' : 'text-slate-100'}`}>
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400/70"
              placeholder="Type a question..."
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}
      <style jsx>{`
        @keyframes blink {
          0%, 20%, 40%, 60%, 100% { transform: scaleY(1); }
          10%, 30%, 50%, 70%, 90% { transform: scaleY(0.15); }
        }
        .animate-[blink_4s_infinite] {
          animation: blink 4s infinite;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
