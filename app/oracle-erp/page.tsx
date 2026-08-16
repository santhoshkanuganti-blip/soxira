import { Metadata } from 'next';
import OracleServicePage from '@/components/oracle/OracleServicePage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle ERP Implementation Services | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}/oracle-erp` },
  description: 'Full-cycle Oracle ERP implementation for Finance, SCM, Manufacturing, and HR. 25+ years of Oracle expertise serving Indian enterprises and multinationals.',
  keywords: ['Oracle ERP implementation India', 'Oracle ERP consulting', 'Oracle ERP Hyderabad', 'Oracle ERP SCM Finance HCM', 'Oracle consulting partner India'],
  openGraph: {
    title: 'Oracle ERP Implementation Services | Soxira AI Solutions',
    description: 'Oracle SCM, Finance, HCM and Fusion Cloud implementation services for enterprises.',
    url: `https://${siteConfig.domain}/oracle-erp`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function OracleERPPage() {
  return (
    <OracleServicePage
      data={{
        badge: 'Oracle ERP',
        title: 'Oracle ERP',
        titleHighlight: 'Implementation Services',
        subtitle:
          'Soxira delivers full-lifecycle Oracle ERP implementations covering Finance, SCM, Manufacturing, HR and more — with 25+ years of deep Oracle expertise and a proven track record across Indian enterprises and multinationals.',
        stats: [
          { stat: '25+', label: 'Years Oracle experience' },
          { stat: 'ERP', label: 'Full module expertise' },
          { stat: 'India', label: 'Focused delivery' },
        ],
        capabilities: [
          {
            title: 'Oracle ERP Finance',
            desc: 'General Ledger, AP, AR, Fixed Assets, Cash Management and financial reporting across Oracle ERP modules.',
            tags: ['GL', 'AP', 'AR', 'Fixed Assets'],
          },
          {
            title: 'Oracle ERP SCM',
            desc: 'End-to-end supply chain: procurement, inventory management, order management and logistics.',
            tags: ['Procurement', 'Inventory', 'Order Mgmt'],
          },
          {
            title: 'Oracle ERP Manufacturing',
            desc: 'Production planning, work-in-process, quality management and cost accounting for manufacturers.',
            tags: ['WIP', 'Production', 'Costing'],
          },
          {
            title: 'Oracle ERP HR',
            desc: 'Core HR, payroll, talent management and workforce analytics on Oracle ERP Human Capital Management.',
            tags: ['Core HR', 'Payroll', 'Talent'],
          },
        ],
        breadcrumb: [
          { label: 'Home', href: '/' },
          { label: 'Oracle ERP', href: '/oracle-erp' },
        ],
        relatedPages: [
          { label: 'Oracle SCM', href: '/oracle-erp/scm' },
          { label: 'Oracle Finance', href: '/oracle-erp/finance' },
          { label: 'Oracle HCM', href: '/oracle-erp/hcm' },
          { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
          { label: 'Oracle Integration Cloud', href: '/oracle-integration-cloud' },
        ],
      }}
    />
  );
}
