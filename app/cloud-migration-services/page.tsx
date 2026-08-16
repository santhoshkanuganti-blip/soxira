import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Cloud Migration Services India | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}/cloud-migration-services` },
  description:
    'Soxira provides cloud migration services in India for enterprises, helping teams move to AWS, Azure, and GCP with minimal disruption.',
  keywords: ['cloud migration services India', 'cloud migration', 'AWS migration', 'GCP migration', 'Azure migration'],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Cloud Migration',
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
  },
  areaServed: 'IN',
};

export default function CloudMigrationPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="space-y-10">
          <header className="space-y-4">
            <p className="inline-flex rounded-full bg-surface-2 px-4 py-2 text-sm uppercase tracking-[0.3em] text-accent">Cloud Migration</p>
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Cloud Migration Services for Indian Enterprises</h1>
            <p className="max-w-3xl text-lg leading-8 text-ink-muted">
              Migrate to AWS, Azure, or GCP with zero compromise on security, performance and operational continuity.
            </p>
          </header>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-line bg-surface p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-ink">Migration approach</h2>
              <ul className="mt-6 space-y-4 text-ink-muted">
                <li>Cloud readiness assessment and cost modeling</li>
                <li>Secure architecture design and workload migration</li>
                <li>Automation of deployment, CI/CD and infrastructure</li>
                <li>Governance, backup and operational monitoring</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-line bg-surface p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-ink">Why our cloud migration works</h2>
              <ul className="mt-6 space-y-4 text-ink-muted">
                <li>Validated process for seamless migration and cutover</li>
                <li>Expertise in hybrid and multi-cloud architectures</li>
                <li>Risk reduction for sensitive enterprise datasets</li>
                <li>Continuous optimization after go-live</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6 rounded-[2rem] border border-line bg-surface-2 p-8 shadow-2xl">
            <h2 className="text-3xl font-semibold text-ink">Supported platforms</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {['AWS', 'Azure', 'GCP'].map((cloud) => (
                <div key={cloud} className="rounded-3xl bg-surface-2 p-6 text-ink ring-1 ring-line">
                  <h3 className="text-xl font-semibold text-ink">{cloud}</h3>
                  <p className="mt-3 text-ink-muted">Cloud-native services, migration strategy and operational readiness.</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-ink">Industry deep dives</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/solutions/cloud-migration-for-insurance" className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink-muted transition hover:bg-surface-2 hover:text-ink">
                Cloud Migration for Insurance →
              </Link>
              <Link href="/solutions/cloud-migration-for-healthcare" className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink-muted transition hover:bg-surface-2 hover:text-ink">
                Cloud Migration for Healthcare & Pharma →
              </Link>
            </div>
          </section>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/contact" className="inline-flex rounded-full bg-accent px-8 py-4 text-base font-semibold text-white transition hover:scale-[1.02]">
              Start cloud migration
            </Link>
            <p className="max-w-xl text-ink-muted">We help businesses across India migrate securely with a static website and lead capture ready for production.</p>
          </div>
        </article>
      </main>
      <CTA />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
