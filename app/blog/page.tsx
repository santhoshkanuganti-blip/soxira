import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogAccent from '@/components/blog/BlogAccent';
import { db } from '@/lib/db';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog & Insights — AI, MSMEs, Distribution, Finance | Soxira AI Solutions',
  description: 'Expert insights on AI transformation, MSME digitization, distributor management, and data engineering for Indian businesses.',
};

const CATEGORIES = ['All', 'AI', 'MSMEs', 'Distribution', 'Manufacturing', 'Finance', 'Insurance', 'Data Engineering', 'VitaranAI'];

const categoryColors: Record<string, string> = {
  AI: 'bg-violet-500/20 text-violet-300 ring-violet-500/20',
  MSMEs: 'bg-sky-500/20 text-sky-300 ring-sky-500/20',
  Distribution: 'bg-orange-500/20 text-orange-300 ring-orange-500/20',
  Manufacturing: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/20',
  Finance: 'bg-yellow-500/20 text-yellow-300 ring-yellow-500/20',
  Insurance: 'bg-pink-500/20 text-pink-300 ring-pink-500/20',
  'Data Engineering': 'bg-teal-500/20 text-teal-300 ring-teal-500/20',
  VitaranAI: 'bg-fuchsia-500/20 text-fuchsia-300 ring-fuchsia-500/20',
};


function formatDate(date: Date | null | undefined): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date));
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;

  const posts = await db.blog.findMany({
    where: {
      status: 'published',
      ...(category && category !== 'All' ? { category } : {}),
    },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
  }).catch(() => []);

  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const otherPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300/80">Blog &amp; Insights</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">AI Insights for Indian Businesses</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Expert perspectives on AI transformation, MSME digitization, distributor management, and intelligent automation.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-10 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = (!category && cat === 'All') || category === cat;
              return (
                <Link
                  key={cat}
                  href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition ring-1 ${
                    isActive
                      ? 'bg-violet-500 text-white ring-violet-400'
                      : `bg-white/5 text-slate-400 ring-white/10 hover:bg-white/10 hover:text-white`
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {posts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-slate-400">No posts found in this category. Check back soon.</p>
              <Link href="/blog" className="mt-4 inline-block text-sm text-violet-400 hover:text-violet-300">← Back to all posts</Link>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <Link href={`/blog/${featuredPost.slug}`} className="group mb-10 block">
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 backdrop-blur-xl transition hover:border-violet-500/30">
                    {featuredPost.imageUrl ? (
                      <div className="relative h-64 overflow-hidden md:h-72">
                        <Image src={featuredPost.imageUrl} alt={featuredPost.title} fill sizes="100vw" className="object-cover opacity-80 transition group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                      </div>
                    ) : (
                      <BlogAccent category={featuredPost.category} />
                    )}
                    <div className="p-8">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {featuredPost.featured && <span className="rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-300">Featured</span>}
                        {featuredPost.category && (
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${categoryColors[featuredPost.category] ?? 'bg-white/10 text-slate-300 ring-white/10'}`}>
                            {featuredPost.category}
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-semibold text-white transition group-hover:text-violet-300 md:text-3xl">{featuredPost.title}</h2>
                      {featuredPost.excerpt && <p className="mt-3 text-sm leading-7 text-slate-400 line-clamp-2">{featuredPost.excerpt}</p>}
                      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                        {featuredPost.author && <span>By {featuredPost.author}</span>}
                        {featuredPost.publishedAt && <span>{formatDate(featuredPost.publishedAt)}</span>}
                        <span className="text-violet-400 group-hover:text-violet-300">Read More →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Post Grid */}
              {otherPosts.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {otherPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                      <div className="h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 backdrop-blur-xl transition hover:border-violet-500/30">
                        {post.imageUrl ? (
                          <div className="relative h-40 overflow-hidden">
                            <Image src={post.imageUrl} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover opacity-80 transition group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                          </div>
                        ) : (
                          <BlogAccent category={post.category} />
                        )}
                        <div className="p-5">
                          {post.category && (
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ring-1 ${categoryColors[post.category] ?? 'bg-white/10 text-slate-400 ring-white/10'}`}>
                              {post.category}
                            </span>
                          )}
                          <h3 className="mt-2 text-sm font-semibold text-white transition group-hover:text-violet-300 line-clamp-2">{post.title}</h3>
                          {post.excerpt && <p className="mt-2 text-xs leading-6 text-slate-400 line-clamp-2">{post.excerpt}</p>}
                          <div className="mt-3 flex items-center gap-3 text-[10px] text-slate-500">
                            {post.author && <span>{post.author}</span>}
                            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
