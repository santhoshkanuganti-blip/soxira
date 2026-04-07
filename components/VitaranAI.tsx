'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VitaranAI() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_25%)] pointer-events-none" />
      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-100/80 backdrop-blur">VitaranAI</span>
          <h2 className="mt-6 text-3xl md:text-4xl font-semibold text-white">Distributor management software for intelligent trade operations</h2>
          <p className="mt-4 max-w-2xl text-slate-200/90 leading-8">
            VitaranAI delivers automated order management, inventory forecasting, and distributor performance analytics for India’s distribution networks. Built for SMEs, D2C brands, and enterprise distributors looking to scale with AI.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="https://VitaranAI.in" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              Explore VitaranAI
            </a>
            <Link href="/contact" className="inline-flex items-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm text-white transition hover:border-white/40">
              Request Demo
            </Link>
          </div>
        </div>
        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/10 p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.16))]" />
          <div className="relative space-y-4">
            <div className="rounded-3xl bg-slate-950/75 p-6 backdrop-blur-sm">
              <p className="text-sm text-slate-300 uppercase tracking-[0.25em]">Insights</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Real-time distributor scorecards</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Inventory', 'Orders', 'Payments', 'Routes'].map((item) => (
                <div key={item} className="rounded-3xl bg-slate-900/80 px-5 py-4 text-white/90 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item}</p>
                  <p className="mt-3 text-3xl font-semibold">{item === 'Orders' ? '1.2K' : item === 'Inventory' ? '96%' : item === 'Payments' ? '96%' : '28%'}%</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
