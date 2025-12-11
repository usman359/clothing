"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CartSheet } from "@/components/layout/CartSheet";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartSheetOpen, setCartSheetOpen] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image:
        product.images[0] ||
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
      size: selectedSize,
      quantity,
      slug: product.slug,
      color: product.colors[0] || undefined,
    });

    // Open the cart sheet
    setCartSheetOpen(true);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image:
        product.images[0] ||
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
      size: selectedSize,
      quantity,
      slug: product.slug,
      color: product.colors[0] || undefined,
    });

    router.push("/checkout");
  };

  if (!product.inStock) {
    return (
      <Button disabled className="w-full bg-gray-400 text-white" size="lg">
        Out of Stock
      </Button>
    );
  }

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div className="space-y-3">
        <label className="text-sm font-bold uppercase tracking-wide">
          Size
        </label>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <Button
              key={size}
              type="button"
              variant={selectedSize === size ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSize(size)}
              className={cn(
                "min-w-[3.5rem] h-10 font-semibold",
                selectedSize === size
                  ? "bg-black text-white border-black hover:bg-black/90"
                  : "bg-white text-black border-black hover:bg-gray-100"
              )}
            >
              {size}
            </Button>
          ))}
        </div>
        {!selectedSize && (
          <p className="text-sm text-red-600">Please select a size</p>
        )}
      </div>

      {/* Quantity Selection */}
      <div className="space-y-3">
        <label className="text-sm font-bold uppercase tracking-wide">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 border-black"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </Button>
          <span className="w-12 text-center font-semibold text-lg">
            {quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 border-black"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          className="w-full bg-white hover:bg-gray-100 text-black border-2 border-black font-bold"
          size="lg"
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          Add to cart
        </Button>
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
          size="lg"
          onClick={handleBuyNow}
          disabled={!selectedSize}
        >
          Buy it now
        </Button>
      </div>

      {/* Size Chart Link */}
      <div>
        <a
          href="#size-chart"
          className="text-sm underline text-muted-foreground hover:text-primary"
        >
          Size Chart
        </a>
      </div>

      {/* Cart Sheet */}
      <CartSheet open={cartSheetOpen} onOpenChange={setCartSheetOpen} />
    </div>
  );
}
