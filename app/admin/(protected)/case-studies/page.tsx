'use client';

import { useState, useEffect, useCallback } from 'react';

type CaseStudy = {
  id: string;
  industry: string;
  customerName: string | null;
  challenge: string | null;
  solution: string | null;
  benefits: string[];
  metrics: Record<string, string> | null;
  testimonial: string | null;
  images: string[];
  active: boolean;
};

const INDUSTRIES = ['Cement & Steel', 'Medical Distribution', 'Commercial LPG', 'Manufacturing', 'Finance', 'Insurance', 'MSMEs', 'Distribution'];

const EMPTY: Omit<CaseStudy, 'id'> = {
  industry: 'Manufacturing', customerName: '', challenge: '', solution: '', benefits: [], metrics: null, testimonial: '', images: [], active: true,
};

function FormModal({ initial, onSave, onClose }: {
  initial: Omit<CaseStudy,'id'> & { id?: string };
  onSave: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [benefitsInput, setBenefitsInput] = useState(initial.benefits.join('\n'));
  const [metricsInput, setMetricsInput] = useState(
    initial.metrics ? Object.entries(initial.metrics).map(([k, v]) => `${k}: ${v}`).join('\n') : ''
  );

  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) => setForm((f) => ({ ...f, [k]: v }));

  function parseMetrics(text: string): Record<string, string> | null {
    const lines = text.split('\n').filter(Boolean);
    if (lines.length === 0) return null;
    const obj: Record<string, string> = {};
    for (const line of lines) {
      const idx = line.indexOf(':');
      if (idx > -1) obj[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
    return Object.keys(obj).length > 0 ? obj : null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      benefits: benefitsInput.split('\n').map((s) => s.trim()).filter(Boolean),
      metrics: parseMetrics(metricsInput),
    };
    try {
      const res = await fetch(form.id ? `/api/admin/case-studies/${form.id}` : '/api/admin/case-studies', {
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
        <h2 className="mb-6 text-lg font-semibold text-white">{form.id ? 'Edit Case Study' : 'New Case Study'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Industry *</label>
              <select value={form.industry} onChange={(e) => set('industry', e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none">
                {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Customer Name</label>
              <input value={form.customerName ?? ''} onChange={(e) => set('customerName', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
          </div>
          {[
            { label: 'Challenge', key: 'challenge' as const },
            { label: 'Solution', key: 'solution' as const },
            { label: 'Testimonial Quote', key: 'testimonial' as const },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
              <textarea value={form[key] ?? ''} onChange={(e) => set(key, e.target.value)} rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 resize-none" />
            </div>
          ))}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Benefits (one per line)</label>
            <textarea value={benefitsInput} onChange={(e) => setBenefitsInput(e.target.value)} rows={4} placeholder="Reduced procurement time by 40%&#10;Improved inventory accuracy to 98%" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 resize-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Metrics (key: value, one per line)</label>
            <textarea value={metricsInput} onChange={(e) => setMetricsInput(e.target.value)} rows={4} placeholder="Cost Reduction: 35%&#10;Time Saved: 8 hrs/day&#10;ROI: 3.2x" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white font-mono outline-none focus:border-violet-500/60 resize-none" />
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} className="h-4 w-4 rounded accent-violet-500" />
            <span className="text-sm text-slate-300">Active</span>
          </label>
          {error && <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Case Study'}
            </button>
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-6 py-2.5 text-sm text-slate-400 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CaseStudiesAdmin() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<(Omit<CaseStudy,'id'> & {id?:string}) | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/case-studies');
    setItems((await res.json() as CaseStudy[]));
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this case study?')) return;
    await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' });
    fetchData();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Case Studies</h1>
          <p className="mt-1 text-sm text-slate-400">{items.length} case stud{items.length !== 1 ? 'ies' : 'y'}</p>
        </div>
        <button onClick={() => setModal({ ...EMPTY })} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
          + New Case Study
        </button>
      </div>
      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading…</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                {['Industry', 'Customer', 'Challenge', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/60">
              {items.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-slate-500">No case studies yet.</td></tr>
              ) : items.map((item) => (
                <tr key={item.id} className="hover:bg-white/5">
                  <td className="px-4 py-3"><span className="rounded-full bg-violet-500/15 px-2.5 py-0.5 text-xs font-medium text-violet-300">{item.industry}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{item.customerName ?? '—'}</td>
                  <td className="px-4 py-3 text-xs text-slate-400 max-w-xs"><p className="line-clamp-1">{item.challenge ?? '—'}</p></td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${item.active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-700/50 text-slate-500'}`}>
                      {item.active ? 'Active' : 'Inactive'}
                    </span>
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
