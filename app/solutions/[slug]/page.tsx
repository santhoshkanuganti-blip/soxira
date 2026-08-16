import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SolutionMatrixPage, { SolutionMatrixData } from '@/components/solutions/SolutionMatrixPage';
import { siteConfig } from '@/config/site';

const SOLUTIONS: Record<string, SolutionMatrixData> = {
  'oracle-scm-for-manufacturing': {
    slug: 'oracle-scm-for-manufacturing',
    badge: 'Oracle SCM · Manufacturing',
    title: 'Oracle SCM for Manufacturing',
    subtitle: 'Procurement, inventory, order management and logistics on Oracle SCM — built for Indian manufacturers managing multi-tier vendor networks and production schedules.',
    intro: 'Manufacturing competitiveness depends on how fast raw materials move from vendors to the shop floor and finished goods move to customers. Soxira implements Oracle SCM specifically to close that gap for Indian manufacturers.',
    serviceLabel: 'Oracle SCM',
    serviceHref: '/oracle-erp/scm',
    industryLabel: 'Manufacturing',
    industryHref: '/industries/manufacturing',
    challenges: [
      { title: 'Demand Uncertainty', desc: 'Volatile demand leads to either stockouts of raw materials or excess finished goods inventory.' },
      { title: 'Supply Chain Disruptions', desc: 'Multi-tier vendor dependencies make supply chains fragile and difficult to manage manually.' },
      { title: 'Production Planning', desc: 'Manual production scheduling is slow, error-prone, and unable to respond to real-time changes.' },
      { title: 'Quality and Compliance', desc: 'Ensuring quality standards and regulatory compliance across production batches is complex.' },
    ],
    capabilities: [
      { title: 'Procurement', desc: 'Automate purchase requisitions, supplier management, PO processing and vendor performance tracking.' },
      { title: 'Inventory Management', desc: 'Real-time stock visibility, multi-location tracking, lot/serial control and cycle count management.' },
      { title: 'Order Management', desc: 'End-to-end order lifecycle from quote to fulfillment with pricing, shipping and returns management.' },
      { title: 'Logistics & Shipping', desc: 'Carrier integration, shipment tracking, freight costing and delivery scheduling across regions.' },
    ],
    proof: {
      stat: '60%',
      label: 'procurement cycle time reduction',
      text: 'The same supply-chain discipline underpins every manufacturing engagement — a cement manufacturer in Andhra Pradesh cut procurement cycle time by 60% and grew revenue 28% after Soxira modernized their supply chain platform.',
      href: '/industries/manufacturing',
      linkLabel: 'See the full manufacturing overview',
    },
    faq: [
      { q: 'Do we need to replace our existing ERP to adopt Oracle SCM?', a: 'No. Oracle SCM can run as a focused module alongside existing finance or HR systems, or as part of a full Oracle ERP rollout — we scope this during discovery based on what you already run.' },
      { q: 'How long does an Oracle SCM implementation take for a mid-size manufacturer?', a: 'Typical scoped implementations for procurement, inventory and order management run a few months, depending on the number of plants, SKUs and existing system integrations.' },
      { q: 'Can Oracle SCM integrate with our existing vendor and logistics partners?', a: 'Yes — carrier and vendor integrations are part of the logistics and procurement modules, configured against your actual supplier and freight partner list.' },
    ],
  },

  'oracle-financials-for-finance': {
    slug: 'oracle-financials-for-finance',
    badge: 'Oracle Financials Cloud · Finance & NBFCs',
    title: 'Oracle Financials Cloud for Finance & NBFCs',
    subtitle: 'General Ledger, AP/AR, Fixed Assets and real-time financial reporting on Oracle Fusion Cloud — built for the reporting and compliance load Indian NBFCs and lenders actually carry.',
    intro: 'Indian financial institutions run on tight regulatory reporting cycles and constant audit scrutiny. Soxira implements Oracle Financials Cloud to give finance teams touchless AP/AR, real-time consolidation and reporting that holds up under RBI review.',
    serviceLabel: 'Oracle Financials Cloud',
    serviceHref: '/oracle-fusion-cloud/financials',
    industryLabel: 'Finance',
    industryHref: '/industries/finance',
    challenges: [
      { title: 'Slow Credit Decisions', desc: 'Manual credit underwriting takes days, causing customer drop-off and competitive disadvantage.' },
      { title: 'NPA Management', desc: 'Identifying at-risk accounts early and managing collections efficiently is critical.' },
      { title: 'Regulatory Compliance', desc: 'RBI regulations and reporting requirements demand accurate, real-time data management.' },
      { title: 'Customer Experience', desc: 'Digital-native competitors are raising the bar on customer onboarding and service speed.' },
    ],
    capabilities: [
      { title: 'Cloud General Ledger', desc: 'Multi-dimensional chart of accounts, real-time consolidation, allocations and automated period close.' },
      { title: 'Cloud AP & AR', desc: 'Touchless invoice processing, automated payment runs, cash application and collections management.' },
      { title: 'Cloud Fixed Assets', desc: 'Asset lifecycle from acquisition to disposal with automated depreciation and impairment testing.' },
      { title: 'Financial Reporting', desc: 'OTBI, Financial Reporting Studio and Smart View dashboards with real-time financial insights.' },
    ],
    proof: {
      stat: '25+ yrs',
      label: 'Oracle Financials delivery experience',
      text: 'Soxira\'s Oracle practice has delivered Financials Cloud rollouts for enterprises with the same compliance and reporting pressure NBFCs operate under — automated close, audit-ready GL, and real-time consolidation.',
      href: '/industries/finance',
      linkLabel: 'See the full finance & NBFC overview',
    },
    faq: [
      { q: 'Can Oracle Financials Cloud handle RBI regulatory reporting?', a: 'Yes — the reporting layer (OTBI and Financial Reporting Studio) is configured against your chart of accounts to produce the statutory and RBI reports your finance team already files, with real-time underlying data.' },
      { q: 'Does this replace our loan origination or credit decisioning system?', a: 'No — Oracle Financials Cloud covers the finance back office (GL, AP, AR, fixed assets, reporting). Credit decisioning and collections intelligence are separate AI capabilities Soxira can scope alongside it.' },
      { q: 'What does migration from an on-prem Oracle EBS Financials setup look like?', a: 'We run a phased migration — data validation, parallel close cycles, then cutover — timed around your period-close calendar to avoid disrupting a live close.' },
    ],
  },

  'cloud-migration-for-insurance': {
    slug: 'cloud-migration-for-insurance',
    badge: 'Cloud Migration · Insurance',
    title: 'Cloud Migration for Insurance Companies',
    subtitle: 'Secure AWS, Azure or GCP migration built around the compute and compliance load that underwriting, claims and fraud-detection models actually need.',
    intro: 'AI underwriting and claims automation only work if the infrastructure underneath is fast, secure and scalable. Soxira migrates insurers to cloud platforms with the governance and uptime insurance workloads require.',
    serviceLabel: 'Cloud Migration',
    serviceHref: '/cloud-migration-services',
    industryLabel: 'Insurance',
    industryHref: '/industries/insurance',
    challenges: [
      { title: 'Manual Underwriting', desc: 'Time-consuming manual underwriting creates bottlenecks and inconsistent risk assessment.' },
      { title: 'Claims Processing Delays', desc: 'Manual claims handling leads to high TAT, customer dissatisfaction, and operational costs.' },
      { title: 'Fraud Detection', desc: 'Traditional rule-based fraud detection misses sophisticated fraudulent claims patterns.' },
      { title: 'Customer Retention', desc: 'Low digital engagement and slow service responsiveness leads to high churn.' },
    ],
    capabilities: [
      { title: 'Cloud Readiness Assessment', desc: 'Workload and cost modeling that accounts for claims-processing seasonality and underwriting compute spikes.' },
      { title: 'Secure Architecture Design', desc: 'Migration architecture built for the data residency and access-control requirements insurers are audited on.' },
      { title: 'Automation of Deployment', desc: 'CI/CD and infrastructure-as-code so new underwriting or fraud models ship without manual ops overhead.' },
      { title: 'Governance & Monitoring', desc: 'Backup, disaster recovery and continuous monitoring sized for policyholder-data workloads.' },
    ],
    proof: {
      stat: '55%',
      label: 'reduction in claims TAT',
      text: 'Insurers running AI claims and underwriting models need infrastructure that scales with them — Soxira\'s broader insurance work has cut claims turnaround time by 55% once the surrounding data and compute platform was modernized.',
      href: '/industries/insurance',
      linkLabel: 'See the full insurance industry overview',
    },
    faq: [
      { q: 'Which cloud platform is best for an insurance workload?', a: 'It depends on your existing stack and data residency requirements — we assess AWS, Azure and GCP against your actual compliance obligations during the readiness assessment rather than defaulting to one platform.' },
      { q: 'How do you handle policyholder data during migration?', a: 'Migration is planned around data residency and access-control requirements first, with encryption in transit and at rest, and a cutover plan that avoids any window of reduced protection.' },
      { q: 'Can this run alongside our existing core insurance platform?', a: 'Yes — most engagements migrate supporting workloads (claims data, analytics, underwriting models) first, with core systems migrated on a separate, more conservative timeline.' },
    ],
  },

  'ai-dashboards-for-finance': {
    slug: 'ai-dashboards-for-finance',
    badge: 'AI Dashboards · Finance & NBFCs',
    title: 'AI Dashboards for Finance & NBFCs',
    subtitle: 'Executive scorecards, anomaly detection and forecasting dashboards built around the NPA, collections and regulatory metrics NBFC leadership actually needs to watch.',
    intro: 'Lending leadership needs to see risk before it shows up in a quarterly report. Soxira builds AI dashboards that surface NPA risk, collections performance and portfolio health in real time, not after month-end close.',
    serviceLabel: 'AI Dashboards',
    serviceHref: '/ai-dashboard-consulting',
    industryLabel: 'Finance',
    industryHref: '/industries/finance',
    challenges: [
      { title: 'Slow Credit Decisions', desc: 'Manual credit underwriting takes days, causing customer drop-off and competitive disadvantage.' },
      { title: 'NPA Management', desc: 'Identifying at-risk accounts early and managing collections efficiently is critical.' },
      { title: 'Regulatory Compliance', desc: 'RBI regulations and reporting requirements demand accurate, real-time data management.' },
      { title: 'Customer Experience', desc: 'Digital-native competitors are raising the bar on customer onboarding and service speed.' },
    ],
    capabilities: [
      { title: 'Executive Scorecards', desc: 'Portfolio-level KPI monitoring — disbursements, NPA ratio, collections efficiency — in one view for leadership.' },
      { title: 'AI-Driven Forecasting', desc: 'Anomaly detection models that flag at-risk accounts and portfolio segments earlier than manual review.' },
      { title: 'Interactive Analytics', desc: 'Drill-down views for branch and field collections teams, not just head-office reporting.' },
      { title: 'Secure, Role-Based Access', desc: 'Dashboards scoped by role so branch, regional and executive users see exactly what they should.' },
    ],
    proof: {
      stat: '80%',
      label: 'faster credit approval, 40% better collection efficiency',
      text: 'An NBFC using Soxira\'s AI credit and collections intelligence reduced credit approval time by 80% and improved collection efficiency by 40% — the same underlying data feeds the dashboards leadership uses to track portfolio health.',
      href: '/industries/finance',
      linkLabel: 'See the full finance & NBFC overview',
    },
    faq: [
      { q: 'Do we need a data warehouse before building these dashboards?', a: 'Not necessarily — we can build against your existing loan management or core banking system data, though a clean data layer (see our data engineering work) makes the forecasting models more reliable over time.' },
      { q: 'Can the dashboards flag NPA risk before an account is officially classified?', a: 'Yes — the anomaly detection models are designed to surface early-warning signals from repayment behavior, not just report on accounts already classified as at-risk.' },
      { q: 'Who typically uses these dashboards day to day?', a: 'Branch managers and collections teams use the operational views; portfolio and executive scorecards are built for regional and leadership review, with access scoped by role.' },
    ],
  },

  'data-engineering-for-insurance': {
    slug: 'data-engineering-for-insurance',
    badge: 'Data Engineering · Insurance',
    title: 'Data Engineering for Insurance — Snowflake & DBT',
    subtitle: 'Clean, governed claims and policy data pipelines on Snowflake and DBT — the foundation fraud detection and underwriting models actually depend on.',
    intro: 'Fraud detection and underwriting models are only as good as the data feeding them. Soxira builds the Snowflake and DBT pipelines that unify claims, policy and customer data so insurers can trust what their models tell them.',
    serviceLabel: 'Data Engineering',
    serviceHref: '/data-engineering-snowflake-dbt',
    industryLabel: 'Insurance',
    industryHref: '/industries/insurance',
    challenges: [
      { title: 'Manual Underwriting', desc: 'Time-consuming manual underwriting creates bottlenecks and inconsistent risk assessment.' },
      { title: 'Claims Processing Delays', desc: 'Manual claims handling leads to high TAT, customer dissatisfaction, and operational costs.' },
      { title: 'Fraud Detection', desc: 'Traditional rule-based fraud detection misses sophisticated fraudulent claims patterns.' },
      { title: 'Customer Retention', desc: 'Low digital engagement and slow service responsiveness leads to high churn.' },
    ],
    capabilities: [
      { title: 'Snowflake Implementation', desc: 'A unified warehouse for claims, policy and customer data, sized and optimized for insurance query patterns.' },
      { title: 'DBT Modeling', desc: 'Tested, version-controlled transformation models so claims and fraud models run on consistent, documented data.' },
      { title: 'ETL/ELT Pipelines', desc: 'Pipelines that bring together core insurance platform data, third-party data and claims documents for analytics.' },
      { title: 'Data Governance', desc: 'Automated data quality checks and access controls appropriate for policyholder and claims data.' },
    ],
    proof: {
      stat: '35%',
      label: 'improvement in fraud detection accuracy',
      text: 'Fraud and underwriting models improve directly with data quality — Soxira\'s insurance-sector AI work has improved fraud detection accuracy by 35% once claims data was unified and cleaned upstream.',
      href: '/industries/insurance',
      linkLabel: 'See the full insurance industry overview',
    },
    faq: [
      { q: 'How long does it take to stand up a Snowflake data platform for claims data?', a: 'Initial pipelines for core claims and policy data typically take a few weeks to a couple of months, depending on how many source systems need to be integrated.' },
      { q: 'Can this integrate with our existing core insurance platform and third-party data feeds?', a: 'Yes — ETL/ELT pipelines are built against your actual source systems, including core insurance platforms and any third-party fraud or credit data feeds you already use.' },
      { q: 'Do we need this before we can build fraud detection models?', a: 'You do not strictly need it, but fraud and underwriting models trained on unified, tested data are materially more reliable than models built on ad hoc exports — this is the recommended foundation.' },
    ],
  },

  'cloud-migration-for-healthcare': {
    slug: 'cloud-migration-for-healthcare',
    badge: 'Cloud Migration · Healthcare',
    title: 'Cloud Migration for Healthcare & Pharma Distribution',
    subtitle: 'Secure, compliant cloud infrastructure for drug inventory, cold chain monitoring and CDSCO reporting systems that healthcare organizations run on.',
    intro: 'Cold chain monitoring and regulatory reporting can\'t tolerate downtime. Soxira migrates healthcare and pharma distribution organizations to cloud infrastructure built for that reliability and compliance bar.',
    serviceLabel: 'Cloud Migration',
    serviceHref: '/cloud-migration-services',
    industryLabel: 'Healthcare',
    industryHref: '/industries/healthcare',
    challenges: [
      { title: 'Drug Expiry Management', desc: 'Manual expiry tracking across thousands of SKUs leads to wastage and compliance risks.' },
      { title: 'Cold Chain Compliance', desc: 'Maintaining cold chain integrity for temperature-sensitive drugs requires constant monitoring.' },
      { title: 'Regulatory Reporting', desc: 'Drug licensing, CDSCO compliance, and GST reporting create a heavy administrative burden.' },
      { title: 'Supply Chain Complexity', desc: 'Multi-tier distribution with hospitals, chemists, and distributors creates coordination challenges.' },
    ],
    capabilities: [
      { title: 'Cloud Readiness Assessment', desc: 'Workload modeling for always-on systems like cold chain monitoring and expiry alerting that cannot go down.' },
      { title: 'Secure Architecture Design', desc: 'Architecture built around the data handling expectations of CDSCO and state drug licensing compliance.' },
      { title: 'Automation of Deployment', desc: 'CI/CD pipelines so compliance reporting and inventory systems can be updated without service interruption.' },
      { title: 'Governance & Monitoring', desc: 'Continuous monitoring and backup sized for systems that regulators and hospitals both depend on.' },
    ],
    proof: {
      stat: '0%',
      label: 'expiry waste, 100% CDSCO compliance',
      text: 'A pharmaceutical distributor in Hyderabad achieved zero expiry waste and 100% CDSCO compliance after Soxira modernized their inventory and compliance systems — the same reliability bar applies to the cloud infrastructure underneath.',
      href: '/industries/healthcare',
      linkLabel: 'See the full healthcare industry overview',
    },
    faq: [
      { q: 'Can cold chain monitoring systems run reliably in the cloud?', a: 'Yes — we design for redundancy and always-on monitoring specifically because cold chain alerting cannot tolerate downtime, with failover built into the architecture.' },
      { q: 'Does cloud migration affect CDSCO or drug licensing compliance?', a: 'Migration is planned around your existing compliance obligations — the architecture is designed to meet the data handling and reporting requirements you\'re already audited on, not to introduce new risk.' },
      { q: 'What healthcare systems typically move first?', a: 'Inventory, expiry tracking and compliance reporting systems usually migrate first since they benefit most from real-time monitoring — core hospital or ERP systems follow on a more conservative timeline.' },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(SOLUTIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = SOLUTIONS[slug];
  if (!data) return {};

  const title = `${data.title} | Soxira AI Solutions`;
  const url = `https://${siteConfig.domain}/solutions/${slug}`;

  return {
    title,
    description: data.subtitle,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: data.subtitle,
      url,
      siteName: siteConfig.name,
      type: 'website',
    },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = SOLUTIONS[slug];
  if (!data) notFound();

  return <SolutionMatrixPage data={data} />;
}
