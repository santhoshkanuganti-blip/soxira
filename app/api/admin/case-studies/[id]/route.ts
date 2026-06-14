import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const item = await db.caseStudy.update({
    where: { id },
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
  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  await db.caseStudy.delete({ where: { id } });
  revalidateHome();
  return NextResponse.json({ ok: true });
}
