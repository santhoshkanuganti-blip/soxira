import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  return (
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            {data.breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {i === data.breadcrumb.length - 1 ? (
                  <span className="text-slate-400">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="transition hover:text-slate-300">{crumb.label}</Link>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,rgba(220,38,38,0.12),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_30%,rgba(249,115,22,0.08),transparent)]" />
          </div>
          <div className="pointer-events-none absolute left-1/4 top-12 h-72 w-72 rounded-full bg-red-600/8 blur-[80px]" />

          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              {data.badge}
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {data.title}{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                {data.titleHighlight}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400">
              {data.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:brightness-110"
              >
                Talk to Experts
              </Link>
              <Link
                href="/oracle-implementation-services"
                className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
              >
                All Oracle Services ↗
              </Link>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {data.stats.map(({ stat, label }) => (
                <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <p className="text-xl font-bold text-white">{stat}</p>
                  <p className="mt-1 text-[11px] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400/80">Key Capabilities</p>
              <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">What We Deliver</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Soxira helps enterprises modernize supply chain, finance and HR operations with Oracle technologies.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {data.capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="group rounded-2xl border border-red-500/20 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:bg-white/[0.05]"
                >
                  <h3 className="font-semibold text-red-400">{cap.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-slate-400">{cap.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cap.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-slate-500">
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Related Services</p>
              <div className="flex flex-wrap gap-3">
                {data.relatedPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2.5 text-sm text-slate-400 transition hover:border-red-500/30 hover:text-white"
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
            <div className="overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-600/10 via-orange-600/5 to-transparent p-10 text-center">
              <h2 className="text-2xl font-semibold text-white">Ready to Transform Your Enterprise?</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
                Get expert Oracle implementation guidance from our certified consultants with 25+ years of hands-on experience.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:brightness-110"
                >
                  Talk to Experts
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                >
                  Request a Proposal
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
