'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { safeImageUrl } from '@/lib/safe-image';

export type Testimonial = {
  id: string;
  customerName: string;
  designation?: string | null;
  company?: string | null;
  photo?: string | null;
  review: string;
  rating: number;
  industry?: string | null;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-accent' : 'text-slate-700'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = window.setInterval(() => setIndex((c) => (c + 1) % testimonials.length), 6000);
    return () => window.clearInterval(id);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;
  const current = testimonials[index];

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Testimonials</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">What Our Clients Say</h2>
        </motion.div>

        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_16px_40px_rgba(20,25,50,0.06)]">
          <div className="relative p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 text-5xl text-accent leading-none select-none">&ldquo;</div>
                <p className="max-w-3xl text-lg leading-8 text-ink sm:text-xl">
                  {current.review}
                </p>
                <div className="mt-8 flex flex-col items-center gap-3">
                  <StarRating rating={current.rating} />
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-line">
                      {safeImageUrl(current.photo) ? (
                        <Image src={safeImageUrl(current.photo)!} alt={current.customerName} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-accent text-sm font-bold text-white">
                          {current.customerName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-ink">{current.customerName}</p>
                      <p className="text-xs text-ink-muted">
                        {[current.designation, current.company].filter(Boolean).join(', ')}
                      </p>
                      {current.industry && (
                        <span className="mt-1 inline-block rounded-full bg-accent-tint px-2 py-0.5 text-[10px] text-accent">
                          {current.industry}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {testimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-accent' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
