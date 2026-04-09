'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function AboutCTA() {
  return (
    <section className="py-10 px-4 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-700/40 via-sky-500/20 to-white/5 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <div className="absolute -top-10 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Work with Soxira</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-slate-300 sm:text-base">
              Ready to build the future? Partner with our AI, cloud, and product engineering experts for your next big idea.
            </p>
            <div className="mt-5 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition hover:scale-105 sm:text-sm"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/product-development-company"
                className="rounded-full border border-white/20 px-6 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10 sm:text-sm"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
