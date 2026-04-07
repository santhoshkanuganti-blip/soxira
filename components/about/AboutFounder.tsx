'use client';

import { motion } from 'framer-motion';

export function AboutFounder() {
  return (
    <section className="py-20 px-4 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Leadership</span>
          <h2 className="mt-4 text-4xl font-bold text-white">Meet Our Founder</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900/70 via-slate-900/80 to-sky-900/50 p-10 shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-400 shadow-2xl ring-4 ring-white/20">
                <span className="text-5xl font-extrabold text-white drop-shadow-xl">VK</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent" />
              </div>
            </motion.div>

            <div className="text-center md:text-left">
              <h3 className="text-3xl font-extrabold text-white">Vinuthna Kulkarni</h3>
              <p className="mt-1 text-base font-semibold uppercase tracking-widest text-sky-400">
                Founder, Soxira AI Solutions
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                Vinuthna Kulkarni leads Soxira AI Solutions with a vision to build AI-driven, data-centric, and scalable
                technology solutions for modern businesses. With strong industry experience and deep expertise in cloud,
                data engineering, and enterprise platforms, Vinuthna drives Soxira's mission to help organizations
                transform their operations through innovation, automation, and intelligent systems.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                {['AI Strategy', 'Cloud Transformation', 'Enterprise Leadership', 'Product Vision'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-violet-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
