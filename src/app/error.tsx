"use client";
import { useEffect } from "react";

// Next.js muestra automaticamente este componente cuando algo explota
// (un error de JavaScript) en cualquier pagina de esta seccion.
// "error" trae el error que paso, y "reset" es una funcion que Next nos da
// para volver a intentar renderizar la pagina sin recargar todo.
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // Cada vez que cambie el error, lo mandamos a la consola para poder debuggear
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-20">
      <h2 className="text-xl font-semibold text-white mb-2">Algo salio mal</h2>
      <p className="text-slate-400 mb-6">
        Ocurrio un error inesperado al cargar esta seccion.
      </p>
      {/* Al hacer click, reset() intenta renderizar la pagina de nuevo */}
      <button
        onClick={reset}
        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
