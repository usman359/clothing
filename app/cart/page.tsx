"use client"

import { useCart } from "@/lib/cart-context"
import { CartItem } from "@/components/layout/CartItem"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const { items, getTotal, clearCart } = useCart()
  const subtotal = getTotal()
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={`${item.id}-${item.size}`} item={item} />
          ))}
          <div className="flex justify-end">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rs.{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Rs.{shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>Rs.{total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white" size="lg" asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

