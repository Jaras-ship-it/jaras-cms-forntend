import qs from "qs";
const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:1337";
import { unstable_noStore as noStore } from "next/cache";
import { flattenAttributes } from "@/lib/utils";

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
              heroslider: {
                populate: {
                  ads_banners: {
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
      },
      Image: true,
    },
    pagination: {
      page: 1,
      pageSize: 100,
    },
    fileds: ["name", "description", "slug", "createdAt"],
  });
  return await fetchData(url.href);
}
