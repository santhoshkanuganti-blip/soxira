import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const leads = await db.contactLead.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(leads);
}
