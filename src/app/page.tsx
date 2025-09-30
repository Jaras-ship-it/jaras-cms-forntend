import HeroSection from "@/components/custom/HeroSection";
import Categories from "@/components/custom/Categories";
import { homePageData } from "@/data/loader";
import {
  HeroSection as HeroSectionType,
  CategoriesSection as CategoriesSectionType,
  HomePageBlock,
  HomePageData,
} from "@/types";

export default async function Home() {
  const homeData = (await homePageData()) as HomePageData;

  // Extract hero section from blocks array
  const heroSectionData = homeData?.blocks?.find(
    (block: HomePageBlock): block is HeroSectionType =>
      block.__component === "layout.hero-section"
  );

  // Extract categories section from blocks array
  const categoriesSectionData = homeData?.blocks?.find(
    (block: HomePageBlock): block is CategoriesSectionType =>
      block.__component === "layout.categories-section"
  );

  return (
    <main className="min-h-[calc(100vh-64px)]">
      <HeroSection data={heroSectionData} />
      {categoriesSectionData && (
        <Categories data={categoriesSectionData.categories} />
      )}
    </main>
  );
}
