import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/db';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blog.findUnique({ where: { slug } }).catch(() => null);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.seoTitle ?? `${post.title} | Soxira AI Solutions`,
    description: post.seoDesc ?? post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.seoDesc ?? post.excerpt ?? undefined,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
      type: 'article',
    },
  };
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.blog.findUnique({ where: { slug, status: 'published' } }).catch(() => null);
  if (!post) notFound();

  const tags = post.tags as string[];

  return (
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">

          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.category && (
                <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-300 ring-1 ring-violet-500/20">
                  {post.category}
                </span>
              )}
              {post.featured && (
                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-300">Featured</span>
              )}
            </div>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl leading-tight">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              {post.author && <span>By <span className="text-slate-300">{post.author}</span></span>}
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            </div>
          </header>

          {/* Cover Image */}
          {post.imageUrl && (
            <div className="relative mb-8 h-64 overflow-hidden rounded-[1.75rem] sm:h-80 lg:h-96">
              <Image src={post.imageUrl} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          {/* Content */}
          <article
            className="prose prose-invert prose-sm sm:prose-base max-w-none
              prose-headings:font-semibold prose-headings:text-white
              prose-p:text-slate-300 prose-p:leading-7
              prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300
              prose-strong:text-white
              prose-code:text-sky-300 prose-code:bg-slate-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10
              prose-blockquote:border-violet-500 prose-blockquote:bg-violet-500/10 prose-blockquote:text-slate-300
              prose-ul:text-slate-300 prose-ol:text-slate-300
              prose-li:marker:text-violet-400"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400 ring-1 ring-white/10">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
              ← Back to Blog
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
              Talk to Our Experts
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
