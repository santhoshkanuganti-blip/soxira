import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const item = await db.product.update({
    where: { id },
    data: {
      name: body.name as string, slug: body.slug as string,
      tagline: (body.tagline as string) || null, description: (body.description as string) || null,
      features: body.features ?? [], benefits: body.benefits ?? [], industryTags: body.industryTags ?? [],
      imageUrl: (body.imageUrl as string) || null, videoUrl: (body.videoUrl as string) || null,
      ctaText: (body.ctaText as string) || null, ctaUrl: (body.ctaUrl as string) || null,
      displayOrder: Number(body.displayOrder ?? 0), active: body.active !== false,
    },
  });
  revalidateHome();
  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  await db.product.delete({ where: { id } });
  revalidateHome();
  return NextResponse.json({ ok: true });
}
