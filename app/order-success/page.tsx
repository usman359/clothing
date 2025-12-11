import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Home } from "lucide-react"
import Link from "next/link"

interface OrderSuccessPageProps {
  searchParams: {
    orderId?: string
    orderNumber?: string
  }
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const { orderId, orderNumber } = searchParams

  if (!orderId || !orderNumber) {
    redirect("/")
  }

  let order
  try {
    order = await db.order.findFirst({
      where: { id: orderId },
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    redirect("/")
  }

  if (!order) {
    redirect("/")
  }

  const items = order.items as any[]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-semibold">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-semibold">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold capitalize">{order.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-muted-foreground">{order.address}</p>
              <p className="text-muted-foreground">
                {order.city}, {order.state} {order.zipCode}
              </p>
              <p className="text-muted-foreground">{order.phone}</p>
              <p className="text-muted-foreground">{order.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="pt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rs.{(Number(order.totalAmount) - 10).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Rs.10.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>Rs.{Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {order.orderNotes && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{order.orderNotes}</p>
            </CardContent>
          </Card>
        )}

        <div className="bg-muted rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-2">What&apos;s Next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• You will receive an email confirmation shortly</li>
            <li>• We&apos;ll prepare your order for shipment</li>
            <li>• Payment will be collected upon delivery (Cash on Delivery)</li>
            <li>• You&apos;ll receive tracking information once your order ships</li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

