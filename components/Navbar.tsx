'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

type SolutionItem  = { label: string; href: string };
type SolutionGroup = { parent: SolutionItem; children: SolutionItem[] };
type SolutionCol   = {
  heading: string;
  gradient: string;
  items?: SolutionItem[];
  groups?: SolutionGroup[];
  whySoxira?: boolean;
};

const WHY_SOXIRA_ITEMS = [
  '20+ Years Enterprise Experience',
  'Oracle ERP & Fusion Expertise',
  'AI + Oracle Integrations',
  'Cloud & Data Engineering',
  'Distribution & Manufacturing Expertise',
];

const SOLUTIONS: SolutionCol[] = [
  {
    heading: 'AI & GenAI',
    gradient: 'from-violet-400 to-purple-300',
    items: [
      { label: 'AI Consulting', href: '/contact' },
      { label: 'Generative AI Solutions', href: '/contact' },
      { label: 'AI Dashboards', href: '/ai-dashboard-consulting' },
      { label: 'AI Agents & Automation', href: '/contact' },
    ],
  },
  {
    heading: 'Enterprise Applications',
    gradient: 'from-sky-400 to-blue-300',
    groups: [
      {
        parent: { label: 'Oracle ERP', href: '/oracle-erp' },
        children: [
          { label: 'Oracle SCM', href: '/oracle-erp/scm' },
          { label: 'Oracle Finance', href: '/oracle-erp/finance' },
          { label: 'Oracle HCM', href: '/oracle-erp/hcm' },
        ],
      },
      {
        parent: { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
        children: [
          { label: 'Oracle SCM Cloud', href: '/oracle-fusion-cloud/scm' },
          { label: 'Oracle Financials Cloud', href: '/oracle-fusion-cloud/financials' },
          { label: 'Oracle HCM Cloud', href: '/oracle-fusion-cloud/hcm' },
        ],
      },
      {
        parent: { label: 'Oracle Integration Cloud (OIC)', href: '/oracle-integration-cloud' },
        children: [
          { label: 'ERP Integrations', href: '/oracle-integration-cloud' },
          { label: 'Fusion Integrations', href: '/oracle-integration-cloud' },
          { label: 'API & Middleware', href: '/oracle-integration-cloud' },
        ],
      },
    ],
    whySoxira: true,
  },
  {
    heading: 'Data & Cloud',
    gradient: 'from-emerald-400 to-teal-300',
    items: [
      { label: 'Snowflake & DBT', href: '/data-engineering-snowflake-dbt' },
      { label: 'Data Engineering', href: '/data-engineering-snowflake-dbt' },
      { label: 'Cloud Migration', href: '/cloud-migration-services' },
      { label: 'AWS', href: '/cloud-migration-services' },
      { label: 'Azure', href: '/cloud-migration-services' },
      { label: 'GCP', href: '/cloud-migration-services' },
    ],
  },
  {
    heading: 'Industry Solutions',
    gradient: 'from-amber-400 to-orange-300',
    items: [
      { label: 'MSMEs', href: '/industries/msmes' },
      { label: 'Distributors', href: '/industries/distributors' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Finance', href: '/industries/finance' },
      { label: 'Insurance', href: '/industries/insurance' },
      { label: 'Healthcare', href: '/industries/healthcare' },
    ],
  },
];

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function DLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}
      className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white xl:px-4">
      {children}
    </Link>
  );
}

