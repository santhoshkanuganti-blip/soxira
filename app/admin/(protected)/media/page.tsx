'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

type MediaItem = {
  id: string;
  publicId: string;
  secureUrl: string;
  width: number | null;
  height: number | null;
  mediaType: string;
  category: string | null;
  name: string | null;
  createdAt: string;
};

const CATEGORIES = ['All', 'Leadership', 'Products', 'Blogs', 'Promotions', 'Case Studies', 'Logos', 'Events'];

export default function MediaAdmin() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/media');
    setItems(await res.json() as MediaItem[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = items.filter((item) => {
    const matchCat = category === 'All' || item.category === category;
    const matchSearch = !search || (item.name ?? item.publicId).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    form.append('category', category === 'All' ? '' : category);
    try {
      const res = await fetch('/api/admin/media', { method: 'POST', body: form });
      if (res.ok) fetchData();
      else alert('Upload failed. Check Cloudinary configuration.');
    } catch {
      alert('Upload error. Please try again.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function handleDelete(id: string, publicId: string) {
    if (!confirm(`Delete "${publicId}"?`)) return;
    await fetch('/api/admin/media', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, publicId }) });
    fetchData();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Media Library</h1>
          <p className="mt-1 text-sm text-slate-400">{items.length} file{items.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleUpload}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60"
          >
            {uploading ? '↑ Uploading…' : '↑ Upload File'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search files…"
          className="w-56 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-violet-500/60"
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${category === cat ? 'bg-violet-500 text-white' : 'border border-white/10 text-slate-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          <p>No media files yet.</p>
          <p className="mt-2 text-xs">Upload images or videos using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80">
              <div className="relative aspect-square">
                {item.mediaType === 'image' ? (
                  <Image src={item.secureUrl} alt={item.name ?? item.publicId} fill className="object-cover" />
                ) : (
                  <video src={item.secureUrl} className="h-full w-full object-cover" muted />
                )}
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 transition group-hover:opacity-100 flex flex-col items-center justify-center gap-2 p-3">
                  <button
                    onClick={() => copyUrl(item.secureUrl)}
                    className="w-full rounded-lg bg-violet-500 px-2 py-1.5 text-[10px] font-medium text-white transition hover:bg-violet-400"
                  >
                    {copied === item.secureUrl ? '✓ Copied!' : 'Copy URL'}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.publicId)}
                    className="w-full rounded-lg bg-red-500/20 px-2 py-1.5 text-[10px] font-medium text-red-300 transition hover:bg-red-500/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="truncate text-[10px] text-slate-400">{item.name ?? item.publicId}</p>
                {item.category && <p className="text-[9px] text-slate-600">{item.category}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
