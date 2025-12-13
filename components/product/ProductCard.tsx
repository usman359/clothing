import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";

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

interface ProductCardProps {
  product: Product;
  basePath?: string;
}

export function ProductCard({
  product,
  basePath = "/products",
}: ProductCardProps) {
  const imageUrl =
    product.images[0] ||
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80";

  // Calculate original price (50% off)
  const originalPrice = product.price * 2;

  const productUrl = `${basePath}/${product.slug}`;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md bg-card">
      <div className="relative">
        <Link href={productUrl}>
          <div className="relative aspect-square w-full overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm z-10">
                <span className="text-sm font-semibold text-muted-foreground">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </Link>
        {/* SAVE 50% Badge - positioned on top right of container */}
        {product.inStock && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded shadow-lg">
              SAVE 50%
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Link href={productUrl}>
          <h3 className="font-bold text-base mb-1 line-clamp-2 hover:text-primary transition-colors min-h-10">
            {product.name}
          </h3>
        </Link>
        {product.rating && (
          <div className="mb-2">
            <StarRating
              rating={product.rating}
              ratingCount={product.ratingCount}
              size="sm"
            />
          </div>
        )}
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-bold text-red-600">
            from Rs.{product.price.toFixed(2)}
          </p>
          <p className="text-base text-muted-foreground line-through">
            Rs.{originalPrice.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
