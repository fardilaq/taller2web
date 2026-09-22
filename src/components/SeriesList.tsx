"use client";
import { useState, useEffect } from "react";
import { useSeries } from "@/context/SeriesContext";
import SeriesCard from "./SeriesCard";
import SearchBar from "./SearchBar";

// Muestra la grilla de tarjetas de series, con buscador incluido.
// Este componente es el que usa la pagina /series.
export default function SeriesList() {
  const { series } = useSeries(); // trae TODAS las series guardadas
  const [busqueda, setBusqueda] = useState(""); // texto actual del buscador
  const [montado, setMontado] = useState(false);

  // Igual que en las paginas de detalle/editar: esperamos a estar en el navegador
  // antes de leer localStorage, para que el HTML del servidor y del cliente coincidan
  useEffect(() => {
    setMontado(true);
  }, []);

  // Filtra las series cuyo titulo contenga el texto buscado (sin importar mayus/minus)
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
      {/* Cuando el usuario escribe, SearchBar nos avisa y actualizamos "busqueda" */}
      <SearchBar onSearch={setBusqueda} />

      {series.length === 0 ? (
        // Caso 1: no hay NINGUNA serie cargada todavia
        <p className="text-slate-400">No hay series registradas todavia.</p>
      ) : filtradas.length === 0 ? (
        // Caso 2: hay series, pero ninguna coincide con la busqueda
        <p className="text-slate-400">No se encontraron series con ese nombre.</p>
      ) : (
        // Caso 3: mostramos una tarjeta por cada serie filtrada
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((serie) => (
            <SeriesCard key={serie.id} serie={serie} />
          ))}
        </div>
      )}
    </div>
  );
}
