import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Product Development Company India | Soxira AI Solutions',
  description:
    'Soxira is a premium product development company in India delivering AI, cloud and data-driven digital products for enterprises and startups.',
  keywords: ['product development company India', 'product engineering', 'AI product development', 'Soxira'],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Product Development',
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
  },
  areaServed: 'IN',
  audience: {
    '@type': 'BusinessAudience',
    audienceType: ['CEOs', 'SMEs', 'Enterprises', 'Distributors'],
  },
};

export default function ProductDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="space-y-10">
          <header className="space-y-4">
            <p className="inline-flex rounded-full bg-slate-900/70 px-4 py-2 text-sm uppercase tracking-[0.3em] text-sky-300/90">Product Development</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Product Development Company for AI and Cloud-first Enterprises</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Build premium digital products with a team that brings 20+ years of experience in AI, cloud, data engineering and enterprise product delivery.
            </p>
          </header>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">What we deliver</h2>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li>End-to-end product strategy and roadmapping</li>
                <li>AI-first user experiences and dashboards</li>
                <li>Cloud-native architecture and microservices</li>
                <li>Data platform integration with Snowflake and DBT</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white">Why choose Soxira</h2>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li>20+ years of strategy, delivery and product leadership</li>
                <li>Experience with India-first SaaS and distributor ecosystems</li>
                <li>Secure, scalable, standards-based engineering</li>
                <li>Rapid prototyping and iterative product launches</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
            <h2 className="text-3xl font-semibold text-white">Target audiences</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/80 p-6 text-slate-200">
                <h3 className="text-xl font-semibold text-white">CEOs & Founders</h3>
                <p className="mt-2 text-slate-400">Build business-critical products that create new revenue models.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-6 text-slate-200">
                <h3 className="text-xl font-semibold text-white">Enterprises</h3>
                <p className="mt-2 text-slate-400">Modernize products with secure cloud and AI-led architecture.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-6 text-slate-200">
                <h3 className="text-xl font-semibold text-white">SMEs</h3>
                <p className="mt-2 text-slate-400">Launch robust digital products with fixed timelines and quality delivery.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-6 text-slate-200">
                <h3 className="text-xl font-semibold text-white">Distributors</h3>
                <p className="mt-2 text-slate-400">Use AI-driven products to improve inventory and route management.</p>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/contact" className="inline-flex rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-8 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.02]">
              Talk to our product team
            </Link>
            <p className="max-w-xl text-slate-400">No backend required. We deliver static-ready marketing with lead capture and outbound follow-up.</p>
          </div>
        </article>
      </main>
      <CTA />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
