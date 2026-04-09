'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Product Dev', href: '/product-development-company' },
  { name: 'Cloud Migration', href: '/cloud-migration-services' },
  { name: 'Snowflake DBT', href: '/data-engineering-snowflake-dbt' },
  { name: 'AI Dashboards', href: '/ai-dashboard-consulting' },
  { name: 'VitaranAI', href: '/distributor-management-software' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B0B1A]/95 backdrop-blur-xl">
      <nav className="flex w-full items-center gap-4 px-1 py-1 sm:px-2 lg:px-3">
        <Link href="/" className="flex shrink-0 items-center gap-4">
          <div className="relative h-20 w-[260px] overflow-hidden rounded-[2.5rem] bg-[#05050d] p-3 shadow-[0_22px_90px_rgba(56,189,248,0.2)] ring-1 ring-white/10 sm:w-[320px]">
            <Image src={siteConfig.logo} alt={`${siteConfig.name} logo`} fill className="object-contain" />
          </div>
        </Link>
        <ul className="ml-auto hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <motion.div whileHover={{ y: -1 }}>
                <Link href={link.href} className="whitespace-nowrap rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-gradient-to-r hover:from-purple-500 hover:to-violet-500 hover:text-white">
                  {link.name}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
