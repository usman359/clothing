"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { SizeSelector } from "./SizeSelector"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  inStock: boolean
}

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!selectedSize) {
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
      size: selectedSize,
      quantity,
      slug: product.slug,
      color: product.colors[0] || undefined,
    })
  }

  if (!product.inStock) {
    return (
      <Button disabled className="w-full" size="lg">
        Out of Stock
      </Button>
    )
  }

  return (
    <div className="space-y-4">
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Quantity:</label>
          <div className="flex items-center gap-2 border rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleAddToCart}
        disabled={!selectedSize}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  )
}

