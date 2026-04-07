import type { Metadata } from 'next';
import { Inter, Orbitron, Poppins, Space_Grotesk } from 'next/font/google';
import ChatBot from '@/components/ChatBot';
import './globals.css';

const headingFont = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-heading' });
const orbitronFont = Orbitron({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-orbitron' });
const bodyFont = Inter({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-body' });
const poppinsFont = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'Soxira AI Solutions',
  description: 'AI, Cloud, Data Engineering and Product Development services for enterprises and distributors.',
  metadataBase: new URL('https://soxira.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${orbitronFont.variable} ${bodyFont.variable} ${poppinsFont.variable} h-full antialiased`}>
      <body className="font-body min-h-screen bg-[#0B0B1A] text-slate-100 overflow-x-hidden">
        <div className="bubble-bg" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full">
            <circle cx="200" cy="200" r="120" fill="#7C3AED" fillOpacity="0.18" />
            <circle cx="1170" cy="300" r="180" fill="#0EA5E9" fillOpacity="0.16" />
            <circle cx="800" cy="700" r="140" fill="#A855F7" fillOpacity="0.1" />
            <circle cx="400" cy="800" r="90" fill="#38BDF8" fillOpacity="0.08" />
            <circle cx="1300" cy="800" r="70" fill="#9333EA" fillOpacity="0.1" />
          </svg>
        </div>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
