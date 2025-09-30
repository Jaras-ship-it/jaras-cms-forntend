import { getCategoryBySlug } from "@/data/loader";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Category, Product } from "@/types";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  console.log("Params: == ", params.slug);
  const res = await getCategoryBySlug(params.slug);
  const [data] = res.data || [];
  const category = data as Category;
  console.log("Category Data: == ", category);

  if (!category) {
    notFound();
  }

  return (
    <div className="w-full mx-auto  sm:px-6 lg:px-8 overflow-hidden rounded-2xl h-full">
      {/* Compact Header with Back Button */}
      <div className="p-4 sticky top-[80px] z-30 mx-2 mt-20 sm:mx-4 lg:mx-4 shadow-[0_0px_4px_0_rgba(148,163,184,0.2)] rounded-2xl h-fullborder border-slate-200  bg-white">
        <div className="w-full mx-auto ">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
              aria-label="العودة"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
            </Link>

            {/* Category Icon */}
            {category?.Image?.url ? (
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white flex-shrink-0">
                <Image
                  src={process.env.NEXT_PUBLIC_URL + category.Image.url}
                  alt={category.Image?.alt || category.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-lg">
                  {category?.name?.charAt(0)}
                </span>
              </div>
            )}

            {/* Category Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-gray-900 truncate">
                {category?.name}
              </h1>
              {category?.description && (
                <p className="text-sm text-gray-500 truncate mt-1">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-0">
            {/* view products */}
            {category?.products?.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-200 group cursor-pointer relative overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, #108afc17 1%, transparent 40%)",
                }}
              >
                {/* Product Icon/Image */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                    {product.image?.url ? (
                      <Image
                        src={process.env.NEXT_PUBLIC_URL + product.image.url}
                        alt={product.name}
                        width={32}
                        height={32}
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Product Title and Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
