import qs from "qs";
const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:1337";
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
    throw error; // or return null;
  }
}

// Get Globlal data
export async function getGlobalData() {
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
