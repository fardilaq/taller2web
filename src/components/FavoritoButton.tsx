"use client";
import { useFavoritos } from "@/context/FavoritosContext";

export default function FavoritoButton({ serieId }: { serieId: number }) {
  const { toggleFavorito, isFavorito } = useFavoritos();
  const favorito = isFavorito(serieId);

  return (
    <button
      onClick={() => toggleFavorito(serieId)}
      className="text-xl"
      aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {favorito ? "★" : "☆"}
    </button>
  );
}