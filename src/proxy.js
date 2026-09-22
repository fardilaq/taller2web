import { NextResponse } from "next/server";

const locales = ["es", "en"];
const defaultLocale = "es";

// Mira el header "Accept-Language" que manda el navegador (ej: "en-US,en;q=0.9")
// y se queda solo con el idioma principal (ej: "en"). Si no es uno de los que
// soportamos, usamos el idioma por defecto (español).
function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();
  return locales.includes(preferred) ? preferred : defaultLocale;
}

// Esto se ejecuta ANTES de que se renderice cualquier pagina (es un middleware/proxy).
// Cuando alguien entra a "/", lo redirigimos a "/es" o "/en" segun su idioma preferido.
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
