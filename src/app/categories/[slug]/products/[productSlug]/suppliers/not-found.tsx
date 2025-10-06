import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full mx-auto sm:px-6 lg:px-8 overflow-hidden rounded-2xl h-full">
      <div className="flex flex-col items-center justify-center py-20 text-center mt-20">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-red-400" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          الصفحة غير موجودة
        </h1>

        <p className="text-gray-600 mb-8 max-w-md">
          عذراً، لم نتمكن من العثور على صفحة الموردين التي تبحث عنها. قد يكون
          المنتج غير موجود أو تم تغيير الرابط.
        </p>

        <div className="flex gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            الصفحة الرئيسية
          </Link>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4" />
            تصفح الفئات
          </Link>
        </div>
      </div>
    </div>
  );
}
