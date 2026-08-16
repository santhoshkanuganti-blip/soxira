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
    'px-7 py-3 rounded-lg font-display text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2';
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-bright',
    outline: 'border-2 border-accent text-accent bg-transparent hover:bg-accent-tint',
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
