import Link from "next/link";
import SeriesList from "@/components/SeriesList";

export default function SeriesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Series</h1>
        <Link
          href="/series/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Nueva serie
        </Link>
      </div>
      <SeriesList />
    </div>
  );
}
