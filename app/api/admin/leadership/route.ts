import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, revalidateHome } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const leaders = await db.leadership.findMany({ orderBy: { displayOrder: 'asc' } });
  return NextResponse.json(leaders.map((l: (typeof leaders)[number]) => ({ ...l, expertise: l.expertise as string[] })));
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const body = await request.json() as Record<string, unknown>;
  const { name, designation, bio, expertise, quote, imageUrl, linkedinUrl, displayOrder, active } = body;
  if (!name || !designation || !bio) {
    return NextResponse.json({ error: 'Name, designation, and bio are required.' }, { status: 400 });
  }
  const leader = await db.leadership.create({
    data: { name: name as string, designation: designation as string, bio: bio as string, expertise: expertise ?? [], quote: quote as string | null ?? null, imageUrl: imageUrl as string | null ?? null, linkedinUrl: linkedinUrl as string | null ?? null, displayOrder: Number(displayOrder ?? 0), active: active !== false },
  });
  revalidateHome();
  return NextResponse.json(leader, { status: 201 });
}
