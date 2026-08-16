import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface pt-10 text-ink-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 font-display text-xl font-semibold text-ink">{siteConfig.name}</div>
          <p className="max-w-md text-sm text-ink-muted">Delivering trusted AI, cloud, data, and product development services for enterprises and distributor networks.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-line-strong">Contact</div>
            <p className="mt-2 text-sm">{siteConfig.contact.email}</p>
            <p className="text-sm">{siteConfig.contact.phone}</p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-line-strong">Location</div>
            <p className="mt-2 text-sm">{siteConfig.contact.address}</p>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-line-strong">Links</div>
            <div className="mt-2 flex flex-col gap-2 text-sm">
              <Link href="/contact" className="hover:text-ink">Contact</Link>
              <Link href="/product-development-company" className="hover:text-ink">Product Dev</Link>
              <a href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-xs text-ink-muted">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</div>
    </footer>
  );
}
