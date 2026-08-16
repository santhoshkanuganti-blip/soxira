'use client';

import { motion } from 'framer-motion';

export function AboutHero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-8 sm:py-8 text-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-accent-tint blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent-tint blur-3xl" />
        <div className="absolute left-0 bottom-0 h-56 w-56 rounded-full bg-accent-tint blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <span className="mb-3 inline-flex rounded-full border border-line bg-surface-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          About Us
        </span>
        <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl md:text-4xl">
          About{' '}
          <span className="text-accent">
            Soxira AI
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-muted sm:text-base">
          AI, Cloud &amp; Data-driven transformation for modern enterprises.
        </p>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="mt-4 h-px w-24 bg-accent-tint"
      />
    </section>
  );
}
