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
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Products</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">Our AI-Powered Products</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
            Purpose-built platforms that digitize, automate, and scale Indian businesses.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="group overflow-hidden rounded-[2rem] border border-line bg-surface"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="relative h-48 overflow-hidden bg-accent">
                {product.imageUrl ? (
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover opacity-70" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-6xl opacity-30">🤖</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-accent-tint" />
                <div className="absolute bottom-4 left-6">
                  <span className="inline-flex rounded-full bg-accent-tint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent ring-1 ring-accent-tint">
                    {product.name}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {product.tagline && (
                  <p className="text-base font-semibold text-accent">{product.tagline}</p>
                )}
                {product.description && (
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{product.description}</p>
                )}

                {product.features.length > 0 && (
                  <div className="mt-5">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-ink-muted">Capabilities</p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((f) => (
                        <span key={f} className="rounded-full bg-accent-tint px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent-tint">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.industryTags.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-ink-muted">Industries</p>
                    <div className="flex flex-wrap gap-2">
                      {product.industryTags.map((t) => (
                        <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[10px] text-ink-muted ring-1 ring-line">
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
                      className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
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
