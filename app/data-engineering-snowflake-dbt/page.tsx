import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Data Engineering Snowflake DBT | Soxira AI Solutions',
  description:
    'Soxira delivers data engineering solutions with Snowflake and DBT for analytics-ready pipelines, data quality and enterprise reporting.',
  keywords: ['Snowflake DBT consulting', 'data engineering', 'Snowflake', 'DBT', 'data platform'],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Data Engineering',
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
  },
  areaServed: 'IN',
};

export default function DataEngineeringPage() {
  return (
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="space-y-10">
          <header className="space-y-4">
            <p className="inline-flex rounded-full bg-slate-900/70 px-4 py-2 text-sm uppercase tracking-[0.3em] text-sky-300/90">Data Engineering</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Snowflake DBT Consulting for Analytics-first Organizations</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Modernize your data stack with Snowflake, DBT and analytics pipelines that deliver clean, trusted data for business decisions.
            </p>
          </header>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Our data engineering strengths</h2>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li>Snowflake implementation and optimization</li>
                <li>DBT modeling, testing and deployment</li>
                <li>ETL/ELT pipelines for analytics and reporting</li>
                <li>Data governance and quality automation</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Benefits for your team</h2>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li>Faster analytics with reliable Snowflake models</li>
                <li>Lower maintenance through DBT automation</li>
                <li>Better collaboration between analytics and engineering</li>
                <li>Faster insights for CXOs and business leaders</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
            <h2 className="text-3xl font-semibold text-white">Trusted by enterprises</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Snowflake', 'DBT', 'Analytics', 'Governance'].map((capability) => (
                <div key={capability} className="rounded-3xl bg-slate-900/80 p-6 text-slate-200 ring-1 ring-white/10">
                  <h3 className="text-xl font-semibold text-white">{capability}</h3>
                  <p className="mt-3 text-slate-400">Efficient, scalable and secure data engineering support.</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/contact" className="inline-flex rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-8 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.02]">
              Book a Snowflake review
            </Link>
            <p className="max-w-xl text-slate-400">We deliver data pipelines crafted for Indian enterprises and distributor ecosystems.</p>
          </div>
        </article>
      </main>
      <CTA />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
