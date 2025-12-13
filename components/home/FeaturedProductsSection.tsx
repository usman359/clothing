import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { Sparkles } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  rating?: number | null;
  ratingCount?: number;
}

interface FeaturedProductsSectionProps {
  featuredProducts: Product[];
}

export function FeaturedProductsSection({
  featuredProducts,
}: FeaturedProductsSectionProps) {
  return (
    <section className="py-24 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="h-7 w-7 text-yellow-500 fill-yellow-500" />
            <span className="text-base md:text-lg font-bold text-pink-600 uppercase tracking-wider">
              Featured Collection
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Our most loved items, handpicked just for you!
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              basePath="/collections/products"
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            asChild
            className="bg-pink-500 hover:bg-pink-600 text-white px-10 md:px-12 py-7 md:py-8 text-lg md:text-xl font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Link href="/collections">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
