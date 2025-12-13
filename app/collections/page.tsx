import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/ProductCard";
import { serializeProducts } from "@/lib/serialize";

interface CollectionsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function CollectionsPage({
  searchParams,
}: CollectionsPageProps) {
  const { search } = await searchParams;
  let products: any[] = [];

  try {
    const whereClause: any = {
      inStock: true,
    };

    // Add search filter if search query exists
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const rawProducts = await db.product.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });
    products = serializeProducts(rawProducts);
  } catch (error) {
    console.error("Database error:", error);
  }

  const pageTitle = search
    ? `Search Results for "${search}"`
    : "All Collections";
  const pageDescription = search
    ? `Found ${products.length} product${
        products.length !== 1 ? "s" : ""
      } matching "${search}"`
    : "Discover our complete collection of fun, colorful kids clothing! 🎨";

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-pink-50/30 dark:to-pink-950/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {search ? `🔍 ${pageTitle}` : "🌟 All Collections"}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            {pageDescription}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-card border-2 rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">{search ? "🔍" : "😢"}</div>
            <p className="text-xl font-bold mb-2 text-primary">
              {search ? "No products found" : "No products available"}
            </p>
            <p className="text-muted-foreground font-medium">
              {search
                ? `Try searching for something else`
                : "Check back soon for new arrivals!"}
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
