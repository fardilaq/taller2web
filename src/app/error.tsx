"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-20">
      <h2 className="text-xl font-semibold text-white mb-2">Algo salio mal</h2>
      <p className="text-slate-400 mb-6">
        Ocurrio un error inesperado al cargar esta seccion.
      </p>
      <button
        onClick={reset}
        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}