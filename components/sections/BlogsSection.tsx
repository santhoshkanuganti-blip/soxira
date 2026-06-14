'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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

const categoryColors: Record<string, string> = {
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
        <motion.div
          className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
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
          {featured && (
            <motion.div
              className="group relative col-span-1 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 backdrop-blur-xl lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-violet-700/40 to-sky-600/30">
                {featured.imageUrl ? (
                  <Image src={featured.imageUrl} alt={featured.title} fill className="object-cover opacity-80 transition group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-7xl opacity-20">✍️</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {featured.category && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[featured.category] ?? 'bg-white/10 text-slate-300'}`}>
                      {featured.category}
                    </span>
                  )}
                  {featured.featured && (
                    <span className="rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-300">Featured</span>
                  )}
                </div>
                <Link href={`/blog/${featured.slug}`} className="group/link">
                  <h3 className="text-lg font-semibold text-white transition group-hover/link:text-violet-300">{featured.title}</h3>
                </Link>
                {featured.excerpt && (
                  <p className="mt-2 text-sm leading-7 text-slate-400 line-clamp-2">{featured.excerpt}</p>
                )}
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                  {featured.author && <span>{featured.author}</span>}
                  {featured.publishedAt && <span>{formatDate(featured.publishedAt)}</span>}
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col gap-4">
            {rest.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.id}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl transition hover:border-violet-500/30"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ x: 4 }}
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-violet-700/40 to-sky-600/30">
                  {post.imageUrl ? (
                    <Image src={post.imageUrl} alt={post.title} fill className="object-cover opacity-80" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl opacity-30">✍️</div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  {post.category && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[post.category] ?? 'bg-white/10 text-slate-400'}`}>
                      {post.category}
                    </span>
                  )}
                  <Link href={`/blog/${post.slug}`} className="mt-1 block">
                    <h4 className="text-sm font-semibold text-white transition group-hover:text-violet-300 line-clamp-2">{post.title}</h4>
                  </Link>
                  {post.publishedAt && (
                    <p className="mt-1 text-[10px] text-slate-500">{formatDate(post.publishedAt)}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
