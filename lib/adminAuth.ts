import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from './session';

export async function requireAdmin(request: NextRequest): Promise<{ session: Awaited<ReturnType<typeof verifySession>>; error?: NextResponse }> {
  const token = request.cookies.get('soxira-admin-token')?.value;
  if (!token) {
    return { session: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  const session = await verifySession(token);
  if (!session) {
    return { session: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  return { session };
}

export function revalidateHome() {
  try {
    const { revalidatePath } = require('next/cache') as { revalidatePath: (path: string) => void };
    revalidatePath('/');
  } catch {}
}
