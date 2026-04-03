import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cotizador — Asesoría Avanzada',
  description: 'Sistema de cotizaciones profesional',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
