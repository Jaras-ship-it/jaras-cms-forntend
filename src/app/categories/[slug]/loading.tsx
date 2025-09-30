export default function LoadingCategory() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
      <div className="h-8 w-56 bg-gray-200 rounded mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="h-64 bg-gray-200 rounded-xl" />
        <div className="md:col-span-2 space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
