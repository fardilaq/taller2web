"use client";
import { useState, useEffect } from "react";

// Hook generico que funciona como useState, pero ademas guarda el valor
// en localStorage del navegador para que no se pierda al recargar la pagina.
// <T> es un generic: sirve tanto para Serie[] como para number[], etc.
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // En el servidor no existe "window"/localStorage, asi que usamos el valor inicial
    if (typeof window === "undefined") return initialValue;
    try {
      const item = localStorage.getItem(key);
      // localStorage solo guarda texto, por eso hay que hacer JSON.parse
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error leyendo localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Cada vez que "storedValue" cambia, lo volvemos a guardar en localStorage (como texto)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error guardando en localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Se devuelve igual que useState: [valor, funcion para cambiarlo]
  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
