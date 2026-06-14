import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const users = await db.user.findMany({ orderBy: { createdAt: 'asc' }, select: { id: true, email: true, name: true, role: true, active: true, createdAt: true } });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const { session, error } = await requireAdmin(request);
  if (error) return error;
  if (session?.role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Only Super Admins can create users.' }, { status: 403 });
  const { email, name, role, password, active } = await request.json() as Record<string, string | boolean>;
  if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  const exists = await db.user.findUnique({ where: { email: (email as string).toLowerCase() } });
  if (exists) return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 409 });
  const hash = await bcrypt.hash(password as string, 12);
  const user = await db.user.create({
    data: { email: (email as string).toLowerCase(), name: (name as string) || null, role: (role as string) || 'EDITOR', password: hash, active: active !== false },
    select: { id: true, email: true, name: true, role: true, active: true, createdAt: true },
  });
  return NextResponse.json(user, { status: 201 });
}
