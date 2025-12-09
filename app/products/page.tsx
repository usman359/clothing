import { Suspense } from "react"
import { db } from "@/lib/db"
import { ProductCard } from "@/components/product/ProductCard"
import { ProductFilters } from "@/components/filters/ProductFilters"
import { SortSelector } from "./SortSelector"
import { serializeProducts } from "@/lib/serialize"

interface ProductsPageProps {
  searchParams: {
    category?: string
    size?: string | string[]
    minPrice?: string
    maxPrice?: string
    sort?: string
    page?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = searchParams.category
  const sizes = Array.isArray(searchParams.size) ? searchParams.size : searchParams.size ? [searchParams.size] : []
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : 0
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : 1000
  const sort = searchParams.sort || "newest"
  const page = parseInt(searchParams.page || "1")
  const itemsPerPage = 12

  const where: any = {
    inStock: true,
    price: {
      gte: minPrice,
      lte: maxPrice,
    },
  }

  if (category) {
    where.category = category
  }

  const orderBy: any = {}
  switch (sort) {
    case "price-asc":
      orderBy.price = "asc"
      break
    case "price-desc":
      orderBy.price = "desc"
      break
    case "newest":
      orderBy.createdAt = "desc"
      break
    default:
      orderBy.createdAt = "desc"
  }

  let products: any[] = []
  let totalCount = 0
  
  try {
    const [rawProducts, count] = await Promise.all([
      db.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      db.product.count({ where }),
    ])
    products = serializeProducts(rawProducts)
    totalCount = count
  } catch (error) {
    console.error("Database error:", error)
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  // Filter by sizes if provided
  let filteredProducts = products
  if (sizes.length > 0) {
    filteredProducts = products.filter((product) =>
      sizes.some((size) => product.sizes.includes(size))
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of quality clothing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ProductFilters />
            </Suspense>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {totalCount} products
            </p>
            <Suspense fallback={<div>Loading...</div>}>
              <SortSelector currentSort={sort} searchParams={searchParams} />
            </Suspense>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium mb-2">No products found</p>
              <p className="text-muted-foreground">
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
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  {page > 1 && (
                    <a
                      href={`/products?${new URLSearchParams({
                        ...(searchParams as any),
                        page: (page - 1).toString(),
                      }).toString()}`}
                      className="px-4 py-2 border rounded-md hover:bg-muted"
                    >
                      Previous
                    </a>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={`/products?${new URLSearchParams({
                        ...(searchParams as any),
                        page: p.toString(),
                      }).toString()}`}
                      className={`px-4 py-2 border rounded-md ${
                        p === page ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      {p}
                    </a>
                  ))}
                  {page < totalPages && (
                    <a
                      href={`/products?${new URLSearchParams({
                        ...(searchParams as any),
                        page: (page + 1).toString(),
                      }).toString()}`}
                      className="px-4 py-2 border rounded-md hover:bg-muted"
                    >
                      Next
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
