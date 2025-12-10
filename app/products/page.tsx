import { Suspense } from "react";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/filters/ProductFilters";
import { SortSelector } from "./SortSelector";
import { serializeProducts } from "@/lib/serialize";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    size?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const category = searchParams.category;
  const sizes = Array.isArray(searchParams.size)
    ? searchParams.size
    : searchParams.size
    ? [searchParams.size]
    : [];
  const minPrice = searchParams.minPrice
    ? parseFloat(searchParams.minPrice)
    : 0;
  const maxPrice = searchParams.maxPrice
    ? parseFloat(searchParams.maxPrice)
    : 1000;
  const sort = searchParams.sort || "newest";
  const page = parseInt(searchParams.page || "1");
  const itemsPerPage = 12;

  const where: any = {
    inStock: true,
    price: {
      gte: minPrice,
      lte: maxPrice,
    },
  };

  if (category) {
    where.category = category;
  }

  const orderBy: any = {};
  switch (sort) {
    case "price-asc":
      orderBy.price = "asc";
      break;
    case "price-desc":
      orderBy.price = "desc";
      break;
    case "newest":
      orderBy.createdAt = "desc";
      break;
    default:
      orderBy.createdAt = "desc";
  }

  let products: any[] = [];
  let totalCount = 0;

  try {
    const [rawProducts, count] = await Promise.all([
      db.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      db.product.count({ where }),
    ]);
    products = serializeProducts(rawProducts);
    totalCount = count;
  } catch (error) {
    console.error("Database error:", error);
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Filter by sizes if provided
  let filteredProducts = products;
  if (sizes.length > 0) {
    filteredProducts = products.filter((product) =>
      sizes.some((size) => product.sizes.includes(size))
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-pink-50/30 dark:to-pink-950/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            👕 All Products
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            Discover our complete collection of fun, colorful kids clothing! 🎨
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card border-2 rounded-2xl p-6 shadow-lg">
                <Suspense
                  fallback={
                    <div className="text-muted-foreground">
                      Loading filters...
                    </div>
                  }
                >
                  <ProductFilters />
                </Suspense>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 rounded-xl p-4 border-2 border-pink-200/50 dark:border-pink-800/50">
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Showing{" "}
                <span className="font-bold text-primary">
                  {filteredProducts.length}
                </span>{" "}
                of <span className="font-bold text-primary">{totalCount}</span>{" "}
                products
              </p>
              <Suspense
                fallback={
                  <div className="text-muted-foreground">Loading...</div>
                }
              >
                <SortSelector currentSort={sort} searchParams={searchParams} />
              </Suspense>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-card border-2 rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">😢</div>
                <p className="text-xl font-bold mb-2 text-primary">
                  No products found
                </p>
                <p className="text-muted-foreground font-medium">
                  Try adjusting your filters to see more products
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 &&
                  (() => {
                    const buildParams = (pageNum: number) => {
                      const params = new URLSearchParams();
                      if (category) params.set("category", category);
                      if (searchParams.size) {
                        const sizeArray = Array.isArray(searchParams.size)
                          ? searchParams.size
                          : [searchParams.size];
                        sizeArray.forEach((s) => params.append("size", s));
                      }
                      if (searchParams.minPrice)
                        params.set("minPrice", searchParams.minPrice);
                      if (searchParams.maxPrice)
                        params.set("maxPrice", searchParams.maxPrice);
                      if (searchParams.sort)
                        params.set("sort", searchParams.sort);
                      params.set("page", pageNum.toString());
                      return params.toString();
                    };

                    return (
                      <div className="flex justify-center gap-2 flex-wrap mt-8">
                        {page > 1 && (
                          <a
                            href={`/products?${buildParams(page - 1)}`}
                            className="px-5 py-2.5 border-2 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all font-bold shadow-md hover:shadow-lg"
                          >
                            ← Previous
                          </a>
                        )}
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((p) => (
                          <a
                            key={p}
                            href={`/products?${buildParams(p)}`}
                            className={`px-4 py-2.5 border-2 rounded-full font-bold transition-all shadow-md hover:shadow-lg ${
                              p === page
                                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent"
                                : "hover:bg-pink-100 dark:hover:bg-pink-900/30 border-pink-200 dark:border-pink-800"
                            }`}
                          >
                            {p}
                          </a>
                        ))}
                        {page < totalPages && (
                          <a
                            href={`/products?${buildParams(page + 1)}`}
                            className="px-5 py-2.5 border-2 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all font-bold shadow-md hover:shadow-lg"
                          >
                            Next →
                          </a>
                        )}
                      </div>
                    );
                  })()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
