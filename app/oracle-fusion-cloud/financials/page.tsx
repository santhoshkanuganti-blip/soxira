import { Metadata } from 'next';
import OracleServicePage from '@/components/oracle/OracleServicePage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle Financials Cloud Implementation Services | Soxira AI Solutions',
  description: 'Oracle Financials Cloud implementation covering GL, AR, AP, Fixed Assets, Cash Management and financial reporting on Oracle Fusion Cloud.',
  keywords: ['Oracle Financials Cloud India', 'Oracle Cloud Finance implementation', 'Oracle Fusion Financials', 'Oracle Cloud GL AP AR', 'Oracle Financials Cloud Hyderabad'],
  openGraph: {
    title: 'Oracle Financials Cloud Implementation Services | Soxira AI Solutions',
    description: 'Oracle SCM, Finance, HCM and Fusion Cloud implementation services for enterprises.',
    url: `https://${siteConfig.domain}/oracle-fusion-cloud/financials`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function OracleFusionFinancialsPage() {
  return (
    <OracleServicePage
      data={{
        badge: 'Oracle Financials Cloud',
        title: 'Oracle Financials Cloud',
        titleHighlight: 'Implementation Services',
        subtitle:
          'Soxira delivers Oracle Financials Cloud implementations that modernize finance operations — General Ledger, AP, AR, Fixed Assets and real-time financial reporting on Oracle Fusion Cloud.',
        stats: [
          { stat: '25+', label: 'Years Oracle experience' },
          { stat: 'BFSI', label: 'Industry specialization' },
          { stat: 'India', label: 'Compliance focused' },
        ],
        capabilities: [
          {
            title: 'Cloud General Ledger',
            desc: 'Multi-dimensional chart of accounts, real-time consolidation, allocations and automated period close.',
            tags: ['Multi-dimensional COA', 'Consolidation', 'Close'],
          },
          {
            title: 'Cloud AP & AR',
            desc: 'Touchless invoice processing, automated payment runs, cash application and collections management.',
            tags: ['Touchless AP', 'Payment Runs', 'Collections'],
          },
          {
            title: 'Cloud Fixed Assets',
            desc: 'Asset lifecycle from acquisition to disposal with automated depreciation and impairment testing.',
            tags: ['Asset Lifecycle', 'Depreciation', 'Disposal'],
          },
          {
            title: 'Financial Reporting',
            desc: 'OTBI, Financial Reporting Studio and Smart View dashboards with real-time financial insights.',
            tags: ['OTBI', 'FR Studio', 'Smart View'],
          },
        ],
        breadcrumb: [
          { label: 'Home', href: '/' },
          { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
          { label: 'Oracle Financials Cloud', href: '/oracle-fusion-cloud/financials' },
        ],
        relatedPages: [
          { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
          { label: 'Oracle SCM Cloud', href: '/oracle-fusion-cloud/scm' },
          { label: 'Oracle HCM Cloud', href: '/oracle-fusion-cloud/hcm' },
          { label: 'Oracle Finance (ERP)', href: '/oracle-erp/finance' },
        ],
      }}
    />
  );
}
