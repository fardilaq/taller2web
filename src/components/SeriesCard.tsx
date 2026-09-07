import Link from "next/link";
import { Serie } from "@/types/serie";
import FavoritoButton from "./FavoritoButton";
import DeleteButton from "./DeleteButton";

export default function SeriesCard({ serie }: { serie: Serie }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-500 transition-colors">
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-lg font-semibold text-white">{serie.title}</h2>
        <FavoritoButton serieId={serie.id} />
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-xs bg-slate-700 text-slate-200 px-2 py-1 rounded-full">
          {serie.genre}
        </span>
        <span className="text-xs bg-slate-700 text-slate-200 px-2 py-1 rounded-full">
          {serie.seasons} temporadas
        </span>
        <span className="text-xs bg-slate-700 text-slate-200 px-2 py-1 rounded-full">
          {serie.platform}
        </span>
      </div>

      <p className="text-slate-300 text-sm mt-3 font-medium">Rating: {serie.rating}/10</p>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700">
        <Link
          href={`/series/${serie.id}`}
          className="text-blue-400 text-sm hover:text-blue-300"
        >
          Ver detalle
        </Link>
        <DeleteButton serieId={serie.id} />
      </div>
    </div>
  );
}