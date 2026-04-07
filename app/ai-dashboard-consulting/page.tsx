import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'AI Dashboard Development Company | Soxira AI Solutions',
  description:
    'Soxira is an AI dashboard development company delivering executive analytics, forecasting and performance dashboards for modern businesses.',
  keywords: ['AI dashboard development company', 'dashboard consulting', 'analytics dashboards', 'Soxira'],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Dashboard Development',
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
  },
  areaServed: 'IN',
};

export default function AIDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="space-y-10">
          <header className="space-y-4">
            <p className="inline-flex rounded-full bg-slate-900/70 px-4 py-2 text-sm uppercase tracking-[0.3em] text-sky-300/90">AI Dashboards</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">AI Dashboard Consulting for CEOs and Executives</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Create dashboards that connect AI insights, business metrics and operational data for faster, smarter decisions.
            </p>
          </header>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Dashboard capabilities</h2>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li>Executive scorecards and KPI monitoring</li>
                <li>AI-driven forecasting and anomaly detection</li>
                <li>Interactive analytics for sales and distribution teams</li>
                <li>Secure role-based access and reporting</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Business outcomes</h2>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li>Faster decisions with clear visual insights</li>
                <li>Aligned teams through one source of truth</li>
                <li>Predictable growth using data-driven forecasts</li>
                <li>Reduced operational risk with real-time alerts</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
            <h2 className="text-3xl font-semibold text-white">How we work</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Discovery', 'Design', 'Build', 'Launch'].map((step) => (
                <div key={step} className="rounded-3xl bg-slate-900/80 p-6 text-slate-200 ring-1 ring-white/10">
                  <h3 className="text-xl font-semibold text-white">{step}</h3>
                  <p className="mt-3 text-slate-400">A focused process for delivery and adoption.</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/contact" className="inline-flex rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-8 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.02]">
              Request dashboard review
            </Link>
            <p className="max-w-xl text-slate-400">Static site ready for Vercel deployment with lead capture and SEO-focused content.</p>
          </div>
        </article>
      </main>
      <CTA />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
