import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/ProductCard";
import { serializeProduct } from "@/lib/serialize";

interface SimilarProductsProps {
  currentProductId: string;
  category: string;
}

export async function SimilarProducts({
  currentProductId,
  category,
}: SimilarProductsProps) {
  // Fetch similar products from the same category, excluding current product
  const similarProducts = await db.product.findMany({
    where: {
      category,
      id: {
        not: currentProductId,
      },
      inStock: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (similarProducts.length === 0) {
    return null;
  }

  const serializedProducts = similarProducts.map(serializeProduct);

  return (
    <section className="mt-16 pt-12 border-t">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          You May Also Like
        </h2>
        <p className="text-gray-600">
          Check out these similar products from our collection
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {serializedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            basePath="/collections/products"
          />
        ))}
      </div>
    </section>
  );
}
