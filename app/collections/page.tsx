import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/ProductCard";
import { serializeProducts } from "@/lib/serialize";

export default async function CollectionsPage() {
  let products: any[] = [];

  try {
    const rawProducts = await db.product.findMany({
      where: {
        inStock: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    products = serializeProducts(rawProducts);
  } catch (error) {
    console.error("Database error:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-pink-50/30 dark:to-pink-950/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            🌟 All Collections
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            Discover our complete collection of fun, colorful kids clothing! 🎨
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-card border-2 rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-xl font-bold mb-2 text-primary">
              No products found
            </p>
            <p className="text-muted-foreground font-medium">
              Check back soon for new arrivals!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                basePath="/collections/products"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
