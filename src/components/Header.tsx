'use client'
import Image from 'next/image'
import { EMPRESA } from '@/lib/types'

interface Props {
  vista: 'form' | 'preview'
  onNueva: () => void
  onPreview: () => void
  onEditar: () => void
  onExportar: () => void
}

export default function Header({ vista, onNueva, onPreview, onEditar, onExportar }: Props) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Barra de color superior */}
      <div className="h-2 w-full" style={{
        background: 'linear-gradient(90deg, #4a90c4 0%, #4a90c4 20%, #7ab648 20%, #7ab648 100%)'
      }} />

      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Logo + empresa */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-verde-claro flex-shrink-0">
            <Image
              src={EMPRESA.logo}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <div className="font-semibold text-verde-oscuro text-base leading-tight">{EMPRESA.nombre}</div>
            <div className="text-xs text-gray-400">{EMPRESA.firmante} · {EMPRESA.telefono}</div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-2 flex-wrap">
          {vista === 'form' ? (
            <>
              <button onClick={onNueva} className="btn-secondary no-print">
                + Nueva cotización
              </button>
              <button onClick={onPreview} className="btn-primary no-print">
                👁 Vista previa / PDF
              </button>
            </>
          ) : (
            <>
              <button onClick={onEditar} className="btn-secondary no-print">
                ← Editar
              </button>
              <button onClick={onExportar} className="btn-primary no-print">
                ⬇ Exportar PDF
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
