import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'AI Sales & Marketing Automation | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}/sales-marketing-automation` },
  description:
    'AI-driven lead scoring, campaign analytics and CRM automation from Soxira AI Solutions — turn sales and marketing data into pipeline and revenue.',
  keywords: ['sales automation', 'marketing automation', 'AI lead scoring', 'CRM automation', 'campaign analytics', 'Soxira'],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Sales & Marketing Automation',
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
  },
  areaServed: 'IN',
};

const CAPABILITIES = [
  { title: 'AI Lead Scoring', desc: 'Rank inbound and outbound leads by propensity to close, using behavioral and firmographic signals.' },
  { title: 'CRM Automation', desc: 'Connect and automate workflows across your CRM, marketing tools and support systems — no manual data entry.' },
  { title: 'Campaign Analytics', desc: 'Track spend, channel performance and attribution in one place instead of siloed dashboards.' },
  { title: 'Customer Segmentation', desc: 'Group prospects and accounts by behavior and value to target outreach that actually converts.' },
  { title: 'Sales Pipeline Forecasting', desc: 'AI-driven forecasts of deal velocity and revenue, built on your own historical pipeline data.' },
  { title: 'Marketing Attribution', desc: 'See which channels and campaigns are actually driving pipeline, not just traffic.' },
];

const OUTCOMES = [
  'Faster follow-up on leads most likely to convert',
  'One connected view of the customer across sales and marketing',
  'Marketing spend justified by attributed pipeline, not vanity metrics',
  'Sales forecasts your team and leadership can actually trust',
];

export default function SalesMarketingAutomationPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="space-y-10">
          <header className="space-y-4">
            <p className="inline-flex rounded-full bg-surface-2 px-4 py-2 text-sm uppercase tracking-[0.3em] text-accent">Sales &amp; Marketing</p>
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">AI Sales &amp; Marketing Automation</h1>
            <p className="max-w-3xl text-lg leading-8 text-ink-muted">
              Turn sales and marketing data into pipeline — AI-driven lead scoring, campaign analytics and CRM automation that replace manual, disconnected workflows.
            </p>
          </header>

          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="rounded-[2rem] border border-line bg-surface p-7 shadow-[0_16px_40px_rgba(20,25,50,0.06)]">
                <h2 className="text-lg font-semibold text-ink">{c.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{c.desc}</p>
              </div>
            ))}
          </section>

          <section className="rounded-[2rem] border border-line bg-surface p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-ink">Business outcomes</h2>
            <ul className="mt-6 space-y-4 text-ink-muted">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-6 rounded-[2rem] border border-line bg-surface-2 p-8 shadow-2xl">
            <h2 className="text-3xl font-semibold text-ink">How we work</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Discovery', 'Design', 'Build', 'Launch'].map((step) => (
                <div key={step} className="rounded-3xl bg-surface-2 p-6 text-ink ring-1 ring-line">
                  <h3 className="text-xl font-semibold text-ink">{step}</h3>
                  <p className="mt-3 text-ink-muted">A focused process for delivery and adoption.</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-ink">Related solutions</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/ai-dashboard-consulting" className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink-muted transition hover:bg-surface-2 hover:text-ink">
                AI Dashboards &amp; Reporting →
              </Link>
              <Link href="/data-engineering-snowflake-dbt" className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink-muted transition hover:bg-surface-2 hover:text-ink">
                Data Engineering &amp; Analytics →
              </Link>
              <Link href="/distributor-management-software" className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink-muted transition hover:bg-surface-2 hover:text-ink">
                VitaranAI →
              </Link>
            </div>
          </section>
        </article>
      </main>
      <CTA />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
