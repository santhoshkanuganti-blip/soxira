import { Metadata } from 'next';
import OracleServicePage from '@/components/oracle/OracleServicePage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle Fusion Cloud Implementation Services | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}/oracle-fusion-cloud` },
  description: 'Full-lifecycle Oracle Fusion Cloud implementations — from discovery and design to go-live and hypercare. Oracle Fusion Cloud ERP, SCM, Financials and HCM.',
  keywords: ['Oracle Fusion Cloud implementation India', 'Oracle Cloud ERP India', 'Oracle Fusion consulting Hyderabad', 'Oracle Cloud migration India', 'Oracle Fusion Cloud partner'],
  openGraph: {
    title: 'Oracle Fusion Cloud Implementation Services | Soxira AI Solutions',
    description: 'Oracle SCM, Finance, HCM and Fusion Cloud implementation services for enterprises.',
    url: `https://${siteConfig.domain}/oracle-fusion-cloud`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function OracleFusionCloudPage() {
  return (
    <OracleServicePage
      data={{
        badge: 'Oracle Fusion Cloud',
        title: 'Oracle Fusion Cloud',
        titleHighlight: 'Implementation Services',
        subtitle:
          'Soxira delivers full-lifecycle Oracle Fusion Cloud implementations — from discovery, fit-gap analysis and design through development, testing, go-live and hypercare — helping enterprises unlock the full power of Oracle Cloud.',
        stats: [
          { stat: '25+', label: 'Years Oracle experience' },
          { stat: 'Cloud', label: 'ERP, SCM, HCM, Financials' },
          { stat: 'India', label: 'Focused delivery' },
        ],
        capabilities: [
          {
            title: 'Cloud ERP',
            desc: 'Oracle Fusion Cloud ERP covering Financials, Procurement, Project Management and Risk Compliance.',
            tags: ['Financials', 'Procurement', 'Projects'],
          },
          {
            title: 'Cloud SCM',
            desc: 'Oracle Cloud Supply Chain Management — procurement, inventory, manufacturing and logistics.',
            tags: ['Procurement', 'Inventory', 'Manufacturing'],
          },
          {
            title: 'Cloud HCM',
            desc: 'Oracle Cloud Human Capital Management covering Core HR, Payroll, Talent and Learning.',
            tags: ['Core HR', 'Payroll', 'Talent'],
          },
          {
            title: 'Cloud Migration',
            desc: 'Migrate from Oracle E-Business Suite or on-premise Fusion to Oracle Cloud with zero data loss.',
            tags: ['EBS Migration', 'Data Migration', 'Cutover'],
          },
        ],
        breadcrumb: [
          { label: 'Home', href: '/' },
          { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
        ],
        relatedPages: [
          { label: 'Oracle SCM Cloud', href: '/oracle-fusion-cloud/scm' },
          { label: 'Oracle Financials Cloud', href: '/oracle-fusion-cloud/financials' },
          { label: 'Oracle HCM Cloud', href: '/oracle-fusion-cloud/hcm' },
          { label: 'Oracle Integration Cloud', href: '/oracle-integration-cloud' },
          { label: 'Oracle ERP', href: '/oracle-erp' },
          { label: 'Oracle Fusion Cloud vs SAP S/4HANA', href: '/compare/oracle-fusion-cloud-vs-sap-s4hana' },
        ],
      }}
    />
  );
}
