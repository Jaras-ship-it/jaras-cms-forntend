"use client";
import SupplierModal from "@/components/ui/SupplierModal";

export default function SupplierRegistrationPage() {
  const handleOpenModal = () => {
    const modal = document.getElementById("hs-supplier-modal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("hs-overlay-open");
      modal.classList.add("hs-overlay-backdrop-open");
    }
  };

  return (
    <div className="min-h-screen bg-white shadow-xl rounded-xl py-8 mt-[80px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            انضم إلى شبكة جرس
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            انضم إلى أكبر شبكة موردين للفنادق في المملكة العربية السعودية وتواصل
            مع آلاف الفنادق التي تبحث عن خدماتك ومنتجاتك
          </p>

          {/* CTA to open modal */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleOpenModal}
              className="py-3 px-6 inline-flex items-center gap-x-2 text-lg font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-supplier-modal"
              data-hs-overlay="#hs-supplier-modal"
            >
              
              ابدأ التسجيل الآن
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              وصول للعملاء
            </h3>
            <p className="text-gray-600">
              تواصل مع شبكة واسعة من الفنادق والمؤسسات الفندقية
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              نمو الأعمال
            </h3>
            <p className="text-gray-600">
              زيادة مبيعاتك من خلال منصة متخصصة في القطاع الفندقي
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              مصداقية وثقة
            </h3>
            <p className="text-gray-600">
              احصل على شارة التحقق وبناء سمعة قوية في السوق
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-12 p-6 bg-blue-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            هل تحتاج مساعدة؟
          </h3>
          <p className="text-gray-600 mb-4">
            فريقنا جاهز لمساعدتك في عملية التسجيل والإجابة على أي استفسارات
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:suppliers@jaras.com"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              suppliers@jaras.com
            </a>
            <a
              href="tel:+966123456789"
              className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +966 12 345 6789
            </a>
          </div>
        </div>
      </div>
      {/* Supplier Modal */}
      <SupplierModal />
    </div>
  );
}
