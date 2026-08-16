import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

export type CompareData = {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  intro: string;
  labelA: string;
  labelB: string;
  criteria: { name: string; a: string; b: string }[];
  chooseA: string[];
  chooseB: string[];
  verdict: string;
  disclosure: string;
  faq: { q: string; a: string }[];
  ctaHref: string;
  ctaLabel: string;
};

export default function ComparePage({ data }: { data: CompareData }) {
  const baseUrl = `https://${siteConfig.domain}`;
  const pageUrl = `${baseUrl}/compare/${data.slug}`;
  const breadcrumb = [
    { label: 'Home', href: '/' },
    { label: 'Compare', href: '/compare' },
    { label: data.title, href: `/compare/${data.slug}` },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.subtitle,
    url: pageUrl,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@type': 'Organization', name: siteConfig.name },
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
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-accent-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {data.badge}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">{data.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink-muted">{data.subtitle}</p>
          </div>
        </section>

        {/* Intro + disclosure */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4">
            <p className="text-center text-sm leading-7 text-ink-muted">{data.intro}</p>
            <p className="rounded-xl border border-line bg-surface-2 px-5 py-3 text-center text-xs leading-6 text-ink-muted">{data.disclosure}</p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-line text-sm">
              <thead>
                <tr className="bg-surface-2 text-left">
                  <th className="px-5 py-4 font-semibold text-ink-muted">Criteria</th>
                  <th className="px-5 py-4 font-semibold text-accent">{data.labelA}</th>
                  <th className="px-5 py-4 font-semibold text-accent">{data.labelB}</th>
                </tr>
              </thead>
              <tbody>
                {data.criteria.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? 'bg-white/[0.015]' : ''}>
                    <td className="border-t border-line px-5 py-4 font-medium text-ink-muted">{row.name}</td>
                    <td className="border-t border-line px-5 py-4 text-ink-muted">{row.a}</td>
                    <td className="border-t border-line px-5 py-4 text-ink-muted">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to choose each */}
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-accent-tint p-6">
              <h3 className="font-semibold text-accent">Choose {data.labelA} if…</h3>
              <ul className="mt-4 space-y-2.5">
                {data.chooseA.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-6 text-ink-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-accent-tint p-6">
              <h3 className="font-semibold text-accent">Choose {data.labelB} if…</h3>
              <ul className="mt-4 space-y-2.5">
                {data.chooseB.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-6 text-ink-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-surface-2 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">Our Take</p>
            <p className="mt-4 text-sm leading-7 text-ink-muted">{data.verdict}</p>
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
              <h2 className="text-2xl font-semibold text-ink">Not sure which fits your situation?</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink-muted">
                Tell us what you&rsquo;re running today and where it&rsquo;s breaking down — we&rsquo;ll give you a straight answer, even if it&rsquo;s not us.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110">
                  Talk to Experts
                </Link>
                <Link href={data.ctaHref} className="rounded-full border border-line bg-surface-2 px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-surface-2">
                  {data.ctaLabel} ↗
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
