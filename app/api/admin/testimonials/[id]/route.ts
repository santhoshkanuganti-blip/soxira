import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const item = await db.testimonial.update({
    where: { id },
    data: {
      customerName: body.customerName as string,
      designation: (body.designation as string) || null,
      company: (body.company as string) || null,
      photo: (body.photo as string) || null,
      review: body.review as string,
      rating: Number(body.rating ?? 5),
      industry: (body.industry as string) || null,
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
  await db.testimonial.delete({ where: { id } });
  revalidateHome();
  return NextResponse.json({ ok: true });
}
