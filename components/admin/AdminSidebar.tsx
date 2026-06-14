'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: '📊', exact: true },
  { label: 'Leadership', href: '/admin/leadership', icon: '👥' },
  { label: 'Promotions', href: '/admin/promotions', icon: '📢' },
  { label: 'Products', href: '/admin/products', icon: '🤖' },
  { label: 'Blogs', href: '/admin/blogs', icon: '✍️' },
  { label: 'Case Studies', href: '/admin/case-studies', icon: '📋' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: '⭐' },
  { label: 'Media Library', href: '/admin/media', icon: '🖼️' },
  { label: 'Contact Leads', href: '/admin/leads', icon: '📩' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
  { label: 'Users & Roles', href: '/admin/users', icon: '🔑' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  function isActive(item: (typeof NAV_ITEMS)[number]) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  async function handleLogout() {
    setLoggingOut(true);
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-white/10 bg-slate-950/90 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 p-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-[#05050d] ring-1 ring-white/10">
          <Image src={siteConfig.logo} alt="Soxira" fill className="object-contain p-1" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Soxira Admin</p>
          <p className="text-[10px] text-slate-500">Content Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    active
                      ? 'bg-gradient-to-r from-violet-500/20 to-sky-500/10 text-white ring-1 ring-violet-500/30'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-3 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-slate-500 transition hover:text-white"
        >
          <span>🌐</span> View Website
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <span>🚪</span> {loggingOut ? 'Signing out…' : 'Sign Out'}
        </button>
      </div>
    </aside>
  );
}
