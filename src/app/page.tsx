import { redirect } from "next/navigation";

// Esta es la pagina raiz "/". No muestra nada: apenas alguien entra,
// lo mandamos directo a "/es" (la version en español del sitio).
export default function Home() {
  redirect("/es");
}
