import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const { name, designation, bio, expertise, quote, imageUrl, linkedinUrl, displayOrder, active } = body;
  const leader = await db.leadership.update({
    where: { id },
    data: { name: name as string, designation: designation as string, bio: bio as string, expertise: expertise ?? [], quote: (quote as string) || null, imageUrl: (imageUrl as string) || null, linkedinUrl: (linkedinUrl as string) || null, displayOrder: Number(displayOrder ?? 0), active: active !== false },
  });
  revalidateHome();
  return NextResponse.json(leader);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  await db.leadership.delete({ where: { id } });
  revalidateHome();
  return NextResponse.json({ ok: true });
}
