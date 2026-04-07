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

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About Soxira AI Solutions | AI, Cloud & Data Engineering Company',
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
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
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
    </div>
  );
}
