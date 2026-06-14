'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-xl bg-white/5" /> });

type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  tags: string[];
  imageUrl: string | null;
  featured: boolean;
  status: string;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDesc: string | null;
  author: string | null;
};

const CATEGORIES = ['AI', 'MSMEs', 'Distribution', 'Manufacturing', 'Finance', 'Insurance', 'Data Engineering', 'VitaranAI'];

const EMPTY: Omit<Blog, 'id'> = {
  title: '', slug: '', content: '', excerpt: '', category: 'AI', tags: [], imageUrl: '', featured: false,
  status: 'draft', publishedAt: null, seoTitle: '', seoDesc: '', author: '',
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function BlogForm({ initial, onSave, onClose }: {
  initial: Omit<Blog,'id'> & { id?: string };
  onSave: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [tagsInput, setTagsInput] = useState(initial.tags.join(', '));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      publishedAt: form.status === 'published' && !form.publishedAt ? new Date().toISOString() : form.publishedAt,
    };
    try {
      const res = await fetch(form.id ? `/api/admin/blogs/${form.id}` : '/api/admin/blogs', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json() as {error?:string}).error ?? 'Save failed');
      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/80 p-4 pt-8 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[#0B0B1A] p-8 shadow-2xl mb-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 hover:text-white">✕</button>
        <h2 className="mb-6 text-lg font-semibold text-white">{form.id ? 'Edit Blog Post' : 'New Blog Post'}</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Title *</label>
            <input value={form.title} onChange={(e) => { set('title', e.target.value); if (!form.id) set('slug', slugify(e.target.value)); }} required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Slug</label>
              <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Category</label>
              <select value={form.category ?? ''} onChange={(e) => set('category', e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Excerpt</label>
            <textarea value={form.excerpt ?? ''} onChange={(e) => set('excerpt', e.target.value)} rows={2} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 resize-none" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">Content *</label>
            <RichTextEditor value={form.content} onChange={(html) => set('content', html)} placeholder="Start writing your blog post…" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Cover Image URL</label>
              <input value={form.imageUrl ?? ''} onChange={(e) => set('imageUrl', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Author</label>
              <input value={form.author ?? ''} onChange={(e) => set('author', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Tags (comma-separated)</label>
            <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="AI, MSME, VitaranAI" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Status</label>
              <select value={form.status} onChange={(e) => set('status', e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            {form.status === 'scheduled' && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Publish Date</label>
                <input type="datetime-local" value={form.publishedAt?.slice(0, 16) ?? ''} onChange={(e) => set('publishedAt', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60" />
              </div>
            )}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">SEO</p>
            <div>
              <label className="mb-1.5 block text-xs text-slate-400">SEO Title</label>
              <input value={form.seoTitle ?? ''} onChange={(e) => set('seoTitle', e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/60" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-slate-400">Meta Description</label>
              <textarea value={form.seoDesc ?? ''} onChange={(e) => set('seoDesc', e.target.value)} rows={2} className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-sm text-white outline-none resize-none focus:border-violet-500/60" />
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="h-4 w-4 rounded accent-violet-500" />
            <span className="text-sm text-slate-300">Mark as Featured Post</span>
          </label>
          {error && <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? 'Saving…' : form.status === 'published' ? 'Publish' : 'Save Draft'}
            </button>
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-6 py-2.5 text-sm text-slate-400 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const STATUS_BADGE: Record<string, string> = {
  published: 'bg-emerald-500/15 text-emerald-300',
  draft: 'bg-slate-700/50 text-slate-400',
  scheduled: 'bg-yellow-500/15 text-yellow-300',
};

export default function BlogsAdmin() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<(Omit<Blog,'id'> & {id?:string}) | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/blogs');
    setPosts(await res.json() as Blog[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
    fetchData();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Blog & Insights</h1>
          <p className="mt-1 text-sm text-slate-400">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setModal({ ...EMPTY })} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
          + New Post
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading…</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                {['Title', 'Category', 'Author', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/60">
              {posts.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-slate-500">No posts yet. Write your first blog!</td></tr>
              ) : posts.map((post) => (
                <tr key={post.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white line-clamp-1">{post.title}</p>
                    <p className="text-xs text-slate-500">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{post.category ?? '—'}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{post.author ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${STATUS_BADGE[post.status] ?? STATUS_BADGE.draft}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setModal({ ...post })} className="rounded-lg border border-white/10 px-3 py-1 text-xs text-slate-400 hover:border-violet-500/50 hover:text-white">Edit</button>
                      <button onClick={() => handleDelete(post.id)} className="rounded-lg border border-red-500/20 px-3 py-1 text-xs text-red-400 hover:bg-red-500/10">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && <BlogForm initial={modal} onSave={() => { setModal(null); fetchData(); }} onClose={() => setModal(null)} />}
    </div>
  );
}
