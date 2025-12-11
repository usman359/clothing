import { db } from "@/lib/db";
import { serializeProducts } from "@/lib/serialize";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { BrandStorySection } from "@/components/home/BrandStorySection";

export default async function HomePage() {
  let featuredProducts = [];
  try {
    const products = await db.product.findMany({
      take: 6,
      where: { inStock: true },
      orderBy: { createdAt: "desc" },
    });
    featuredProducts = serializeProducts(products);
  } catch (error) {
    console.error("Database error:", error);
    // Continue with empty products array if database is not configured
  }

  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <FeaturedProductsSection featuredProducts={featuredProducts} />
      <BrandStorySection />
    </div>
  );
}
