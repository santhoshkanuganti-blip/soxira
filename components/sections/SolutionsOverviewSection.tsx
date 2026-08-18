'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    title: 'AI & GenAI',
    subtitle: 'Intelligence at every layer',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
        <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    items: [
      { label: 'AI Strategy Consulting', desc: 'Roadmaps and frameworks for enterprise AI adoption.' },
      { label: 'Generative AI Solutions', desc: 'LLM integrations, RAG pipelines and AI copilots.' },
      { label: 'AI Dashboards & Analytics', desc: 'Real-time intelligence for operational decisions.' },
      { label: 'AI Agents & Automation', desc: 'Autonomous workflows that replace manual processes.' },
    ],
    cta: { label: 'Explore AI Solutions', href: '/ai-dashboard-consulting' },
  },
  {
    title: 'Enterprise Applications',
    subtitle: 'Oracle Cloud & ERP expertise',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    items: [
      { label: 'Oracle ERP & Fusion Cloud', desc: 'Full-cycle Oracle implementations and upgrades.' },
      { label: 'Oracle SCM & Financials', desc: 'Supply chain and financial module delivery.' },
      { label: 'Oracle Integration Cloud', desc: 'OIC-powered integrations and middleware.' },
      { label: 'Oracle HCM', desc: 'HR transformation on Oracle cloud platform.' },
    ],
    cta: { label: 'Explore Oracle Solutions', href: '/oracle-implementation-services' },
  },
  {
    title: 'Data & Cloud',
    subtitle: 'Modern data infrastructure',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    items: [
      { label: 'Snowflake & DBT', desc: 'Modern analytics engineering on cloud data platforms.' },
      { label: 'Data Engineering', desc: 'Pipelines, lakehouse architecture and data ops.' },
      { label: 'Cloud Migration', desc: 'Lift-and-shift and re-architecture to AWS, Azure, GCP.' },
      { label: 'Cloud-Native Development', desc: 'Microservices, containers and serverless platforms.' },
    ],
    cta: { label: 'Explore Data & Cloud', href: '/data-engineering-snowflake-dbt' },
  },
];

const CAPABILITIES = PILLARS.flatMap((p) => p.items.map((it) => it.label));

export default function SolutionsOverviewSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal">What We Do</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Three Pillars of Transformation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
            From AI strategy to enterprise applications to modern data infrastructure — we cover the full stack of digital transformation.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-[0_16px_40px_rgba(11,110,122,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_20px_48px_rgba(11,110,122,0.14)]"
            >
              <div className="relative">
                {/* Icon */}
                <div className="mb-5 w-fit rounded-xl border border-line bg-teal-tint p-3 text-teal">
                  {pillar.icon}
                </div>

                <h3 className="text-lg font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-0.5 text-xs text-teal">{pillar.subtitle}</p>

                <ul className="mt-5 space-y-3.5">
                  {pillar.items.map((it) => (
                    <li key={it.label} className="flex gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal opacity-70" />
                      <div>
                        <p className="text-sm font-medium text-ink">{it.label}</p>
                        <p className="mt-0.5 text-xs leading-5 text-ink-muted">{it.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <Link
                  href={pillar.cta.href}
                  className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold text-teal transition-all group-hover:gap-2.5"
                >
                  {pillar.cta.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continuous capability strip — every service across the three pillars, in motion */}
        <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track flex w-max items-center gap-3">
            {[...CAPABILITIES, ...CAPABILITIES].map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="whitespace-nowrap rounded-full border border-teal/20 bg-surface px-4 py-2 text-xs font-medium text-teal shadow-[0_4px_14px_rgba(11,110,122,0.08)]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
