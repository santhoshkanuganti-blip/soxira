import type { Metadata } from "next";

import { Space_Grotesk, Orbitron, Inter, Poppins } from 'next/font/google';
import "./globals.css";

const headingFont = Space_Grotesk({ subsets: ['latin'], weight: ['400','500','700'], variable: '--font-heading' });
const orbitronFont = Orbitron({ subsets: ['latin'], weight: ['400','700'], variable: '--font-orbitron' });
const bodyFont = Inter({ subsets: ['latin'], weight: ['400','500','700'], variable: '--font-body' });
const poppinsFont = Poppins({ subsets: ['latin'], weight: ['400','500','700'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'Soxira AI Solutions',
  description: 'Engineering Intelligent Futures with AI Excellence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${orbitronFont.variable} ${bodyFont.variable} ${poppinsFont.variable} h-full antialiased`}>
      <body className="font-body min-h-screen flex flex-col relative" style={{ color: 'var(--foreground)' }}>
        <div className="bubble-bg" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <circle cx="200" cy="200" r="120" fill="#E5E4E2" fillOpacity="0.25" />
            <circle cx="1200" cy="300" r="180" fill="#C0C0C0" fillOpacity="0.18" />
            <circle cx="800" cy="700" r="140" fill="#E5E4E2" fillOpacity="0.13" />
            <circle cx="400" cy="800" r="90" fill="#C0C0C0" fillOpacity="0.10" />
            <circle cx="1300" cy="800" r="70" fill="#E5E4E2" fillOpacity="0.10" />
          </svg>
        </div>
        {children}
      </body>
    </html>
  );
}
