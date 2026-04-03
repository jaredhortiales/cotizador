'use client'
import { Cotizacion, Concepto, generarId, fmtMoneda, calcTotales, IVA_PCT, ISR_PCT } from '@/lib/types'

interface Props {
  cot: Cotizacion
  onChange: (c: Cotizacion) => void
}

export default function FormularioCotizacion({ cot, onChange }: Props) {

  const set = (path: string, value: unknown) => {
    const keys = path.split('.')
    const updated = structuredClone(cot) as Record<string, unknown>
    let obj = updated
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]] as Record<string, unknown>
    }
    obj[keys[keys.length - 1]] = value
    onChange(updated as unknown as Cotizacion)
  }

  const agregarConcepto = () => {
    onChange({
      ...cot,
      conceptos: [...cot.conceptos, { id: generarId(), descripcion: '', subtotal: 0 }]
    })
  }

  const eliminarConcepto = (id: string) => {
    onChange({ ...cot, conceptos: cot.conceptos.filter(c => c.id !== id) })
  }

  const updateConcepto = (id: string, field: keyof Concepto, value: string | number) => {
    onChange({
      ...cot,
      conceptos: cot.conceptos.map(c => c.id === id ? { ...c, [field]: value } : c)
    })
  }

  const { subtotal, iva, isr, total } = calcTotales(cot.conceptos)

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

      {/* CLIENTE */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full bg-verde-claro" />
          <span className="label mb-0">Datos del cliente</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="label">Empresa / Destinatario *</label>
            <input className="input-field" placeholder="Nombre del cliente o empresa"
              value={cot.cliente.empresa} onChange={e => set('cliente.empresa', e.target.value)} />
          </div>
          <div>
            <label className="label">Nombre de contacto</label>
            <input className="input-field" placeholder="Lic. Nombre Apellido"
              value={cot.cliente.contacto} onChange={e => set('cliente.contacto', e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="label">Cargo</label>
            <input className="input-field" placeholder="Gerente de operaciones"
              value={cot.cliente.cargo} onChange={e => set('cliente.cargo', e.target.value)} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input-field" type="email" placeholder="correo@empresa.com"
              value={cot.cliente.email} onChange={e => set('cliente.email', e.target.value)} />
          </div>
          <div>
            <label className="label">Teléfono</label>
            <input className="input-field" placeholder="664 000 0000"
              value={cot.cliente.telefono} onChange={e => set('cliente.telefono', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="label">Dirección del cliente (opcional)</label>
          <input className="input-field" placeholder="Calle, Colonia, Ciudad"
            value={cot.cliente.direccion} onChange={e => set('cliente.direccion', e.target.value)} />
        </div>
      </div>

      {/* META */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full bg-verde-claro" />
          <span className="label mb-0">Datos de la cotización</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="label">No. Cotización</label>
            <input className="input-field" value={cot.numero}
              onChange={e => set('numero', e.target.value)} />
          </div>
          <div>
            <label className="label">Fecha de emisión</label>
            <input className="input-field" type="date" value={cot.fecha}
              onChange={e => set('fecha', e.target.value)} />
          </div>
          <div>
            <label className="label">Válida hasta</label>
            <input className="input-field" type="date" value={cot.validez}
              onChange={e => set('validez', e.target.value)} />
          </div>
          <div>
            <label className="label">Moneda</label>
            <select className="input-field" value={cot.moneda}
              onChange={e => set('moneda', e.target.value)}>
              <option value="MXN">MXN — Peso Mexicano</option>
              <option value="USD">USD — Dólar Americano</option>
            </select>
          </div>
        </div>
      </div>

      {/* CONCEPTOS */}
      <div className="card">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-verde-claro" />
            <span className="label mb-0">Conceptos / Servicios</span>
          </div>
          <button onClick={agregarConcepto} className="btn-primary text-xs px-3 py-1.5">
            + Agregar concepto
          </button>
        </div>

        {/* Tags de impuestos */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="bg-green-50 text-verde-oscuro text-xs px-3 py-1 rounded-full border border-green-200 font-medium">
            IVA {IVA_PCT}% aplicado automáticamente
          </span>
          <span className="bg-orange-50 text-orange-700 text-xs px-3 py-1 rounded-full border border-orange-200 font-medium">
            Ret. ISR {ISR_PCT}% aplicado automáticamente
          </span>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#4a7c3f' }}>
                <th className="text-left px-3 py-2.5 text-white font-medium text-xs" style={{ width: '48%' }}>Concepto / Descripción</th>
                <th className="text-right px-3 py-2.5 text-white font-medium text-xs" style={{ width: '16%' }}>Subtotal</th>
                <th className="text-right px-3 py-2.5 text-white font-medium text-xs" style={{ width: '13%' }}>+IVA 8%</th>
                <th className="text-right px-3 py-2.5 text-white font-medium text-xs" style={{ width: '13%' }}>-ISR 1.25%</th>
                <th className="text-right px-3 py-2.5 text-white font-medium text-xs" style={{ width: '14%' }}>Total</th>
                <th className="px-2 py-2.5" style={{ width: '40px' }} />
              </tr>
            </thead>
            <tbody>
              {cot.conceptos.map((c, i) => {
                const civa = c.subtotal * IVA_PCT / 100
                const cisr = c.subtotal * ISR_PCT / 100
                const ctot = c.subtotal + civa - cisr
                return (
                  <tr key={c.id} className={i % 2 === 1 ? 'bg-verde-suave' : 'bg-white'}>
                    <td className="px-3 py-2">
                      <input
                        className="w-full bg-transparent border-0 focus:outline-none focus:bg-white focus:border focus:border-verde-claro rounded px-1 text-sm"
                        placeholder="Descripción del servicio o producto..."
                        value={c.descripcion}
                        onChange={e => updateConcepto(c.id, 'descripcion', e.target.value)}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        min="0"
                        step="100"
                        className="w-full bg-transparent border-0 focus:outline-none focus:bg-white focus:border focus:border-verde-claro rounded px-1 text-sm text-right"
                        value={c.subtotal || ''}
                        placeholder="0"
                        onChange={e => updateConcepto(c.id, 'subtotal', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="px-3 py-2 text-right text-xs text-verde-oscuro font-medium">
                      {fmtMoneda(civa, cot.moneda)}
                    </td>
                    <td className="px-3 py-2 text-right text-xs text-red-500 font-medium">
                      {fmtMoneda(cisr, cot.moneda)}
                    </td>
                    <td className="px-3 py-2 text-right text-sm font-semibold text-verde-oscuro">
                      {fmtMoneda(ctot, cot.moneda)}
                    </td>
                    <td className="px-2 py-2 text-center">
                      {cot.conceptos.length > 1 && (
                        <button onClick={() => eliminarConcepto(c.id)} className="btn-danger">✕</button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* TOTALES */}
        <div className="mt-5 flex justify-end">
          <div className="w-full max-w-xs space-y-1.5">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal:</span>
              <span className="font-medium text-gray-700">{fmtMoneda(subtotal, cot.moneda)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>IVA {IVA_PCT}%:</span>
              <span className="font-medium text-verde-oscuro">{fmtMoneda(iva, cot.moneda)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Ret. ISR {ISR_PCT}%:</span>
              <span className="font-medium text-red-500">-{fmtMoneda(isr, cot.moneda)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-verde-oscuro border-t-2 border-verde-claro pt-2 mt-2">
              <span>TOTAL:</span>
              <span>{fmtMoneda(total, cot.moneda)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* NOTAS */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full bg-verde-claro" />
          <span className="label mb-0">Notas y condiciones</span>
        </div>
        <textarea
          className="input-field min-h-[100px]"
          placeholder="Condiciones de pago, tiempos de entrega, garantías..."
          value={cot.notas}
          onChange={e => set('notas', e.target.value)}
        />
      </div>

    </div>
  )
}
