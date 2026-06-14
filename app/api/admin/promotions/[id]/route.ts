import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const item = await db.promotion.update({
    where: { id },
    data: {
      title: body.title as string,
      description: body.description as string,
      ctaText: (body.ctaText as string) || null,
      ctaUrl: (body.ctaUrl as string) || null,
      bannerUrl: (body.bannerUrl as string) || null,
      startDate: body.startDate ? new Date(body.startDate as string) : null,
      endDate: body.endDate ? new Date(body.endDate as string) : null,
      active: body.active !== false,
    },
  });
  revalidateHome();
  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  await db.promotion.delete({ where: { id } });
  revalidateHome();
  return NextResponse.json({ ok: true });
}
