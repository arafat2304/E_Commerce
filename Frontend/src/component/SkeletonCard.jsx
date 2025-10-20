export default function SkeletonCard() {
  return (
    <div className="border rounded-lg overflow-hidden animate-pulse bg-white">
      <div className="h-40 bg-gray-200"></div>
      <div className="p-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
