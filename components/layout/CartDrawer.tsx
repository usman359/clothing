"use client"

import { useCart } from "@/lib/cart-context"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/layout/CartItem"
import Link from "next/link"
import { ShoppingBag, X } from "lucide-react"

export function CartDrawer() {
  const { isOpen, setIsOpen, items, getTotal } = useCart()
  const total = getTotal()

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close cart"
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerTitle>
          <DrawerDescription>
            {items.length === 0
              ? "Your cart is empty"
              : `${items.length} item${items.length === 1 ? "" : "s"} in your cart`}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-muted-foreground mb-6">
                Start adding items to your cart to see them here
              </p>
              <Button onClick={() => setIsOpen(false)} asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.size}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter>
            <div className="space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button className="flex-1" onClick={() => setIsOpen(false)} asChild>
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}

