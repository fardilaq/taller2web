import "server-only"; // Evita que este archivo se incluya por error en el bundle del navegador

// Mapa de idioma -> funcion que importa el JSON correspondiente.
// Usamos import() dinamico para que cada diccionario se cargue solo cuando se necesita.
const dictionaries = {
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

// Tipo con los idiomas validos, sacado automaticamente de las claves del objeto de arriba
export type Locale = keyof typeof dictionaries;

// Lista de idiomas soportados: ["es", "en"]
export const locales = Object.keys(dictionaries) as Locale[];

// Chequea si un string cualquiera (lo que venga en la URL) es un idioma valido
export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

// Devuelve el diccionario de textos para el idioma pedido
export const getDictionary = async (locale: Locale) => dictionaries[locale]();
