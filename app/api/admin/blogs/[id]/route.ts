import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const item = await db.blog.update({
    where: { id },
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
  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  await db.blog.delete({ where: { id } });
  revalidateHome();
  return NextResponse.json({ ok: true });
}
