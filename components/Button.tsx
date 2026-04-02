import { motion } from 'framer-motion';

import type { HTMLMotionProps } from 'framer-motion';

type ButtonProps = HTMLMotionProps<'button'> & {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'px-7 py-3 rounded-lg font-heading text-lg transition focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2';
  const variants = {
    primary:
      'bg-gold text-black shadow-goldGlow hover:bg-gold-light hover:shadow-goldGlow',
    outline:
      'border-2 border-gold text-gold bg-transparent hover:bg-gold/10 hover:shadow-goldGlow',
  };
  return (
    <motion.button
      whileHover={{ scale: 1.04, boxShadow: '0 0 16px 2px #FFD70099' }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
