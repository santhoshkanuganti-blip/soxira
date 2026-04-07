import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-10 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 text-xl font-semibold text-white">{siteConfig.name}</div>
          <p className="max-w-md text-sm text-slate-400">Delivering trusted AI, cloud, data, and product development services for enterprises and distributor networks.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">Contact</div>
            <p className="mt-2 text-sm">{siteConfig.contact.email}</p>
            <p className="text-sm">{siteConfig.contact.phone}</p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">Location</div>
            <p className="mt-2 text-sm">{siteConfig.contact.address}</p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-slate-500">Links</div>
            <div className="mt-2 flex flex-col gap-2 text-sm text-slate-300">
              <Link href="/contact" className="hover:text-white">Contact</Link>
              <Link href="/product-development-company" className="hover:text-white">Product Dev</Link>
              <a href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</div>
    </footer>
  );
}
