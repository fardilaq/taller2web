// Next.js muestra esto automaticamente MIENTRAS la pagina real todavia esta
// cargando (por ejemplo, mientras se resuelve una carga asincronica).
// Son solo cajas grises animadas ("skeletons") para que no se vea la pantalla en blanco.
export default function Loading() {
  return (
    <div className="space-y-4">
      {/* Skeleton del titulo */}
      <div className="h-10 w-48 bg-slate-800 rounded-lg animate-pulse" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Skeleton de 3 tarjetas, mientras llegan las series de verdad */}
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-40 bg-slate-800 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
