import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/adminAuth';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { session, error } = await requireAdmin(request);
  if (error) return error;
  if (session?.role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;
  const data: Record<string, unknown> = {
    email: (body.email as string).toLowerCase(),
    name: (body.name as string) || null,
    role: body.role as string,
    active: body.active !== false,
  };
  if (body.password) data.password = await bcrypt.hash(body.password as string, 12);
  const user = await db.user.update({ where: { id }, data, select: { id: true, email: true, name: true, role: true, active: true, createdAt: true } });
  return NextResponse.json(user);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { session, error } = await requireAdmin(request);
  if (error) return error;
  if (session?.role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id } = await params;
  await db.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
