import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'SAOP — Soxira AI Orchestration Platform (In Development) | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}/saop-platform` },
  description:
    'SAOP connects your existing business systems — SAP, Oracle, Salesforce and more — orchestrates workflows, and empowers every decision with AI. Not an ERP replacement. Currently in active development.',
  keywords: ['AI orchestration platform', 'enterprise AI integration', 'workflow automation AI', 'SAOP Soxira', 'AI agents enterprise'],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Orchestration Platform',
  name: 'SAOP — Soxira AI Orchestration Platform',
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
  },
  areaServed: 'IN',
  description: 'An enterprise AI integration and orchestration platform that connects existing business systems, orchestrates workflows and enables intelligent automation. Currently in active development.',
};

const CONNECTORS = ['SAP', 'Oracle ERP', 'Salesforce', 'SQL Server', 'PostgreSQL', 'BigQuery', 'Snowflake', 'Excel / CSV', 'REST APIs', 'IoT / PLC Devices'];

const INTERFACES = ['Web Portal', 'Mobile App', 'WhatsApp', 'Microsoft Teams', 'Email / Chat'];

const MODULES = [
  { title: 'AI Agent Engine', desc: 'Runs the specialized agents that monitor, predict and recommend across every connected function.' },
  { title: 'Workflow Engine', desc: 'Selects and executes the right business workflow for each request or trigger.' },
  { title: 'Connector Manager', desc: 'Handles authentication and data exchange with every connected system.' },
  { title: 'Planning Engine', desc: 'Models capacity, scheduling and what-if scenarios across facilities.' },
  { title: 'Business Rules', desc: 'Validates every recommendation against your approvals, budgets and compliance rules.' },
  { title: 'Knowledge Base (RAG)', desc: 'Grounds AI responses in your own enterprise data and documentation.' },
  { title: 'Analytics & Dashboards', desc: 'Turns connected data into real-time KPIs, forecasts and visual reporting.' },
  { title: 'Notification Engine', desc: 'Pushes alerts and updates to the right person on the right channel.' },
  { title: 'Security & Access Control', desc: 'Role-based access across every connected system and workflow.' },
  { title: 'Audit & Logging', desc: 'Logs every action SAOP takes for transparency and compliance.' },
];

const AGENTS = [
  { title: 'Procurement Agent', desc: 'Suggests the best supplier, supplier plant, price and lowest landed cost.' },
  { title: 'Inventory Agent', desc: 'Predicts stock shortages, overstock and slow-moving inventory before they become a problem.' },
  { title: 'Sales Agent', desc: 'Forecasts demand, tracks performance and surfaces customer insights.' },
  { title: 'Production Agent', desc: 'Monitors capacity, machine load, production delays and quality issues.' },
  { title: 'Executive Agent', desc: 'Answers questions on KPIs, financials, performance, risks and summaries — in plain language.' },
];

const ORCHESTRATION_STEPS = [
  { title: 'User Request', desc: 'A person asks a question or triggers an action.' },
  { title: 'Intent Detection', desc: 'AI understands the intent and context.' },
  { title: 'Workflow Selection', desc: 'The workflow engine selects the right business process.' },
  { title: 'Connector Selection', desc: 'SAOP selects the systems it needs to talk to.' },
  { title: 'Authentication', desc: 'Secure login via OAuth, API key or DB credentials.' },
  { title: 'Data Collection', desc: 'Fetches data from every relevant connected system.' },
  { title: 'Data Normalization', desc: 'Converts and unifies data into a common format.' },
  { title: 'AI Processing', desc: 'Analyzes, predicts, recommends and generates insight.' },
  { title: 'Business Rules', desc: 'Validates against approvals, budgets and compliance.' },
  { title: 'Response Generation', desc: 'Produces the answer, chart, KPI or recommendation.' },
  { title: 'Workflow Execution', desc: 'Creates the PO, sends the approval, notifies the team — if allowed.' },
  { title: 'Audit & Logging', desc: 'Logs every action for transparency and compliance.' },
];

const DEPLOYMENT_MODELS = [
  { title: 'SaaS Cloud', tag: 'Multi-tenant', desc: 'Soxira-managed, monthly subscription — fastest way to get started.' },
  { title: 'Dedicated Cloud', tag: 'Per customer', desc: 'Dedicated infrastructure, managed by Soxira, isolated to your organization.' },
  { title: 'Customer Hosted', tag: 'On-prem / cloud', desc: 'Deployed entirely inside your own infrastructure.' },
];

const BENEFITS = [
  'Connect any system, any technology',
  'AI-powered insights and recommendations',
  'Faster decision making',
  'Workflow automation',
  'Real-time visibility across the enterprise',
  'Scalable, secure and enterprise ready',
  'Lower TCO — no need to replace existing systems',
];

