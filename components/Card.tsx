'use client';

import { motion } from 'framer-motion';

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl ${className}`}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
