'use client'
import { useState, useCallback } from 'react'
import Header from '@/components/Header'
import FormularioCotizacion from '@/components/FormularioCotizacion'
import VistaPreviaCotizacion from '@/components/VistaPreviaCotizacion'
import { Cotizacion, nuevaCotizacion } from '@/lib/types'

type Vista = 'form' | 'preview'

export default function Home() {
  const [vista, setVista] = useState<Vista>('form')
  const [cot, setCot] = useState<Cotizacion>(nuevaCotizacion)

  const handleNueva = useCallback(() => {
    if (confirm('¿Crear una nueva cotización? Se perderán los datos actuales no guardados.')) {
      setCot(nuevaCotizacion())
      setVista('form')
    }
  }, [])

  const handlePreview = () => {
    if (!cot.cliente.empresa) {
      alert('Por favor ingresa el nombre del cliente antes de continuar.')
      return
    }
    if (cot.conceptos.every(c => c.subtotal === 0)) {
      alert('Agrega al menos un concepto con monto mayor a cero.')
      return
    }
    setVista('preview')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleExportar = () => {
    window.print()
  }

  return (
    <>
      {/* Print styles globales */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          header { display: none !important; }
          #cotizacion-pdf {
            box-shadow: none !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <Header
          vista={vista}
          onNueva={handleNueva}
          onPreview={handlePreview}
          onEditar={() => setVista('form')}
          onExportar={handleExportar}
        />

        {vista === 'form' ? (
          <FormularioCotizacion cot={cot} onChange={setCot} />
        ) : (
          <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Barra de acciones en preview - no imprime */}
            <div className="no-print flex items-center justify-between mb-6 bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-3 flex-wrap gap-3">
              <div>
                <div className="font-semibold text-gray-700">Vista previa de cotización</div>
                <div className="text-xs text-gray-400">
                  Al exportar, selecciona &quot;Guardar como PDF&quot; en el diálogo de impresión
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setVista('form')} className="btn-secondary">← Editar</button>
                <button onClick={handleExportar} className="btn-primary">⬇ Exportar PDF</button>
              </div>
            </div>
            <VistaPreviaCotizacion cot={cot} />
          </div>
        )}
      </div>
    </>
  )
}
