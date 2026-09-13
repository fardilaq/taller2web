import { NextResponse } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();
  return locales.includes(preferred) ? preferred : defaultLocale;
}

export function proxy(request) {
  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Solo la raiz "/" necesita deteccion de idioma; el resto de la app
  // (paginas de series) no esta internacionalizado.
  matcher: ["/"],
};
