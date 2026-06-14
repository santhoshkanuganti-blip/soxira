'use client';

import { useState, useEffect, useCallback } from 'react';

type User = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  active: boolean;
  createdAt: string;
};

const ROLES = ['SUPER_ADMIN', 'EDITOR', 'MARKETING'];

const ROLE_DESC: Record<string, string> = {
  SUPER_ADMIN: 'Full access to all modules',
  EDITOR: 'Blogs, Promotions, Case Studies, Testimonials',
  MARKETING: 'Promotions, Media, Blogs',
};

const EMPTY: Omit<User, 'id' | 'createdAt'> & { password: string } = {
  email: '', name: '', role: 'EDITOR', active: true, password: '',
};

function FormModal({ initial, onSave, onClose }: {
  initial: (Omit<User,'id'|'createdAt'> & { password: string; id?: string });
  onSave: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.id && form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setSaving(true);
    setError('');
    try {
      const payload: Record<string, unknown> = { email: form.email, name: form.name, role: form.role, active: form.active };
      if (form.password) payload.password = form.password;
      const res = await fetch(form.id ? `/api/admin/users/${form.id}` : '/api/admin/users', {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#0B0B1A] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 hover:text-white">✕</button>
        <h2 className="mb-6 text-lg font-semibold text-white">{form.id ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Full Name</label>
              <input value={form.name ?? ''} onChange={(e) => set('name', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Email *</label>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">{form.id ? 'New Password (leave blank to keep)' : 'Password *'}</label>
            <input type="password" value={form.password} onChange={(e) => set('password', e.target.value)} required={!form.id} minLength={form.id ? 0 : 8} placeholder="Min 8 characters" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Role</label>
            <select value={form.role} onChange={(e) => set('role', e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none">
              {ROLES.map((r) => <option key={r} value={r}>{r} — {ROLE_DESC[r]}</option>)}
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} className="h-4 w-4 rounded accent-violet-500" />
            <span className="text-sm text-slate-300">Active</span>
          </label>
          {error && <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? 'Saving…' : 'Save User'}
            </button>
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-6 py-2.5 text-sm text-slate-400 hover:text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<((Omit<User,'id'|'createdAt'> & { password: string; id?: string })) | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    setUsers(await res.json() as User[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this user?')) return;
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    fetchData();
  }

  const ROLE_COLORS: Record<string, string> = {
    SUPER_ADMIN: 'bg-violet-500/20 text-violet-300',
    EDITOR: 'bg-sky-500/20 text-sky-300',
    MARKETING: 'bg-fuchsia-500/20 text-fuchsia-300',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Users & Roles</h1>
          <p className="mt-1 text-sm text-slate-400">{users.length} user{users.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setModal({ ...EMPTY })} className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
          + Add User
        </button>
      </div>

      {/* Role Legend */}
      <div className="grid gap-3 sm:grid-cols-3">
        {ROLES.map((role) => (
          <div key={role} className="rounded-xl border border-white/10 bg-slate-950/80 p-4">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_COLORS[role]}`}>{role}</span>
            <p className="mt-2 text-xs text-slate-500">{ROLE_DESC[role]}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading…</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                {['User', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/60">
              {users.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-slate-500">No users yet.</td></tr>
              ) : users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-sky-500 text-xs font-bold text-white">
                        {(user.name ?? user.email).charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-white">{user.name ?? '—'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{user.email}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${ROLE_COLORS[user.role] ?? 'bg-white/10 text-slate-300'}`}>{user.role}</span></td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-[10px] ${user.active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-700/50 text-slate-500'}`}>{user.active ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(user.createdAt))}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setModal({ ...user, password: '' })} className="rounded-lg border border-white/10 px-3 py-1 text-xs text-slate-400 hover:border-violet-500/50 hover:text-white">Edit</button>
                      <button onClick={() => handleDelete(user.id)} className="rounded-lg border border-red-500/20 px-3 py-1 text-xs text-red-400 hover:bg-red-500/10">Delete</button>
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
