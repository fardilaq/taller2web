"use client";
import { createContext, useContext, ReactNode } from "react";
import { Serie, SerieFormData } from "@/types/serie";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SeriesContextType {
  series: Serie[];
  addSerie: (serie: SerieFormData) => void;
  updateSerie: (id: number, serie: SerieFormData) => void;
  deleteSerie: (id: number) => void;
  getSerie: (id: number) => Serie | undefined;
}

const SeriesContext = createContext<SeriesContextType | null>(null);

export function SeriesProvider({ children }: { children: ReactNode }) {
  const [series, setSeries] = useLocalStorage<Serie[]>("series", []);

  const addSerie = (nueva: SerieFormData) => {
    setSeries((prev) => [...prev, { ...nueva, id: Date.now() }]);
  };

  const updateSerie = (id: number, datos: SerieFormData) => {
    setSeries((prev) =>
      prev.map((s) => (s.id === id ? { ...datos, id } : s))
    );
  };

  const deleteSerie = (id: number) => {
    setSeries((prev) => prev.filter((s) => s.id !== id));
  };

  const getSerie = (id: number) => series.find((s) => s.id === id);

  return (
    <SeriesContext.Provider
      value={{ series, addSerie, updateSerie, deleteSerie, getSerie }}
    >
      {children}
    </SeriesContext.Provider>
  );
}

export function useSeries() {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error("useSeries debe usarse dentro de un SeriesProvider");
  }
  return context;
}