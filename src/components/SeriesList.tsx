"use client";
import { useState, useEffect } from "react";
import { useSeries } from "@/context/SeriesContext";
import SeriesCard from "./SeriesCard";
import SearchBar from "./SearchBar";

export default function SeriesList() {
  const { series } = useSeries();
  const [busqueda, setBusqueda] = useState("");
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  const filtradas = series.filter((s) =>
    s.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (!montado) {
    return (
      <div>
        <div className="h-12 bg-slate-800 rounded-lg mb-6 animate-pulse" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-40 bg-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SearchBar onSearch={setBusqueda} />

      {series.length === 0 ? (
        <p className="text-slate-400">No hay series registradas todavia.</p>
      ) : filtradas.length === 0 ? (
        <p className="text-slate-400">No se encontraron series con ese nombre.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((serie) => (
            <SeriesCard key={serie.id} serie={serie} />
          ))}
        </div>
      )}
    </div>
  );
}