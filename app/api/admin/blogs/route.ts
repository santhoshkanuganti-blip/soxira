import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const items = await db.blog.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items.map((b: (typeof items)[number]) => ({ ...b, tags: b.tags as string[] })));
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const body = await request.json() as Record<string, unknown>;
  if (!body.title || !body.slug) return NextResponse.json({ error: 'Title and slug are required.' }, { status: 400 });
  const existing = await db.blog.findUnique({ where: { slug: body.slug as string } });
  if (existing) return NextResponse.json({ error: 'A post with this slug already exists.' }, { status: 409 });
  const item = await db.blog.create({
    data: {
      title: body.title as string, slug: body.slug as string,
      content: (body.content as string) || '',
      excerpt: (body.excerpt as string) || null,
      category: (body.category as string) || null,
      tags: body.tags ?? [],
      imageUrl: (body.imageUrl as string) || null,
      featured: Boolean(body.featured),
      status: (body.status as string) || 'draft',
      publishedAt: body.publishedAt ? new Date(body.publishedAt as string) : null,
      seoTitle: (body.seoTitle as string) || null,
      seoDesc: (body.seoDesc as string) || null,
      author: (body.author as string) || null,
    },
  });
  revalidateHome();
  return NextResponse.json(item, { status: 201 });
}
