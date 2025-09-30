import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        التصنيف غير موجود
      </h1>
      <p className="text-gray-600 mb-8">
        قد يكون هذا التصنيف تمت إزالته أو أن الرابط غير صحيح.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ChevronRight className="w-4 h-4" />
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}
