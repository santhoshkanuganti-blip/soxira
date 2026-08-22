'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

type SolutionItem = { label: string; href: string };
type SolutionCol  = { heading: string; items: SolutionItem[] };

// Kept deliberately flat and shallow — one level per column. Sub-pages (Oracle SCM/Finance/HCM,
// the /solutions industry deep-dives, etc.) are reached by visiting the parent page, where they're
// already cross-linked in context, not duplicated here.
const SOLUTIONS: SolutionCol[] = [
  {
    heading: 'AI, Data & Analytics',
    items: [
      { label: 'AI Consulting', href: '/contact' },
      { label: 'Generative AI Solutions', href: '/contact' },
      { label: 'AI Dashboards & Reporting', href: '/ai-dashboard-consulting' },
      { label: 'AI Agents & Automation', href: '/contact' },
      { label: 'Data Engineering & Analytics', href: '/data-engineering-snowflake-dbt' },
      { label: 'Cloud Migration', href: '/cloud-migration-services' },
    ],
  },
  {
    heading: 'Products',
    items: [
      { label: 'VitaranAI (Our Business Operations Platform)', href: '/distributor-management-software' },
      { label: 'SAOP — AI Orchestration Platform (In Development)', href: '/saop-platform' },
      { label: 'Oracle ERP', href: '/oracle-erp' },
      { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
      { label: 'Oracle Integration Cloud (OIC)', href: '/oracle-integration-cloud' },
      { label: 'Oracle Implementation Services', href: '/oracle-implementation-services' },
    ],
  },
  {
    heading: 'Industry Solutions',
    items: [
      { label: 'Small & Medium Businesses', href: '/industries/msmes' },
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
      className="whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition hover:bg-surface-2 hover:text-ink xl:px-4">
      {children}
    </Link>
  );
}

function MLink({ href, close, children }: { href: string; close: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={close}
      className="block rounded-lg px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-surface-2 hover:text-ink">
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
      {/* ── Main nav bar ── */}
      <nav className="mx-auto flex max-w-[1440px] items-center px-4 py-1.5 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <div className="relative h-14 w-[210px] sm:h-16 sm:w-[240px]">
            <Image src="/logo-light.png" alt={siteConfig.name} fill sizes="240px" priority className="object-contain object-left" />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="ml-auto hidden items-center gap-0.5 md:flex">
          <DLink href="/">Home</DLink>

          {/* Solutions trigger (desktop hover) */}
          <div
            className="relative"
            onMouseEnter={openSolutions}
            onMouseLeave={startClose}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition hover:bg-surface-2 hover:text-ink xl:px-4"
            >
              Solutions
              <motion.span
                className="inline-flex text-ink-muted"
                animate={{ rotate: solutionsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronIcon />
              </motion.span>
            </button>
          </div>

          <DLink href="/sales-marketing-automation">Sales & Marketing</DLink>

          <Link
            href="/#leadership"
            onClick={(e) => handleAnchorClick(e, 'leadership')}
            className="whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition hover:bg-surface-2 hover:text-ink xl:px-4"
          >
            Leadership
          </Link>
          <Link
            href="/#case-studies"
            onClick={(e) => handleAnchorClick(e, 'case-studies')}
            className="whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition hover:bg-surface-2 hover:text-ink xl:px-4"
          >
            Case Studies
          </Link>
          <DLink href="/blog">Blog</DLink>

          <Link
            href="/contact"
            className="ml-3 whitespace-nowrap rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-bright"
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-ink-muted ring-1 ring-line transition hover:bg-line md:hidden"
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
            className="hidden border-t border-line bg-surface shadow-[0_24px_60px_rgba(20,25,50,0.12)] md:block"
          >
            <div className="mx-auto max-w-[1440px] px-8 py-7 lg:px-12">
              <div className="grid grid-cols-3 gap-8">
                {SOLUTIONS.map((col) => (
                  <div key={col.heading}>
                    <p className="mb-3.5 text-[11px] font-bold uppercase tracking-widest text-accent">
                      {col.heading}
                    </p>
                    <ul className="space-y-0.5">
                      {col.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setSolutionsOpen(false)}
                            className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] leading-5 text-ink-muted transition hover:bg-surface-2 hover:text-ink"
                          >
                            <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-line-strong transition-colors group-hover:bg-accent" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <Link
                  href="/contact"
                  onClick={() => setSolutionsOpen(false)}
                  className="text-xs text-ink-muted transition hover:text-accent"
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
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
            <div className="flex flex-col gap-0.5 p-4">
              <MLink href="/" close={() => setMobileOpen(false)}>Home</MLink>

              {/* Solutions accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileSolutionsOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-surface-2 hover:text-ink"
                >
                  Solutions
                  <motion.span
                    className="inline-flex text-ink-muted"
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
                      <div className="mx-1 mb-2 mt-1 rounded-2xl border border-line bg-surface-2 p-4">
                        <div className="grid grid-cols-2 gap-5">
                          {SOLUTIONS.map((col) => (
                            <div key={col.heading}>
                              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-accent">
                                {col.heading}
                              </p>
                              <ul className="space-y-1.5">
                                {col.items.map((item) => (
                                  <li key={item.label}>
                                    <Link
                                      href={item.href}
                                      onClick={closeBoth}
                                      className="block text-[12px] text-ink-muted transition hover:text-ink"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MLink href="/sales-marketing-automation" close={() => setMobileOpen(false)}>Sales & Marketing</MLink>

              <Link href="/#leadership" onClick={(e) => handleAnchorClick(e, 'leadership')}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-surface-2 hover:text-ink">
                Leadership
              </Link>
              <Link href="/#case-studies" onClick={(e) => handleAnchorClick(e, 'case-studies')}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:bg-surface-2 hover:text-ink">
                Case Studies
              </Link>
              <MLink href="/blog" close={() => setMobileOpen(false)}>Blog</MLink>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 block rounded-xl bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
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
