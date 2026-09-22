import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale, locales } from "./dictionaries";

// Ruta: /es o /en -> "[lang]" es OTRA carpeta dinamica, igual que "[id]",
// pero aca el parametro es el idioma en vez de un numero de serie.
export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  // Si alguien entra a /fr (idioma que no soportamos), mostramos la pagina 404
  if (!hasLocale(lang)) notFound();

  // Carga el diccionario de textos correspondiente (es.json o en.json)
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-6">
      <div className="flex gap-2">
        {/* Botones para cambiar de idioma: arman el link /es o /en */}
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}`}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              locale === lang
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* Todos estos textos salen del diccionario, no estan escritos a mano aca */}
      <h1 className="text-4xl font-bold text-white">{dict.landing.title}</h1>
      <p className="text-slate-400 max-w-md">{dict.landing.subtitle}</p>

      <Link
        href="/series"
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-lg transition-colors"
      >
        {dict.landing.cta}
      </Link>
    </div>
  );
}
