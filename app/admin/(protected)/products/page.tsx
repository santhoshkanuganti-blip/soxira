'use client';

import { useState, useEffect, useCallback } from 'react';

type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  features: string[];
  benefits: string[];
  industryTags: string[];
  imageUrl: string | null;
  videoUrl: string | null;
  ctaText: string | null;
  ctaUrl: string | null;
  displayOrder: number;
  active: boolean;
};

const EMPTY: Omit<Product, 'id'> = {
  name: '', slug: '', tagline: '', description: '', features: [], benefits: [], industryTags: [],
  imageUrl: '', videoUrl: '', ctaText: '', ctaUrl: '', displayOrder: 0, active: true,
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function FormModal({ initial, onSave, onClose }: {
  initial: Omit<Product,'id'> & { id?: string };
  onSave: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [featuresInput, setFeaturesInput] = useState(initial.features.join(', '));
  const [benefitsInput, setBenefitsInput] = useState(initial.benefits.join(', '));
  const [industryInput, setIndustryInput] = useState(initial.industryTags.join(', '));

  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      features: featuresInput.split(',').map((s) => s.trim()).filter(Boolean),
      benefits: benefitsInput.split(',').map((s) => s.trim()).filter(Boolean),
      industryTags: industryInput.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(form.id ? `/api/admin/products/${form.id}` : '/api/admin/products', {
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
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0B0B1A] p-8 shadow-2xl mb-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 hover:text-white">✕</button>
        <h2 className="mb-6 text-lg font-semibold text-white">{form.id ? 'Edit Product' : 'New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Product Name *</label>
              <input value={form.name} onChange={(e) => { set('name', e.target.value); if (!form.id) set('slug', slugify(e.target.value)); }} required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Slug</label>
              <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
          </div>
          {[
            { label: 'Tagline', key: 'tagline' as const },
            { label: 'Description', key: 'description' as const, textarea: true },
            { label: 'Image URL', key: 'imageUrl' as const },
            { label: 'Video URL', key: 'videoUrl' as const },
            { label: 'CTA Button Text', key: 'ctaText' as const },
            { label: 'CTA URL', key: 'ctaUrl' as const },
          ].map(({ label, key, textarea }) => (
            <div key={key}>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
              {textarea ? (
                <textarea value={form[key] ?? ''} onChange={(e) => set(key, e.target.value)} rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 resize-none" />
              ) : (
                <input type="text" value={form[key] ?? ''} onChange={(e) => set(key, e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
              )}
            </div>
          ))}
          {[
            { label: 'Capabilities / Features (comma-separated)', val: featuresInput, set: setFeaturesInput },
            { label: 'Benefits (comma-separated)', val: benefitsInput, set: setBenefitsInput },
            { label: 'Industries / Tags (comma-separated)', val: industryInput, set: setIndustryInput },
          ].map(({ label, val, set: s }) => (
            <div key={label}>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
              <input value={val} onChange={(e) => s(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
          ))}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Display Order</label>
              <input type="number" value={form.displayOrder} onChange={(e) => set('displayOrder', Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60" />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} className="h-4 w-4 rounded accent-violet-500" />
                <span className="text-sm text-slate-300">Active</span>
              </label>
            </div>
          </div>
          {error && <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Product'}
            </button>
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-6 py-2.5 text-sm text-slate-400 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProductsAdmin() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<(Omit<Product,'id'> & {id?:string}) | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/products');
    setItems(await res.json() as Product[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    fetchData();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Products</h1>
          <p className="mt-1 text-sm text-slate-400">{items.length} product{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setModal({ ...EMPTY })} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
          + New Product
        </button>
      </div>
      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading…</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.length === 0 ? (
            <p className="col-span-2 py-16 text-center text-slate-500">No products yet.</p>
          ) : items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  {item.tagline && <p className="text-xs text-sky-300 mt-0.5">{item.tagline}</p>}
                  <p className="text-xs text-slate-500 mt-1">/products/{item.slug}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${item.active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-700/50 text-slate-500'}`}>
                  {item.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              {item.industryTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.industryTags.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-400 ring-1 ring-white/10">{t}</span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex gap-2">
                <button onClick={() => setModal({ ...item })} className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:border-violet-500/50 hover:text-white">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="rounded-xl border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {modal && <FormModal initial={modal} onSave={() => { setModal(null); fetchData(); }} onClose={() => setModal(null)} />}
    </div>
  );
}
