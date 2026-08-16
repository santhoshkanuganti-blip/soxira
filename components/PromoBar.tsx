'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import PromoWave from './PromoWave';

export type PromoBarData = {
  title: string;
  description: string;
  ctaText?: string | null;
  ctaUrl?: string | null;
};

const DEFAULT_PROMO: PromoBarData = {
  title: 'VitaranAI is live',
  description: 'AI-powered operations for growing businesses',
  ctaText: 'Explore VitaranAI',
  ctaUrl: 'https://VitaranAI.in',
};

const ROTATE_MS = 5500;

export default function PromoBar({ promos }: { promos?: PromoBarData[] }) {
  const pathname = usePathname();
  const items = promos && promos.length > 0 ? promos : [DEFAULT_PROMO];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = window.setInterval(() => setIndex((c) => (c + 1) % items.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [items.length]);

  if (pathname?.startsWith('/admin')) return null;

  const data = items[index];

  return (
    <div className="relative overflow-hidden border-b border-line bg-accent-tint text-accent">
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <PromoWave side="left" className="absolute top-1/2 left-0 hidden h-10 w-52 -translate-y-1/2 md:block" />

        <AnimatePresence mode="wait">
          <motion.p
            key={data.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 text-center text-sm"
          >
            <span className="font-semibold text-ink">{data.title}</span>
            <span className="mx-2 hidden text-line-strong sm:inline">·</span>
            <span className="block text-ink-muted sm:inline">{data.description}</span>
          </motion.p>
        </AnimatePresence>

        {data.ctaText && data.ctaUrl && (
          <Link
            href={data.ctaUrl}
            target={data.ctaUrl.startsWith('http') ? '_blank' : undefined}
            rel={data.ctaUrl.startsWith('http') ? 'noreferrer' : undefined}
            className="relative z-10 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent transition hover:text-accent-bright"
          >
            {data.ctaText}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}

        {items.length > 1 && (
          <div className="relative z-10 hidden shrink-0 items-center gap-1.5 sm:flex">
            {items.map((it, i) => (
              <span key={it.title} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-accent' : 'w-1.5 bg-accent/30'}`} />
            ))}
          </div>
        )}

        <PromoWave side="right" className="absolute top-1/2 right-0 hidden h-10 w-52 -translate-y-1/2 md:block" />
      </div>
    </div>
  );
}
