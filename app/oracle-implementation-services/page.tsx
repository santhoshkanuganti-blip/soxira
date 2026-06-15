import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle Implementation Services India | Oracle ERP, Fusion Cloud, SCM | Soxira',
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
    color: 'from-red-600/25 to-orange-600/10',
    border: 'border-red-500/20 hover:border-red-400/40',
    accent: 'text-red-400',
  },
  {
    title: 'Oracle Fusion Cloud',
    desc: 'Full-lifecycle Oracle Fusion Cloud implementations — from discovery and design to go-live and hypercare support.',
    tags: ['Cloud ERP', 'Financials', 'HCM', 'SCM'],
    color: 'from-orange-600/25 to-amber-600/10',
    border: 'border-orange-500/20 hover:border-orange-400/40',
    accent: 'text-orange-400',
  },
  {
    title: 'Oracle SCM',
    desc: 'Oracle Supply Chain Management implementations for procurement, inventory, order management, and logistics.',
    tags: ['Procurement', 'Inventory', 'Order Mgmt', 'Logistics'],
    color: 'from-amber-600/25 to-yellow-600/10',
    border: 'border-amber-500/20 hover:border-amber-400/40',
    accent: 'text-amber-400',
  },
  {
    title: 'Oracle Financials',
    desc: 'Oracle Cloud Financials covering General Ledger, AR, AP, Fixed Assets, Cash Management, and Financial Reporting.',
    tags: ['GL', 'AR', 'AP', 'Fixed Assets', 'Cash Mgmt'],
    color: 'from-yellow-600/25 to-lime-600/10',
    border: 'border-yellow-500/20 hover:border-yellow-400/40',
    accent: 'text-yellow-400',
  },
  {
    title: 'Oracle HCM',
    desc: 'Oracle Human Capital Management — Core HR, Payroll, Talent Management, Learning, and Workforce Analytics.',
    tags: ['Core HR', 'Payroll', 'Talent', 'Learning'],
    color: 'from-violet-600/25 to-purple-600/10',
    border: 'border-violet-500/20 hover:border-violet-400/40',
    accent: 'text-violet-400',
  },
  {
    title: 'Oracle Integration Cloud (OIC)',
    desc: 'Oracle Integration Cloud implementations connecting Oracle and third-party applications with pre-built adapters and orchestrations.',
    tags: ['API Integration', 'Process Automation', 'Adapters', 'Orchestration'],
    color: 'from-sky-600/25 to-blue-600/10',
    border: 'border-sky-500/20 hover:border-sky-400/40',
    accent: 'text-sky-400',
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
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,rgba(220,38,38,0.12),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_30%,rgba(249,115,22,0.08),transparent)]" />
          </div>
          <div className="pointer-events-none absolute left-1/4 top-12 h-72 w-72 rounded-full bg-red-600/8 blur-[80px]" />

          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              Enterprise Applications
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Modernize Enterprise Operations with{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                Oracle Cloud & AI
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400">
              Soxira delivers full-lifecycle Oracle implementation services — Oracle ERP, Fusion Cloud, SCM, Financials, HCM, and Integration Cloud. With 25+ years of Oracle expertise, we help Indian enterprises and multinationals modernize operations and unlock the full potential of Oracle Cloud.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:brightness-110">
                Schedule a Consultation
              </Link>
              <Link href="#services" className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]">
                View Services ↓
              </Link>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {WHY_SOXIRA.map(({ stat, label }) => (
                <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <p className="text-xl font-bold text-white">{stat}</p>
                  <p className="mt-1 text-[11px] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Oracle Services */}
        <section id="services" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400/80">Oracle Services</p>
              <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Full Oracle Cloud Portfolio
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Expert implementation, migration, and managed services across every major Oracle Cloud module.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ORACLE_SERVICES.map((svc) => (
                <div
                  key={svc.title}
                  className={`group relative overflow-hidden rounded-2xl border ${svc.border} bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05]`}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${svc.color} opacity-60`} />
                  <div className="relative">
                    <h3 className={`text-base font-semibold ${svc.accent}`}>{svc.title}</h3>
                    <p className="mt-2.5 text-sm leading-6 text-slate-400">{svc.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {svc.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-slate-500">
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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">How We Engage</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Flexible Engagement Models</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ENGAGEMENT_MODELS.map((model) => (
                <div key={model.title} className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                  <div>
                    <h3 className="font-semibold text-slate-200">{model.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">{model.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI + Oracle */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-red-600/10 via-orange-600/5 to-transparent p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400/80">AI + Oracle</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Oracle Cloud + Soxira AI</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                Soxira uniquely combines Oracle Cloud expertise with AI capabilities. We don&apos;t just implement Oracle — we extend it with AI-powered analytics, intelligent process automation, and predictive insights that go beyond standard Oracle functionality. Get the power of Oracle Cloud with the intelligence of modern AI.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['AI on Oracle Data', 'GenAI Copilots', 'Predictive Analytics', 'Process Automation', 'Smart Dashboards'].map((tag) => (
                  <span key={tag} className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300">
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
            <h2 className="text-2xl font-semibold text-white">Start Your Oracle Cloud Journey</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Whether you&apos;re starting fresh with Oracle Cloud or migrating from a legacy system, our team is ready to help.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:brightness-110">
                Talk to an Oracle Expert
              </Link>
              <Link href="/contact" className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]">
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
