'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type Promotion = {
  id: string;
  title: string;
  description: string;
  ctaText?: string | null;
  ctaUrl?: string | null;
  bannerUrl?: string | null;
};

const gradients = [
  'from-accent to-accent-bright',
  'from-accent to-[#0E1747]',
  'from-accent-bright to-accent',
];

export default function WhatsNewSection({ promotions }: { promotions: Promotion[] }) {
  const [index, setIndex] = useState(0);
  const items = promotions.length > 0 ? promotions : [];
  const total = items.length;

  useEffect(() => {
    if (total < 2) return;
    const id = window.setInterval(() => setIndex((c) => (c + 1) % total), 5000);
    return () => window.clearInterval(id);
  }, [total]);

  if (total === 0) return null;
  const current = items[index];
  const gradient = gradients[index % gradients.length];

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Latest</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">What&apos;s New at Soxira</h2>
        </motion.div>

        <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className={`relative flex min-h-[320px] flex-col items-center justify-center bg-gradient-to-br ${gradient} p-10 text-center md:min-h-[360px]`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
              {current.bannerUrl && (
                <div className="absolute inset-0 opacity-20">
                  <Image src={current.bannerUrl} alt={current.title} fill className="object-cover" />
                </div>
              )}
              <div className="relative z-10 max-w-2xl">
                <motion.h3
                  className="text-3xl font-bold text-white drop-shadow-lg md:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {current.title}
                </motion.h3>
                <motion.p
                  className="mt-4 text-lg text-white/80 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {current.description}
                </motion.p>
                {current.ctaText && current.ctaUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                  >
                    <Link
                      href={current.ctaUrl}
                      className="inline-block rounded-full bg-white/90 px-8 py-3 text-base font-bold text-accent shadow-lg ring-2 ring-line transition hover:scale-105 hover:bg-white"
                    >
                      {current.ctaText}
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2.5 bg-white/30'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
