'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { siteConfig } from '@/config/site';
import Button from '@/components/Button';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', requirement: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.requirement) {
      setStatus('error');
      return;
    }
    setStatus('loading');

    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.requirement,
        }, PUBLIC_KEY);
        setStatus('success');
        setFormData({ name: '', email: '', requirement: '' });
        return;
      } catch (error) {
        console.error('EmailJS send error', error);
      }
    }

    const mailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      'Consultation Request from ' + formData.name
    )}&body=${encodeURIComponent(formData.requirement + '\n\n' + formData.email)}`;
    window.location.href = mailto;
    setStatus('success');
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          {status === 'loading' ? 'Sending...' : 'Send Request'}
        </Button>
        <p className="text-sm text-slate-400">No database needed. EmailJS / mailto fallback handles lead capture.</p>
      </div>
      {status === 'success' && <p className="rounded-2xl bg-emerald-500/15 p-4 text-sm text-emerald-200">Message sent successfully. We will respond within 24 hours.</p>}
      {status === 'error' && <p className="rounded-2xl bg-rose-500/15 p-4 text-sm text-rose-200">Please fill in all fields before sending.</p>}
    </form>
  );
}
