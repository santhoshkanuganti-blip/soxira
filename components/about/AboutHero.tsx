'use client';

import { motion } from 'framer-motion';

export function AboutHero() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-28 sm:px-8 text-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-700/30 via-violet-500/20 to-sky-400/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-56 w-56 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <span className="mb-6 inline-flex rounded-full border border-violet-400/30 bg-slate-900/70 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
          About Us
        </span>
        <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
          About{' '}
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
            Soxira AI
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-300 sm:text-2xl">
          AI, Cloud &amp; Data-driven transformation for modern enterprises.
        </p>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="mt-10 h-px w-64 bg-gradient-to-r from-transparent via-violet-400 to-transparent"
      />
    </section>
  );
}
