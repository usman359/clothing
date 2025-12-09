import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <Package className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the product you&apos;re looking for.
        </p>
        <Button asChild>
          <Link href="/products">Browse All Products</Link>
        </Button>
      </div>
    </div>
  )
}

