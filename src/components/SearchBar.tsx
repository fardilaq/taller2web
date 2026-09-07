"use client";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [termino, setTermino] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(termino);
    }, 300);

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