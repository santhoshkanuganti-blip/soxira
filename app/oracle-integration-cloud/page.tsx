import { Metadata } from 'next';
import OracleServicePage from '@/components/oracle/OracleServicePage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle Integration Cloud (OIC) Services | Soxira AI Solutions',
  description: 'Oracle Integration Cloud (OIC) implementation — connecting Oracle and third-party applications with pre-built adapters, API management and process orchestration.',
  keywords: ['Oracle Integration Cloud India', 'Oracle OIC implementation', 'Oracle OIC consulting Hyderabad', 'Oracle API integration India', 'Oracle middleware services'],
  openGraph: {
    title: 'Oracle Integration Cloud (OIC) Services | Soxira AI Solutions',
    description: 'Oracle SCM, Finance, HCM and Fusion Cloud implementation services for enterprises.',
    url: `https://${siteConfig.domain}/oracle-integration-cloud`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function OracleIntegrationCloudPage() {
  return (
    <OracleServicePage
      data={{
        badge: 'Oracle OIC',
        title: 'Oracle Integration Cloud',
        titleHighlight: '(OIC) Services',
        subtitle:
          'Soxira connects Oracle and third-party applications using Oracle Integration Cloud — pre-built adapters, API management, and intelligent process orchestration that eliminates integration complexity.',
        stats: [
          { stat: '25+', label: 'Years Oracle experience' },
          { stat: 'OIC', label: 'Integration expertise' },
          { stat: 'India', label: 'Focused delivery' },
        ],
        capabilities: [
          {
            title: 'ERP Integrations',
            desc: 'Connect Oracle ERP with third-party systems — finance, inventory, HR and manufacturing data flows.',
            tags: ['Oracle ERP', 'Third-party', 'Data Flows'],
          },
          {
            title: 'Fusion Integrations',
            desc: 'Oracle Fusion Cloud integrations for SCM, HCM and Financials with pre-built OIC adapters.',
            tags: ['Fusion Cloud', 'Pre-built Adapters', 'Real-time'],
          },
          {
            title: 'API & Middleware',
            desc: 'REST/SOAP API design, management, versioning and monitoring with Oracle API Gateway.',
            tags: ['REST', 'SOAP', 'API Gateway'],
          },
          {
            title: 'Process Orchestration',
            desc: 'Visual process automation, approvals, notifications and error handling across connected systems.',
            tags: ['Visual Builder', 'Approvals', 'Error Handling'],
          },
        ],
        breadcrumb: [
          { label: 'Home', href: '/' },
          { label: 'Oracle Integration Cloud', href: '/oracle-integration-cloud' },
        ],
        relatedPages: [
          { label: 'Oracle ERP', href: '/oracle-erp' },
          { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
          { label: 'Oracle SCM', href: '/oracle-erp/scm' },
          { label: 'Oracle Finance', href: '/oracle-erp/finance' },
          { label: 'All Oracle Services', href: '/oracle-implementation-services' },
        ],
      }}
    />
  );
}
