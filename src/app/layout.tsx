import type { Metadata } from "next";
import "./globals.css";
import { SeriesProvider } from "@/context/SeriesContext";
import { FavoritosProvider } from "@/context/FavoritosContext";

// Metadatos del sitio (titulo de la pestaña del navegador, descripcion para SEO)
export const metadata: Metadata = {
  title: "CRUD de Series",
  description: "Taller 2 - Programación con Tecnologías Web",
};

// Este layout envuelve TODAS las paginas de la app (es el <html> y <body> de todo el sitio).
// Aca "enchufamos" los dos Context Providers: asi cualquier pagina/componente
// de mas abajo puede usar useSeries() y useFavoritos() sin tener que pasarse
// datos manualmente de padre a hijo (props drilling).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <SeriesProvider>
          <FavoritosProvider>
            {/* "children" es la pagina que corresponda segun la URL (series, detalle, editar, etc.) */}
            <main className="max-w-5xl mx-auto p-6">{children}</main>
          </FavoritosProvider>
        </SeriesProvider>
      </body>
    </html>
  );
}
