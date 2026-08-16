import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import LeadershipSection from '@/components/sections/LeadershipSection';
import WhatsNewSection from '@/components/sections/WhatsNewSection';
import ProductsSection from '@/components/sections/ProductsSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogsSection from '@/components/sections/BlogsSection';
import IndustryVerticalsSection from '@/components/sections/IndustryVerticalsSection';
import SolutionsOverviewSection from '@/components/sections/SolutionsOverviewSection';
import HeroGem from '@/components/HeroGem';
import { siteConfig } from '@/config/site';
import { db } from '@/lib/db';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'AI-Powered Digital Transformation for Modern Enterprises | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}` },
  description:
    'Soxira AI Solutions helps MSMEs, Distributors, Manufacturers, Finance and Insurance organizations digitize, automate and scale using VitaranAI, Oracle, AI and Cloud platforms.',
  keywords: [
    'AI solutions India',
    'digital transformation MSMEs',
    'VitaranAI distributor software',
    'Oracle ERP implementation India',
    'AI for Indian businesses',
    'Soxira AI Solutions',
    'Snowflake DBT India',
    'cloud migration services India',
  ],
  openGraph: {
    title: 'Soxira AI Solutions — AI-Powered Digital Transformation',
    description: 'Helping MSMEs, Distributors, Manufacturers, Finance and Insurance organizations digitize with AI, Oracle, and Cloud.',
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: `https://${siteConfig.domain}`,
  logo: `https://${siteConfig.domain}/logo-light.png`,
  description: 'AI-Powered Digital Transformation for Modern Enterprises',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  ],
  sameAs: [siteConfig.contact.linkedin],
};

const VITARANAI_FEATURES = [
  { title: 'Procurement', desc: 'Automate purchase requisitions, approvals, and vendor ordering end-to-end.', icon: '📦' },
  { title: 'Inventory', desc: 'Real-time stock visibility with AI-powered demand forecasting across locations.', icon: '🏭' },
  { title: 'Sales', desc: 'Track orders, beat plans, and collections with AI-driven sales intelligence.', icon: '📈' },
  { title: 'Vendor Management', desc: 'Centralize vendor onboarding, performance tracking, and payments.', icon: '🤝' },
  { title: 'Finance', desc: 'Automated accounts payable/receivable, ledger reconciliation and cash flow analytics.', icon: '💰' },
  { title: 'Analytics', desc: 'Executive dashboards with predictive insights, KPIs, and custom reports.', icon: '📊' },
];

