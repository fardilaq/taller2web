"use client";
import { createContext, useContext, ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

// Este Context es independiente del de series: solo guarda una lista de IDs favoritos
interface FavoritosContextType {
  favoritos: number[];
  toggleFavorito: (id: number) => void;
  isFavorito: (id: number) => boolean;
}

const FavoritosContext = createContext<FavoritosContextType | null>(null);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  // Guarda un arreglo de ids (numeros) bajo la clave "favoritos" en localStorage
  const [favoritos, setFavoritos] = useLocalStorage<number[]>("favoritos", []);

  // Si el id ya esta en la lista, lo saca; si no esta, lo agrega (por eso "toggle")
  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Chequea si un id esta marcado como favorito
  const isFavorito = (id: number) => favoritos.includes(id);

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

// Hook de conveniencia, igual que useSeries() pero para favoritos
export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error("useFavoritos debe usarse dentro de un FavoritosProvider");
  }
  return context;
}
