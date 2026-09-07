"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Serie, SerieFormData } from "@/types/serie";

const GENEROS = ["Drama", "Comedia", "Terror", "Ciencia Ficcion", "Documental"];

const VACIO: SerieFormData = {
  title: "",
  genre: "",
  seasons: 1,
  platform: "",
  rating: 1,
  image: "",
  description: "",
};

const INPUT =
  "w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none";

const LABEL = "block text-sm text-slate-300 mb-1.5";

const ERROR = "text-red-400 text-sm mt-1 block";

interface SerieFormProps {
  serieInicial?: Serie;
  onSubmit: (datos: SerieFormData) => void;
}

export default function SerieForm({ serieInicial, onSubmit }: SerieFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<SerieFormData>(serieInicial ?? VACIO);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = (): boolean => {
    const nuevos: Record<string, string> = {};

    if (!form.title.trim()) nuevos.title = "El titulo es obligatorio";
    if (!form.genre) nuevos.genre = "Selecciona un genero";
    if (!form.platform.trim()) nuevos.platform = "La plataforma es obligatoria";
    if (Number(form.seasons) < 1) nuevos.seasons = "Minimo 1 temporada";
    if (Number(form.rating) < 1 || Number(form.rating) > 10) {
      nuevos.rating = "El rating debe estar entre 1 y 10";
    }

    setErrors(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...form,
      seasons: Number(form.seasons),
      rating: Number(form.rating),
    });

    if (!serieInicial) setForm(VACIO);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 space-y-5"
    >
      <div>
        <label className={LABEL}>Titulo</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ej: Breaking Bad"
          className={INPUT}
        />
        {errors.title && <span className={ERROR}>{errors.title}</span>}
      </div>

      <div>
        <label className={LABEL}>Genero</label>
        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className={INPUT}
        >
          <option value="" className="bg-slate-800">
            Selecciona un genero
          </option>
          {GENEROS.map((g) => (
            <option key={g} value={g} className="bg-slate-800">
              {g}
            </option>
          ))}
        </select>
        {errors.genre && <span className={ERROR}>{errors.genre}</span>}
      </div>

      <div>
        <label className={LABEL}>Plataforma</label>
        <input
          name="platform"
          value={form.platform}
          onChange={handleChange}
          placeholder="Ej: Netflix"
          className={INPUT}
        />
        {errors.platform && <span className={ERROR}>{errors.platform}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Temporadas</label>
          <input
            name="seasons"
            type="number"
            min="1"
            value={form.seasons}
            onChange={handleChange}
            className={INPUT}
          />
          {errors.seasons && <span className={ERROR}>{errors.seasons}</span>}
        </div>

        <div>
          <label className={LABEL}>Rating (1-10)</label>
          <input
            name="rating"
            type="number"
            step="0.1"
            min="1"
            max="10"
            value={form.rating}
            onChange={handleChange}
            className={INPUT}
          />
          {errors.rating && <span className={ERROR}>{errors.rating}</span>}
        </div>
      </div>

      <div>
        <label className={LABEL}>URL de la imagen (opcional)</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://..."
          className={INPUT}
        />
      </div>

      <div>
        <label className={LABEL}>Descripcion</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="De que trata la serie..."
          rows={4}
          className={INPUT}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors"
        >
          {serieInicial ? "Guardar cambios" : "Crear serie"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-slate-400 hover:text-white px-5 py-2.5 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}