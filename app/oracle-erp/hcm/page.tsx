import { Metadata } from 'next';
import OracleServicePage from '@/components/oracle/OracleServicePage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle HCM Implementation Services | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}/oracle-erp/hcm` },
  description: 'Oracle Human Capital Management implementation — Core HR, Payroll, Talent Management and Learning. Expert Oracle HCM consulting from Soxira.',
  keywords: ['Oracle HCM implementation India', 'Oracle Human Capital Management', 'Oracle Payroll India', 'Oracle Talent Management', 'Oracle HCM consulting Hyderabad'],
  openGraph: {
    title: 'Oracle HCM Implementation Services | Soxira AI Solutions',
    description: 'Oracle SCM, Finance, HCM and Fusion Cloud implementation services for enterprises.',
    url: `https://${siteConfig.domain}/oracle-erp/hcm`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function OracleHCMPage() {
  return (
    <OracleServicePage
      data={{
        badge: 'Oracle HCM',
        title: 'Oracle HCM',
        titleHighlight: 'Implementation Services',
        subtitle:
          'Soxira helps enterprises modernize HR operations with Oracle HCM — Core HR, Payroll, Talent Management, Learning and Workforce Analytics — delivering a unified employee experience from hire to retire.',
        stats: [
          { stat: '25+', label: 'Years Oracle experience' },
          { stat: 'HCM', label: 'Full module expertise' },
          { stat: 'India', label: 'Payroll compliance' },
        ],
        capabilities: [
          {
            title: 'Core HR',
            desc: 'Employee master, organizational hierarchy, position management, and workforce administration.',
            tags: ['Employee Master', 'Org Hierarchy', 'Position Mgmt'],
          },
          {
            title: 'Payroll',
            desc: 'India-compliant payroll with PF, ESI, TDS, professional tax, and statutory reporting automation.',
            tags: ['PF/ESI', 'TDS', 'Statutory Reports'],
          },
          {
            title: 'Talent Management',
            desc: 'Recruitment, performance management, succession planning and career development workflows.',
            tags: ['Recruitment', 'Performance', 'Succession'],
          },
          {
            title: 'Learning & Analytics',
            desc: 'Training catalogue, certifications, learning paths and workforce analytics dashboards.',
            tags: ['LMS', 'Certifications', 'Analytics'],
          },
        ],
        breadcrumb: [
          { label: 'Home', href: '/' },
          { label: 'Oracle ERP', href: '/oracle-erp' },
          { label: 'Oracle HCM', href: '/oracle-erp/hcm' },
        ],
        relatedPages: [
          { label: 'Oracle ERP', href: '/oracle-erp' },
          { label: 'Oracle SCM', href: '/oracle-erp/scm' },
          { label: 'Oracle Finance', href: '/oracle-erp/finance' },
          { label: 'Oracle HCM Cloud', href: '/oracle-fusion-cloud/hcm' },
        ],
      }}
    />
  );
}
