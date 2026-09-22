"use client";
import { createContext, useContext, ReactNode } from "react";
import { Serie, SerieFormData } from "@/types/serie";
import useLocalStorage from "@/hooks/useLocalStorage";

// Forma de la "caja magica": que datos y funciones va a compartir con toda la app
interface SeriesContextType {
  series: Serie[];
  addSerie: (serie: SerieFormData) => void;
  updateSerie: (id: number, serie: SerieFormData) => void;
  deleteSerie: (id: number) => void;
  getSerie: (id: number) => Serie | undefined;
}

// Creamos el Context vacio (null) para tipar; se llena de verdad en el Provider
const SeriesContext = createContext<SeriesContextType | null>(null);

// Este Provider envuelve la app (se usa en layout.tsx) y le da a todos sus hijos
// acceso a las series y a las funciones para crear/editar/borrar/leer (el CRUD entero).
export function SeriesProvider({ children }: { children: ReactNode }) {
  // "series" se guarda solo en localStorage bajo la clave "series"
  const [series, setSeries] = useLocalStorage<Serie[]>("series", []);

  // Create: agrega una serie nueva con un id unico basado en la hora actual
  const addSerie = (nueva: SerieFormData) => {
    setSeries((prev) => [...prev, { ...nueva, id: Date.now() }]);
  };

  // Update: reemplaza SOLO la serie que tenga ese id, dejando las demas iguales
  const updateSerie = (id: number, datos: SerieFormData) => {
    setSeries((prev) =>
      prev.map((s) => (s.id === id ? { ...datos, id } : s))
    );
  };

  // Delete: se queda con todas las series MENOS la de ese id
  const deleteSerie = (id: number) => {
    setSeries((prev) => prev.filter((s) => s.id !== id));
  };

  // Read (una sola): busca la serie que tenga ese id exacto
  const getSerie = (id: number) => series.find((s) => s.id === id);

  return (
    <SeriesContext.Provider
      value={{ series, addSerie, updateSerie, deleteSerie, getSerie }}
    >
      {children}
    </SeriesContext.Provider>
  );
}

// Hook de conveniencia: en vez de usar useContext(SeriesContext) en cada componente,
// llamamos useSeries() y ya tenemos todo listo (con chequeo de error incluido).
export function useSeries() {
  const context = useContext(SeriesContext);
  if (!context) {
    // Esto pasa si alguien usa useSeries() fuera del <SeriesProvider>
    throw new Error("useSeries debe usarse dentro de un SeriesProvider");
  }
  return context;
}
