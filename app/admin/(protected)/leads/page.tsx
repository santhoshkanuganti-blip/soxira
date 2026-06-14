'use client';

import { useState, useEffect, useCallback } from 'react';

type Lead = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  industry: string | null;
  message: string | null;
  contacted: boolean;
  createdAt: string;
};

function formatDate(s: string) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(s));
}

function downloadCsv(leads: Lead[]) {
  const headers = ['Name', 'Company', 'Email', 'Phone', 'Industry', 'Message', 'Contacted', 'Date'];
  const rows = leads.map((l) => [
    l.name, l.company ?? '', l.email, l.phone ?? '', l.industry ?? '',
    (l.message ?? '').replace(/,/g, ';').replace(/\n/g, ' '),
    l.contacted ? 'Yes' : 'No',
    formatDate(l.createdAt),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'soxira-leads.csv'; a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filtered, setFiltered] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterContacted, setFilterContacted] = useState<'all' | 'yes' | 'no'>('all');
  const [selected, setSelected] = useState<Lead | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/leads');
    const data = await res.json() as Lead[];
    setLeads(data);
    setFiltered(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    let result = leads;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.company ?? '').toLowerCase().includes(q));
    }
    if (filterContacted !== 'all') result = result.filter((l) => l.contacted === (filterContacted === 'yes'));
    setFiltered(result);
  }, [search, filterContacted, leads]);

  async function handleToggleContacted(lead: Lead) {
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contacted: !lead.contacted }),
    });
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this lead?')) return;
    await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
    fetchData();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Contact Leads</h1>
          <p className="mt-1 text-sm text-slate-400">{leads.length} total lead{leads.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => downloadCsv(filtered)} className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5">
          ↓ Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, company…"
          className="w-64 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30"
        />
        <div className="flex gap-2">
          {(['all', 'no', 'yes'] as const).map((f) => (
            <button key={f} onClick={() => setFilterContacted(f)} className={`rounded-xl px-4 py-2 text-xs font-medium transition ${filterContacted === f ? 'bg-violet-500 text-white' : 'border border-white/10 text-slate-400 hover:text-white'}`}>
              {f === 'all' ? 'All' : f === 'no' ? 'Pending' : 'Contacted'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading…</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                {['Name', 'Contact', 'Industry', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/60">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-slate-500">No leads found.</td></tr>
              ) : filtered.map((lead) => (
                <tr key={lead.id} className="cursor-pointer hover:bg-white/5" onClick={() => setSelected(lead)}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{lead.name}</p>
                    {lead.company && <p className="text-xs text-slate-500">{lead.company}</p>}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    <p>{lead.email}</p>
                    {lead.phone && <p className="text-slate-500">{lead.phone}</p>}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{lead.industry ?? '—'}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{formatDate(lead.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleContacted(lead); }}
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition ${lead.contacted ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25' : 'bg-yellow-500/15 text-yellow-300 hover:bg-yellow-500/25'}`}
                    >
                      {lead.contacted ? 'Contacted' : 'Pending'}
                    </button>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => handleDelete(lead.id)} className="rounded-lg border border-red-500/20 px-3 py-1 text-xs text-red-400 hover:bg-red-500/10">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#0B0B1A] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 hover:text-white">✕</button>
            <h2 className="mb-4 text-lg font-semibold text-white">Lead Details</h2>
            <dl className="space-y-3">
              {[
                ['Name', selected.name],
                ['Company', selected.company],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Industry', selected.industry],
                ['Date', formatDate(selected.createdAt)],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex gap-4">
                  <dt className="w-24 shrink-0 text-xs text-slate-500">{k}</dt>
                  <dd className="text-sm text-slate-200">{v}</dd>
                </div>
              ))}
              {selected.message && (
                <div>
                  <dt className="mb-1 text-xs text-slate-500">Message</dt>
                  <dd className="rounded-xl bg-white/5 p-3 text-sm text-slate-300">{selected.message}</dd>
                </div>
              )}
            </dl>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => { handleToggleContacted(selected); setSelected(null); }}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${selected.contacted ? 'border border-white/10 text-slate-400 hover:text-white' : 'bg-emerald-500 text-white hover:bg-emerald-400'}`}
              >
                {selected.contacted ? 'Mark as Pending' : 'Mark as Contacted'}
              </button>
              <a href={`mailto:${selected.email}`} className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-400 transition hover:text-white">
                Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
