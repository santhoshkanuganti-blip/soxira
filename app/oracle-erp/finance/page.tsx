import { Metadata } from 'next';
import OracleServicePage from '@/components/oracle/OracleServicePage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle Finance Implementation Services | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}/oracle-erp/finance` },
  description: 'Oracle Financials implementation covering GL, AP, AR, Fixed Assets, Cash Management and Financial Reporting. Expert Oracle Finance consulting from Soxira.',
  keywords: ['Oracle Finance implementation India', 'Oracle Financials consulting', 'Oracle GL AP AR India', 'Oracle ERP Finance Hyderabad', 'Oracle Financial Reporting'],
  openGraph: {
    title: 'Oracle Finance Implementation Services | Soxira AI Solutions',
    description: 'Oracle SCM, Finance, HCM and Fusion Cloud implementation services for enterprises.',
    url: `https://${siteConfig.domain}/oracle-erp/finance`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function OracleFinancePage() {
  return (
    <OracleServicePage
      data={{
        badge: 'Oracle Financials',
        title: 'Oracle Finance',
        titleHighlight: 'Implementation Services',
        subtitle:
          'Soxira delivers Oracle Financials implementations covering General Ledger, Accounts Payable, Accounts Receivable, Fixed Assets, Cash Management and regulatory financial reporting — purpose-built for Indian enterprises.',
        stats: [
          { stat: '25+', label: 'Years Oracle experience' },
          { stat: 'BFSI', label: 'Industry specialization' },
          { stat: 'India', label: 'Compliance focused' },
        ],
        capabilities: [
          {
            title: 'General Ledger',
            desc: 'Multi-currency, multi-org chart of accounts with automated journal entries, allocations and period close.',
            tags: ['Multi-currency', 'Multi-org', 'Period Close'],
          },
          {
            title: 'Accounts Payable',
            desc: 'Invoice processing, payment runs, supplier reconciliation and three-way match automation.',
            tags: ['Invoice Processing', 'Payments', '3-Way Match'],
          },
          {
            title: 'Accounts Receivable',
            desc: 'Customer billing, collections management, cash application and ageing analysis.',
            tags: ['Billing', 'Collections', 'Cash Application'],
          },
          {
            title: 'Fixed Assets & Cash',
            desc: 'Asset lifecycle management, depreciation, cash positioning, bank reconciliation and treasury.',
            tags: ['Depreciation', 'Bank Recon', 'Treasury'],
          },
        ],
        breadcrumb: [
          { label: 'Home', href: '/' },
          { label: 'Oracle ERP', href: '/oracle-erp' },
          { label: 'Oracle Finance', href: '/oracle-erp/finance' },
        ],
        relatedPages: [
          { label: 'Oracle ERP', href: '/oracle-erp' },
          { label: 'Oracle SCM', href: '/oracle-erp/scm' },
          { label: 'Oracle HCM', href: '/oracle-erp/hcm' },
          { label: 'Oracle Financials Cloud', href: '/oracle-fusion-cloud/financials' },
        ],
      }}
    />
  );
}
