import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

type IndustryData = {
  title: string;
  subtitle: string;
  badge: string;
  hero: string;
  seoTitle: string;
  seoDesc: string;
  keywords: string[];
  challenges: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  benefits: string[];
  vitaranRelevance: string;
  caseStudyTeaser: string;
  deepDives?: { label: string; href: string }[];
};

const INDUSTRIES: Record<string, IndustryData> = {
  msmes: {
    title: 'AI Solutions for Small & Medium Businesses',
    subtitle: 'Empowering Small & Medium Businesses with Enterprise-Grade AI',
    badge: 'Small & Medium Businesses',
    hero: 'Small and medium businesses form the backbone of the economy — 63 million of them in India alone. Soxira brings enterprise-grade AI, Oracle, and Cloud technology to this segment — at accessible scale and cost.',
    seoTitle: 'AI Solutions for Indian MSMEs | Soxira AI Solutions',
    seoDesc: 'AI-powered digital transformation for Indian MSMEs. Automate procurement, inventory, sales, and analytics with VitaranAI and Soxira AI Solutions.',
    keywords: ['AI for MSMEs', 'digital transformation small business India', 'MSME software India', 'VitaranAI MSME'],
    challenges: [
      { title: 'Manual Processes', desc: 'Most MSMEs still rely on paper-based or spreadsheet-driven operations that are error-prone and slow.' },
      { title: 'Limited Visibility', desc: 'No real-time insight into inventory, cash flow, or sales performance across branches.' },
      { title: 'High Operating Cost', desc: 'Manual procurement and inventory processes cause wastage, overstocking, and revenue leakage.' },
      { title: 'Scaling Bottlenecks', desc: 'Growing beyond a single location becomes operationally chaotic without the right systems.' },
    ],
    solutions: [
      { title: 'VitaranAI', desc: 'Our flagship AI operating system for MSMEs — automates procurement, inventory, sales, vendor management, and analytics.' },
      { title: 'AI Dashboards', desc: 'Real-time KPI dashboards with predictive analytics designed for MSME business leaders.' },
      { title: 'Cloud Migration', desc: 'Move from legacy software to modern cloud-based systems with zero downtime.' },
      { title: 'AI Agents', desc: 'Autonomous AI workflows that handle repetitive tasks — from purchase approvals to invoice processing.' },
    ],
    benefits: [
      'Reduce manual effort by up to 70%',
      'Real-time inventory and cash flow visibility',
      'Automated procurement and approval workflows',
      'AI-powered demand forecasting',
      'Multi-branch management from a single platform',
      'Mobile-ready, India-first platform',
    ],
    vitaranRelevance: 'VitaranAI is specifically designed for Indian MSMEs — affordable AI-powered operations from procurement to analytics, available on mobile and web.',
    caseStudyTeaser: 'A leading cement distributor in Telangana eliminated stockouts by 85% and achieved 3.5x ROI in 6 months with VitaranAI.',
  },

  distributors: {
    title: 'AI-Powered Distributor Management',
    subtitle: 'VitaranAI — The Operating System for Indian Distribution Networks',
    badge: 'Distributors',
    hero: 'Distribution businesses run on speed, accuracy, and relationships. VitaranAI gives distributors complete control over procurement, inventory, sales, route optimization, and vendor management — powered by AI.',
    seoTitle: 'AI Distributor Management Software India | VitaranAI | Soxira',
    seoDesc: 'VitaranAI — AI-powered distributor management software for Indian businesses. Automate inventory, orders, routes, and vendor management.',
    keywords: ['distributor management software India', 'VitaranAI', 'AI inventory management', 'distribution automation India'],
    challenges: [
      { title: 'Inventory Chaos', desc: 'Stockouts and overstocking cause revenue loss and dealer dissatisfaction.' },
      { title: 'Order Processing Delays', desc: 'Manual order processing across multiple dealers leads to delays and errors.' },
      { title: 'Route Inefficiency', desc: 'Unoptimized delivery routes increase fuel costs and missed deliveries.' },
      { title: 'Payment Tracking', desc: 'Chasing outstanding payments and reconciling collections is a full-time job.' },
    ],
    solutions: [
      { title: 'Smart Inventory', desc: 'AI-driven demand forecasting with real-time stock visibility across all depots and dealers.' },
      { title: 'Order Automation', desc: 'Automated order processing from receipt to fulfillment with approval workflows.' },
      { title: 'Route Optimization', desc: 'AI-powered route planning that reduces fuel costs and ensures on-time delivery.' },
      { title: 'Collections Intelligence', desc: 'Automated payment reminders, outstanding tracking, and collections analytics.' },
    ],
    benefits: [
      'Eliminate stockouts by up to 85%',
      'Reduce order processing time from hours to minutes',
      'Cut fuel costs by 30-35% with route optimization',
      'Real-time visibility across all dealer locations',
      'Automated collections and payment tracking',
      'Mobile app for field sales teams',
    ],
    vitaranRelevance: 'VitaranAI is purpose-built for Indian distributors — cement, steel, FMCG, medical, LPG, auto parts, and more. It handles the full distribution cycle from procurement to customer delivery.',
    caseStudyTeaser: 'A medical distributor in Hyderabad achieved zero expiry waste and 100% regulatory compliance after deploying VitaranAI\'s AI inventory system.',
  },

  manufacturing: {
    title: 'AI for Manufacturing',
    subtitle: 'Smart Manufacturing with AI-Driven Supply Chain and Operations Intelligence',
    badge: 'Manufacturing',
    hero: 'Manufacturing competitiveness depends on production efficiency, supply chain agility, and quality control. Soxira brings AI, Oracle SCM, and Cloud platforms to help manufacturers modernize operations and compete globally.',
    seoTitle: 'AI Solutions for Manufacturing Industry India | Soxira AI',
    seoDesc: 'AI-powered manufacturing solutions for Indian manufacturers. Supply chain optimization, demand forecasting, Oracle SCM, and production intelligence from Soxira AI Solutions.',
    keywords: ['AI for manufacturing India', 'Oracle SCM manufacturing', 'supply chain AI', 'manufacturing automation India'],
    challenges: [
      { title: 'Demand Uncertainty', desc: 'Volatile demand leads to either stockouts of raw materials or excess finished goods inventory.' },
      { title: 'Supply Chain Disruptions', desc: 'Multi-tier vendor dependencies make supply chains fragile and difficult to manage manually.' },
      { title: 'Production Planning', desc: 'Manual production scheduling is slow, error-prone, and unable to respond to real-time changes.' },
      { title: 'Quality and Compliance', desc: 'Ensuring quality standards and regulatory compliance across production batches is complex.' },
    ],
    solutions: [
      { title: 'Oracle SCM', desc: 'End-to-end supply chain management on Oracle Cloud — from demand planning to procurement and fulfillment.' },
      { title: 'AI Demand Forecasting', desc: 'Machine learning models that predict demand patterns and optimize raw material procurement.' },
      { title: 'Production Intelligence', desc: 'Real-time production dashboards with OEE tracking, quality metrics, and downtime analysis.' },
      { title: 'Vendor Intelligence', desc: 'AI-powered vendor scorecards, lead time optimization, and multi-tier supply chain visibility.' },
    ],
    benefits: [
      'Reduce raw material inventory by 20-30%',
      'Improve production planning accuracy',
      'Real-time supply chain visibility',
      'Automated vendor performance management',
      'Predictive maintenance insights',
      'Regulatory compliance automation',
    ],
    vitaranRelevance: 'VitaranAI supports manufacturing businesses with procurement automation, vendor management, inventory tracking, and analytics — ideal for MSME manufacturers.',
    caseStudyTeaser: 'A cement manufacturer in Andhra Pradesh reduced procurement cycle time by 60% and achieved 28% revenue growth with Soxira\'s AI supply chain platform.',
    deepDives: [{ label: 'Oracle SCM for Manufacturing', href: '/solutions/oracle-scm-for-manufacturing' }],
  },

  finance: {
    title: 'AI for Finance & NBFCs',
    subtitle: 'AI-Powered Credit, Risk, and Operations Intelligence for Financial Institutions',
    badge: 'Finance',
    hero: 'Indian financial institutions face mounting pressure to accelerate credit decisions, reduce NPAs, and improve customer experience. Soxira delivers AI-powered solutions for NBFCs, banks, and lending organizations.',
    seoTitle: 'AI Solutions for Finance & NBFCs India | Soxira AI Solutions',
    seoDesc: 'AI-powered credit decisioning, risk management, and operations intelligence for Indian NBFCs, banks, and financial institutions. Soxira AI Solutions.',
    keywords: ['AI for NBFCs India', 'AI credit decisioning', 'BFSI AI solutions India', 'fintech AI India'],
    challenges: [
      { title: 'Slow Credit Decisions', desc: 'Manual credit underwriting takes days, causing customer drop-off and competitive disadvantage.' },
      { title: 'NPA Management', desc: 'Identifying at-risk accounts early and managing collections efficiently is critical.' },
      { title: 'Regulatory Compliance', desc: 'RBI regulations and reporting requirements demand accurate, real-time data management.' },
      { title: 'Customer Experience', desc: 'Digital-native competitors are raising the bar on customer onboarding and service speed.' },
    ],
    solutions: [
      { title: 'AI Credit Decisioning', desc: 'Machine learning models for real-time credit risk assessment and automated loan approvals.' },
      { title: 'Collections Intelligence', desc: 'AI-powered early warning systems that identify at-risk accounts and optimize collection strategies.' },
      { title: 'Oracle Financials', desc: 'Oracle Cloud Financials for comprehensive financial management, reporting, and compliance.' },
      { title: 'Regulatory Reporting', desc: 'Automated RBI and regulatory reporting with real-time data accuracy.' },
    ],
    benefits: [
      'Reduce credit decision time from days to minutes',
      'Improve NPA detection accuracy',
      'Automated regulatory reporting',
      'Real-time financial dashboards',
      'Digital customer onboarding',
      'AI-powered collections optimization',
    ],
    vitaranRelevance: 'For finance-sector businesses with distribution and field operations, VitaranAI provides collections tracking, payment management, and field agent intelligence.',
    caseStudyTeaser: 'A lending NBFC reduced credit approval time by 80% and improved collection efficiency by 40% with Soxira\'s AI credit intelligence platform.',
    deepDives: [
      { label: 'Oracle Financials Cloud for Finance & NBFCs', href: '/solutions/oracle-financials-for-finance' },
      { label: 'AI Dashboards for Finance & NBFCs', href: '/solutions/ai-dashboards-for-finance' },
    ],
  },

  insurance: {
    title: 'AI for Insurance',
    subtitle: 'AI-Driven Underwriting, Claims Automation, and Customer Intelligence',
    badge: 'Insurance',
    hero: 'The insurance industry is transforming with AI. Soxira helps insurers automate underwriting, accelerate claims processing, detect fraud, and deliver superior customer experiences through intelligent technology.',
    seoTitle: 'AI Solutions for Insurance Companies India | Soxira AI Solutions',
    seoDesc: 'AI-powered underwriting automation, claims processing, and fraud detection for Indian insurance companies. Soxira AI Solutions.',
    keywords: ['AI for insurance India', 'insurance automation', 'claims AI', 'underwriting automation India'],
    challenges: [
      { title: 'Manual Underwriting', desc: 'Time-consuming manual underwriting creates bottlenecks and inconsistent risk assessment.' },
      { title: 'Claims Processing Delays', desc: 'Manual claims handling leads to high TAT, customer dissatisfaction, and operational costs.' },
      { title: 'Fraud Detection', desc: 'Traditional rule-based fraud detection misses sophisticated fraudulent claims patterns.' },
      { title: 'Customer Retention', desc: 'Low digital engagement and slow service responsiveness leads to high churn.' },
    ],
    solutions: [
      { title: 'AI Underwriting', desc: 'Automated risk assessment models that process applications in real-time with consistent accuracy.' },
      { title: 'Claims Automation', desc: 'AI-powered claims intake, document processing, and straight-through processing for routine claims.' },
      { title: 'Fraud Intelligence', desc: 'Machine learning models that detect fraudulent patterns across claims data in real-time.' },
      { title: 'Customer Analytics', desc: 'Predictive models for churn prevention, cross-sell opportunities, and lifetime value optimization.' },
    ],
    benefits: [
      'Reduce underwriting TAT from days to hours',
      'Cut claims processing time by 50-60%',
      'Improve fraud detection accuracy',
      'Increase straight-through processing rates',
      'Personalized customer communications',
      'Real-time risk dashboards',
    ],
    vitaranRelevance: 'Insurance distributors and agents benefit from VitaranAI\'s policy tracking, premium collection management, and customer relationship intelligence.',
    caseStudyTeaser: 'A general insurance company reduced claims TAT by 55% and improved fraud detection accuracy by 35% with Soxira\'s AI claims intelligence platform.',
    deepDives: [
      { label: 'Cloud Migration for Insurance', href: '/solutions/cloud-migration-for-insurance' },
      { label: 'Data Engineering for Insurance', href: '/solutions/data-engineering-for-insurance' },
    ],
  },

  healthcare: {
    title: 'AI for Healthcare',
    subtitle: 'AI-Powered Supply Chain, Drug Inventory, and Compliance Automation',
    badge: 'Healthcare',
    hero: 'Healthcare organizations face unique challenges around drug inventory, cold chain compliance, regulatory requirements, and supply chain complexity. Soxira delivers AI-powered solutions that bring intelligence and compliance together.',
    seoTitle: 'AI Solutions for Healthcare Industry India | Soxira AI Solutions',
    seoDesc: 'AI-powered healthcare supply chain, drug inventory management, and compliance automation for hospitals and medical distributors in India. Soxira AI Solutions.',
    keywords: ['AI for healthcare India', 'drug inventory management AI', 'healthcare supply chain India', 'hospital AI solutions'],
    challenges: [
      { title: 'Drug Expiry Management', desc: 'Manual expiry tracking across thousands of SKUs leads to wastage and compliance risks.' },
      { title: 'Cold Chain Compliance', desc: 'Maintaining cold chain integrity for temperature-sensitive drugs requires constant monitoring.' },
      { title: 'Regulatory Reporting', desc: 'Drug licensing, CDSCO compliance, and GST reporting create a heavy administrative burden.' },
      { title: 'Supply Chain Complexity', desc: 'Multi-tier distribution with hospitals, chemists, and distributors creates coordination challenges.' },
    ],
    solutions: [
      { title: 'Smart Drug Inventory', desc: 'AI-powered inventory management with automatic FIFO enforcement, expiry alerts, and reorder optimization.' },
      { title: 'Cold Chain Monitoring', desc: 'Real-time temperature monitoring with automated alerts for cold chain deviations.' },
      { title: 'Compliance Automation', desc: 'Automated regulatory reporting for CDSCO, GST, and state drug licensing requirements.' },
      { title: 'Supply Chain Intelligence', desc: 'End-to-end visibility across the healthcare supply chain from manufacturer to patient.' },
    ],
    benefits: [
      'Zero expiry drug waste with AI FIFO management',
      '100% cold chain compliance',
      'Automated regulatory reporting',
      'Reduced inventory holding costs by 25-30%',
      'Real-time supply chain visibility',
      'Mobile tracking for field medical representatives',
    ],
    vitaranRelevance: 'VitaranAI\'s specialized healthcare module handles drug inventory with FIFO management, expiry tracking, batch management, and regulatory compliance built-in.',
    caseStudyTeaser: 'A pharmaceutical distributor in Hyderabad achieved zero expiry waste and 100% CDSCO compliance, reducing inventory costs by 30% with VitaranAI.',
    deepDives: [{ label: 'Cloud Migration for Healthcare & Pharma Distribution', href: '/solutions/cloud-migration-for-healthcare' }],
  },
};

