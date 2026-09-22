// Forma completa de una serie, tal cual se guarda en localStorage
export interface Serie {
  id: number; // se genera solo (Date.now()), nunca lo escribe el usuario
  title: string;
  genre: string;
  seasons: number;
  platform: string;
  rating: number;
  image: string;
  description: string;
}

// Datos del FORMULARIO: son los mismos campos que Serie, pero SIN el id
// (porque al crear todavia no existe, y al editar no se puede cambiar)
export type SerieFormData = Omit<Serie, "id">;
