'use client';

import { motion } from 'framer-motion';

export default function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`w-full max-w-7xl mx-auto px-4 md:px-8 py-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="rounded-2xl border border-line bg-surface p-10 shadow-[0_16px_40px_rgba(20,25,50,0.06)]"
      >
        {children}
      </motion.div>
    </section>
  );
}
