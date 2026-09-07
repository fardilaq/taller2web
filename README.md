# CRUD de Series - Taller 2

Aplicación web para llevar una lista de series de televisión. Permite
agregarlas, buscarlas, editarlas, eliminarlas y marcarlas como favoritas.
Los datos se guardan en el navegador y no se pierden al recargar.

## Tecnologías

- Next.js 16 con App Router
- TypeScript
- React (hooks y Context API)
- Tailwind CSS
- localStorage

## Cómo ejecutarlo

Necesitas Node.js 18.18 o superior.

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## Funcionalidades

- Lista de series
- Búsqueda por nombre en tiempo real
- Crear series con formulario validado
- Página de detalle de cada serie
- Editar y eliminar (con confirmación)
- Marcar favoritas
- Todo persiste al recargar
- Diseño responsive

## Estructura
src/
├── app/ Páginas y rutas
├── components/ Componentes de la interfaz
├── context/ Estado global
├── hooks/ useLocalStorage
└── types/ Tipos de TypeScript

## Decisiones

**Context para el estado.** Varios componentes en rutas distintas
necesitan las series, así que en vez de pasarlas por props se comparten
desde dos contexts: uno de series y otro de favoritos.

**Un hook para guardar.** `useLocalStorage` lee los datos al abrir y los
guarda cuando cambian. Las funciones del CRUD solo modifican el estado.

**"use client" solo donde hace falta.** Los componentes que muestran
datos se quedan en el servidor. Solo los que usan estado o clics son de
cliente.

**Un formulario para crear y editar.** Si `SerieForm` recibe una serie,
edita. Si no recibe nada, crea.

**Skeleton mientras carga.** Como los datos vienen del navegador, se
muestra un skeleton en el primer render para evitar errores de
hidratación.

## Autor

Felipe Ardila — ISIS3710 Programación con Tecnologías Web