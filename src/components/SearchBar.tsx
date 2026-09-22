"use client";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void; // funcion del padre que recibe el texto buscado
}

// Input de busqueda con "debounce": en vez de filtrar en CADA letra que escribis,
// espera 300ms desde la ultima tecla antes de avisarle al padre.
export default function SearchBar({ onSearch }: SearchBarProps) {
  const [termino, setTermino] = useState(""); // lo que el usuario va escribiendo

  useEffect(() => {
    // Cada vez que "termino" cambia, programamos un aviso para 300ms despues
    const timer = setTimeout(() => {
      onSearch(termino);
    }, 300);

    // Si el usuario escribe otra letra antes de que pasen los 300ms,
    // cancelamos el aviso anterior (por eso no se busca en cada tecla)
    return () => clearTimeout(timer);
  }, [termino, onSearch]);

  return (
    <input
      type="text"
      value={termino}
      onChange={(e) => setTermino(e.target.value)}
      placeholder="Buscar serie..."
      className="w-full border rounded p-2 mb-6"
    />
  );
}