function MLink({ href, close, children }: { href: string; close: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={close}
      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white">
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openSolutions = useCallback(() => {
    clearTimeout(closeTimer.current);
    setSolutionsOpen(true);
  }, []);

  const startClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 130);
  }, []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      setMobileOpen(false);
      if (pathname === '/') {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [pathname],
  );

  const closeBoth = useCallback(() => {
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#0B0B1A]/95 backdrop-blur-2xl">
      {/* ── Main nav bar ── */}
      <nav className="mx-auto flex max-w-[1440px] items-center px-4 py-1.5 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <div className="relative h-16 w-[180px] overflow-hidden rounded-[2.5rem] bg-[#05050d] p-3
            shadow-[0_22px_90px_rgba(56,189,248,0.18)] ring-1 ring-white/10 sm:w-[220px]">
            <Image src={siteConfig.logo} alt={siteConfig.name} fill sizes="220px" priority className="object-contain" />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="ml-auto hidden items-center gap-0.5 md:flex">
          <DLink href="/">Home</DLink>
          <DLink href="/distributor-management-software">VitaranAI</DLink>

          {/* Solutions trigger (desktop hover) */}
          <div
            className="relative"
            onMouseEnter={openSolutions}
            onMouseLeave={startClose}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white xl:px-4"
            >
              Solutions
              <motion.span
                className="inline-flex text-slate-500"
                animate={{ rotate: solutionsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronIcon />
              </motion.span>
            </button>
          </div>

          <a
            href="/#leadership"
            onClick={(e) => handleAnchorClick(e, 'leadership')}
            className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white xl:px-4"
          >
            Leadership
          </a>
          <a
            href="/#case-studies"
            onClick={(e) => handleAnchorClick(e, 'case-studies')}
            className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white xl:px-4"
          >
            Case Studies
          </a>
          <DLink href="/blog">Blog</DLink>

          <Link
            href="/contact"
            className="ml-3 whitespace-nowrap rounded-full bg-gradient-to-r from-violet-600 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110 hover:shadow-violet-500/35"
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-slate-300 ring-1 ring-white/10 transition hover:bg-white/10 md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? 'x' : 'ham'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {mobileOpen ? '✕' : '☰'}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* ── Desktop mega menu (full-width, sibling to nav) ── */}
      <AnimatePresence>
        {solutionsOpen && (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onMouseEnter={openSolutions}
            onMouseLeave={startClose}
            className="hidden border-t border-white/[0.06] bg-[#0D0D22]/97 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:block"
          >
            {/* Accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

            <div className="mx-auto max-w-[1440px] px-8 py-7 lg:px-12">
              <div className="grid grid-cols-4 gap-8">
                {SOLUTIONS.map((col) => (
                  <div key={col.heading}>
                    <p className={`mb-3.5 bg-gradient-to-r ${col.gradient} bg-clip-text text-[11px] font-bold uppercase tracking-widest text-transparent`}>
                      {col.heading}
                    </p>

                    {col.groups ? (
                      /* ── Hierarchical column (Enterprise Applications) ── */
                      <div className="space-y-4">
                        {col.groups.map((group) => (
                          <div key={group.parent.label}>
                            <Link
                              href={group.parent.href}
                              onClick={() => setSolutionsOpen(false)}
                              className="block text-[13px] font-semibold text-white transition hover:text-violet-300"
                            >
                              {group.parent.label}
                            </Link>
                            <ul className="mt-1.5 space-y-1">
                              {group.children.map((child) => (
                                <li key={child.label}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setSolutionsOpen(false)}
                                    className="flex items-center gap-1.5 rounded-lg pl-2 py-0.5 text-[12px] text-slate-400 transition hover:text-violet-300"
                                  >
                                    <span className="text-[10px] text-slate-600">↳</span>
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {col.whySoxira && (
                          <div className="mt-5 border-t border-white/[0.06] pt-4">
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Why Soxira?</p>
                            {WHY_SOXIRA_ITEMS.map((item) => (
                              <div key={item} className="flex items-center gap-2 py-0.5">
                                <svg className="h-3 w-3 shrink-0 text-emerald-400" viewBox="0 0 16 16" fill="none">
                                  <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-[11px] text-slate-400">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* ── Flat column ── */
                      <ul className="space-y-0.5">
                        {col.items?.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setSolutionsOpen(false)}
                              className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] leading-5 text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                            >
                              <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-slate-600 transition-colors group-hover:bg-violet-400" />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <Link
                  href="/contact"
                  onClick={() => setSolutionsOpen(false)}
                  className="text-xs text-slate-500 transition hover:text-violet-400"
                >
                  Not sure which solution fits your business? Talk to our experts →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#0B0B1A] md:hidden"
          >
            <div className="flex flex-col gap-0.5 p-4">
              <MLink href="/" close={() => setMobileOpen(false)}>Home</MLink>
              <MLink href="/distributor-management-software" close={() => setMobileOpen(false)}>VitaranAI</MLink>

              {/* Solutions accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileSolutionsOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Solutions
                  <motion.span
                    className="inline-flex text-slate-500"
                    animate={{ rotate: mobileSolutionsOpen ? 180 : 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ChevronIcon />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileSolutionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mx-1 mb-2 mt-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                        <div className="grid grid-cols-2 gap-5">
                          {SOLUTIONS.map((col) => (
                            <div key={col.heading}>
                              <p className={`mb-2 bg-gradient-to-r ${col.gradient} bg-clip-text text-[10px] font-bold uppercase tracking-widest text-transparent`}>
                                {col.heading}
                              </p>

                              {col.groups ? (
                                /* Hierarchical groups in mobile */
                                <div className="space-y-2">
                                  {col.groups.map((group) => (
                                    <div key={group.parent.label}>
                                      <Link
                                        href={group.parent.href}
                                        onClick={closeBoth}
                                        className="block text-[11px] font-semibold text-slate-300"
                                      >
                                        {group.parent.label}
                                      </Link>
                                      {group.children.map((child) => (
                                        <Link
                                          key={child.label}
                                          href={child.href}
                                          onClick={closeBoth}
                                          className="mt-0.5 flex items-center gap-1 pl-2 text-[10px] text-slate-500 transition hover:text-slate-300"
                                        >
                                          <span className="text-[9px]">↳</span>
                                          {child.label}
                                        </Link>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                /* Flat items in mobile */
                                <ul className="space-y-1.5">
                                  {col.items?.map((item) => (
                                    <li key={item.label}>
                                      <Link
                                        href={item.href}
                                        onClick={closeBoth}
                                        className="block text-[12px] text-slate-500 transition hover:text-slate-200"
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="/#leadership" onClick={(e) => handleAnchorClick(e, 'leadership')}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white">
                Leadership
              </a>
              <a href="/#case-studies" onClick={(e) => handleAnchorClick(e, 'case-studies')}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white">
                Case Studies
              </a>
              <MLink href="/blog" close={() => setMobileOpen(false)}>Blog</MLink>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 block rounded-2xl bg-gradient-to-r from-violet-600 to-sky-500 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
