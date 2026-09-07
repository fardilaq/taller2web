"use client";
import { useState } from "react";
import { useSeries } from "@/context/SeriesContext";

interface DeleteButtonProps {
  serieId: number;
  onDeleted?: () => void;
}

export default function DeleteButton({ serieId, onDeleted }: DeleteButtonProps) {
  const { deleteSerie } = useSeries();
  const [confirmando, setConfirmando] = useState(false);

  const handleDelete = () => {
    deleteSerie(serieId);
    setConfirmando(false);
    onDeleted?.();
  };

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

  return (
    <button
      onClick={() => setConfirmando(true)}
      className="text-red-600 text-sm hover:underline"
    >
      Eliminar
    </button>
  );
}