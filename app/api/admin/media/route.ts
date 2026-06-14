import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cloudinary } from '@/lib/cloudinary';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const items = await db.media.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return NextResponse.json({ error: 'Cloudinary is not configured. Add CLOUDINARY_* env vars.' }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const category = formData.get('category') as string | null;

  if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const isVideo = file.type.startsWith('video/');

  const result = await new Promise<{ public_id: string; secure_url: string; width?: number; height?: number }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: isVideo ? 'video' : 'image', folder: `soxira/${category || 'general'}` },
      (err, res) => {
        if (err || !res) reject(err ?? new Error('Upload failed'));
        else resolve(res);
      }
    );
    stream.end(buffer);
  });

  const media = await db.media.create({
    data: {
      publicId: result.public_id,
      secureUrl: result.secure_url,
      width: result.width ?? null,
      height: result.height ?? null,
      mediaType: isVideo ? 'video' : 'image',
      category: category || null,
      name: file.name,
    },
  });

  return NextResponse.json(media, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { id, publicId } = await request.json() as { id: string; publicId: string };
  await cloudinary.uploader.destroy(publicId).catch(() => {});
  await db.media.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
