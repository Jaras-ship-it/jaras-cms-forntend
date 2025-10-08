import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Shield,
  Clock,
  Users,
  ChevronLeft,
} from "lucide-react";
import { getProductSuppliers } from "@/data/loader";
import { Supplier } from "@/types/supplier";
import { buildImageUrl } from "@/lib/utils";

interface SuppliersPageProps {
  params: {
    slug: string; // category slug
    productSlug: string;
  };
}

export default async function SuppliersPage({ params }: SuppliersPageProps) {
  const { slug: categorySlug, productSlug } = await params;
  console.log("Params: == ", params);
  // Validate parameters
  if (!categorySlug?.trim() || !productSlug?.trim()) {
    notFound();
  }

  try {
    // Fetch product with suppliers data from Strapi
    const productData = await getProductSuppliers(productSlug);
    console.log("productData: == ", productData);

    if (!productData) {
      notFound();
    }

    const suppliers = productData.suppliers || [];
    const productInfo = productData;

    return (
      <div className="w-full mx-auto sm:px-6 lg:px-8 overflow-hidden rounded-2xl h-full">
        {/* Header */}
        <div className="p-4 sticky top-[80px] z-30 mx-2 mt-20 sm:mx-4 lg:mx-4 shadow-[0_0px_4px_0_rgba(148,163,184,0.2)] rounded-2xl border border-slate-200 bg-white">
          <div className="w-full mx-auto">
            <div className="flex items-center gap-4 ">
              {/* Back Button */}
              <Link
                href={`/categories/${categorySlug}`}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                aria-label="العودة للفئة"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
              </Link>

              {/* Page Title */}
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-gray-900">
                  الموردين ل {productInfo?.name || productSlug}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span>{categorySlug}</span>
                  <ChevronLeft className="w-3 h-3" />
                  <span>{productInfo?.name || productSlug}</span>
                </div>
              </div>

              {/* Suppliers Count */}
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {suppliers.length}
                </div>
                <div className="text-xs text-gray-500">مورد</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 bg-white ">
          {suppliers.length === 0 ? (
            // Empty State
            <EmptyState categorySlug={categorySlug} />
          ) : (
            // Suppliers List
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {suppliers.map((supplier) => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    notFound();
  }
}

// Supplier Card Component
function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200 group relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top right, #108afc17 1%, transparent 40%)",
      }}
    >
      {/* Supplier Header */}
      <div className="flex items-start gap-4 mb-6">
        {/* Logo */}
        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white flex-shrink-0">
          {supplier.logo?.url ? (
            <Image
              src={buildImageUrl(supplier.logo.url)}
              alt={supplier.logo?.alternativeText || supplier.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-xl">
                {supplier.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Supplier Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {supplier.name}
            </h3>
            {supplier.verified && <Shield className="w-5 h-5 text-blue-500" />}
          </div>

          {supplier.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                {supplier.rating}
              </span>
              <span className="text-xs text-gray-500">
                ({Math.floor(Math.random() * 50) + 10} تقييم)
              </span>
            </div>
          )}

          <p className="text-gray-600 text-sm line-clamp-2">
            {supplier.description}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-3 mb-6">
        {supplier.address && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{supplier.address}</span>
          </div>
        )}

        {supplier.established && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>تأسست عام {supplier.established}</span>
          </div>
        )}
      </div>

      {/* Contact Actions */}
      <div className="flex gap-2">
        {supplier.phone && (
          <a
            href={`tel:${supplier.phone}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">اتصال</span>
          </a>
        )}

        {supplier.email && (
          <a
            href={`mailto:${supplier.email}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">إيميل</span>
          </a>
        )}

        {supplier.website && (
          <a
            href={supplier.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            title="زيارة الموقع"
          >
            <Globe className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({
  categorySlug,
}: {
  categorySlug: string;
  productSlug?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Users className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        لا توجد موردين متاحين
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        لم نتمكن من العثور على أي موردين لهذا المنتج حالياً. يرجى المحاولة
        لاحقاً أو التواصل معنا للمساعدة.
      </p>
      <div className="flex gap-3">
        <Link
          href={`/categories/${categorySlug}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <ChevronRight className="w-4 h-4" />
          العودة للمنتجات
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
