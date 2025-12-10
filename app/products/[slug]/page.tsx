import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SizeSelector } from "@/components/product/SizeSelector";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ProductCard } from "@/components/product/ProductCard";
import { Separator } from "@/components/ui/separator";
import { serializeProduct, serializeProducts } from "@/lib/serialize";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await db.product.findFirst({
      where: { slug },
    });

    if (!product) {
      return {
        title: "Product Not Found",
      };
    }

    return {
      title: `${product.name} - Fashion Store`,
      description: product.description,
    };
  } catch (error) {
    console.error("Error fetching product for metadata:", error);
    return {
      title: "Product Not Found",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  let rawProduct;
  try {
    rawProduct = await db.product.findFirst({
      where: { slug },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }

  if (!rawProduct) {
    notFound();
  }

  const product = serializeProduct(rawProduct);

  const relatedProductsRaw = await db.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
      inStock: true,
    },
    take: 4,
  });

  const relatedProducts = serializeProducts(relatedProductsRaw);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-pink-50/30 dark:to-pink-950/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Product Images */}
        <div>
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mb-4">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground capitalize">
                Category: {product.category}
              </span>
              {product.inStock ? (
                <span className="text-sm text-green-600 font-medium">
                  In Stock
                </span>
              ) : (
                <span className="text-sm text-destructive font-medium">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Color</label>
                <p className="text-sm text-muted-foreground">
                  {product.colors.join(", ")}
                </p>
              </div>
            )}

            <AddToCartButton product={product} />
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {product.description}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Size Guide</h2>
            <p className="text-sm text-muted-foreground">
              Available sizes: {product.sizes.join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-center md:text-left">
            ⭐ You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
