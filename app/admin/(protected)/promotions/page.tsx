'use client';

import { useState, useEffect, useCallback } from 'react';

type Promotion = {
  id: string;
  title: string;
  description: string;
  ctaText: string | null;
  ctaUrl: string | null;
  bannerUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  active: boolean;
};

const EMPTY: Omit<Promotion, 'id'> = {
  title: '', description: '', ctaText: '', ctaUrl: '', bannerUrl: '', startDate: null, endDate: null, active: true,
};

function FormModal({ initial, onSave, onClose }: {
  initial: Omit<Promotion, 'id'> & { id?: string };
  onSave: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (k: keyof typeof form, v: string | boolean | null) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(form.id ? `/api/admin/promotions/${form.id}` : '/api/admin/promotions', {
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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-16" onClick={onClose}>
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0B0B1A] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 hover:text-white">✕</button>
        <h2 className="mb-6 text-lg font-semibold text-white">{form.id ? 'Edit Promotion' : 'New Promotion'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Title *', key: 'title' as const },
            { label: 'Description *', key: 'description' as const, textarea: true },
            { label: 'CTA Button Text', key: 'ctaText' as const },
            { label: 'CTA URL', key: 'ctaUrl' as const },
            { label: 'Banner Image URL', key: 'bannerUrl' as const },
          ].map(({ label, key, textarea }) => (
            <div key={key}>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
              {textarea ? (
                <textarea value={form[key] ?? ''} onChange={(e) => set(key, e.target.value)} rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 resize-none" />
              ) : (
                <input type="text" value={form[key] ?? ''} onChange={(e) => set(key, e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
              )}
            </div>
          ))}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Start Date</label>
              <input type="date" value={form.startDate?.slice(0, 10) ?? ''} onChange={(e) => set('startDate', e.target.value || null)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">End Date</label>
              <input type="date" value={form.endDate?.slice(0, 10) ?? ''} onChange={(e) => set('endDate', e.target.value || null)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} className="h-4 w-4 rounded accent-violet-500" />
            <span className="text-sm text-slate-300">Active (show on website)</span>
          </label>
          {error && <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Promotion'}
            </button>
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-6 py-2.5 text-sm text-slate-400 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PromotionsAdmin() {
  const [items, setItems] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<(Omit<Promotion,'id'> & {id?:string}) | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/promotions');
    setItems(await res.json() as Promotion[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this promotion?')) return;
    await fetch(`/api/admin/promotions/${id}`, { method: 'DELETE' });
    fetchData();
  }

  async function handleToggle(item: Promotion) {
    await fetch(`/api/admin/promotions/${item.id}`, {
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
          <h1 className="text-xl font-semibold text-white">Promotions</h1>
          <p className="mt-1 text-sm text-slate-400">{items.length} promotion{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setModal({ ...EMPTY })} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
          + New Promotion
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading…</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                {['Title', 'CTA', 'Schedule', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/60">
              {items.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-slate-500">No promotions yet.</td></tr>
              ) : items.map((item) => (
                <tr key={item.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{item.ctaText ?? '—'}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {item.startDate ? item.startDate.slice(0, 10) : '—'} → {item.endDate ? item.endDate.slice(0, 10) : '∞'}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggle(item)} className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${item.active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-700/50 text-slate-500'}`}>
                      {item.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setModal({ ...item })} className="rounded-lg border border-white/10 px-3 py-1 text-xs text-slate-400 hover:border-violet-500/50 hover:text-white">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="rounded-lg border border-red-500/20 px-3 py-1 text-xs text-red-400 hover:bg-red-500/10">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && <FormModal initial={modal} onSave={() => { setModal(null); fetchData(); }} onClose={() => setModal(null)} />}
    </div>
  );
}
