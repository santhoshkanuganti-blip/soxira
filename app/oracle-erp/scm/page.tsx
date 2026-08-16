import { Metadata } from 'next';
import OracleServicePage from '@/components/oracle/OracleServicePage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle SCM Implementation Services | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}/oracle-erp/scm` },
  description: 'Oracle Supply Chain Management implementation — procurement, inventory, order management and logistics. Expert Oracle SCM consulting from Soxira.',
  keywords: ['Oracle SCM implementation India', 'Oracle Supply Chain Management', 'Oracle SCM consulting Hyderabad', 'Oracle ERP SCM', 'Oracle procurement inventory'],
  openGraph: {
    title: 'Oracle SCM Implementation Services | Soxira AI Solutions',
    description: 'Oracle SCM, Finance, HCM and Fusion Cloud implementation services for enterprises.',
    url: `https://${siteConfig.domain}/oracle-erp/scm`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function OracleSCMPage() {
  return (
    <OracleServicePage
      data={{
        badge: 'Oracle SCM',
        title: 'Oracle SCM',
        titleHighlight: 'Implementation Services',
        subtitle:
          'Soxira helps enterprises modernize supply chain operations with Oracle SCM — from procurement and inventory to order management and logistics, delivering end-to-end visibility and control.',
        stats: [
          { stat: '25+', label: 'Years Oracle experience' },
          { stat: 'SCM', label: 'Full module expertise' },
          { stat: 'India', label: 'Focused delivery' },
        ],
        capabilities: [
          {
            title: 'Procurement',
            desc: 'Automate purchase requisitions, supplier management, PO processing and vendor performance tracking.',
            tags: ['Purchase Orders', 'Vendor Mgmt', 'Approvals'],
          },
          {
            title: 'Inventory Management',
            desc: 'Real-time stock visibility, multi-location tracking, lot/serial control and cycle count management.',
            tags: ['Stock Visibility', 'Lot Control', 'Cycle Count'],
          },
          {
            title: 'Order Management',
            desc: 'End-to-end order lifecycle from quote to fulfillment with pricing, shipping and returns management.',
            tags: ['Order Fulfillment', 'Pricing', 'Returns'],
          },
          {
            title: 'Logistics & Shipping',
            desc: 'Carrier integration, shipment tracking, freight costing and delivery scheduling across regions.',
            tags: ['Carrier Integration', 'Freight', 'Tracking'],
          },
        ],
        breadcrumb: [
          { label: 'Home', href: '/' },
          { label: 'Oracle ERP', href: '/oracle-erp' },
          { label: 'Oracle SCM', href: '/oracle-erp/scm' },
        ],
        relatedPages: [
          { label: 'Oracle ERP', href: '/oracle-erp' },
          { label: 'Oracle Finance', href: '/oracle-erp/finance' },
          { label: 'Oracle HCM', href: '/oracle-erp/hcm' },
          { label: 'Oracle SCM Cloud', href: '/oracle-fusion-cloud/scm' },
          { label: 'Oracle SCM for Manufacturing', href: '/solutions/oracle-scm-for-manufacturing' },
        ],
      }}
    />
  );
}
