'use client';

import { motion } from 'framer-motion';

const products = [
  {
    name: 'VitaranAI',
    icon: '🔗',
    tag: 'Distribution & Logistics',
    desc: 'AI-powered distribution and order management system for cement, steel, gas, and FMCG distributors — optimizing inventory, sales, and financial operations.',
    href: 'https://VitaranAI.in',
    external: true,
    gradient: '',
  },
  {
    name: 'First Doctor',
    icon: '🩺',
    tag: 'Healthcare',
    desc: 'Digital-first healthcare platform for clinics and telemedicine providers, enabling seamless patient management and remote consultations.',
    href: '#',
    external: false,
    gradient: '',
  },
  {
    name: 'Commission Engine',
    icon: '💸',
    tag: 'FinTech & MLM',
    desc: 'Automated affiliate and MLM commission engine with digital wallet integrations for managing partners, incentives, and financial workflows at scale.',
    href: '#',
    external: false,
    gradient: '',
  },
];

export function AboutProducts() {
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
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Our Products</span>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Flagship Products</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-muted sm:text-base">
            Purpose-built platforms solving real-world challenges across distribution, healthcare, and fintech.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className={`group flex flex-col rounded-3xl border border-line bg-gradient-to-br ${p.gradient} p-5 shadow-2xl  transition-all`}
            >
              <span className="text-3xl">{p.icon}</span>
              <span className="mt-3 inline-block self-start rounded-full border border-line bg-surface-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink-muted sm:text-xs">
                {p.tag}
              </span>
              <h3 className="mt-2 text-lg font-bold text-ink sm:text-xl">{p.name}</h3>
              <p className="mt-2 flex-1 text-xs leading-6 text-ink-muted sm:text-sm">{p.desc}</p>
              <a
                href={p.href}
                target={p.external ? '_blank' : undefined}
                rel={p.external ? 'noreferrer' : undefined}
                className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-center text-xs font-bold text-white shadow-lg transition hover:scale-105 sm:text-sm"
              >
                {p.external ? 'Visit Product →' : 'Learn More →'}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
