import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Distributor Management Software India | VitaranAI by Soxira',
  alternates: { canonical: `https://${siteConfig.domain}/distributor-management-software` },
  description:
    'VitaranAI is distributor management software from Soxira that optimizes inventory, orders and routes for distribution networks in India.',
  keywords: ['distributor management software India', 'VitaranAI', 'distribution software', 'distributor app'],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Distributor Management Software',
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
  },
  areaServed: 'IN',
};

export default function DistributorPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="space-y-10">
          <header className="space-y-4">
            <p className="inline-flex rounded-full bg-surface-2 px-4 py-2 text-sm uppercase tracking-[0.3em] text-accent">Business Operations Platform</p>
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">VitaranAI — Business Operations Platform</h1>
            <p className="max-w-3xl text-lg leading-8 text-ink-muted">
              VitaranAI is Soxira&rsquo;s AI-powered business operations platform — helping distributors, manufacturers and growing businesses run procurement, inventory, sales and analytics from one system.
            </p>
            <div className="relative mt-2 flex items-center justify-start">
              <span className="absolute -inset-1 animate-pulse rounded-xl bg-accent blur-sm" />
              <span className="relative z-10 inline-block rounded-xl px-4 py-2 font-semibold text-base text-ink shadow-lg ring-2 ring-accent-tint -md">
                Visit the live product at{' '}
                <a href="https://VitaranAI.in" target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4 transition-all duration-300">
                  VitaranAI.in
                </a>
                .
              </span>
            </div>
          </header>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-line bg-surface p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-ink">Built for distribution networks</h2>
              <ul className="mt-6 space-y-4 text-ink-muted">
                <li>AI-enabled order routing and allocation</li>
                <li>Inventory monitoring and demand forecasting</li>
                <li>Sales analytics for channel partners</li>
                <li>Automated dealer engagement workflows</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-line bg-surface p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-ink">Key benefits</h2>
              <ul className="mt-6 space-y-4 text-ink-muted">
                <li>Reduce stockouts and improve fill rates</li>
                <li>Optimize transportation and route efficiency</li>
                <li>Deliver faster dealer service and support</li>
                <li>Track distributor performance with analytics</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6 rounded-[2rem] border border-line bg-surface-2 p-8 shadow-2xl">
            <h2 className="text-3xl font-semibold text-ink">What makes VitaranAI unique</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {['AI Forecasting', 'Inventory Control', 'Route Planning', 'Dealer Insights'].map((capability) => (
                <div key={capability} className="rounded-3xl bg-surface-2 p-6 text-ink ring-1 ring-line">
                  <h3 className="text-xl font-semibold text-ink">{capability}</h3>
                  <p className="mt-3 text-ink-muted">Designed for high-growth Indian distribution models and tier-2 supply chains.</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-ink">How does VitaranAI compare?</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/compare/vitaranai-vs-legacy-distribution-management" className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink-muted transition hover:bg-surface-2 hover:text-ink">
                VitaranAI vs Legacy Distribution Management →
              </Link>
              <Link href="/saop-platform" className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink-muted transition hover:bg-surface-2 hover:text-ink">
                Also in development: SAOP — AI Orchestration Platform →
              </Link>
            </div>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/contact" className="inline-flex rounded-full bg-accent px-8 py-4 text-base font-semibold text-white transition hover:scale-[1.02]">
              Request VitaranAI demo
            </Link>
            <p className="max-w-xl text-ink-muted">Launch distribution transformation with a trusted AI team and production-ready static website.</p>
          </div>
        </article>
      </main>
      <CTA />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
