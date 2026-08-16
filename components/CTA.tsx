import Link from 'next/link';

export default function CTA() {
  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-[#0E1747] p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Ready to accelerate growth?</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-white">Book your free consultation with an experienced AI and cloud team.</h2>
          <p className="mt-4 max-w-2xl leading-8 text-white/75">
            Trusted by leaders across India and tier-2 enterprises to deliver secure products, cloud migration, and modern data platforms.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-accent shadow-lg transition hover:bg-white/90"
        >
          Get Free Consultation
        </Link>
      </div>
    </section>
  );
}
