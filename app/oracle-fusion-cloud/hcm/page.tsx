import { Metadata } from 'next';
import OracleServicePage from '@/components/oracle/OracleServicePage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oracle HCM Cloud Implementation Services | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}/oracle-fusion-cloud/hcm` },
  description: 'Oracle HCM Cloud implementation — Core HR, Payroll, Talent Management and Learning on Oracle Fusion Cloud. Expert Oracle HCM Cloud consulting from Soxira.',
  keywords: ['Oracle HCM Cloud India', 'Oracle Cloud HCM implementation', 'Oracle Fusion HCM', 'Oracle Cloud Payroll India', 'Oracle HCM Cloud Hyderabad'],
  openGraph: {
    title: 'Oracle HCM Cloud Implementation Services | Soxira AI Solutions',
    description: 'Oracle SCM, Finance, HCM and Fusion Cloud implementation services for enterprises.',
    url: `https://${siteConfig.domain}/oracle-fusion-cloud/hcm`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function OracleFusionHCMPage() {
  return (
    <OracleServicePage
      data={{
        badge: 'Oracle HCM Cloud',
        title: 'Oracle HCM Cloud',
        titleHighlight: 'Implementation Services',
        subtitle:
          'Soxira modernizes HR operations with Oracle HCM Cloud — a unified platform for Core HR, Payroll, Talent Management, Learning and Workforce Analytics on Oracle Fusion Cloud.',
        stats: [
          { stat: '25+', label: 'Years Oracle experience' },
          { stat: 'HCM', label: 'Full Cloud expertise' },
          { stat: 'India', label: 'Payroll compliance' },
        ],
        capabilities: [
          {
            title: 'Cloud Core HR',
            desc: 'Global HR with India localization, employee lifecycle, org management and workforce planning.',
            tags: ['India Localization', 'Org Mgmt', 'Workforce Planning'],
          },
          {
            title: 'Cloud Payroll',
            desc: 'India-compliant cloud payroll with PF, ESI, TDS, professional tax and statutory return filing.',
            tags: ['PF/ESI', 'TDS', 'Statutory Filing'],
          },
          {
            title: 'Cloud Talent',
            desc: 'Recruitment, onboarding, performance management, succession and compensation planning.',
            tags: ['Recruitment', 'Performance', 'Compensation'],
          },
          {
            title: 'Cloud Learning',
            desc: 'Learning Management System, certification tracking, compliance training and skills assessment.',
            tags: ['LMS', 'Certifications', 'Skills'],
          },
        ],
        breadcrumb: [
          { label: 'Home', href: '/' },
          { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
          { label: 'Oracle HCM Cloud', href: '/oracle-fusion-cloud/hcm' },
        ],
        relatedPages: [
          { label: 'Oracle Fusion Cloud', href: '/oracle-fusion-cloud' },
          { label: 'Oracle SCM Cloud', href: '/oracle-fusion-cloud/scm' },
          { label: 'Oracle Financials Cloud', href: '/oracle-fusion-cloud/financials' },
          { label: 'Oracle HCM (ERP)', href: '/oracle-erp/hcm' },
        ],
      }}
    />
  );
}
