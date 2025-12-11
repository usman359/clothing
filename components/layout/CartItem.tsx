"use client"

import Image from "next/image"
import Link from "next/link"
import { CartItem as CartItemType } from "@/types"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 border-b pb-4 last:border-0">
      <Link
        href={`/products/${item.slug}`}
        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border"
      >
        <Image
          src={item.image || "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&q=80"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex-1 space-y-1">
        <Link
          href={`/products/${item.slug}`}
          className="font-medium hover:underline line-clamp-1"
        >
          {item.name}
        </Link>
        <p className="text-sm text-muted-foreground">
          Size: {item.size}
          {item.color && ` • Color: ${item.color}`}
        </p>
        <p className="font-semibold">Rs.{item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => removeItem(item.id, item.size)}
          aria-label="Remove item"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

