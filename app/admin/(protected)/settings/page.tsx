'use client';

import { useState, useEffect, useCallback } from 'react';

type Setting = { key: string; value: string; label: string; type?: 'text' | 'url' | 'textarea' };

const SETTING_DEFS: Setting[] = [
  { key: 'company_name', label: 'Company Name', value: '' },
  { key: 'tagline', label: 'Tagline', value: '' },
  { key: 'contact_email', label: 'Contact Email', type: 'text', value: '' },
  { key: 'contact_phone', label: 'Contact Phone', value: '' },
  { key: 'contact_address', label: 'Address', type: 'textarea', value: '' },
  { key: 'linkedin_url', label: 'LinkedIn URL', type: 'url', value: '' },
  { key: 'twitter_url', label: 'Twitter / X URL', type: 'url', value: '' },
  { key: 'instagram_url', label: 'Instagram URL', type: 'url', value: '' },
  { key: 'youtube_url', label: 'YouTube URL', type: 'url', value: '' },
  { key: 'footer_text', label: 'Footer Text', type: 'textarea', value: '' },
  { key: 'seo_default_title', label: 'Default SEO Title', value: '' },
  { key: 'seo_default_description', label: 'Default Meta Description', type: 'textarea', value: '' },
  { key: 'hero_badge_text', label: 'Hero Badge Text', value: '' },
  { key: 'hero_heading', label: 'Hero Heading', type: 'textarea', value: '' },
  { key: 'hero_subheading', label: 'Hero Subheading', type: 'textarea', value: '' },
];

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/settings');
    const data = await res.json() as Record<string, string>;
    setSettings(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return <div className="py-16 text-center text-slate-500">Loading…</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Website Settings</h1>
        <p className="mt-1 text-sm text-slate-400">Configure global website content and settings.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {[
          { section: 'Company', keys: ['company_name', 'tagline'] },
          { section: 'Contact', keys: ['contact_email', 'contact_phone', 'contact_address'] },
          { section: 'Social Links', keys: ['linkedin_url', 'twitter_url', 'instagram_url', 'youtube_url'] },
          { section: 'SEO Defaults', keys: ['seo_default_title', 'seo_default_description'] },
          { section: 'Homepage Hero', keys: ['hero_badge_text', 'hero_heading', 'hero_subheading'] },
          { section: 'Footer', keys: ['footer_text'] },
        ].map(({ section, keys }) => (
          <div key={section} className="rounded-2xl border border-white/10 bg-slate-950/80 p-6">
            <h2 className="mb-4 text-sm font-semibold text-white">{section}</h2>
            <div className="space-y-4">
              {keys.map((key) => {
                const def = SETTING_DEFS.find((d) => d.key === key);
                if (!def) return null;
                return (
                  <div key={key}>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">{def.label}</label>
                    {def.type === 'textarea' ? (
                      <textarea
                        value={settings[key] ?? ''}
                        onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                        rows={3}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 resize-none"
                      />
                    ) : (
                      <input
                        type={def.type ?? 'text'}
                        value={settings[key] ?? ''}
                        onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
          {saved && <span className="text-sm text-emerald-400">✓ Settings saved!</span>}
        </div>
      </form>
    </div>
  );
}
