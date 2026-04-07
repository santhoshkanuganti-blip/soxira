import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BannerRotator from '@/components/BannerRotator';
import Services from '@/components/Services';
import VitaranAI from '@/components/VitaranAI';
import CTA from '@/components/CTA';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'AI, Cloud & Data Solutions for Modern Businesses | Soxira AI Solutions',
  description:
    'Soxira AI Solutions helps CEOs, SMEs, distributors and enterprises transform with AI, cloud migration, and data engineering.',
  keywords: [
    'product development company India',
    'cloud migration services India',
    'Snowflake DBT consulting',
    'AI dashboard development company',
    'distributor management software India',
  ],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: `https://${siteConfig.domain}`,
  logo: `https://${siteConfig.domain}${siteConfig.logo}`,
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />
      <main className="relative overflow-hidden">

        {/* Hero */}
        <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.22),_transparent_20%),radial-gradient(circle_at_90%_20%,_rgba(14,165,233,0.16),_transparent_25%)]" />
          <div className="absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-6">
                <p className="inline-flex rounded-full border border-slate-600/80 bg-slate-900/70 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-sky-200/90">
                  Enterprise AI & Cloud
                </p>
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl xl:text-4xl">
                  AI, Cloud & Data Solutions for Modern Businesses
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Transform operations, accelerate product delivery, and scale distributor networks with a team backed by 20+ years of enterprise experience.
                </p>
                <p className="max-w-2xl text-xs leading-7 text-slate-400 sm:text-sm">
                  Powered by Next.js, Node, Python and CMS-first content architecture for SEO-ready, high-performance digital experiences.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a href="/contact" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:scale-[1.02]">
                    Get Free Consultation
                  </a>
                  <a href="#services" className="inline-flex items-center justify-center rounded-full border border-slate-600/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900/80">
                    Explore Services
                  </a>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300 ring-1 ring-white/10">
                    <div className="font-semibold text-white">20+ years</div>
                    <p className="mt-1 text-slate-400 text-xs">Trusted enterprise and SME transformation.</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300 ring-1 ring-white/10">
                    <div className="font-semibold text-white">India-first</div>
                    <p className="mt-1 text-slate-400 text-xs">Designed for India's CEOs, distributors and tier-2 enterprises.</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300 ring-1 ring-white/10">
                    <div className="font-semibold text-white">No backend required</div>
                    <p className="mt-1 text-slate-400 text-xs">Static-first site with lead capture and mail handling.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.45)] backdrop-blur-xl">
                  <div className="absolute left-6 top-6 h-12 w-12 rounded-full bg-violet-500/20 blur-2xl" />
                  <div className="absolute right-6 bottom-8 h-10 w-10 rounded-full bg-sky-400/20 blur-2xl" />
                  <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/85 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Modern AI Insights</p>
                        <h2 className="mt-3 text-xl font-semibold text-white">Insights built for leadership.</h2>
                      </div>
                      <span className="rounded-full bg-slate-800/90 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-sky-300">Live</span>
                    </div>
                    <p className="mt-4 text-sm text-slate-300">Actionable dashboards that help CEOs and managers reduce risk, forecast demand, and grow revenue.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {['Cloud', 'AI', 'Data', 'Product'].map((item) => (
                        <div key={item} className="rounded-[1.75rem] border border-white/10 bg-slate-950/75 px-4 py-4 text-center text-slate-200 shadow-[0_10px_45px_rgba(15,23,42,0.22)]">
                          <p className="text-base font-semibold text-white">{item}</p>
                          <p className="mt-1 text-xs text-slate-400">Expertise</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-sky-400/20 blur-3xl" />
                <div className="pointer-events-none absolute left-4 top-10 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-300/90">Services for growth</p>
              <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">Services that make AI, cloud and data transformation fast and secure.</h2>
            </div>
            <Services />
          </div>
        </section>

        {/* Banner Rotator */}
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Trusted product development & distribution solutions</h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300 leading-7">Premium SaaS-style product engineering for modern enterprises, including VitaranAI for distributor management.</p>
            <div className="mt-8">
              <BannerRotator />
            </div>
          </div>
        </section>

        {/* AI Dashboards */}
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">AI dashboards & business insights</h2>
                <p className="mt-3 max-w-2xl text-sm text-slate-300 leading-7">Custom dashboards with predictive analytics, automated reporting and executive scorecards designed for measurable ROI.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {['Forecasting', 'KPI Automation', 'Operational AI', 'Analytics'].map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 text-white shadow-xl">
                    <h3 className="text-sm font-semibold text-white">{item}</h3>
                    <p className="mt-2 text-xs text-slate-300">Enterprise-grade capabilities for fast-moving teams.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack + Why Soxira */}
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-white">Technology stack</h2>
                <p className="mt-3 text-sm text-slate-300 leading-7">We use the most trusted cloud and data platforms to deliver scalable, secure solutions.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {['AWS', 'GCP', 'Azure', 'Snowflake', 'DBT', 'Web Development', 'Mobile Development'].map((tech) => (
                    <div key={tech} className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-700/30 to-sky-500/10 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-white">Why Soxira</h2>
                <p className="mt-3 text-sm text-slate-300 leading-7">Backed by a team with 20+ years of experience, we deliver enterprise-grade digital strategy, product engineering and AI adoption.</p>
                <div className="mt-6 grid gap-3">
                  {[
                    'Decades of delivery experience',
                    'Dedicated India and tier-2 enterprise focus',
                    'Premium SaaS-style interfaces and secure architecture',
                  ].map((item) => (
                    <div key={item} className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-200 ring-1 ring-white/10">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VitaranAI */}
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <VitaranAI />
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CTA />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-300/90">Contact</p>
              <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">Get in touch with our AI, cloud and data experts</h2>
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
