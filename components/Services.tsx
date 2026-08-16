'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

export default function Services() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {siteConfig.services.map((service) => (
        <motion.article
          key={service.title}
          whileHover={{ y: -6 }}
          className="group rounded-[1.75rem] border border-line bg-surface-2 p-8 shadow-[0_16px_40px_rgba(20,25,50,0.08)] transition"
        >
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-ink-muted">Service</div>
          <h3 className="text-2xl font-semibold text-ink group-hover:text-accent">{service.title}</h3>
          <p className="mt-4 text-ink-muted leading-7">{service.description}</p>
          <Link
            href={service.href}
            className="mt-6 inline-flex items-center text-sm font-semibold text-accent transition hover:text-ink"
          >
            Learn more →
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
