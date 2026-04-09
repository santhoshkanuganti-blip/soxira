'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '20+', label: 'Years of experience' },
  { value: '50+', label: 'Enterprise clients' },
  { value: '6+', label: 'Industry domains' },
  { value: '100%', label: 'Delivery commitment' },
];

export function AboutCompany() {
  return (
    <section className="py-8 px-4 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-400">Who We Are</span>
            <h2 className="mt-2 text-2xl font-bold text-white leading-tight sm:text-3xl">
              Built on 20+ years of{' '}
              <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">
                enterprise expertise
              </span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
              Soxira AI Solutions is a technology-driven company focused on building intelligent products,
              modernizing enterprise systems, and transforming business operations using AI, cloud, and data engineering.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
              Though newly established, Soxira is backed by a team with 20+ years of industry experience delivering
              scalable, high-performance solutions across finance, healthcare, insurance, hospitality, and distribution.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                  <p className="text-xl font-extrabold text-white">{s.value}</p>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-700/20 via-sky-600/10 to-white/5 p-5 backdrop-blur-xl shadow-2xl sm:p-6">
              <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-sky-400/20 blur-2xl" />
              <div className="relative space-y-3 text-center">
                {['AI-Powered Solutions', 'Cloud Transformation', 'Data Engineering', 'Mobile & Web Apps'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-xs font-semibold text-slate-100 shadow-lg sm:text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
