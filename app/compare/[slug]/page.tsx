import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ComparePage, { CompareData } from '@/components/compare/ComparePage';
import { siteConfig } from '@/config/site';

const COMPARISONS: Record<string, CompareData> = {
  'oracle-fusion-cloud-vs-sap-s4hana': {
    slug: 'oracle-fusion-cloud-vs-sap-s4hana',
    badge: 'ERP Comparison',
    title: 'Oracle Fusion Cloud vs SAP S/4HANA for Mid-Market India',
    subtitle: 'A practical comparison for Indian mid-market and enterprise teams choosing between the two dominant cloud ERP platforms.',
    intro: 'Both Oracle Fusion Cloud and SAP S/4HANA are credible, widely deployed ERP platforms. The right choice depends less on which vendor is "better" and more on your existing stack, industry, and how much customization you actually need.',
    labelA: 'Oracle Fusion Cloud',
    labelB: 'SAP S/4HANA',
    criteria: [
      { name: 'Deployment model', a: 'SaaS-native; runs on Oracle Cloud Infrastructure with quarterly updates applied automatically.', b: 'Available on-premise or via RISE with SAP (cloud); many existing customers are migrating from ECC.' },
      { name: 'Best-known strength', a: 'Unified cloud data model across Financials, SCM and HCM; fast to configure without heavy custom code.', b: 'Deep manufacturing, logistics and complex distribution heritage; large global customization ecosystem (ABAP).' },
      { name: 'Typical buyer', a: 'Organizations wanting a modern cloud ERP without a large on-prem legacy to migrate from.', b: 'Organizations already on SAP ECC, or with complex multi-plant manufacturing requiring deep customization.' },
      { name: 'Customization approach', a: 'Configuration-first within a SaaS model; extensions via Oracle Integration Cloud rather than deep core customization.', b: 'Historically strong custom-code capability (ABAP), which can mean more flexibility but higher long-term maintenance load.' },
      { name: 'Upgrade cycle', a: 'Automatic quarterly updates as part of the SaaS subscription.', b: 'Upgrade cadence depends on deployment model — RISE follows a cloud cycle; on-prem upgrades are scheduled projects.' },
      { name: 'India-specific considerations', a: 'GST and statutory localization delivered as part of the core cloud product.', b: 'Strong existing presence among large Indian manufacturers and conglomerates already on SAP.' },
    ],
    chooseA: [
      'You\'re implementing ERP fresh, or replacing an aging on-prem system with no deep custom-code dependency.',
      'You want automatic updates and a single cloud data model across Finance, SCM and HR without managing separate upgrade projects.',
      'Your organization values configuration speed over deep bespoke customization.',
    ],
    chooseB: [
      'You already run SAP ECC and need a clear migration path rather than a platform switch.',
      'Your operations depend on complex, highly customized manufacturing or logistics workflows SAP\'s ecosystem already supports.',
      'You have in-house or partner ABAP expertise you want to keep leveraging.',
    ],
    verdict: 'Soxira is an Oracle-focused implementation partner, so we\'ll say that plainly: our depth is in Oracle ERP, Fusion Cloud and OIC. For organizations without a heavy SAP investment already, Oracle Fusion Cloud is usually the faster, lower-friction path to a modern cloud ERP. If you\'re already deep in the SAP ecosystem, migrating to S/4HANA on your own vendor\'s roadmap is often the more pragmatic call — that\'s a legitimate answer even though it\'s not our specialty.',
    disclosure: 'Soxira is an Oracle implementation partner. This comparison aims to be factual and balanced, but we\'re upfront that our delivery expertise is on the Oracle side.',
    faq: [
      { q: 'Is Oracle Fusion Cloud cheaper than SAP S/4HANA?', a: 'It depends heavily on your scope, user count and customization needs — there\'s no single answer. We can model actual costs against your requirements during a scoping call.' },
      { q: 'Can we run Oracle Fusion Cloud alongside an existing SAP system during migration?', a: 'Yes, in a phased migration it\'s common to run both platforms temporarily with integration between them, though this adds complexity that should be scoped carefully.' },
      { q: 'Which is better for Indian manufacturing specifically?', a: 'SAP has a longer track record with large, complex Indian manufacturers; Oracle Fusion Cloud is often a strong fit for mid-market manufacturers who want cloud-native SCM without a large legacy migration. It genuinely depends on your plant complexity and existing systems.' },
    ],
    ctaHref: '/oracle-fusion-cloud',
    ctaLabel: 'Explore Oracle Fusion Cloud',
  },

  'vitaranai-vs-legacy-distribution-management': {
    slug: 'vitaranai-vs-legacy-distribution-management',
    badge: 'Distribution Software Comparison',
    title: 'VitaranAI vs Legacy Distribution Management',
    subtitle: 'How an AI-native distribution platform compares to the spreadsheets, ledgers and phone-based coordination most Indian distributors still run on.',
    intro: 'Most Indian distributors aren\'t choosing between two software products — they\'re choosing between VitaranAI and what they already do: spreadsheets, WhatsApp coordination, manual ledgers, and a handful of disconnected tools. Here\'s how that comparison actually looks.',
    labelA: 'VitaranAI',
    labelB: 'Legacy / manual approach',
    criteria: [
      { name: 'Order processing', a: 'Automated order intake and processing, typically minutes from receipt to fulfillment.', b: 'Manual order entry across phone, WhatsApp and paper — commonly 3-4 hours per day of staff time.' },
      { name: 'Inventory visibility', a: 'Real-time stock visibility across all depots and dealer locations from one dashboard.', b: 'Visibility depends on manual stock counts and phone calls between locations; often stale by hours or days.' },
      { name: 'Demand forecasting', a: 'AI-driven demand forecasting to prevent stockouts and overstocking.', b: 'Reordering based on experience and gut feel, with no systematic forecasting.' },
      { name: 'Route planning', a: 'AI-optimized delivery routes with tracking and customer notifications.', b: 'Routes planned manually by drivers or dispatchers, with no systematic optimization.' },
      { name: 'Collections tracking', a: 'Automated payment reminders and outstanding-balance tracking.', b: 'Outstanding payments tracked in ledgers or spreadsheets, chased manually.' },
      { name: 'Setup effort', a: 'Structured onboarding with data migration support; live in weeks, not months.', b: 'No setup required, but every inefficiency listed above is already "live" and ongoing.' },
    ],
    chooseA: [
      'You\'re losing sales to stockouts or damaging dealer relationships with delivery delays.',
      'Your team spends hours a day on manual order and inventory reconciliation across locations.',
      'You\'re growing past a size where phone-and-spreadsheet coordination is starting to break down.',
    ],
    chooseB: [
      'You run a single location with very low order volume where manual tracking is genuinely still manageable.',
      'You\'re not ready to change how your field and warehouse teams work day to day.',
      '(In practice, most distributors past a certain scale outgrow this — the case for switching usually comes down to timing, not whether.)',
    ],
    verdict: 'This isn\'t really a fair fight — VitaranAI is built specifically to replace the exact manual processes that cause stockouts, delayed orders and uncollected payments. The honest question isn\'t whether to switch, it\'s when. Businesses running under 50 daily orders on a single site may not feel the pain yet; most distributors managing multiple depots or dealer networks already do.',
    disclosure: 'VitaranAI is Soxira\'s own product. This page compares it against the general manual/legacy status quo, not a specific named competitor.',
    faq: [
      { q: 'How long does it take to migrate from spreadsheets to VitaranAI?', a: 'Most distributors are live within a few weeks, including data migration and staff onboarding — timeline depends on the number of SKUs, locations and existing data quality.' },
      { q: 'Do our field sales and delivery teams need new hardware?', a: 'VitaranAI is mobile-ready and works on standard smartphones — no specialized hardware is required for field teams.' },
      { q: 'What if we only want inventory tracking, not the full platform?', a: 'VitaranAI is modular — procurement, inventory, sales, vendor management and analytics can be adopted incrementally rather than all at once.' },
    ],
    ctaHref: '/distributor-management-software',
    ctaLabel: 'Explore VitaranAI',
  },
};

export async function generateStaticParams() {
  return Object.keys(COMPARISONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = COMPARISONS[slug];
  if (!data) return {};

  const title = `${data.title} | Soxira AI Solutions`;
  const url = `https://${siteConfig.domain}/compare/${slug}`;

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

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = COMPARISONS[slug];
  if (!data) notFound();

  return <ComparePage data={data} />;
}
