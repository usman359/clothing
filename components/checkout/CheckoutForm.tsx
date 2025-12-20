"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/lib/cart-context";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export function CheckoutForm() {
  const { items, getTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const subtotal = getTotal();
  const shipping = subtotal > 0 ? 200 : 0;
  const total = subtotal + shipping;

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          items,
          totalAmount: total,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to place order");
      }

      const order = await response.json();
      clearCart();
      router.push(
        `/order-success?orderId=${order.id}&orderNumber=${order.orderNumber}`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* Checkout Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
            <CardTitle className="text-2xl font-bold">
              Shipping Information
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Please provide your delivery details
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customerName"
                  {...register("customerName")}
                  placeholder="John Doe"
                  className="border-2 focus:border-pink-500"
                />
                {errors.customerName && (
                  <p className="text-sm text-destructive">
                    {errors.customerName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className="border-2 focus:border-pink-500"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+92 300 1234567"
                className="border-2 focus:border-pink-500"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                Address <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="address"
                {...register("address")}
                placeholder="123 Main Street, Apt 4B"
                rows={3}
                className="border-2 focus:border-pink-500"
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">
                  City <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  {...register("city")}
                  placeholder="Karachi"
                  className="border-2 focus:border-pink-500"
                />
                {errors.city && (
                  <p className="text-sm text-destructive">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  State <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="state"
                  {...register("state")}
                  placeholder="Sindh"
                  className="border-2 focus:border-pink-500"
                />
                {errors.state && (
                  <p className="text-sm text-destructive">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">
                  ZIP Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="zipCode"
                  {...register("zipCode")}
                  placeholder="75000"
                  className="border-2 focus:border-pink-500"
                />
                {errors.zipCode && (
                  <p className="text-sm text-destructive">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
              <Textarea
                id="orderNotes"
                {...register("orderNotes")}
                placeholder="Any special instructions for delivery..."
                rows={3}
                className="border-2 focus:border-pink-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
            <CardTitle className="text-2xl font-bold">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-lg border-2 border-pink-200 dark:border-pink-800 p-6 bg-linear-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">₹</span>
                </div>
                <div>
                  <p className="font-bold text-lg">Cash on Delivery (COD)</p>
                  <p className="text-sm text-muted-foreground">
                    Pay when your order is delivered
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg py-6 shadow-lg hover:shadow-xl transition-all"
          disabled={isSubmitting || items.length === 0}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </Button>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-20 border-2 shadow-lg">
          <CardHeader className="bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
            <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex justify-between items-start gap-2 pb-3 border-b last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Size: {item.size} × Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-sm whitespace-nowrap">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">Rs.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">Rs.{shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold pt-2">
                <span>Total</span>
                <span className="text-red-600">Rs.{total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
