export interface Serie {
  id: number;
  title: string;
  genre: string;
  seasons: number;
  platform: string;
  rating: number;
  image: string;
  description: string;
}

export type SerieFormData = Omit<Serie, "id">;