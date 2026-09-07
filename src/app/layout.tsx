import type { Metadata } from "next";
import "./globals.css";
import { SeriesProvider } from "@/context/SeriesContext";
import { FavoritosProvider } from "@/context/FavoritosContext";

export const metadata: Metadata = {
  title: "CRUD de Series",
  description: "Taller 2 - Programación con Tecnologías Web",
};

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
            <main className="max-w-5xl mx-auto p-6">{children}</main>
          </FavoritosProvider>
        </SeriesProvider>
      </body>
    </html>
  );
}