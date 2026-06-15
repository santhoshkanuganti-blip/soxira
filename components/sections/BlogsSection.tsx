'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import BlogAccent from '@/components/blog/BlogAccent';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: string | null;
  imageUrl?: string | null;
  publishedAt?: Date | null;
  author?: string | null;
  featured?: boolean;
};

const CATEGORY_COLORS: Record<string, string> = {
  AI: 'bg-violet-500/20 text-violet-300',
  MSMEs: 'bg-sky-500/20 text-sky-300',
  Distribution: 'bg-orange-500/20 text-orange-300',
  Manufacturing: 'bg-emerald-500/20 text-emerald-300',
  Finance: 'bg-yellow-500/20 text-yellow-300',
  Insurance: 'bg-pink-500/20 text-pink-300',
  'Data Engineering': 'bg-teal-500/20 text-teal-300',
  VitaranAI: 'bg-fuchsia-500/20 text-fuchsia-300',
};


function formatDate(date: Date | null | undefined): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date));
}

export default function BlogsSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300/80">Blog & Insights</p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">AI Insights for Indian Businesses</h2>
          </div>
          <Link
            href="/blog"
            className="shrink-0 self-start rounded-full border border-white/20 px-5 py-2 text-sm text-white transition hover:bg-white/10"
          >
            View All Posts →
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* ── Featured card (2/3 width) ── */}
          {featured && (
            <motion.article
              className="group col-span-1 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:-translate-y-1 lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {featured.imageUrl ? (
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={featured.imageUrl}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                </div>
              ) : (
                <BlogAccent category={featured.category} />
              )}

              <div className="p-6 sm:p-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  {featured.featured && (
                    <span className="rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-300">Featured</span>
                  )}
                  {featured.category && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[featured.category] ?? 'bg-white/10 text-slate-300'}`}>
                      {featured.category}
                    </span>
                  )}
                </div>

                <Link href={`/blog/${featured.slug}`}>
                  <h3 className="text-lg font-semibold text-white transition group-hover:text-violet-300 sm:text-xl">
                    {featured.title}
                  </h3>
                </Link>

                {featured.excerpt && (
                  <p className="mt-2.5 text-sm leading-7 text-slate-400 line-clamp-3">{featured.excerpt}</p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  {featured.author && <span>{featured.author}</span>}
                  {featured.publishedAt && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-slate-700" />
                      <span>{formatDate(featured.publishedAt)}</span>
                    </>
                  )}
                  <span className="ml-auto text-violet-400 transition group-hover:text-violet-300">Read more →</span>
                </div>
              </div>
            </motion.article>
          )}

          {/* ── Side cards (1/3 width) ── */}
          <div className="flex flex-col gap-4">
            {rest.slice(0, 3).map((post, i) => (
              <motion.article
                key={post.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:-translate-y-0.5"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {post.imageUrl ? (
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                  </div>
                ) : (
                  <BlogAccent category={post.category} />
                )}

                <div className="p-4">
                  {post.category && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[post.category] ?? 'bg-white/10 text-slate-400'}`}>
                      {post.category}
                    </span>
                  )}
                  <Link href={`/blog/${post.slug}`}>
                    <h4 className="mt-1.5 text-sm font-semibold text-white transition group-hover:text-violet-300 line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>
                  {post.excerpt && (
                    <p className="mt-1 text-[11px] leading-5 text-slate-500 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="mt-2.5 flex items-center gap-2 text-[10px] text-slate-600">
                    {post.author && <span>{post.author}</span>}
                    {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
