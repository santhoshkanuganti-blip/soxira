'use client';

import { useState } from 'react';
import Button from '@/components/Button';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('Please fill in all fields before sending.');
  const [formData, setFormData] = useState({ name: '', email: '', requirement: '', website: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.requirement) {
      setErrorMessage('Please fill in all fields before sending.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setErrorMessage(payload.message || 'Unable to send right now. Please try again in a moment.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', requirement: '', website: '' });
    } catch (error) {
      console.error('Contact form submit error', error);
      setErrorMessage('Unable to send right now. Please try again in a moment.');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Name
          <input
            type="text"
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/20"
            placeholder="Your name"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          Email
          <input
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/20"
            placeholder="Your email"
            required
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm text-slate-200">
        Requirement
        <textarea
          value={formData.requirement}
          onChange={(event) => setFormData((prev) => ({ ...prev, requirement: event.target.value }))}
          className="min-h-[160px] rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-4 text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/20"
          placeholder="Tell us about your project or challenge"
          required
        />
      </label>
      <input
        type="text"
        value={formData.website}
        onChange={(event) => setFormData((prev) => ({ ...prev, website: event.target.value }))}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'loading'}
          className="w-full !rounded-2xl !bg-gradient-to-r !from-violet-600 !to-fuchsia-500 !px-6 !py-3 !font-semibold !text-white hover:!from-violet-500 hover:!to-fuchsia-400 disabled:opacity-70 sm:w-auto"
        >
          {status === 'loading' ? 'Sending...' : 'Send Request'}
        </Button>
      </div>
      {status === 'success' && <p className="rounded-2xl bg-emerald-500/15 p-4 text-sm text-emerald-200">Message sent successfully. We will respond within 24 hours.</p>}
      {status === 'error' && <p className="rounded-2xl bg-rose-500/15 p-4 text-sm text-rose-200">{errorMessage}</p>}
    </form>
  );
}
