import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const items = await db.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const body = await request.json() as Record<string, unknown>;
  if (!body.customerName || !body.review) return NextResponse.json({ error: 'Customer name and review are required.' }, { status: 400 });
  const item = await db.testimonial.create({
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
  return NextResponse.json(item, { status: 201 });
}
