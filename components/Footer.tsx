import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import FooterField from './FooterField';

const SOLUTIONS_LINKS = [
  { label: 'AI & GenAI Consulting', href: '/ai-dashboard-consulting' },
  { label: 'Oracle ERP & Fusion Cloud', href: '/oracle-erp' },
  { label: 'Data Engineering (Snowflake & DBT)', href: '/data-engineering-snowflake-dbt' },
  { label: 'Cloud Migration', href: '/cloud-migration-services' },
  { label: 'Oracle Implementation Services', href: '/oracle-implementation-services' },
];

const PRODUCTS_LINKS = [
  { label: 'VitaranAI', href: '/distributor-management-software' },
  { label: 'SAOP — AI Orchestration Platform', href: '/saop-platform' },
  { label: 'Product Development', href: '/product-development-company' },
];

const INDUSTRIES_LINKS = [
  { label: 'Small & Medium Businesses', href: '/industries/msmes' },
  { label: 'Distributors', href: '/industries/distributors' },
  { label: 'Manufacturing', href: '/industries/manufacturing' },
  { label: 'Finance', href: '/industries/finance' },
  { label: 'Insurance', href: '/industries/insurance' },
  { label: 'Healthcare', href: '/industries/healthcare' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Leadership', href: '/#leadership' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

function FooterCol({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">{heading}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-white/70 transition hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(160deg,#17204f_0%,#111a42_45%,#0c1436_100%)] text-white">
      <FooterField />

      <div className="relative z-10">
        {/* ── CTA band ── */}
        <div className="border-b border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-12 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Ready to transform your operations?</h2>
              <p className="mt-2 text-sm text-white/65">Talk to our team about AI, Oracle ERP, data engineering, or VitaranAI — no obligation, just a conversation.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent shadow-lg transition hover:scale-[1.03] hover:bg-white/90"
            >
              Talk to Our Experts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Sitemap ── */}
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
            <div>
              <div className="relative h-11 w-[165px]">
                <Image src="/logo.png" alt={siteConfig.name} fill sizes="165px" className="object-contain object-left" />
              </div>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
                AI, Oracle ERP, and data engineering for modern enterprises — plus VitaranAI and SAOP, our own products.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Soxira AI Solutions on LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                </a>
              </div>
            </div>

            <FooterCol heading="Solutions" links={SOLUTIONS_LINKS} />
            <FooterCol heading="Products" links={PRODUCTS_LINKS} />
            <FooterCol heading="Industries" links={INDUSTRIES_LINKS} />
            <FooterCol heading="Company" links={COMPANY_LINKS} />
          </div>

          <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">Email</p>
              <p className="mt-2 text-sm text-white/70">{siteConfig.contact.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">Phone</p>
              <p className="mt-2 text-sm text-white/70">{siteConfig.contact.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">Location</p>
              <p className="mt-2 text-sm text-white/70">{siteConfig.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-white/45">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
