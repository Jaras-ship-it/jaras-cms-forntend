"use client";
import SupplierModal from "@/components/ui/SupplierModal";
import { Mail, Phone } from "lucide-react";

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
    <div className="min-h-[90vh] bg-white shadow-lg border border-slate-200 h-full rounded-xl p-8 my-[80px] flex flex-col">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between h-full flex-1">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            انضم إلى دليل الموردين والشركات
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            كن جزءًا من أكبر منصة تجمع مورّدي قطاع الضيافة في المملكة العربية
            السعودية، وابدأ في عرض منتجاتك والتعاون مع آلاف الفنادق التي تحتاج
            إلى خدماتك.
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
              أنضم الى دليل جرس
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
        <div
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl shadow-slate-900/20 border border-slate-700/50"
          dir="ltr"
        >
          <div className="text-center mb-5">
            <h3 className="text-lg font-bold text-white mb-2">
              هل تحتاج مساعدة؟
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              فريقنا جاهز لمساعدتك في عملية التسجيل والإجابة على أي استفسارات
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:suppliers@jaras.com"
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/10 hover:border-white/20"
            >
              <span className="text-sm font-medium">guide@jaras.io</span>
              <Mail
                className="w-4 h-4 group-hover:scale-110 transition-transform"
                strokeWidth={2}
              />
            </a>

            <a
              href="tel:++966558297633"
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/10 hover:border-white/20"
            >
              <Phone
                className="w-4 h-4 group-hover:scale-110 transition-transform"
                strokeWidth={2}
              />
              <span className="text-sm font-medium">+966 55 829 7633</span>
            </a>
          </div>
        </div>
      </div>
      {/* Supplier Modal */}
      <SupplierModal />
    </div>
  );
}
