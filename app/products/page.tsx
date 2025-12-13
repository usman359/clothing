import { db } from "@/lib/db";
import { Suspense } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { serializeProduct } from "@/lib/serialize";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const categoryNames: Record<string, string> = {
    baby: "Baby (0-2 Years)",
    toddler: "Toddler (2-4 Years)",
    kids: "Big Kids (4-6 Years)",
  };

  const title = category
    ? `${categoryNames[category] || "Products"} - Little Stars Kids Store`
    : "All Products - Little Stars Kids Store";

  return {
    title,
    description: "Browse our collection of adorable kids clothing",
  };
}

async function ProductsContent({ category }: { category?: string }) {
  const whereClause = category ? { category } : {};
  const products = await db.product.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  const serializedProducts = products.map(serializeProduct);

  const categoryNames: Record<string, string> = {
    baby: "Baby (0-2 Years)",
    toddler: "Toddler (2-4 Years)",
    kids: "Big Kids (4-6 Years)",
  };

  const pageTitle = category
    ? categoryNames[category] || "Products"
    : "All Products";

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <a href="/" className="hover:text-pink-600 transition-colors">
            Home
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{pageTitle}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {category
              ? `Discover our collection of clothing perfect for ${pageTitle.toLowerCase()}`
              : "Discover our complete collection of kids clothing"}
          </p>
        </div>

        {/* Products Grid */}
        {serializedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {serializedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              No products found in this category.
            </p>
          </div>
        )}

        {/* Product Count */}
        {serializedProducts.length > 0 && (
          <div className="mt-12 text-center text-gray-600">
            Showing {serializedProducts.length} product
            {serializedProducts.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category } = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ProductsContent category={category} />
    </Suspense>
  );
}
