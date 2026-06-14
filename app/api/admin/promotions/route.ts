import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const items = await db.promotion.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const body = await request.json() as Record<string, unknown>;
  if (!body.title || !body.description) {
    return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
  }
  const item = await db.promotion.create({
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
  return NextResponse.json(item, { status: 201 });
}
