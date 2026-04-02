import Link from 'next/link';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Industries', href: '#industries' },
  { name: 'Contact', href: '#contact' },
];

// ...existing code...
export default function Navbar() {
  return (
    <div className="w-full relative z-20">
      {/* Polka dot purple background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10" style={{ background: 'radial-gradient(circle at 10% 30%, #B39DDB 0.8%, transparent 1.2%), radial-gradient(circle at 40% 80%, #6C2BD7 0.7%, transparent 1.3%), radial-gradient(circle at 80% 20%, #A259FF 1%, transparent 1.5%)', backgroundColor: 'transparent', opacity: 0.18 }} />
      <nav className="flex items-center justify-between px-4 sm:px-8 py-4 w-full">
        <div className="flex items-center w-full">
          <span className="text-2xl font-heading font-bold tracking-wide text-gold drop-shadow gold-gradient" style={{ letterSpacing: '0.03em' }}>Soxira AI Solutions</span>
        </div>
        <ul className="hidden md:flex gap-2 text-gold font-medium text-lg w-full justify-end">
          {navLinks.map(link => (
            <li key={link.name}>
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="inline-block"
              >
                <Link
                  href={link.href}
                  className="relative px-4 py-2 rounded-xl font-heading transition text-gold hover:text-gold-light focus:text-gold-light focus:outline-none"
                >
                  <span className="relative z-10">{link.name}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
