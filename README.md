# 🧾 Cotizador — Asesoría Avanzada

Sistema profesional de cotizaciones con IVA 8% y Retención ISR 1.25%, exportación a PDF y diseño de marca.

---

## 🚀 Instalación local (para probar en tu computadora)

### Requisitos
- Node.js 18 o superior → descargar en https://nodejs.org
- Una cuenta gratuita en https://vercel.com (para publicar en internet)

### Pasos

```bash
# 1. Descomprime el ZIP y entra a la carpeta
cd cotizador

# 2. Instala dependencias
npm install

# 3. Corre en modo desarrollo
npm run dev
```

Abre http://localhost:3000 en tu navegador. ¡Listo!

---

## 🌐 Publicar en Vercel (gratis, en internet)

### Opción A — Desde la terminal (más rápido)

```bash
# Instala Vercel CLI
npm install -g vercel

# Publica (sigue las instrucciones en pantalla)
vercel

# Para publicar en producción
vercel --prod
```

### Opción B — Desde GitHub (recomendado para actualizaciones)

1. Crea una cuenta gratuita en https://github.com
2. Crea un repositorio nuevo (puede ser privado)
3. Sube el código:
   ```bash
   git init
   git add .
   git commit -m "primer commit"
   git remote add origin https://github.com/TU_USUARIO/cotizador.git
   git push -u origin main
   ```
4. Ve a https://vercel.com → "Import Project" → selecciona tu repositorio
5. Clic en "Deploy" — Vercel lo publica automáticamente en una URL como:
   `https://cotizador-asesoria-avanzada.vercel.app`

---

## ✏️ Personalización

### Cambiar datos de la empresa
Edita el archivo: `src/lib/types.ts`

```ts
export const EMPRESA = {
  nombre: 'Asesoría Avanzada',       // ← Cambia aquí
  firmante: 'Ing. Ismael Rico',       // ← Y aquí
  telefono: '664 301 9407',
  email: 'ismaelrico@asesoriaavanzada.lat',
  web: 'www.asesoriaavanzada.lat',
  direccion: 'Blvd. Gustavo Díaz Ordaz 12415...',
  logo: '/logo.png',
}

export const IVA_PCT = 8       // ← Cambia el IVA aquí
export const ISR_PCT = 1.25    // ← Cambia la retención aquí
```

### Cambiar el logo
Reemplaza el archivo `public/logo.png` con tu nuevo logo.
Recomendado: PNG con fondo transparente, mínimo 200x200px.

---

## 📁 Estructura del proyecto

```
cotizador/
├── public/
│   └── logo.png              ← Tu logo
├── src/
│   ├── app/
│   │   ├── globals.css       ← Estilos globales
│   │   ├── layout.tsx        ← Layout raíz
│   │   └── page.tsx          ← Página principal
│   ├── components/
│   │   ├── Header.tsx        ← Barra superior
│   │   ├── FormularioCotizacion.tsx  ← Formulario
│   │   └── VistaPreviaCotizacion.tsx ← Vista previa/PDF
│   └── lib/
│       └── types.ts          ← Datos empresa, tipos, helpers
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## ❓ Preguntas frecuentes

**¿Costo mensual?**
Cero. Vercel tiene plan gratuito ilimitado para proyectos personales/profesionales de este tamaño.

**¿Guarda las cotizaciones?**
Por ahora vive en la sesión del navegador. Para guardar historial se puede agregar Supabase (base de datos gratuita) en una segunda fase.

**¿Varios usuarios pueden usarlo?**
Sí, la URL de Vercel es pública. Cualquiera con el link puede crear cotizaciones. Si necesitas login/contraseña, se puede agregar autenticación en una segunda fase.

**¿Puedo cambiarle el nombre de dominio?**
Sí, en Vercel puedes conectar tu propio dominio (ej: cotizador.asesoriaavanzada.lat) gratis.
