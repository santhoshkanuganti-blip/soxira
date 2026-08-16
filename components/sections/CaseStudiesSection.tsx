'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export type CaseStudy = {
  id: string;
  industry: string;
  customerName?: string | null;
  challenge?: string | null;
  solution?: string | null;
  benefits: string[];
  metrics?: Record<string, string> | null;
};

const industryColors: Record<string, string> = {
  'Cement & Steel': '',
  'Medical Distribution': '',
  'Commercial LPG': '',
  'Manufacturing': '',
  'Finance': '',
  'Insurance': '',
};

export default function CaseStudiesSection({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (caseStudies.length === 0) return null;

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Case Studies</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">Real Results. Real Businesses.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
              How Soxira AI Solutions helps Indian businesses digitize, automate, and scale.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="shrink-0 self-start rounded-full border border-line px-5 py-2 text-sm text-ink transition hover:bg-surface-2"
          >
            View All →
          </Link>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.slice(0, 6).map((cs, i) => {
            const gradient = industryColors[cs.industry] ?? '';
            return (
              <motion.div
                key={cs.id}
                className="group rounded-[1.75rem] border border-line bg-surface p-6 transition-all hover:border-line"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-r ${gradient} p-3`}>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink">{cs.industry}</span>
                </div>

                {cs.customerName && (
                  <p className="text-xs text-ink-muted mb-1">{cs.customerName}</p>
                )}

                {cs.challenge && (
                  <div className="mb-3">
                    <p className="text-xs uppercase tracking-[0.15em] text-ink-muted mb-1">Challenge</p>
                    <p className="text-sm text-ink-muted line-clamp-2">{cs.challenge}</p>
                  </div>
                )}

                {cs.solution && (
                  <div className="mb-3">
                    <p className="text-xs uppercase tracking-[0.15em] text-ink-muted mb-1">Solution</p>
                    <p className="text-sm text-ink-muted line-clamp-2">{cs.solution}</p>
                  </div>
                )}

                {cs.metrics && Object.keys(cs.metrics).length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {Object.entries(cs.metrics).slice(0, 4).map(([key, val]) => (
                      <div key={key} className="rounded-xl bg-surface-2 p-3 text-center ring-1 ring-line">
                        <p className="text-lg font-bold text-ink">{val}</p>
                        <p className="text-[10px] text-ink-muted">{key}</p>
                      </div>
                    ))}
                  </div>
                )}

                {cs.benefits.length > 0 && (
                  <ul className="mt-4 space-y-1">
                    {cs.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-ink-muted">
                        <span className="mt-0.5 text-accent">✓</span>{b}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
