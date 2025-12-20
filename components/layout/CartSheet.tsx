"use client";

import { useCart } from "@/lib/cart-context";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/layout/CartItem";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, getTotal } = useCart();
  const total = getTotal();
  const shipping = total > 0 ? 200 : 0;
  const finalTotal = total + shipping;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 bg-white">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-gray-200 bg-white">
          <SheetTitle className="text-2xl font-bold text-black">
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            {items.length === 0
              ? "Your cart is empty"
              : `${items.length} item${
                  items.length === 1 ? "" : "s"
                } in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-140px)] px-6 bg-white">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-12 bg-white">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-lg font-semibold mb-2 text-black">
                Your cart is empty
              </p>
              <p className="text-gray-600 mb-6">
                Start adding items to your cart to see them here
              </p>
              <Button
                onClick={() => onOpenChange(false)}
                className="bg-pink-500 hover:bg-pink-600 text-white"
                asChild
              >
                <Link href="/collections">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 py-4 bg-white">
                {items.map((item) => (
                  <CartItem key={`${item.id}-${item.size}`} item={item} />
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 pb-6 space-y-4 bg-white">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-black">
                      Rs.{total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-black">
                      Rs.{shipping.toFixed(2)}
                    </span>
                  </div>
                  <Separator className="bg-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-black">Total</span>
                    <span className="text-red-600">
                      Rs.{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold"
                    size="lg"
                    onClick={() => onOpenChange(false)}
                    asChild
                  >
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-black hover:bg-gray-50"
                    onClick={() => onOpenChange(false)}
                    asChild
                  >
                    <Link href="/collections">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
