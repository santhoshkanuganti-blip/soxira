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
import TechExpertiseSection from '@/components/sections/TechExpertiseSection';
import { siteConfig } from '@/config/site';
import { db } from '@/lib/db';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'AI-Powered Digital Transformation for Indian Businesses | Soxira AI Solutions',
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
  logo: `https://${siteConfig.domain}${siteConfig.logo}`,
  description: 'AI-Powered Digital Transformation for Indian Businesses',
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
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />

      <main className="relative overflow-hidden">

        {/* ── 1. HERO ── */}
        <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* Aurora background */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.18),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(14,165,233,0.12),transparent)]" />
          </div>
          {/* Glow orbs */}
          <div className="pointer-events-none absolute left-1/4 top-12 h-72 w-72 rounded-full bg-violet-600/10 blur-[80px]" />
          <div className="pointer-events-none absolute right-1/4 top-24 h-56 w-56 rounded-full bg-sky-500/10 blur-[60px]" />

          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">

              {/* Left — copy */}
              <div className="space-y-7">
                <p className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  AI-First Enterprise Technology
                </p>

                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl xl:text-5xl xl:leading-[1.15]">
                  AI-Powered Digital Transformation{' '}
                  <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">
                    for Indian Businesses
                  </span>
                </h1>

                <p className="max-w-xl text-base leading-8 text-slate-400">
                  Digitize Procurement, Inventory, Sales, Finance and Operations with{' '}
                  <span className="font-semibold text-slate-200">VitaranAI</span> and Enterprise AI Solutions from Soxira.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-gradient-to-r from-violet-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 hover:shadow-violet-500/40"
                  >
                    Request Demo
                  </Link>
                  <Link
                    href="/distributor-management-software"
                    className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition hover:bg-white/[0.08] hover:text-white"
                  >
                    Explore VitaranAI →
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { stat: '20+ yrs', label: 'Enterprise experience' },
                    { stat: 'India-first', label: 'Designed for MSMEs' },
                    { stat: 'AI + Cloud', label: 'Modern tech stack' },
                  ].map(({ stat, label }) => (
                    <div key={stat} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-4 backdrop-blur">
                      <p className="text-sm font-semibold text-white">{stat}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — VitaranAI card */}
              <div className="relative">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-7 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-violet-600/15 blur-3xl" />
                  <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-sky-500/15 blur-3xl" />

                  <div className="relative">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">Soxira Flagship</p>
                        <h2 className="mt-1.5 text-xl font-semibold text-white">VitaranAI Platform</h2>
                      </div>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                        Live
                      </span>
                    </div>

                    <p className="mb-5 text-sm leading-6 text-slate-400">
                      AI-powered operating system for MSMEs, distributors and manufacturers — from procurement to analytics.
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {VITARANAI_FEATURES.map((f) => (
                        <div key={f.title} className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-3 text-center transition hover:border-violet-500/30 hover:bg-white/[0.07]">
                          <span className="text-xl">{f.icon}</span>
                          <p className="mt-1.5 text-[11px] font-semibold text-slate-200">{f.title}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-2">
                      <a
                        href="https://VitaranAI.in"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 rounded-xl bg-white/[0.06] py-2.5 text-center text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                      >
                        Explore VitaranAI.in ↗
                      </a>
                      <Link
                        href="/contact"
                        className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-sky-500 py-2.5 text-center text-xs font-semibold text-white"
                      >
                        Request Demo
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Glow beneath card */}
                <div className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-2/3 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
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

        {/* ── 6. TECHNOLOGY EXPERTISE ── */}
        <TechExpertiseSection />

        {/* ── 7. LEADERSHIP ── */}
        <section id="leadership">
          {leaders.length > 0 && <LeadershipSection leaders={leaders} />}
        </section>

        {/* ── 8. CASE STUDIES ── */}
        <section id="case-studies">
          {caseStudies.length > 0 && <CaseStudiesSection caseStudies={caseStudies} />}
        </section>

        {/* ── 9. TESTIMONIALS ── */}
        {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}

        {/* ── 10. BLOGS ── */}
        {blogs.length > 0 && <BlogsSection posts={blogs} />}

        {/* ── 11. CONTACT ── */}
        <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400/80">Contact</p>
              <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Get in touch with our AI transformation experts
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
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
