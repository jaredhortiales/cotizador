// ─── TIPOS ────────────────────────────────────────────────────────────────────

export interface Concepto {
  id: string
  descripcion: string
  subtotal: number
}

export interface Cotizacion {
  numero: string
  fecha: string
  validez: string
  moneda: 'MXN' | 'USD'
  cliente: {
    empresa: string
    contacto: string
    cargo: string
    email: string
    telefono: string
    direccion: string
  }
  conceptos: Concepto[]
  notas: string
}

// ─── CONSTANTES DE LA EMPRESA ─────────────────────────────────────────────────
// Modifica estos datos para cambiar la información de tu empresa

export const EMPRESA = {
  nombre: 'Asesoría Avanzada',
  firmante: 'Ing. Ismael Rico',
  telefono: '664 301 9407',
  email: 'ismaelrico@asesoriaavanzada.lat',
  web: 'www.asesoriaavanzada.lat',
  direccion: 'Blvd. Gustavo Díaz Ordaz 12415, El Paraiso, 22106 Tijuana, B.C.',
  logo: '/logo.png',
}

export const IVA_PCT = 8       // IVA en porcentaje
export const ISR_PCT = 1.25    // Retención ISR en porcentaje

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function generarId(): string {
  return Math.random().toString(36).slice(2, 9)
}

export function fmtMoneda(n: number, moneda: string = 'MXN'): string {
  if (n === 0) return '$ —'
  const sym = moneda === 'USD' ? 'USD $' : '$'
  return `${sym} ${n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function calcTotales(conceptos: Concepto[]) {
  const subtotal = conceptos.reduce((a, c) => a + c.subtotal, 0)
  const iva = subtotal * IVA_PCT / 100
  const isr = subtotal * ISR_PCT / 100
  const total = subtotal + iva - isr
  return { subtotal, iva, isr, total }
}

export function fechaHoy(): string {
  return new Date().toISOString().split('T')[0]
}

export function fechaMas30(): string {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().split('T')[0]
}

export function formatearFecha(iso: string): string {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  return `${parseInt(d)} de ${meses[parseInt(m) - 1]} de ${y}`
}

export function nuevaCotizacion(): Cotizacion {
  return {
    numero: 'COT-' + new Date().getFullYear() + '-001',
    fecha: fechaHoy(),
    validez: fechaMas30(),
    moneda: 'MXN',
    cliente: {
      empresa: '',
      contacto: '',
      cargo: '',
      email: '',
      telefono: '',
      direccion: '',
    },
    conceptos: [{ id: generarId(), descripcion: '', subtotal: 0 }],
    notas: '• Los cursos se cotizarán separado por cantidad de empleados.\n• Los dictámenes de luz, termográficos, estructural y gas se cotizarán por un perito autorizado.\n• El cliente cubrirá el pago de derechos a la dependencia correspondiente.',
  }
}
