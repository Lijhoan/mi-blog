export const metadata = {
  title: 'Portfolio Backend Spine',
  description: 'Minimal Next.js 15 backend spine for telemetry, BI activation, and flagship content endpoints.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
