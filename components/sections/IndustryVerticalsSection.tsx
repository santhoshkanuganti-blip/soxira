'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const INDUSTRIES = [
  {
    title: 'MSMEs',
    href: '/industries/msmes',
    desc: 'AI-powered digital transformation for small and medium businesses across India.',
    cta: 'Explore MSME Solutions',
    glowColor: 'rgba(124,58,237,0.25)',
    borderHover: 'hover:border-violet-500/40',
    labelColor: 'text-violet-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Distributors',
    href: '/industries/distributors',
    desc: 'VitaranAI — end-to-end distributor management with AI inventory and route optimization.',
    cta: 'Explore VitaranAI',
    glowColor: 'rgba(14,165,233,0.25)',
    borderHover: 'hover:border-sky-500/40',
    labelColor: 'text-sky-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Manufacturing',
    href: '/industries/manufacturing',
    desc: 'Smart manufacturing with AI-driven supply chain, demand forecasting and operations intelligence.',
    cta: 'Explore Manufacturing AI',
    glowColor: 'rgba(16,185,129,0.25)',
    borderHover: 'hover:border-emerald-500/40',
    labelColor: 'text-emerald-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: 'Finance',
    href: '/industries/finance',
    desc: 'AI-powered credit decisioning, risk management and operations intelligence for NBFCs and banks.',
    cta: 'Explore Finance AI',
    glowColor: 'rgba(234,179,8,0.2)',
    borderHover: 'hover:border-yellow-500/40',
    labelColor: 'text-yellow-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    title: 'Insurance',
    href: '/industries/insurance',
    desc: 'AI-driven underwriting, claims automation and customer intelligence for insurers.',
    cta: 'Explore Insurance AI',
    glowColor: 'rgba(236,72,153,0.2)',
    borderHover: 'hover:border-pink-500/40',
    labelColor: 'text-pink-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Healthcare',
    href: '/industries/healthcare',
    desc: 'AI-powered supply chain, drug inventory management and compliance automation for healthcare.',
    cta: 'Explore Healthcare AI',
    glowColor: 'rgba(20,184,166,0.2)',
    borderHover: 'hover:border-teal-500/40',
    labelColor: 'text-teal-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function IndustryVerticalsSection() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      {/* bg glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(124,58,237,0.07),transparent)]" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400/80">Industry Solutions</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Built for Every Vertical
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Specialized AI and technology solutions tailored for the unique challenges of each industry.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INDUSTRIES.map((ind) => (
            <motion.div key={ind.title} variants={item}>
              <Link
                href={ind.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 ${ind.borderHover} hover:bg-white/[0.05]`}
                style={{
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${ind.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <div className={`mb-4 w-fit rounded-xl border border-white/[0.08] bg-white/[0.05] p-3 ${ind.labelColor}`}>
                  {ind.icon}
                </div>

                <h3 className="text-base font-semibold text-white">{ind.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{ind.desc}</p>

                <div className={`mt-5 flex items-center gap-1.5 text-xs font-medium ${ind.labelColor} transition-all group-hover:gap-2.5`}>
                  {ind.cta}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
