'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export type Product = {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  features: string[];
  industryTags: string[];
  imageUrl?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
};

export default function ProductsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-sky-300/80">Products</p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Our AI-Powered Products</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            Purpose-built platforms that digitize, automate, and scale Indian businesses.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-700/40 to-sky-600/30">
                {product.imageUrl ? (
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover opacity-70" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-6xl opacity-30">🤖</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="inline-flex rounded-full bg-violet-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300 ring-1 ring-violet-500/30">
                    {product.name}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {product.tagline && (
                  <p className="text-base font-semibold text-sky-300">{product.tagline}</p>
                )}
                {product.description && (
                  <p className="mt-3 text-sm leading-7 text-slate-400">{product.description}</p>
                )}

                {product.features.length > 0 && (
                  <div className="mt-5">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Capabilities</p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((f) => (
                        <span key={f} className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300 ring-1 ring-sky-500/20">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.industryTags.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Industries</p>
                    <div className="flex flex-wrap gap-2">
                      {product.industryTags.map((t) => (
                        <span key={t} className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-400 ring-1 ring-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.ctaText && product.ctaUrl && (
                  <div className="mt-6">
                    <Link
                      href={product.ctaUrl}
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                    >
                      {product.ctaText} →
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
