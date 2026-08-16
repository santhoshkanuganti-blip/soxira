'use client';

import { motion } from 'framer-motion';

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`rounded-2xl border border-line bg-surface p-8 shadow-[0_16px_40px_rgba(20,25,50,0.06)] ${className}`}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
