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
    gradient: 'from-violet-700/40 to-sky-500/20',
  },
  {
    name: 'First Doctor',
    icon: '🩺',
    tag: 'Healthcare',
    desc: 'Digital-first healthcare platform for clinics and telemedicine providers, enabling seamless patient management and remote consultations.',
    href: '#',
    external: false,
    gradient: 'from-emerald-600/40 to-sky-400/20',
  },
  {
    name: 'Commission Engine',
    icon: '💸',
    tag: 'FinTech & MLM',
    desc: 'Automated affiliate and MLM commission engine with digital wallet integrations for managing partners, incentives, and financial workflows at scale.',
    href: '#',
    external: false,
    gradient: 'from-fuchsia-600/40 to-violet-400/20',
  },
];

export function AboutProducts() {
  return (
    <section className="py-20 px-4 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Our Products</span>
          <h2 className="mt-4 text-4xl font-bold text-white">Flagship Products</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Purpose-built platforms solving real-world challenges across distribution, healthcare, and fintech.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className={`group flex flex-col rounded-3xl border border-white/10 bg-gradient-to-br ${p.gradient} p-8 shadow-2xl backdrop-blur-xl transition-all`}
            >
              <span className="text-5xl">{p.icon}</span>
              <span className="mt-5 inline-block self-start rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-300">
                {p.tag}
              </span>
              <h3 className="mt-3 text-2xl font-bold text-white">{p.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{p.desc}</p>
              <a
                href={p.href}
                target={p.external ? '_blank' : undefined}
                rel={p.external ? 'noreferrer' : undefined}
                className="mt-6 inline-block rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-3 text-center text-sm font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-violet-500/30"
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
