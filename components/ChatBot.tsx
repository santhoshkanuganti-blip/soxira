'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'bot' | 'user'; text: string };

const SUGGESTED_PROMPTS = [
  'How can AI help my distribution business?',
  'Tell me about VitaranAI.',
  'Oracle ERP implementation services.',
  'AI for Finance and NBFCs.',
  'AI for Insurance companies.',
];

const KB: { keywords: string[]; text: string }[] = [
  {
    keywords: ['vitaranai', 'distributor', 'distribution', 'inventory', 'order', 'route', 'supply chain'],
    text: 'VitaranAI is our flagship AI-powered operating system for small and medium businesses, distributors, and manufacturers. It automates procurement, inventory management, sales tracking, vendor management, route optimization, and analytics — reducing manual effort by up to 70%. Visit VitaranAI.in to explore.',
  },
  {
    keywords: ['oracle', 'erp', 'fusion', 'scm', 'financials', 'hcm', 'oic', 'integration'],
    text: 'Soxira provides full-cycle Oracle implementation services — Oracle ERP, Oracle Fusion Cloud, Oracle SCM, Oracle Financials, Oracle HCM, and Oracle Integration Cloud (OIC). Our team has 25+ years of Oracle expertise across upgrades, migrations, and managed services.',
  },
  {
    keywords: ['snowflake', 'dbt', 'data engineering', 'data pipeline', 'analytics', 'lakehouse'],
    text: 'We build modern data platforms using Snowflake and DBT — from data pipelines and lakehouse architecture to real-time analytics. Our data engineering team delivers end-to-end solutions on AWS, Azure, and GCP.',
  },
  {
    keywords: ['cloud', 'migration', 'aws', 'azure', 'gcp', 'infrastructure'],
    text: 'Soxira helps businesses migrate to AWS, Azure, or GCP with minimal downtime. Our cloud migration services include lift-and-shift, re-architecture, microservices, and cloud-native development.',
  },
  {
    keywords: ['ai', 'genai', 'generative', 'llm', 'agent', 'automation', 'dashboard', 'consulting'],
    text: 'Our AI practice covers AI strategy consulting, Generative AI solutions (LLMs, RAG pipelines, AI copilots), AI dashboards with real-time insights, and AI agents that automate complex workflows. We help Indian businesses move from manual to intelligent operations.',
  },
  {
    keywords: ['finance', 'nfbc', 'bank', 'banking', 'credit', 'loan', 'bfsi'],
    text: 'For Finance and BFSI organizations, Soxira delivers AI-powered credit decisioning, risk management automation, regulatory compliance reporting, and intelligent customer analytics. Our solutions are tailored for NBFCs, banks, and lending institutions.',
  },
  {
    keywords: ['insurance', 'underwriting', 'claim', 'policy'],
    text: 'Soxira helps insurers with AI-driven underwriting automation, claims processing, fraud detection, and customer intelligence — reducing processing time and improving profitability.',
  },
  {
    keywords: ['healthcare', 'hospital', 'pharma', 'medical', 'drug'],
    text: 'Our healthcare solutions include AI-powered medical supply chain, drug inventory management with expiry tracking and FIFO compliance, and regulatory reporting automation for hospitals and pharmaceutical distributors.',
  },
  {
    keywords: ['msme', 'small business', 'sme', 'medium enterprise'],
    text: 'Soxira specifically designs solutions for small and medium businesses — affordable, AI-powered platforms that automate operations, digitize procurement, improve inventory visibility, and help smaller businesses compete with enterprise-grade technology.',
  },
  {
    keywords: ['manufacturing', 'factory', 'production', 'plant'],
    text: 'For manufacturers, Soxira delivers AI-driven demand forecasting, production planning, vendor management, and supply chain optimization — helping reduce costs and improve efficiency.',
  },
  {
    keywords: ['contact', 'demo', 'consultation', 'talk', 'speak', 'call', 'meeting', 'quote', 'pricing'],
    text: 'I\'d love to connect you with our team! Please visit our Contact page at soxira.com/contact or email info@soxira.com. Our experts will respond within 24 hours to schedule a consultation or demo.',
  },
  {
    keywords: ['about', 'soxira', 'company', 'who', 'founded', 'team'],
    text: 'Soxira AI Solutions is an AI-first enterprise technology company helping small and medium businesses, distributors, manufacturers, and BFSI organizations digitize and scale. Founded by Kulkarni Vinuthna (CEO), led by Santhosh K (Chief AI & Product Officer) and Praveen Kumar Gambheera Rao (CTO) — with 70+ combined years of enterprise experience.',
  },
];

const FALLBACK = "I'm here to help! You can ask me about VitaranAI, Oracle ERP, AI solutions, Snowflake & DBT, cloud migration, or industry-specific technology. Or visit soxira.com/contact to speak with an expert.";

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((k) => lower.includes(k))) return entry.text;
  }
  return FALLBACK;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hi 👋 I'm Soxira AI.\n\nI can help you with:\n• VitaranAI\n• Oracle ERP & Fusion\n• AI & GenAI Solutions\n• Finance & Insurance AI\n• Cloud Migration\n• Snowflake & DBT",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, messages]);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: 'bot', text: getResponse(trimmed) }]);
    }, 900 + Math.random() * 400);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage],
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-[360px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_32px_80px_rgba(20,25,50,0.18)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line bg-accent-tint px-4 py-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                  <circle cx="7.5" cy="14.5" r="1.5" fill="white" stroke="none" />
                  <circle cx="16.5" cy="14.5" r="1.5" fill="white" stroke="none" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">Ask Soxira AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-good" />
                  <p className="text-[11px] text-ink-muted">Online · Typically replies instantly</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition hover:bg-surface-2 hover:text-ink"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex max-h-[340px] flex-col gap-2 overflow-y-auto p-4 text-sm">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-surface-2 text-ink-muted'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="rounded-2xl bg-surface-2">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested prompts (only show if ≤1 message) */}
            {messages.length <= 1 && (
              <div className="border-t border-line px-4 py-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-line-strong">Suggested</p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => sendMessage(p)}
                      className="rounded-xl border border-line bg-surface-2 px-3 py-2 text-left text-[12px] text-ink-muted transition hover:border-accent/40 hover:bg-accent-tint hover:text-ink"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-line p-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  className="min-w-0 flex-1 rounded-xl border border-line bg-paper px-3.5 py-2.5 text-[13px] text-ink outline-none placeholder:text-line-strong focus:border-accent focus:ring-1 focus:ring-accent-tint"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition hover:bg-accent-bright disabled:opacity-40"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close Soxira AI' : 'Open Soxira AI'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent shadow-[0_8px_28px_rgba(27,42,107,0.35)] transition-shadow hover:bg-accent-bright hover:shadow-[0_12px_36px_rgba(27,42,107,0.45)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="text-lg text-white">
              ✕
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                <circle cx="7.5" cy="14.5" r="1.5" fill="white" stroke="none" />
                <circle cx="16.5" cy="14.5" r="1.5" fill="white" stroke="none" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread pulse when closed */}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
