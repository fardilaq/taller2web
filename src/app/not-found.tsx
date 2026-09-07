import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">

      <h2 className="text-xl font-semibold text-white mb-2">
        Pagina no encontrada
      </h2>
      <p className="text-slate-400 mb-6">
        La ruta que buscas no existe en esta aplicacion.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}