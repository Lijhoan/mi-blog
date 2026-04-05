import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider.tsx'
import './index.css'  // <-- Importa index.css, NO App.css

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </React.StrictMode>
)
