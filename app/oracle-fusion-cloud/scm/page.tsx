import { Metadata } from 'next';
import OracleServicePage from '@/components/oracle/OracleServicePage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle SCM Cloud Implementation Services | Soxira AI Solutions',
  description: 'Oracle SCM Cloud implementation for modern cloud-based supply chain management — procurement, inventory, order management and logistics on Oracle Fusion Cloud.',
  keywords: ['Oracle SCM Cloud India', 'Oracle Supply Chain Cloud', 'Oracle Fusion SCM implementation', 'Oracle Cloud procurement inventory', 'Oracle SCM Cloud Hyderabad'],
  openGraph: {
    title: 'Oracle SCM Cloud Implementation Services | Soxira AI Solutions',
    description: 'Oracle SCM, Finance, HCM and Fusion Cloud implementation services for enterprises.',
    url: `https://${siteConfig.domain}/oracle-fusion-cloud/scm`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function OracleFusionSCMPage() {
  return (
    <OracleServicePage
      data={{
        badge: 'Oracle SCM Cloud',
        title: 'Oracle SCM Cloud',
        titleHighlight: 'Implementation Services',
        subtitle:
          'Soxira helps enterprises modernize supply chain operations with Oracle SCM Cloud — delivering real-time visibility, intelligent procurement and seamless logistics on Oracle Fusion Cloud infrastructure.',
        stats: [
          { stat: '25+', label: 'Years Oracle experience' },
          { stat: 'Cloud', label: 'Native SCM platform' },
          { stat: 'India', label: 'Focused delivery' },
        ],
        capabilities: [
          {
            title: 'Cloud Procurement',
            desc: 'AI-powered sourcing, self-service procurement, supplier collaboration and spend analytics.',
            tags: ['Sourcing', 'Supplier Portal', 'Spend Analytics'],
          },
          {
            title: 'Cloud Inventory',
            desc: 'Real-time inventory tracking, demand forecasting, replenishment planning and expiry management.',
            tags: ['Real-time Tracking', 'Forecasting', 'Replenishment'],
          },
          {
            title: 'Cloud Order Management',
            desc: 'Omnichannel order orchestration, fulfilment rules, backorder management and customer notifications.',
            tags: ['Omnichannel', 'Orchestration', 'Fulfilment'],
          },
          {
            title: 'Cloud Logistics',
            desc: 'Carrier management, freight optimization, last-mile delivery tracking and returns processing.',
            tags: ['Carrier Mgmt', 'Freight', 'Returns'],
          },
        ],
        breadcrumb: [
          { label: 'Home', href: '/' },
          { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
          { label: 'Oracle SCM Cloud', href: '/oracle-fusion-cloud/scm' },
        ],
        relatedPages: [
          { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
          { label: 'Oracle Financials Cloud', href: '/oracle-fusion-cloud/financials' },
          { label: 'Oracle HCM Cloud', href: '/oracle-fusion-cloud/hcm' },
          { label: 'Oracle SCM (ERP)', href: '/oracle-erp/scm' },
        ],
      }}
    />
  );
}
