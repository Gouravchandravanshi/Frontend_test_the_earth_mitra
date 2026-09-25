export default function ProductSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-square bg-stone-100" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-stone-100 rounded w-1/3" />
        <div className="h-4 bg-stone-100 rounded w-3/4" />
        <div className="h-4 bg-stone-100 rounded w-1/2" />
        <div className="flex justify-between items-center mt-3">
          <div className="h-5 bg-stone-100 rounded w-16" />
          <div className="w-8 h-8 bg-stone-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}