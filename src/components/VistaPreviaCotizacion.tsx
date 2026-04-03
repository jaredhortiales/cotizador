'use client'
import Image from 'next/image'
import { Cotizacion, EMPRESA, IVA_PCT, ISR_PCT, fmtMoneda, calcTotales, formatearFecha } from '@/lib/types'

interface Props {
  cot: Cotizacion
}

export default function VistaPreviaCotizacion({ cot }: Props) {
  const { subtotal, iva, isr, total } = calcTotales(cot.conceptos)

  return (
    <div
      id="cotizacion-pdf"
      className="bg-white shadow-lg mx-auto"
      style={{ maxWidth: '900px', fontFamily: "'Outfit', Arial, sans-serif" }}
    >
      {/* Barra superior */}
      <div className="h-3 w-full" style={{
        background: 'linear-gradient(90deg, #4a90c4 0%, #4a90c4 22%, #7ab648 22%, #7ab648 100%)'
      }} />

      <div className="px-10 py-8">

        {/* ENCABEZADO */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-verde-claro">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-verde-claro flex-shrink-0">
              <Image src={EMPRESA.logo} alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <div className="text-xl font-bold text-verde-oscuro">{EMPRESA.nombre}</div>
              <div className="text-xs text-gray-500 mt-1">{EMPRESA.firmante}</div>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500 leading-relaxed">
            <div className="text-sm font-semibold text-verde-oscuro mb-1">{EMPRESA.nombre}</div>
            <div>☎ {EMPRESA.telefono}</div>
            <div>✉ {EMPRESA.email}</div>
            <div>⊕ {EMPRESA.web}</div>
            <div>{EMPRESA.direccion}</div>
          </div>
        </div>

        {/* TÍTULO Y META */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-verde-oscuro tracking-tight">COTIZACIÓN</h1>
            <p className="text-gray-400 text-sm mt-1">Documento formal de presupuesto</p>
          </div>
          <div className="text-right space-y-1">
            <div className="bg-verde-suave border border-verde-claro rounded-lg px-4 py-2 text-sm">
              <span className="text-gray-400 text-xs block">No. de cotización</span>
              <span className="font-bold text-verde-oscuro">{cot.numero}</span>
            </div>
            <div className="text-xs text-gray-400">
              Emisión: <span className="text-gray-600 font-medium">{formatearFecha(cot.fecha)}</span>
            </div>
            <div className="text-xs text-gray-400">
              Válida hasta: <span className="text-gray-600 font-medium">{formatearFecha(cot.validez)}</span>
            </div>
            <div className="text-xs text-gray-400">
              Moneda: <span className="text-gray-600 font-medium">{cot.moneda}</span>
            </div>
          </div>
        </div>

        {/* DESTINATARIO */}
        <div className="bg-verde-suave border-l-4 border-verde-claro rounded-r-lg px-5 py-4 mb-8">
          <div className="text-xs font-semibold text-verde-oscuro uppercase tracking-wider mb-2">Destinatario</div>
          <div className="font-bold text-gray-800 text-base">{cot.cliente.empresa || '—'}</div>
          {cot.cliente.contacto && (
            <div className="text-sm text-gray-600 mt-0.5">
              {cot.cliente.contacto}
              {cot.cliente.cargo && <span className="text-gray-400"> — {cot.cliente.cargo}</span>}
            </div>
          )}
          <div className="flex gap-4 mt-1 text-xs text-gray-500 flex-wrap">
            {cot.cliente.email && <span>✉ {cot.cliente.email}</span>}
            {cot.cliente.telefono && <span>☎ {cot.cliente.telefono}</span>}
            {cot.cliente.direccion && <span>⊙ {cot.cliente.direccion}</span>}
          </div>
        </div>

        {/* TABLA DE CONCEPTOS */}
        <div className="mb-2 text-xs font-semibold text-verde-oscuro uppercase tracking-wider">
          Detalle de servicios
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-100 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#4a7c3f' }}>
                <th className="text-left px-4 py-3 text-white font-semibold text-xs" style={{ width: '46%' }}>Concepto</th>
                <th className="text-right px-4 py-3 text-white font-semibold text-xs" style={{ width: '15%' }}>Subtotal</th>
                <th className="text-right px-4 py-3 text-white font-semibold text-xs" style={{ width: '13%' }}>+IVA {IVA_PCT}%</th>
                <th className="text-right px-4 py-3 text-white font-semibold text-xs" style={{ width: '13%' }}>-Ret ISR {ISR_PCT}%</th>
                <th className="text-right px-4 py-3 text-white font-semibold text-xs" style={{ width: '13%' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cot.conceptos.filter(c => c.subtotal > 0 || c.descripcion).map((c, i) => {
                const civa = c.subtotal * IVA_PCT / 100
                const cisr = c.subtotal * ISR_PCT / 100
                const ctot = c.subtotal + civa - cisr
                return (
                  <tr key={c.id} style={{ background: i % 2 === 1 ? '#f0f7ec' : 'white' }}>
                    <td className="px-4 py-3 text-gray-700 text-xs leading-relaxed">{c.descripcion || '—'}</td>
                    <td className="px-4 py-3 text-right text-xs text-gray-600">{fmtMoneda(c.subtotal, cot.moneda)}</td>
                    <td className="px-4 py-3 text-right text-xs font-medium" style={{ color: '#4a7c3f' }}>{fmtMoneda(civa, cot.moneda)}</td>
                    <td className="px-4 py-3 text-right text-xs font-medium text-red-500">{fmtMoneda(cisr, cot.moneda)}</td>
                    <td className="px-4 py-3 text-right text-xs font-bold text-gray-800">{fmtMoneda(ctot, cot.moneda)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* TOTALES */}
        <div className="flex justify-end mb-8">
          <div className="w-72 space-y-1.5">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal:</span>
              <span className="font-medium text-gray-700">{fmtMoneda(subtotal, cot.moneda)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>I.V.A {IVA_PCT}%:</span>
              <span className="font-medium" style={{ color: '#4a7c3f' }}>{fmtMoneda(iva, cot.moneda)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Ret. ISR {ISR_PCT}%:</span>
              <span className="font-medium text-red-500">-{fmtMoneda(isr, cot.moneda)}</span>
            </div>
            <div
              className="flex justify-between text-base font-bold border-t-2 pt-2 mt-1"
              style={{ borderColor: '#7ab648', color: '#4a7c3f' }}
            >
              <span>TOTAL:</span>
              <span>{fmtMoneda(total, cot.moneda)}</span>
            </div>
          </div>
        </div>

        {/* NOTAS */}
        {cot.notas && (
          <div className="bg-verde-suave border-l-4 border-verde-claro rounded-r-lg px-5 py-4 mb-8">
            <div className="text-xs font-semibold text-verde-oscuro uppercase tracking-wider mb-2">Notas y condiciones</div>
            <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{cot.notas}</div>
          </div>
        )}

        {/* FIRMA */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-6">
            Agradezco su atención, quedo a sus órdenes para cualquier aclaración.
          </p>
          <div className="mt-8">
            <div className="border-t border-gray-300 w-48 mb-1" />
            <div className="text-sm font-bold text-gray-700">{EMPRESA.firmante}</div>
            <div className="text-xs text-gray-400">{EMPRESA.nombre}</div>
            <div className="text-xs text-gray-400">{EMPRESA.telefono}</div>
          </div>
        </div>

      </div>

      {/* Barra inferior */}
      <div className="h-3 w-full mt-4" style={{ background: '#7ab648' }} />
    </div>
  )
}
