export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-48 bg-slate-800 rounded-lg animate-pulse" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-40 bg-slate-800 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}