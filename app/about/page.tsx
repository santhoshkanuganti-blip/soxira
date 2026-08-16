import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutCompany } from '@/components/about/AboutCompany';
import { AboutExpertise } from '@/components/about/AboutExpertise';
import { AboutProducts } from '@/components/about/AboutProducts';
import { AboutFounder } from '@/components/about/AboutFounder';
import { AboutMissionVision } from '@/components/about/AboutMissionVision';
import { AboutCTA } from '@/components/about/AboutCTA';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Soxira AI Solutions',
  url: `https://${siteConfig.domain}/about`,
  mainEntity: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
    description: siteConfig.description,
  },
};

export const metadata: Metadata = {
  title: 'About Soxira AI Solutions | AI, Cloud & Data Engineering Company',
  alternates: { canonical: `https://${siteConfig.domain}/about` },
  description:
    'Soxira AI Solutions is an AI, Cloud, and Data Engineering company with 20+ years of experience, delivering intelligent products and enterprise transformation.',
  keywords: [
    'about soxira',
    'AI company India',
    'cloud migration company',
    'data engineering company',
    'enterprise AI solutions',
    'VitaranAI',
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <AboutHero />
        <AboutCompany />
        <AboutExpertise />
        <AboutProducts />
        <AboutFounder />
        <AboutMissionVision />
        <AboutCTA />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
