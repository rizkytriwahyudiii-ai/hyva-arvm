export default function ProductSkeleton() {
  return (
    <div className="animate-pulse grid md:grid-cols-12 gap-16 items-start max-w-6xl mx-auto">
      {/* Skeleton Image */}
      <div className="md:col-span-5 bg-stone-100 aspect-square w-full rounded" />
      
      {/* Skeleton Info */}
      <div className="md:col-span-7 space-y-6">
        <div className="h-4 bg-stone-100 w-1/4 rounded" />
        <div className="h-10 bg-stone-100 w-3/4 rounded" />
        <div className="h-6 bg-stone-100 w-1/3 rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-stone-100 w-full rounded" />
          <div className="h-4 bg-stone-100 w-2/3 rounded" />
        </div>
      </div>
    </div>
  );
}