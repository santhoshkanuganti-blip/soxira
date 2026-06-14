'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

type Leader = {
  id: string;
  name: string;
  designation: string;
  bio: string;
  expertise: string[];
  quote: string | null;
  imageUrl: string | null;
  linkedinUrl: string | null;
  displayOrder: number;
  active: boolean;
};

const EMPTY: Omit<Leader, 'id'> = {
  name: '', designation: '', bio: '', expertise: [], quote: '', imageUrl: '', linkedinUrl: '', displayOrder: 0, active: true,
};

function FormModal({ initial, onSave, onClose }: {
  initial: Omit<Leader, 'id'> & { id?: string };
  onSave: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [expertiseInput, setExpertiseInput] = useState(initial.expertise.join(', '));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = { ...form, expertise: expertiseInput.split(',').map((s) => s.trim()).filter(Boolean) };
    try {
      const res = await fetch(form.id ? `/api/admin/leadership/${form.id}` : '/api/admin/leadership', {
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

  function field(label: string, key: keyof typeof form, type = 'text', textarea = false) {
    return (
      <div key={key}>
        <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
        {textarea ? (
          <textarea
            value={form[key] as string}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 resize-none"
          />
        ) : (
          <input
            type={type}
            value={form[key] as string}
            onChange={(e) => setForm((f) => ({ ...f, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30"
          />
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-16" onClick={onClose}>
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0B0B1A] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 hover:text-white">✕</button>
        <h2 className="mb-6 text-lg font-semibold text-white">{form.id ? 'Edit Leader' : 'Add Leader'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {field('Name *', 'name')}
            {field('Designation *', 'designation')}
          </div>
          {field('Bio *', 'bio', 'text', true)}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Expertise (comma-separated)</label>
            <input
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              placeholder="AI Strategy, Product Innovation, Enterprise SaaS"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30"
            />
          </div>
          {field('Quote', 'quote', 'text', true)}
          <div className="grid gap-4 sm:grid-cols-2">
            {field('Image URL', 'imageUrl')}
            {field('LinkedIn URL', 'linkedinUrl')}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {field('Display Order', 'displayOrder', 'number')}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Status</label>
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="h-4 w-4 rounded accent-violet-500" />
                <span className="text-sm text-slate-300">Active (visible on website)</span>
              </label>
            </div>
          </div>
          {error && <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? 'Saving…' : 'Save Leader'}
            </button>
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-6 py-2.5 text-sm text-slate-400 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LeadershipAdmin() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<(Omit<Leader,'id'> & {id?:string}) | null>(null);

  const fetchLeaders = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/leadership');
    const data = await res.json() as Leader[];
    setLeaders(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLeaders(); }, [fetchLeaders]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this leader?')) return;
    await fetch(`/api/admin/leadership/${id}`, { method: 'DELETE' });
    fetchLeaders();
  }

  async function handleToggle(leader: Leader) {
    await fetch(`/api/admin/leadership/${leader.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leader, active: !leader.active }),
    });
    fetchLeaders();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Leadership Team</h1>
          <p className="mt-1 text-sm text-slate-400">{leaders.length} leader{leaders.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setModal({ ...EMPTY })}
          className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]"
        >
          + Add Leader
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading…</div>
      ) : leaders.length === 0 ? (
        <div className="py-16 text-center text-slate-500">No leaders yet. Add your first one!</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => (
            <div key={leader.id} className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-violet-500/30">
                  {leader.imageUrl ? (
                    <Image src={leader.imageUrl} alt={leader.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-sky-500 text-lg font-bold text-white">
                      {leader.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">{leader.name}</p>
                  <p className="text-xs text-slate-400 truncate">{leader.designation}</p>
                  <p className="mt-1 text-xs text-slate-500">Order: {leader.displayOrder}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1">
                {leader.expertise.slice(0, 3).map((e) => (
                  <span key={e} className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] text-violet-300">{e}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleToggle(leader)}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition ${leader.active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-700/50 text-slate-500'}`}
                >
                  {leader.active ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => setModal({ ...leader })}
                  className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-slate-400 transition hover:border-violet-500/50 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(leader.id)}
                  className="ml-auto rounded-xl border border-red-500/20 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <FormModal
          initial={modal}
          onSave={() => { setModal(null); fetchLeaders(); }}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
