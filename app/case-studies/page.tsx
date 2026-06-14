import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import { db } from '@/lib/db';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Case Studies — AI Transformation for Indian Businesses | Soxira AI Solutions',
  description: 'Real-world case studies of how Soxira AI Solutions helps Cement & Steel, Medical Distribution, LPG, Manufacturing, Finance and Insurance businesses digitize and scale.',
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
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />
      <main className="py-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300/80">Case Studies</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Real Results for Indian Businesses</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Explore how Soxira AI Solutions helps businesses across industries digitize, automate and scale with intelligent technology.
            </p>
          </div>
        </div>
        {mapped.length > 0 ? (
          <CaseStudiesSection caseStudies={mapped} />
        ) : (
          <div className="px-4 py-24 text-center text-slate-400">
            <p>Case studies coming soon. Check back shortly.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
