'use client';

import { motion } from 'framer-motion';

const expertise = [
  {
    icon: '🤖',
    title: 'AI & Machine Learning',
    desc: 'Custom AI models, NLP, computer vision, and intelligent automation for measurable business transformation.',
  },
  {
    icon: '☁️',
    title: 'Cloud Migration',
    desc: 'AWS, GCP, and Azure migrations with managed cloud operations and scalable architecture design.',
  },
  {
    icon: '📊',
    title: 'Data Engineering',
    desc: 'Modern data pipelines, Snowflake, DBT, and real-time analytics for intelligence-driven decision making.',
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    desc: 'iOS & Android apps, mobile-first platforms, and cross-platform solutions built for scale and user delight.',
  },
  {
    icon: '💸',
    title: 'Commission & Affiliate Systems',
    desc: 'MLM commission engines, affiliate platform automation, and digital wallet payout integrations.',
  },
  {
    icon: '🏢',
    title: 'Enterprise Modernization',
    desc: 'Legacy system upgrades, SaaS transformation, custom ERP, and secure enterprise platform engineering.',
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
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">What We Do</span>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Our Expertise</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-muted sm:text-base">
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
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer rounded-3xl border border-line bg-surface p-5 shadow-[0_16px_40px_rgba(20,25,50,0.06)] transition-all hover:border-accent/30"
            >
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-3 text-base font-semibold text-ink sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-xs leading-6 text-ink-muted sm:text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
