import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl =
    product.images[0] ||
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80";

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 shadow-lg bg-card">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm z-10">
              <span className="text-lg font-semibold text-muted-foreground">
                Out of Stock
              </span>
            </div>
          )}
          {product.inStock && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg">
                View Details
              </div>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors group-hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground capitalize mb-3 font-medium">
          {product.category}
        </p>
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full group/btn bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full font-bold"
          disabled={!product.inStock}
          asChild
        >
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center"
          >
            <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
            {product.inStock ? "View Details" : "Out of Stock"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
