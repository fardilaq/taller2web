"use client";
import { useState } from "react";
import { useSeries } from "@/context/SeriesContext";

interface DeleteButtonProps {
  serieId: number;
  onDeleted?: () => void; // funcion opcional para avisar "ya la borre" al componente padre
}

// Boton de "Eliminar" con confirmacion (el "Delete" del CRUD).
export default function DeleteButton({ serieId, onDeleted }: DeleteButtonProps) {
  const { deleteSerie } = useSeries();
  // Estado local: si estamos mostrando el mensaje de "¿seguro?" o el boton normal
  const [confirmando, setConfirmando] = useState(false);

  const handleDelete = () => {
    deleteSerie(serieId); // borra la serie del Context (y por lo tanto de localStorage)
    setConfirmando(false);
    onDeleted?.(); // si nos pasaron un callback, lo ejecutamos (ej: navegar al inicio)
  };

  // Vista de confirmacion: "¿Seguro? [Si, eliminar] [Cancelar]"
  if (confirmando) {
    return (
      <div className="flex gap-2 items-center">
        <span className="text-sm">¿Seguro?</span>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white text-sm px-2 py-1 rounded"
        >
          Si, eliminar
        </button>
        <button
          onClick={() => setConfirmando(false)}
          className="text-sm px-2 py-1 border rounded"
        >
          Cancelar
        </button>
      </div>
    );
  }

  // Vista normal: solo el link/boton de "Eliminar"
  return (
    <button
      onClick={() => setConfirmando(true)}
      className="text-red-600 text-sm hover:underline"
    >
      Eliminar
    </button>
  );
}
