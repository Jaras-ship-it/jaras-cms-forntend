import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Logo from "@/components/custom/logoIcons/Logo";

export default function NotFound() {
  return (
    <div className="max-w-3xl flex flex-col mx-auto min-h-[calc(100vh-66px)]">
      <main id="content" className="flex-grow flex flex-col justify-center">
        <Logo />
        <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl">
            404
          </h1>
          <p className="mt-3 text-gray-600">الصفحة غير موجودة</p>
          <p className="text-gray-600">يبدو أنك تهت</p>
          <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
            <Button
              variant="solid"
              size="medium"
              asLink
              href="/"
              icon={<ChevronRight className="w-4 h-4" />}
              aria-label="العودة إلى الصفحة الرئيسية"
            >
              العودة إلى الصفحة الرئيسية
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
