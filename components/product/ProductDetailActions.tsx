"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SizeChartModal } from "@/components/product/SizeChartModal";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  category?: string;
}

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem, addItemSilent } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        description: "You need to select a size before adding to cart.",
        duration: 3000,
      });
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

    // Reset quantity to 1 after adding
    setQuantity(1);

    // Cart sheet will be opened automatically by addItem
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        description: "You need to select a size before buying.",
        duration: 3000,
      });
      return;
    }

    // Use addItemSilent to not open cart sheet
    addItemSilent({
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

    // Reset quantity to 1
    setQuantity(1);

    // Go directly to checkout without opening cart sheet
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
                "min-w-14 h-10 font-semibold",
                selectedSize === size
                  ? "bg-black text-white border-black hover:bg-black/90"
                  : "bg-white text-black border-black hover:bg-gray-100"
              )}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity Selection - Matching Size Buttons Style */}
      <div className="space-y-3">
        <label className="text-sm font-bold uppercase tracking-wide">
          Quantity
        </label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="min-w-10 h-10 font-semibold bg-white text-black border-black hover:bg-gray-100"
          >
            -
          </Button>
          <div className="min-w-14 h-10 flex items-center justify-center font-semibold border border-black rounded-md bg-white">
            {quantity}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            className="min-w-10 h-10 font-semibold bg-white text-black border-black hover:bg-gray-100"
          >
            +
          </Button>
        </div>
      </div>

      {/* Action Buttons - Always enabled, show toast if no size */}
      <div className="space-y-3">
        <Button
          className="w-full bg-white hover:bg-gray-100 text-black border-2 border-black font-bold"
          size="lg"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
          size="lg"
          onClick={handleBuyNow}
        >
          Buy it now
        </Button>
      </div>

      {/* Size Chart Button */}
      <div>
        <button
          onClick={() => setSizeChartOpen(true)}
          className="text-sm underline text-muted-foreground hover:text-primary font-medium"
          type="button"
        >
          📏 View Size Chart
        </button>
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        open={sizeChartOpen}
        onOpenChange={setSizeChartOpen}
        productSlug={product.slug}
      />
    </div>
  );
}
