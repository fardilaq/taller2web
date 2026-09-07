"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useSeries } from "@/context/SeriesContext";
import SerieForm from "@/components/SerieForm";

export default function EditarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getSerie, updateSerie } = useSeries();

  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  const serie = getSerie(Number(id));

  if (!montado) {
    return <div className="h-96 bg-slate-800 rounded-2xl animate-pulse" />;
  }

  if (!serie) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-white mb-2">
          Esta serie no existe
        </h2>
        <p className="text-slate-400 mb-6">
          No se puede editar una serie que no esta registrada.
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

  return (
    <div>
      <Link
        href={`/series/${serie.id}`}
        className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
      >
        ← Volver al detalle
      </Link>

      <h1 className="text-2xl font-bold text-white mb-6">Editar serie</h1>

      <SerieForm
        serieInicial={serie}
        onSubmit={(datos) => updateSerie(serie.id, datos)}
      />
    </div>
  );
}