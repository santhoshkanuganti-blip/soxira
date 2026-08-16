'use client';

import { motion } from 'framer-motion';

export function AboutFounder() {
  return (
    <section className="py-6 px-4 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Leadership</span>
          <h2 className="mt-1.5 text-xl font-bold text-ink sm:text-2xl">Meet Our Founder</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-accent p-4 shadow-2xl sm:p-5"
        >
          <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full bg-accent-tint blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-accent-tint blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-3 md:flex-row md:items-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent shadow-2xl ring-4 ring-line">
                <span className="text-2xl font-extrabold text-ink drop-shadow-xl">VK</span>
                <div className="absolute inset-0 rounded-full bg-accent-tint" />
              </div>
            </motion.div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-extrabold text-ink sm:text-xl">Vinuthna Kulkarni</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
                Founder, Soxira AI Solutions
              </p>
              <p className="mt-2 max-w-2xl text-xs leading-6 text-ink-muted sm:text-sm">
                Vinuthna Kulkarni leads Soxira AI Solutions with a vision to build AI-driven, data-centric, and scalable
                technology solutions for modern businesses. With strong industry experience and deep expertise in cloud,
                data engineering, and enterprise platforms, Vinuthna drives Soxira&rsquo;s mission to help organizations
                transform their operations through innovation, automation, and intelligent systems.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5 md:justify-start">
                {['AI Strategy', 'Cloud Transformation', 'Enterprise Leadership', 'Product Vision'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-accent-tint px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent"
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
