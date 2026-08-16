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
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Purpose</span>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">Mission &amp; Vision</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-line bg-accent-tint p-5 shadow-2xl sm:p-6"
          >
            <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-accent-tint blur-2xl" />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent shadow-lg">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-ink">Our Mission</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted sm:text-base">
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
            className="relative overflow-hidden rounded-3xl border border-line bg-accent-tint p-5 shadow-2xl sm:p-6"
          >
            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-accent-tint blur-2xl" />
            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent shadow-lg">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-ink">Our Vision</h3>
              <p className="mt-3 text-sm leading-6 text-ink-muted sm:text-base">
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
