'use client';

import App from '@/App.jsx';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider.tsx';

export default function ClientPage() {
  return (
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  );
}
