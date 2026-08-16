import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

export type OracleCapability = {
  title: string;
  desc: string;
  tags: string[];
};

export type OraclePageData = {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  stats: { stat: string; label: string }[];
  capabilities: OracleCapability[];
  breadcrumb: { label: string; href: string }[];
  relatedPages: { label: string; href: string }[];
};

export default function OracleServicePage({ data }: { data: OraclePageData }) {
  const baseUrl = `https://${siteConfig.domain}`;
  const pageUrl = `${baseUrl}${data.breadcrumb[data.breadcrumb.length - 1]?.href ?? ''}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${data.title} ${data.titleHighlight}`,
    description: data.subtitle,
    url: pageUrl,
    provider: { '@type': 'Organization', name: siteConfig.name, url: baseUrl },
    areaServed: 'IN',
    serviceType: data.capabilities.map((c) => c.title),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.breadcrumb.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `${baseUrl}${crumb.href}`,
    })),
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
            {data.breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {i === data.breadcrumb.length - 1 ? (
                  <span className="text-ink-muted">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="transition hover:text-ink-muted">{crumb.label}</Link>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-accent-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {data.badge}
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {data.title}{' '}
              <span className="text-accent">
                {data.titleHighlight}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-ink-muted">
              {data.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
              >
                Talk to Experts
              </Link>
              <Link
                href="/oracle-implementation-services"
                className="rounded-full border border-line bg-surface-2 px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-surface-2"
              >
                All Oracle Services ↗
              </Link>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {data.stats.map(({ stat, label }) => (
                <div key={label} className="rounded-2xl border border-line bg-surface-2 p-5">
                  <p className="text-xl font-bold text-ink">{stat}</p>
                  <p className="mt-1 text-[11px] text-ink-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Key Capabilities</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">What We Deliver</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
                Soxira helps enterprises modernize supply chain, finance and HR operations with Oracle technologies.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {data.capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="group rounded-2xl border border-line bg-surface-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line hover:bg-surface-2"
                >
                  <h3 className="font-semibold text-accent">{cap.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-ink-muted">{cap.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cap.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-[10px] text-ink-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related pages */}
        {data.relatedPages.length > 0 && (
          <section className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">Related Services</p>
              <div className="flex flex-wrap gap-3">
                {data.relatedPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-xl border border-line bg-surface-2 px-4 py-2.5 text-sm text-ink-muted transition hover:border-line hover:text-ink"
                  >
                    {page.label} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-3xl border border-line bg-accent-tint p-10 text-center">
              <h2 className="text-2xl font-semibold text-ink">Ready to Transform Your Enterprise?</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink-muted">
                Get expert Oracle implementation guidance from our certified consultants with 25+ years of hands-on experience.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                >
                  Talk to Experts
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-line bg-surface-2 px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-surface-2"
                >
                  Request a Proposal
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
