import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/adminAuth';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  const { contacted } = await request.json() as { contacted: boolean };
  const lead = await db.contactLead.update({ where: { id }, data: { contacted } });
  return NextResponse.json(lead);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id } = await params;
  await db.contactLead.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
