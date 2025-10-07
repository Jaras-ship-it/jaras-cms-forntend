import qs from "qs";
const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:1337";
import { unstable_noStore as noStore } from "next/cache";
import { flattenAttributes } from "@/lib/utils";
import { ProductWithSuppliers } from "@/types/supplier";

async function fetchData(url: string) {
  const authToken = null;

  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function homePageData() {
  noStore();
  const url = new URL("/api/home", baseUrl);
  url.search = qs.stringify({
    populate: {
      blocks: {
        on: {
          "layout.hero-section": {
            populate: {
              slider: {
                populate: {
                  banners: {
                    populate: "*",
                  },
                },
              },
            },
          },
          "layout.categories-section": {
            populate: {
              categories: {
                populate: ["Image", "products"],
              },
            },
          },
        },
      },
    },
    fields: ["title"],
  });
  return await fetchData(url.href);
}

// Get Globlal data
export async function getGlobalData() {
  noStore();
  const url = new URL("/api/global", baseUrl);
  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaBtn",
      "footer.logoText",
      "footer.socialLinks",
    ],
  });
  return await fetchData(url.href);
}
export async function getGlobalMetaData() {
  noStore();
  const url = new URL("/api/global", baseUrl);
  url.search = qs.stringify({
    fields: ["siteName", "siteDescription"],
  });
  return await fetchData(url.href);
}

export interface CategoryResponseItem {
  id: number;
  name: string;
  description: string;
  slug?: string;
  Image?: {
    url: string;
    width?: number;
    height?: number;
    alternativeText?: string;
  };
  createdAt?: string;
}

export async function getCategoryBySlug(slug: string) {
  noStore();
  const url = new URL("/api/categories", baseUrl);
  url.search = qs.stringify({
    filters: { slug: { $eq: slug } },
    populate: {
      products: {
        populate: ["image"],
        fields: ["id", "name", "description", "slug"],
      },
      Image: true,
    },
    pagination: {
      page: 1,
      pageSize: 100,
    },
    fields: ["name", "description", "slug", "createdAt"],
  });
  return await fetchData(url.href);
}

// Get suppliers for a specific product
export async function getProductSuppliers(
  productSlug: string
): Promise<ProductWithSuppliers | null> {
  noStore();
  const url = new URL("/api/products", baseUrl);
  url.search = qs.stringify({
    filters: {
      slug: { $eq: productSlug },
    },
    populate: {
      suppliers: {
        populate: ["logo"],
        fields: [
          "id",
          "name",
          "description",
          "slug",
          "phone",
          "website",
          "verified",
          "address",
        ],
      },
      image: true,
    },
    fields: ["id", "name", "description", "slug"],
  });

  try {
    const response = await fetchData(url.href);
    console.log("Raw API response:", response);

    // The response should have a data array with the flattened product
    const data = response as { data?: ProductWithSuppliers[] };
    if (data && data.data && data.data.length > 0) {
      return data.data[0];
    }

    return null;
  } catch (error) {
    console.error("Error in getProductSuppliers:", error);
    return null;
  }
}