async function getHomePageData() {
  try {
    const [leaders, promotions, products, caseStudies, testimonials, blogs] = await Promise.all([
      db.leadership.findMany({ where: { active: true }, orderBy: { displayOrder: 'asc' } }),
      db.promotion.findMany({
        where: {
          active: true,
          OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      db.product.findMany({ where: { active: true }, orderBy: { displayOrder: 'asc' } }),
      db.caseStudy.findMany({ where: { active: true }, orderBy: { createdAt: 'desc' }, take: 6 }),
      db.testimonial.findMany({ where: { active: true }, orderBy: { createdAt: 'desc' }, take: 8 }),
      db.blog.findMany({
        where: { status: 'published' },
        orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
        take: 4,
        select: { id: true, title: true, slug: true, excerpt: true, category: true, imageUrl: true, publishedAt: true, author: true, featured: true },
      }),
    ]);

    return {
      leaders: leaders.map((l: (typeof leaders)[number]) => ({ ...l, expertise: l.expertise as string[] })),
      promotions,
      products: products.map((p: (typeof products)[number]) => ({
        ...p,
        features: p.features as string[],
        benefits: p.benefits as string[],
        industryTags: p.industryTags as string[],
      })),
      caseStudies: caseStudies.map((cs: (typeof caseStudies)[number]) => ({
        ...cs,
        benefits: cs.benefits as string[],
        metrics: cs.metrics as Record<string, string> | null,
      })),
      testimonials,
      blogs,
    };
  } catch {
    return { leaders: [], promotions: [], products: [], caseStudies: [], testimonials: [], blogs: [] };
  }
}

export default async function Home() {
  const { leaders, promotions, products, caseStudies, testimonials, blogs } = await getHomePageData();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <main className="relative overflow-hidden">

        {/* ── 1. HERO ── */}
        <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">

              {/* Left — copy */}
              <div className="space-y-7">
                <p className="inline-flex items-center gap-2 rounded-full border border-line bg-accent-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  AI-First Enterprise Technology
                </p>

                <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl xl:text-5xl xl:leading-[1.15]">
                  AI-Powered Digital Transformation{' '}
                  <span className="text-accent">
                    for Modern Enterprises
                  </span>
                </h1>

                <p className="max-w-xl text-base leading-8 text-ink-muted">
                  Digitize Procurement, Inventory, Sales, Finance and Operations with{' '}
                  <span className="font-semibold text-ink">VitaranAI</span> and Enterprise AI Solutions from Soxira.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                  >
                    Request Demo
                  </Link>
                  <Link
                    href="/distributor-management-software"
                    className="rounded-full border border-line bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-surface-2 hover:text-ink"
                  >
                    Explore VitaranAI →
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { stat: '20+ yrs', label: 'Enterprise experience' },
                    { stat: 'Purpose-Built', label: 'For growing businesses' },
                    { stat: 'AI + Cloud', label: 'Modern tech stack' },
                  ].map(({ stat, label }) => (
                    <div key={stat} className="rounded-2xl border border-line bg-surface-2 px-4 py-4">
                      <p className="text-sm font-semibold text-ink">{stat}</p>
                      <p className="mt-0.5 text-[11px] text-ink-muted">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — WebGL gem + VitaranAI card */}
              <div className="relative space-y-4">
                <div className="relative h-48 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-accent to-[#0E1747] sm:h-56">
                  <HeroGem />
                </div>

                <div className="overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-[0_16px_40px_rgba(20,25,50,0.08)]">
                  <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-accent-tint blur-3xl" />
                  <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-accent-tint blur-3xl" />

                  <div className="relative">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-muted">Soxira Flagship</p>
                        <h2 className="mt-1.5 text-xl font-semibold text-ink">VitaranAI Platform</h2>
                      </div>
                      <span className="rounded-full border border-line bg-good-tint px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-good">
                        Live
                      </span>
                    </div>

                    <p className="mb-5 text-sm leading-6 text-ink-muted">
                      AI-powered operating system for small and medium businesses, distributors and manufacturers — from procurement to analytics.
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {VITARANAI_FEATURES.map((f) => (
                        <div key={f.title} className="rounded-xl border border-line bg-surface-2 p-3 text-center transition hover:border-line hover:bg-surface-2">
                          <span className="text-xl">{f.icon}</span>
                          <p className="mt-1.5 text-[11px] font-semibold text-ink">{f.title}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-2">
                      <a
                        href="https://VitaranAI.in"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 rounded-xl bg-surface-2 py-2.5 text-center text-xs font-semibold text-ink transition hover:bg-surface-2"
                      >
                        Explore VitaranAI.in ↗
                      </a>
                      <Link
                        href="/contact"
                        className="flex-1 rounded-xl bg-accent py-2.5 text-center text-xs font-semibold text-white"
                      >
                        Request Demo
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Glow beneath card */}
                <div className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-2/3 -translate-x-1/2 rounded-full bg-accent-tint blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. WHAT'S NEW ── */}
        {promotions.length > 0 && <WhatsNewSection promotions={promotions} />}

        {/* ── 3. VITARANAI FEATURES (DB-driven products) ── */}
        {products.length > 0 && <ProductsSection products={products} />}

        {/* ── 4. INDUSTRY VERTICALS ── */}
        <IndustryVerticalsSection />

        {/* ── 5. SOLUTIONS OVERVIEW ── */}
        <SolutionsOverviewSection />

        {/* ── 6. LEADERSHIP ── */}
        <section id="leadership">
          {leaders.length > 0 && <LeadershipSection leaders={leaders} />}
        </section>

        {/* ── 7. CASE STUDIES ── */}
        <section id="case-studies">
          {caseStudies.length > 0 && <CaseStudiesSection caseStudies={caseStudies} />}
        </section>

        {/* ── 8. TESTIMONIALS ── */}
        {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}

        {/* ── 9. BLOGS ── */}
        {blogs.length > 0 && <BlogsSection posts={blogs} />}

        {/* ── 10. CONTACT ── */}
        <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Contact</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                Get in touch with our AI transformation experts
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-muted">
                Tell us about your business and we&apos;ll show you how AI can transform it.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

      </main>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
