import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { db } from '@/lib/db';
import { siteConfig } from '@/config/site';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blog.findUnique({ where: { slug } }).catch(() => null);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.seoTitle ?? `${post.title} | Soxira AI Solutions`,
    description: post.seoDesc ?? post.excerpt ?? undefined,
    alternates: { canonical: `https://${siteConfig.domain}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.seoDesc ?? post.excerpt ?? undefined,
      url: `https://${siteConfig.domain}/blog/${slug}`,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
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
  const postUrl = `https://${siteConfig.domain}/blog/${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDesc ?? post.excerpt ?? undefined,
    image: post.imageUrl ?? undefined,
    author: post.author ? { '@type': 'Person', name: post.author } : { '@type': 'Organization', name: siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `https://${siteConfig.domain}${siteConfig.logo}` },
    },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">

          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-ink">Blog</Link>
            <span>/</span>
            <span className="text-ink-muted truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.category && (
                <span className="rounded-full bg-accent-tint px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent-tint">
                  {post.category}
                </span>
              )}
              {post.featured && (
                <span className="rounded-full bg-accent-tint px-3 py-1 text-xs font-medium text-accent">Featured</span>
              )}
            </div>
            <h1 className="text-2xl font-semibold text-ink sm:text-3xl lg:text-4xl leading-tight">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
              {post.author && <span>By <span className="text-ink-muted">{post.author}</span></span>}
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
            className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-semibold prose-headings:text-ink prose-p:text-ink-muted prose-p:leading-7 prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent prose-strong:text-ink prose-code:text-accent prose-code:bg-slate-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-surface-2 prose-pre:border prose-pre:border-line prose-blockquote:border-line prose-blockquote:bg-accent-tint prose-blockquote:text-ink-muted prose-ul:text-ink-muted prose-ol:text-ink-muted prose-li:marker:text-accent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-ink-muted ring-1 ring-line">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-line pt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-ink-muted transition hover:text-ink">
              ← Back to Blog
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
              Talk to Our Experts
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </div>
  );
}
