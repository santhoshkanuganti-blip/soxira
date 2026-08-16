import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import { db } from '@/lib/db';
import { siteConfig } from '@/config/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Case Studies — AI Transformation for Indian Businesses | Soxira AI Solutions',
  alternates: { canonical: `https://${siteConfig.domain}/case-studies` },
  description: 'Real-world case studies of how Soxira AI Solutions helps Cement & Steel, Medical Distribution, LPG, Manufacturing, Finance and Insurance businesses digitize and scale.',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Soxira Case Studies',
  url: `https://${siteConfig.domain}/case-studies`,
  about: { '@type': 'Organization', name: siteConfig.name, url: `https://${siteConfig.domain}` },
};

export default async function CaseStudiesPage() {
  const caseStudies = await db.caseStudy.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  const mapped = caseStudies.map((cs) => ({
    ...cs,
    benefits: cs.benefits as string[],
    metrics: cs.metrics as Record<string, string> | null,
  }));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main className="py-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Case Studies</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Real Results for Indian Businesses</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
              Explore how Soxira AI Solutions helps businesses across industries digitize, automate and scale with intelligent technology.
            </p>
          </div>
        </div>
        {mapped.length > 0 ? (
          <CaseStudiesSection caseStudies={mapped} />
        ) : (
          <div className="px-4 py-24 text-center text-ink-muted">
            <p>Case studies coming soon. Check back shortly.</p>
          </div>
        )}
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
