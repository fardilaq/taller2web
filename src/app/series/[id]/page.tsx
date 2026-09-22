"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSeries } from "@/context/SeriesContext";
import FavoritoButton from "@/components/FavoritoButton";
import DeleteButton from "@/components/DeleteButton";

// Ruta: /series/17  (el "[id]" en el nombre de la carpeta es lo que hace
// que Next.js acepte cualquier numero/texto ahi y nos lo pase como parametro).
// Esta pagina es el "Read" de UNA sola serie (el detalle).
export default function DetallePage({
  params,
}: {
  // En las versiones nuevas de Next, "params" llega como una Promise,
  // por eso hay que "desenvolverla" con use(params) antes de usarla.
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // id llega como string, ej: "17"
  const router = useRouter();
  const { getSerie } = useSeries();

  // Truco para evitar diferencias entre el render del servidor y el del navegador
  // (localStorage solo existe en el navegador): esperamos a estar "montados".
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  // El id de la URL es texto, pero en nuestros datos "id" es number -> hay que convertirlo
  const serie = getSerie(Number(id));

  if (!montado) {
    return <div className="h-96 bg-slate-800 rounded-2xl animate-pulse" />;
  }

  // Si buscamos un id que no existe (o ya fue borrado), mostramos este mensaje
  if (!serie) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-white mb-2">
          Esta serie no existe
        </h2>
        <p className="text-slate-400 mb-6">
          Puede que la hayas eliminado o que el enlace sea incorrecto.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
      >
        ← Volver a mis series
      </Link>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        {/* La imagen es opcional, por eso el "&&": si no hay imagen, no se muestra nada */}
        {serie.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={serie.image}
            alt={serie.title}
            className="w-full h-56 object-cover"
          />
        )}

        <div className="p-8">
          <div className="flex justify-between items-start gap-4 mb-4">
            <h1 className="text-3xl font-bold text-white">{serie.title}</h1>
            {/* Boton de estrellita para marcar/desmarcar favorito */}
            <FavoritoButton serieId={serie.id} />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm bg-slate-700 text-slate-200 px-3 py-1 rounded-full">
              {serie.genre}
            </span>
            <span className="text-sm bg-slate-700 text-slate-200 px-3 py-1 rounded-full">
              {serie.platform}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900/60 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                Temporadas
              </p>
              <p className="text-2xl font-bold text-white">{serie.seasons}</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                Rating
              </p>
              <p className="text-2xl font-bold text-amber-400">
                ★ {serie.rating}
              </p>
            </div>
          </div>

          {serie.description && (
            <div className="mb-8">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                Descripcion
              </p>
              <p className="text-slate-300 leading-relaxed">
                {serie.description}
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-700">
            {/* El "Update": arma la URL /series/17/edit usando el id de esta misma serie */}
            <Link
              href={`/series/${serie.id}/edit`}
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors"
            >
              Editar serie
            </Link>
            {/* El "Delete": al borrar, nos manda de vuelta al inicio */}
            <DeleteButton
              serieId={serie.id}
              onDeleted={() => router.push("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
