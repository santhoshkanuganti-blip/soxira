'use client';

import { motion } from 'framer-motion';

export function AboutMissionVision() {
  return (
    <section className="py-8 px-4 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-400">Purpose</span>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Mission &amp; Vision</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-700/30 via-purple-900/40 to-sky-400/10 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
          >
            <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl" />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-sky-400 shadow-lg">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white">Our Mission</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                To empower businesses with AI-driven solutions, cloud transformation, and data intelligence that enable
                smarter decisions and sustainable growth.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-700/30 via-blue-900/40 to-violet-400/10 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
          >
            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-sky-400/20 blur-2xl" />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-violet-500 shadow-lg">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white">Our Vision</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                To become a leading AI and data solutions company delivering innovative products and enterprise platforms
                that transform industries globally.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
