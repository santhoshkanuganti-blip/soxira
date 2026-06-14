import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const items = await db.caseStudy.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items.map((cs) => ({ ...cs, benefits: cs.benefits as string[], metrics: cs.metrics, images: cs.images as string[] })));
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const body = await request.json() as Record<string, unknown>;
  if (!body.industry) return NextResponse.json({ error: 'Industry is required.' }, { status: 400 });
  const item = await db.caseStudy.create({
    data: {
      industry: body.industry as string,
      customerName: (body.customerName as string) || null,
      challenge: (body.challenge as string) || null,
      solution: (body.solution as string) || null,
      benefits: body.benefits ?? [],
      metrics: body.metrics ?? undefined,
      testimonial: (body.testimonial as string) || null,
      images: body.images ?? [],
      active: body.active !== false,
    },
  });
  revalidateHome();
  return NextResponse.json(item, { status: 201 });
}
