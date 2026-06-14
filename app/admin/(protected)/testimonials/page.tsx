'use client';

import { useState, useEffect, useCallback } from 'react';

type Testimonial = {
  id: string;
  customerName: string;
  designation: string | null;
  company: string | null;
  photo: string | null;
  review: string;
  rating: number;
  industry: string | null;
  active: boolean;
};

const EMPTY: Omit<Testimonial, 'id'> = {
  customerName: '', designation: '', company: '', photo: '', review: '', rating: 5, industry: '', active: true,
};

function FormModal({ initial, onSave, onClose }: {
  initial: Omit<Testimonial,'id'> & { id?: string };
  onSave: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(form.id ? `/api/admin/testimonials/${form.id}` : '/api/admin/testimonials', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/80 p-4 pt-16 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#0B0B1A] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 hover:text-white">✕</button>
        <h2 className="mb-6 text-lg font-semibold text-white">{form.id ? 'Edit Testimonial' : 'New Testimonial'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Customer Name *</label>
              <input value={form.customerName} onChange={(e) => set('customerName', e.target.value)} required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Company</label>
              <input value={form.company ?? ''} onChange={(e) => set('company', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Designation</label>
              <input value={form.designation ?? ''} onChange={(e) => set('designation', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Industry</label>
              <input value={form.industry ?? ''} onChange={(e) => set('industry', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Review *</label>
            <textarea value={form.review} onChange={(e) => set('review', e.target.value)} required rows={4} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 resize-none" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Rating (1–5)</label>
              <select value={form.rating} onChange={(e) => set('rating', Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none">
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{'★'.repeat(r)} {r}/5</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Photo URL</label>
              <input value={form.photo ?? ''} onChange={(e) => set('photo', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} className="h-4 w-4 rounded accent-violet-500" />
            <span className="text-sm text-slate-300">Active</span>
          </label>
          {error && <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Testimonial'}
            </button>
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-6 py-2.5 text-sm text-slate-400 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<(Omit<Testimonial,'id'> & {id?:string}) | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/testimonials');
    setItems(await res.json() as Testimonial[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    fetchData();
  }

  async function handleToggle(item: Testimonial) {
    await fetch(`/api/admin/testimonials/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, active: !item.active }),
    });
    fetchData();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Testimonials</h1>
          <p className="mt-1 text-sm text-slate-400">{items.length} testimonial{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setModal({ ...EMPTY })} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
          + Add Testimonial
        </button>
      </div>
      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading…</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.length === 0 ? (
            <p className="col-span-2 py-16 text-center text-slate-500">No testimonials yet.</p>
          ) : items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{item.customerName}</p>
                  <p className="text-xs text-slate-400">{[item.designation, item.company].filter(Boolean).join(', ')}</p>
                  <p className="mt-0.5 text-xs text-yellow-400">{'★'.repeat(item.rating)}</p>
                </div>
                <button onClick={() => handleToggle(item)} className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${item.active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-700/50 text-slate-500'}`}>
                  {item.active ? 'Active' : 'Inactive'}
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-400 line-clamp-2">"{item.review}"</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setModal({ ...item })} className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:border-violet-500/50 hover:text-white">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="ml-auto rounded-xl border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {modal && <FormModal initial={modal} onSave={() => { setModal(null); fetchData(); }} onClose={() => setModal(null)} />}
    </div>
  );
}