export async function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];
  if (!industry) return {};

  return {
    title: industry.seoTitle,
    description: industry.seoDesc,
    keywords: industry.keywords,
    alternates: { canonical: `https://${siteConfig.domain}/industries/${slug}` },
    openGraph: {
      title: industry.seoTitle,
      description: industry.seoDesc,
      url: `https://${siteConfig.domain}/industries/${slug}`,
      siteName: siteConfig.name,
      type: 'website',
    },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];
  if (!industry) notFound();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: industry.title,
    provider: { '@type': 'Organization', name: siteConfig.name, url: `https://${siteConfig.domain}` },
    description: industry.seoDesc,
    areaServed: 'IN',
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent bg-accent-tint border-line`}>
              {industry.badge}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              <span className="text-accent">{industry.title}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-ink-muted">{industry.subtitle}</p>
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-ink-muted">{industry.hero}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110">
                Request a Demo
              </Link>
              <Link href="/distributor-management-software" className="rounded-full border border-line bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-surface-2">
                Explore VitaranAI →
              </Link>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">Industry Challenges</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">What Your Industry Faces</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {industry.challenges.map((c) => (
                <div key={c.title} className={`rounded-2xl border border-line bg-surface-2 p-5`}>
                  <h3 className="font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">Soxira AI Solutions</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">How We Solve It</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {industry.solutions.map((s) => (
                <div key={s.title} className="flex gap-4 rounded-2xl border border-line bg-surface-2 p-6">
                  <span className={`mt-1 h-2 w-2 shrink-0 rounded-full bg-accent`} />
                  <div>
                    <h3 className="font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-ink-muted">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep dives */}
        {industry.deepDives && industry.deepDives.length > 0 && (
          <section className="px-4 pb-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">Go Deeper</p>
              <div className="flex flex-wrap gap-3">
                {industry.deepDives.map((dive) => (
                  <Link
                    key={dive.href}
                    href={dive.href}
                    className={`rounded-xl border border-line bg-surface-2 px-4 py-2.5 text-sm text-ink-muted transition hover:bg-surface-2 hover:text-ink`}
                  >
                    {dive.label} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* VitaranAI relevance */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className={`overflow-hidden rounded-3xl border border-line bg-surface-2 p-8 sm:p-10`}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">VitaranAI Relevance</p>
              <h2 className="mt-3 text-xl font-semibold text-ink">VitaranAI for {industry.badge}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-ink-muted">{industry.vitaranRelevance}</p>
              <Link href="/distributor-management-software" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent-bright">
                Learn more about VitaranAI →
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">Benefits</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">What You Gain</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industry.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 rounded-xl border border-line bg-surface-2 px-5 py-4">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent`} />
                  <p className="text-sm text-ink-muted">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case study teaser */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-3xl border border-line bg-surface-2 p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">Customer Story</p>
              <blockquote className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-8 text-ink">
                &ldquo;{industry.caseStudyTeaser}&rdquo;
              </blockquote>
              <Link href="/#case-studies" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-accent">
                View all case studies →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-ink">Ready to transform your {industry.badge} business?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink-muted">
              Talk to our {industry.badge} specialists and discover how Soxira AI can digitize and scale your operations.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110">
                Schedule a Free Consultation
              </Link>
              <Link href="/#case-studies" className="rounded-full border border-line bg-surface-2 px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-surface-2">
                See Case Studies
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
