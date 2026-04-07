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
          className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.16)] transition"
        >
          <div className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Service</div>
          <h3 className="text-2xl font-semibold text-white group-hover:text-sky-200">{service.title}</h3>
          <p className="mt-4 text-slate-300 leading-7">{service.description}</p>
          <Link
            href={service.href}
            className="mt-6 inline-flex items-center text-sm font-semibold text-sky-200 transition hover:text-white"
          >
            Learn more →
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
