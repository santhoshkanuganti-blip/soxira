import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle Implementation Services India | Oracle ERP, Fusion Cloud, SCM | Soxira',
  alternates: { canonical: `https://${siteConfig.domain}/oracle-implementation-services` },
  description: 'Expert Oracle implementation services — Oracle ERP, Oracle Fusion Cloud, Oracle SCM, Oracle Financials, Oracle HCM, and Oracle Integration Cloud (OIC). 25+ years of Oracle expertise. India.',
  keywords: [
    'Oracle ERP implementation India',
    'Oracle Fusion Cloud services',
    'Oracle SCM implementation',
    'Oracle Financials India',
    'Oracle HCM implementation',
    'Oracle Integration Cloud OIC',
    'Oracle Cloud migration India',
    'Oracle consulting partner India',
  ],
  openGraph: {
    title: 'Oracle Implementation Services | Soxira AI Solutions',
    description: 'Expert Oracle ERP, Fusion Cloud, SCM, Financials, HCM, and OIC implementation services with 25+ years of Oracle expertise.',
    url: `https://${siteConfig.domain}/oracle-implementation-services`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

const ORACLE_SERVICES = [
  {
    title: 'Oracle ERP',
    desc: 'Complete Oracle ERP implementation, customization, and support across Finance, SCM, Manufacturing, and HR modules.',
    tags: ['Finance', 'Procurement', 'Manufacturing', 'Projects'],
    border: 'border-line hover:border-line',
    accent: 'text-accent',
  },
  {
    title: 'Oracle Fusion Cloud',
    desc: 'Full-lifecycle Oracle Fusion Cloud implementations — from discovery and design to go-live and hypercare support.',
    tags: ['Cloud ERP', 'Financials', 'HCM', 'SCM'],
    border: 'border-line hover:border-line',
    accent: 'text-accent',
  },
  {
    title: 'Oracle SCM',
    desc: 'Oracle Supply Chain Management implementations for procurement, inventory, order management, and logistics.',
    tags: ['Procurement', 'Inventory', 'Order Mgmt', 'Logistics'],
    border: 'border-line hover:border-line',
    accent: 'text-accent',
  },
  {
    title: 'Oracle Financials',
    desc: 'Oracle Cloud Financials covering General Ledger, AR, AP, Fixed Assets, Cash Management, and Financial Reporting.',
    tags: ['GL', 'AR', 'AP', 'Fixed Assets', 'Cash Mgmt'],
    border: 'border-line hover:border-line',
    accent: 'text-accent',
  },
  {
    title: 'Oracle HCM',
    desc: 'Oracle Human Capital Management — Core HR, Payroll, Talent Management, Learning, and Workforce Analytics.',
    tags: ['Core HR', 'Payroll', 'Talent', 'Learning'],
    border: 'border-line hover:border-line',
    accent: 'text-accent',
  },
  {
    title: 'Oracle Integration Cloud (OIC)',
    desc: 'Oracle Integration Cloud implementations connecting Oracle and third-party applications with pre-built adapters and orchestrations.',
    tags: ['API Integration', 'Process Automation', 'Adapters', 'Orchestration'],
    border: 'border-line hover:border-line',
    accent: 'text-accent',
  },
];

const ENGAGEMENT_MODELS = [
  { title: 'New Implementation', desc: 'Greenfield Oracle Cloud implementations from discovery and fit-gap analysis to go-live.' },
  { title: 'Upgrades & Migration', desc: 'Migrate from legacy Oracle E-Business Suite or Fusion on-premise to Oracle Cloud.' },
  { title: 'Post Go-Live Support', desc: 'Managed services, hypercare, and ongoing enhancement support for live Oracle environments.' },
  { title: 'Oracle Rescue Projects', desc: 'Stabilization and recovery for troubled Oracle implementations — we bring them back on track.' },
];

const WHY_SOXIRA = [
  { stat: '25+', label: 'Years Oracle experience' },
  { stat: '100%', label: 'India-focused delivery' },
  { stat: 'BFSI + Mfg', label: 'Industry specialization' },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Oracle Implementation Services',
  provider: { '@type': 'Organization', name: siteConfig.name, url: `https://${siteConfig.domain}` },
  description: 'Expert Oracle ERP, Fusion Cloud, SCM, Financials, HCM, and OIC implementation services.',
  areaServed: 'IN',
};

export default function OraclePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-accent-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Enterprise Applications
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Modernize Enterprise Operations with{' '}
              <span className="text-accent">
                Oracle Cloud & AI
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-ink-muted">
              Soxira delivers full-lifecycle Oracle implementation services — Oracle ERP, Fusion Cloud, SCM, Financials, HCM, and Integration Cloud. With 25+ years of Oracle expertise, we help Indian enterprises and multinationals modernize operations and unlock the full potential of Oracle Cloud.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110">
                Schedule a Consultation
              </Link>
              <Link href="#services" className="rounded-full border border-line bg-surface-2 px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-surface-2">
                View Services ↓
              </Link>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {WHY_SOXIRA.map(({ stat, label }) => (
                <div key={label} className="rounded-2xl border border-line bg-surface-2 p-5">
                  <p className="text-xl font-bold text-ink">{stat}</p>
                  <p className="mt-1 text-[11px] text-ink-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Oracle Services */}
        <section id="services" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Oracle Services</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                Full Oracle Cloud Portfolio
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
                Expert implementation, migration, and managed services across every major Oracle Cloud module.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ORACLE_SERVICES.map((svc) => (
                <div
                  key={svc.title}
                  className={`group relative overflow-hidden rounded-2xl border ${svc.border} bg-surface-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-surface-2`}
                >
                  <div className="relative">
                    <h3 className={`text-base font-semibold ${svc.accent}`}>{svc.title}</h3>
                    <p className="mt-2.5 text-sm leading-6 text-ink-muted">{svc.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {svc.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-[11px] text-ink-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Models */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">How We Engage</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">Flexible Engagement Models</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ENGAGEMENT_MODELS.map((model) => (
                <div key={model.title} className="flex gap-4 rounded-2xl border border-line bg-surface-2 p-6">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <div>
                    <h3 className="font-semibold text-ink">{model.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-ink-muted">{model.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI + Oracle */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-3xl border border-line bg-accent-tint p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">AI + Oracle</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">Oracle Cloud + Soxira AI</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-ink-muted">
                Soxira uniquely combines Oracle Cloud expertise with AI capabilities. We don&apos;t just implement Oracle — we extend it with AI-powered analytics, intelligent process automation, and predictive insights that go beyond standard Oracle functionality. Get the power of Oracle Cloud with the intelligence of modern AI.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['AI on Oracle Data', 'GenAI Copilots', 'Predictive Analytics', 'Process Automation', 'Smart Dashboards'].map((tag) => (
                  <span key={tag} className="rounded-full border border-line bg-accent-tint px-3 py-1 text-xs font-medium text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-ink">Start Your Oracle Cloud Journey</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink-muted">
              Whether you&apos;re starting fresh with Oracle Cloud or migrating from a legacy system, our team is ready to help.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110">
                Talk to an Oracle Expert
              </Link>
              <Link href="/contact" className="rounded-full border border-line bg-surface-2 px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-surface-2">
                Request a Proposal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