export default function SaopPlatformPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-accent-tint px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              In Active Development
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              SAOP — Soxira AI Orchestration Platform
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-accent">
              Connect any system. Orchestrate any process. Empower every decision.
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-ink-muted">
              SAOP is <strong className="text-ink">not an ERP replacement</strong>. It sits on top of the systems you already run —
              SAP, Oracle, Salesforce and more — and extends them with AI-powered insight, workflow orchestration and intelligent
              automation. It&rsquo;s in active development; this page is here so you can see where it&rsquo;s headed and get on the
              early access list.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110">
                Get Early Access
              </Link>
              <Link href="#how-it-works" className="rounded-full border border-line bg-surface-2 px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-surface-2">
                See How It Works ↓
              </Link>
            </div>
          </div>
        </section>

        {/* Interfaces */}
        <section className="px-4 pb-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-line bg-surface-2 px-6 py-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">Access it however you work</p>
            <p className="mt-2 text-sm text-ink">{INTERFACES.join(' · ')}</p>
          </div>
        </section>

        {/* Connector framework */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Connect Any System</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">Pre-Built Connector Framework</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
                SAOP plugs into what you already run — no rip-and-replace, no forced migration.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {CONNECTORS.map((c) => (
                <span key={c} className="rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink shadow-[0_16px_40px_rgba(20,25,50,0.06)]">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Core modules */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">What&rsquo;s Inside</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">Core Platform Modules</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MODULES.map((m) => (
                <div key={m.title} className="rounded-2xl border border-line bg-surface p-6 shadow-[0_16px_40px_rgba(20,25,50,0.06)]">
                  <h3 className="font-semibold text-ink">{m.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-ink-muted">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Agents */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Built-In Intelligence</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">Five AI Agents, Working Across Your Business</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {AGENTS.map((a) => (
                <div key={a.title} className="rounded-2xl border border-line bg-accent-tint p-6">
                  <h3 className="font-semibold text-accent">{a.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-ink-muted">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How orchestration works */}
        <section id="how-it-works" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">How It Works</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">From Request to Action, Step by Step</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ORCHESTRATION_STEPS.map((s, i) => (
                <div key={s.title} className="rounded-xl border border-line bg-surface-2 p-4">
                  <p className="font-mono text-[11px] font-semibold text-accent">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-1 text-sm font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-ink-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example scenario */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-surface-2 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">See It In Action</p>
            <h2 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">&ldquo;Can we fulfill Customer ABC&rsquo;s order of 500 tons by 20th July?&rdquo;</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-ink-muted">
              <p>SAOP analyzes across every connected system at once — ERP orders and production data, machine capacity and performance data, live inventory and batch records, the planning engine&rsquo;s scheduling model, and its own AI forecasting.</p>
              <p className="rounded-xl border border-line bg-surface p-4 text-ink">
                <strong>Recommendation:</strong> &ldquo;Yes — Plant 2 has available capacity and raw material is sufficient. The order can be completed by 18th July.&rdquo;
              </p>
              <p>Once a manager approves, SAOP automatically creates the production plan, reserves material, schedules dispatch and notifies the customer — no manual follow-up across five different systems.</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { n: '1,250', l: 'Total Orders' },
                { n: '96.5%', l: 'On-Time Delivery' },
                { n: '₹125 Cr', l: 'Inventory Value' },
                { n: '82%', l: 'Capacity Utilization' },
              ].map((stat) => (
                <div key={stat.l} className="rounded-xl border border-line bg-surface p-4 text-center">
                  <p className="text-lg font-bold text-ink">{stat.n}</p>
                  <p className="mt-0.5 text-[11px] text-ink-muted">{stat.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deployment models */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Deployment Models</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">Deployed the Way Your Organization Needs</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {DEPLOYMENT_MODELS.map((d) => (
                <div key={d.title} className="rounded-2xl border border-line bg-surface p-6 shadow-[0_16px_40px_rgba(20,25,50,0.06)]">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">{d.tag}</p>
                  <h3 className="mt-1.5 font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-ink-muted">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Why SAOP</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">What You Gain</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <div key={b} className="flex items-start gap-3 rounded-xl border border-line bg-surface-2 px-5 py-4">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-good" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm text-ink">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-semibold text-ink sm:text-3xl">Frequently asked questions</h2>
            <div className="space-y-4">
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-semibold text-ink">Is SAOP available today?</h3>
                <p className="mt-2.5 text-sm leading-6 text-ink-muted">Not yet — it&rsquo;s in active development. Join the early access list and we&rsquo;ll reach out as it progresses.</p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-semibold text-ink">Is this an ERP replacement?</h3>
                <p className="mt-2.5 text-sm leading-6 text-ink-muted">No. SAOP sits on top of the systems you already run — SAP, Oracle, Salesforce and more — and extends them with AI. You keep your existing systems of record.</p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-semibold text-ink">How is this different from VitaranAI?</h3>
                <p className="mt-2.5 text-sm leading-6 text-ink-muted">VitaranAI is Soxira&rsquo;s own business operations platform — it runs day-to-day procurement, inventory and sales. SAOP is a broader orchestration layer that connects to <em>any</em> existing system, including third-party ERPs like SAP or Oracle, not specific to one workflow.</p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-semibold text-ink">What deployment options are available?</h3>
                <p className="mt-2.5 text-sm leading-6 text-ink-muted">SaaS Cloud (Soxira-managed, multi-tenant), Dedicated Cloud (Soxira-managed, isolated to your organization), or fully Customer Hosted in your own infrastructure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing tagline */}
        <section className="px-4 pb-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-accent to-[#0E1747] p-10 text-center">
            <p className="text-lg font-medium leading-8 text-white">
              SAOP is the intelligence layer that connects your enterprise, automates your operations, and empowers your people with AI.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Think · Orchestrate · Transform</p>
          </div>
        </section>

        <div className="flex flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
          <Link href="/contact" className="inline-flex rounded-full bg-accent px-8 py-4 text-base font-semibold text-white transition hover:scale-[1.02]">
            Get Early Access
          </Link>
          <p className="max-w-xl text-sm text-ink-muted">Tell us about your systems and planning process today — early conversations directly shape what we build.</p>
        </div>
      </main>
      <CTA />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
