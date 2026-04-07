import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Distributor Management Software India | VitaranAI by Soxira',
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
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="space-y-10">
          <header className="space-y-4">
            <p className="inline-flex rounded-full bg-slate-900/70 px-4 py-2 text-sm uppercase tracking-[0.3em] text-sky-300/90">Distributor Software</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Distributor Management Software - VitaranAI</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              VitaranAI helps distributors and wholesalers scale with AI-powered order lifecycle, inventory planning and analytics.
            </p>
            <div className="relative mt-2 flex items-center justify-start">
              <span className="absolute -inset-1 animate-pulse rounded-xl bg-gradient-to-r from-purple-500/30 via-sky-400/20 to-violet-500/30 blur-sm" />
              <span className="relative z-10 inline-block rounded-xl px-4 py-2 font-semibold text-base text-white shadow-lg ring-2 ring-violet-400/40 backdrop-blur-md">
                Visit the live product at{' '}
                <a href="https://VitaranAI.in" target="_blank" rel="noreferrer" className="bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent underline underline-offset-4 hover:from-pink-400 hover:to-blue-400 transition-all duration-300">
                  VitaranAI.in
                </a>
                .
              </span>
            </div>
          </header>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Built for distribution networks</h2>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li>AI-enabled order routing and allocation</li>
                <li>Inventory monitoring and demand forecasting</li>
                <li>Sales analytics for channel partners</li>
                <li>Automated dealer engagement workflows</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Key benefits</h2>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li>Reduce stockouts and improve fill rates</li>
                <li>Optimize transportation and route efficiency</li>
                <li>Deliver faster dealer service and support</li>
                <li>Track distributor performance with analytics</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
            <h2 className="text-3xl font-semibold text-white">What makes VitaranAI unique</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {['AI Forecasting', 'Inventory Control', 'Route Planning', 'Dealer Insights'].map((capability) => (
                <div key={capability} className="rounded-3xl bg-slate-900/80 p-6 text-slate-200 ring-1 ring-white/10">
                  <h3 className="text-xl font-semibold text-white">{capability}</h3>
                  <p className="mt-3 text-slate-400">Designed for high-growth Indian distribution models and tier-2 supply chains.</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/contact" className="inline-flex rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-8 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.02]">
              Request VitaranAI demo
            </Link>
            <p className="max-w-xl text-slate-400">Launch distribution transformation with a trusted AI team and production-ready static website.</p>
          </div>
        </article>
      </main>
      <CTA />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
