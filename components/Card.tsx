import { motion } from 'framer-motion';

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`p-8 shadow-goldGlow rounded-2xl bg-white/80 dark:bg-purpleDark/80 border border-purpleLight/30 ${className}`}
      whileHover={{ scale: 1.03, boxShadow: '0 0 24px 4px #FFD70099' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
