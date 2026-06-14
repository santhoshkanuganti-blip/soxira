import { db } from '@/lib/db';
import Link from 'next/link';

type RecentLead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  industry: string | null;
  createdAt: Date;
};

async function getDashboardStats() {
  try {
    const [leaders, promotions, products, blogs, caseStudies, testimonials, leads] = await Promise.all([
      db.leadership.count({ where: { active: true } }),
      db.promotion.count({ where: { active: true } }),
      db.product.count({ where: { active: true } }),
      db.blog.count({ where: { status: 'published' } }),
      db.caseStudy.count({ where: { active: true } }),
      db.testimonial.count({ where: { active: true } }),
      db.contactLead.count(),
    ]);
    const recentLeads: RecentLead[] = await db.contactLead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });
    return { leaders, promotions, products, blogs, caseStudies, testimonials, leads, recentLeads };
  } catch {
    return { leaders: 0, promotions: 0, products: 0, blogs: 0, caseStudies: 0, testimonials: 0, leads: 0, recentLeads: [] as RecentLead[] };
  }
}

const STAT_CARDS = [
  { key: 'leaders', label: 'Leaders', icon: '👥', href: '/admin/leadership', color: 'from-violet-500/20 to-purple-500/10' },
  { key: 'promotions', label: 'Active Promotions', icon: '📢', href: '/admin/promotions', color: 'from-sky-500/20 to-blue-500/10' },
  { key: 'products', label: 'Products', icon: '🤖', href: '/admin/products', color: 'from-fuchsia-500/20 to-pink-500/10' },
  { key: 'blogs', label: 'Published Blogs', icon: '✍️', href: '/admin/blogs', color: 'from-emerald-500/20 to-teal-500/10' },
  { key: 'caseStudies', label: 'Case Studies', icon: '📋', href: '/admin/case-studies', color: 'from-orange-500/20 to-amber-500/10' },
  { key: 'testimonials', label: 'Testimonials', icon: '⭐', href: '/admin/testimonials', color: 'from-yellow-500/20 to-amber-500/10' },
  { key: 'leads', label: 'Total Leads', icon: '📩', href: '/admin/leads', color: 'from-red-500/20 to-rose-500/10' },
];

const QUICK_LINKS = [
  { label: 'Add Leader', href: '/admin/leadership', icon: '👤' },
  { label: 'Write Blog', href: '/admin/blogs', icon: '✍️' },
  { label: 'New Promotion', href: '/admin/promotions', icon: '📢' },
  { label: 'Add Testimonial', href: '/admin/testimonials', icon: '⭐' },
  { label: 'Upload Media', href: '/admin/media', icon: '🖼️' },
  { label: 'View Leads', href: '/admin/leads', icon: '📩' },
];

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Welcome to the Soxira Content Management Portal.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="group rounded-2xl border border-white/10 bg-slate-950/80 p-5 transition hover:border-violet-500/30 hover:bg-slate-900/80"
          >
            <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${card.color} p-2.5`}>
              <span className="text-xl">{card.icon}</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats[card.key as keyof typeof stats] as number}</p>
            <p className="mt-1 text-xs text-slate-400">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
          <h2 className="mb-4 text-sm font-semibold text-white">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-xs text-slate-300 ring-1 ring-white/10 transition hover:bg-violet-500/20 hover:text-white"
              >
                <span>{l.icon}</span> {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-950/80 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-violet-400 hover:text-violet-300">View all →</Link>
          </div>
          {stats.recentLeads.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-500">No leads yet. They will appear here when visitors submit the contact form.</p>
          ) : (
            <div className="space-y-2">
              {stats.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <div>
                    <p className="text-sm font-medium text-white">{lead.name}</p>
                    <p className="text-xs text-slate-400">{lead.email}{lead.company ? ` · ${lead.company}` : ''}</p>
                  </div>
                  <div className="text-right">
                    {lead.industry && <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] text-violet-300">{lead.industry}</span>}
                    <p className="mt-0.5 text-[10px] text-slate-500">
                      {new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(lead.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
