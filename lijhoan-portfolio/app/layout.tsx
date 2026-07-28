import './globals.css';
import type { ReactNode } from 'react';
import { Space_Mono, Doto } from 'next/font/google';
import Providers from './providers';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const doto = Doto({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-doto',
  display: 'swap',
});

export default function RootLayout({
  children,
}: { children: ReactNode }) {
  return (
    <html lang="es" className={`${spaceMono.variable} ${doto.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
