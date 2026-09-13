import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale, locales } from "./dictionaries";

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-6">
      <div className="flex gap-2">
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
