import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import CTA from '@/components/CTA';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contact | Soxira AI Solutions',
  description:
    'Contact Soxira AI Solutions for AI, cloud migration, data engineering, and distributor management software in India.',
  keywords: ['contact', 'AI consulting India', 'cloud migration contact', 'snowflake dbt contact', 'distributor software contact'],
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPoint',
  telephone: siteConfig.contact.phone,
  contactType: 'customer support',
  email: siteConfig.contact.email,
  areaServed: 'IN',
  availableLanguage: ['English', 'Hindi'],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0B0B1A] text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-slate-900/70 px-4 py-2 text-sm uppercase tracking-[0.3em] text-sky-300/90">Contact</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Talk to India&apos;s AI, cloud and data experts</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Submit your project requirements and our team will reach out with a tailored consultation plan.
            </p>
            <div className="mt-10 space-y-4 rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Email</p>
                <p className="mt-2 text-slate-200">{siteConfig.contact.email}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Phone</p>
                <p className="mt-2 text-slate-200">{siteConfig.contact.phone}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Headquarters</p>
                <p className="mt-2 text-slate-200">{siteConfig.contact.address}</p>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
