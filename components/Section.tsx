'use client';

import { motion } from 'framer-motion';

export default function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`w-full max-w-7xl mx-auto px-4 md:px-8 py-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl"
      >
        {children}
      </motion.div>
    </section>
  );
}
