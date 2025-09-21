import Image from "next/image";
import HeroSection from "@/components/custom/HeroSection";
import Categories from "@/components/custom/Categories";

interface Category {
  id: number;
  name: string;
  description: string;
  Image: {
    url: string;
  };
}
const path = process.env.NEXT_PUBLIC_STRAPI_API_URL;
async function getStrapiData(url: string) {
  try {
    const res = await fetch(path + url, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function Home() {
  const { data } = await getStrapiData("/categories/?populate=*");
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Categories data={data} />
      <footer className="text-center py-8 text-gray-600 dark:text-gray-400">
        Jaras 2025
      </footer>
    </main>
  );
}
