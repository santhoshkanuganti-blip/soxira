import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const items = await db.product.findMany({ orderBy: { displayOrder: 'asc' } });
  return NextResponse.json(items.map((p: (typeof items)[number]) => ({ ...p, features: p.features as string[], benefits: p.benefits as string[], industryTags: p.industryTags as string[] })));
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const body = await request.json() as Record<string, unknown>;
  if (!body.name || !body.slug) return NextResponse.json({ error: 'Name and slug are required.' }, { status: 400 });
  const item = await db.product.create({
    data: {
      name: body.name as string, slug: body.slug as string,
      tagline: (body.tagline as string) || null,
      description: (body.description as string) || null,
      features: body.features ?? [], benefits: body.benefits ?? [], industryTags: body.industryTags ?? [],
      imageUrl: (body.imageUrl as string) || null, videoUrl: (body.videoUrl as string) || null,
      ctaText: (body.ctaText as string) || null, ctaUrl: (body.ctaUrl as string) || null,
      displayOrder: Number(body.displayOrder ?? 0), active: body.active !== false,
    },
  });
  revalidateHome();
  return NextResponse.json(item, { status: 201 });
}
