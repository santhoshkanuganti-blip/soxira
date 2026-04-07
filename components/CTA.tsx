import Link from 'next/link';

export default function CTA() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-violet-900/70 via-slate-950/70 to-sky-950/90 p-10 shadow-[0_40px_100px_rgba(15,23,42,0.25)]">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300/80">Ready to accelerate growth?</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white">Book your free consultation with an experienced AI and cloud team.</h2>
          <p className="mt-4 max-w-2xl text-slate-300/85 leading-8">
            Trusted by leaders across India and tier-2 enterprises to deliver secure products, cloud migration, and modern data platforms.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100"
        >
          Get Free Consultation
        </Link>
      </div>
    </section>
  );
}
