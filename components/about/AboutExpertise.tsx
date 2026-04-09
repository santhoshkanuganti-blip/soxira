'use client';

import { motion } from 'framer-motion';

const expertise = [
  {
    icon: '🤖',
    title: 'AI & Machine Learning',
    desc: 'Custom AI models, NLP, computer vision, and intelligent automation for measurable business transformation.',
    accent: 'from-violet-500/30 to-purple-500/10',
    glow: 'rgba(139,92,246,0.25)',
  },
  {
    icon: '☁️',
    title: 'Cloud Migration',
    desc: 'AWS, GCP, and Azure migrations with managed cloud operations and scalable architecture design.',
    accent: 'from-sky-500/30 to-blue-500/10',
    glow: 'rgba(56,189,248,0.25)',
  },
  {
    icon: '📊',
    title: 'Data Engineering',
    desc: 'Modern data pipelines, Snowflake, DBT, and real-time analytics for intelligence-driven decision making.',
    accent: 'from-emerald-500/30 to-sky-400/10',
    glow: 'rgba(52,211,153,0.20)',
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    desc: 'iOS & Android apps, mobile-first platforms, and cross-platform solutions built for scale and user delight.',
    accent: 'from-fuchsia-500/30 to-violet-500/10',
    glow: 'rgba(217,70,239,0.20)',
  },
  {
    icon: '💸',
    title: 'Commission & Affiliate Systems',
    desc: 'MLM commission engines, affiliate platform automation, and digital wallet payout integrations.',
    accent: 'from-amber-500/25 to-orange-400/10',
    glow: 'rgba(245,158,11,0.20)',
  },
  {
    icon: '🏢',
    title: 'Enterprise Modernization',
    desc: 'Legacy system upgrades, SaaS transformation, custom ERP, and secure enterprise platform engineering.',
    accent: 'from-blue-600/30 to-violet-500/10',
    glow: 'rgba(99,102,241,0.20)',
  },
];

export function AboutExpertise() {
  return (
    <section className="py-8 px-4 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-400">What We Do</span>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Our Expertise</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
            Deep domain expertise across the full technology stack — from AI to cloud to data to mobile.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ scale: 1.02, boxShadow: `0 0 30px 0 ${item.glow}` }}
              className={`cursor-pointer rounded-3xl border border-white/10 bg-gradient-to-br ${item.accent} p-5 backdrop-blur-lg shadow-xl transition-all`}
            >
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
