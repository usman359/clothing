import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  category: string
  inStock: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0] || "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80"

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <span className="text-lg font-semibold text-muted-foreground">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold mb-1 line-clamp-1 hover:underline">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground capitalize mb-2">{product.category}</p>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={!product.inStock}
          asChild
        >
          <Link href={`/products/${product.slug}`}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? "View Details" : "Out of Stock"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

