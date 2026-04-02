import { motion } from 'framer-motion';

export default function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`w-full max-w-7xl mx-auto px-4 md:px-8 py-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ background: 'linear-gradient(135deg, #F3F0FF 60%, #B39DDB 100%)', borderRadius: '1.5rem', padding: '2rem 0' }}
      >
        {children}
      </motion.div>
    </section>
  );
}
