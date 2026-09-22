"use client";
import SerieForm from "@/components/SerieForm";
import { useSeries } from "@/context/SeriesContext";

// Ruta: /series/new -> el "Create" del CRUD.
// No recibe ningun id porque todavia no existe la serie: la estamos creando.
export default function NuevaSeriePage() {
  const { addSerie } = useSeries();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nueva serie</h1>
      {/* Le pasamos el formulario vacio (sin serieInicial) y que dispare addSerie al guardar */}
      <SerieForm onSubmit={addSerie} />
    </div>
  );
}
