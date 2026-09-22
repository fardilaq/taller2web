"use client";
import { useFavoritos } from "@/context/FavoritosContext";

// Botoncito de estrellita (★ / ☆) para marcar una serie como favorita.
// No tiene nada que ver con el CRUD de series: usa su propio Context (favoritos).
export default function FavoritoButton({ serieId }: { serieId: number }) {
  const { toggleFavorito, isFavorito } = useFavoritos();
  const favorito = isFavorito(serieId);

  return (
    <button
      onClick={() => toggleFavorito(serieId)} // clickear alterna: si es favorito lo saca, si no lo agrega
      className="text-xl"
      aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {favorito ? "★" : "☆"}
    </button>
  );
}
