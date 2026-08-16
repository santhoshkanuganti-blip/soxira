import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

export type SolutionMatrixData = {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  intro: string;
  serviceLabel: string;
  serviceHref: string;
  industryLabel: string;
  industryHref: string;
  challenges: { title: string; desc: string }[];
  capabilities: { title: string; desc: string }[];
  proof: { stat: string; label: string; text: string; href: string; linkLabel: string };
  faq: { q: string; a: string }[];
};

export default function SolutionMatrixPage({ data }: { data: SolutionMatrixData }) {
  const baseUrl = `https://${siteConfig.domain}`;
  const pageUrl = `${baseUrl}/solutions/${data.slug}`;
  const breadcrumb = [
    { label: 'Home', href: '/' },
    { label: data.industryLabel, href: data.industryHref },
    { label: data.title, href: `/solutions/${data.slug}` },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.title,
    description: data.intro,
    url: pageUrl,
    provider: { '@type': 'Organization', name: siteConfig.name, url: baseUrl },
    areaServed: 'IN',
    serviceType: data.capabilities.map((c) => c.title),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `${baseUrl}${crumb.href}`,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {i === breadcrumb.length - 1 ? (
                  <span className="text-ink-muted">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="transition hover:text-ink-muted">{crumb.label}</Link>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-accent-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {data.badge}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">{data.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink-muted">{data.subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110">
                Talk to Experts
              </Link>
              <Link href={data.serviceHref} className="rounded-full border border-line bg-surface-2 px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-surface-2">
                {data.serviceLabel} Overview ↗
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="px-4 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-sm leading-7 text-ink-muted">{data.intro}</p>
        </section>

        {/* Challenges */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">The {data.industryLabel} Challenge</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">Where {data.industryLabel.toLowerCase()} operations break down</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {data.challenges.map((ch) => (
                <div key={ch.title} className="rounded-2xl border border-line bg-surface-2 p-6">
                  <h3 className="font-semibold text-ink">{ch.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-ink-muted">{ch.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">How {data.serviceLabel} Addresses It</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">What Soxira delivers</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {data.capabilities.map((cap) => (
                <div key={cap.title} className="rounded-2xl border border-line bg-surface-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line hover:bg-surface-2">
                  <h3 className="font-semibold text-accent">{cap.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-ink-muted">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="px-4 pb-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-good-tint p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-good">Proven in {data.industryLabel}</p>
            <p className="mt-4 text-3xl font-bold text-ink">{data.proof.stat}<span className="ml-2 text-sm font-normal text-ink-muted">{data.proof.label}</span></p>
            <p className="mt-4 text-sm leading-7 text-ink-muted">{data.proof.text}</p>
            <Link href={data.proof.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-good transition hover:text-good">
              {data.proof.linkLabel} →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-semibold text-ink sm:text-3xl">Frequently asked questions</h2>
            <div className="space-y-4">
              {data.faq.map((item) => (
                <div key={item.q} className="rounded-2xl border border-line bg-surface-2 p-6">
                  <h3 className="font-semibold text-ink">{item.q}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-ink-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-3xl border border-line bg-accent-tint p-10 text-center">
              <h2 className="text-2xl font-semibold text-ink">Ready to bring this to your {data.industryLabel.toLowerCase()} business?</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink-muted">
                Talk to our {data.serviceLabel} and {data.industryLabel} specialists about your specific setup.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110">
                  Talk to Experts
                </Link>
                <Link href={data.industryHref} className="rounded-full border border-line bg-surface-2 px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-surface-2">
                  More on {data.industryLabel} ↗
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
