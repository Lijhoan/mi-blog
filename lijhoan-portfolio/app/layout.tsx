import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({
  children,
}: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}