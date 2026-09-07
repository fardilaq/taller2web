"use client";
import SerieForm from "@/components/SerieForm";
import { useSeries } from "@/context/SeriesContext";

export default function NuevaSeriePage() {
  const { addSerie } = useSeries();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nueva serie</h1>
      <SerieForm onSubmit={addSerie} />
    </div>
  );
}