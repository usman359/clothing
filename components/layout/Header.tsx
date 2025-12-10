"use client"

import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function Header() {
  const { getItemCount, setIsOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const itemCount = getItemCount()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              ⭐ Little Stars
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-bold transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all duration-300"
          >
            🏠 Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-bold transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all duration-300"
          >
            👕 All Products
          </Link>
          <Link
            href="/products?category=baby"
            className="text-sm font-bold transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all duration-300"
          >
            👶 Baby
          </Link>
          <Link
            href="/products?category=toddler"
            className="text-sm font-bold transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all duration-300"
          >
            🧸 Toddler
          </Link>
            <Link
              href="/products?category=kids"
              className="text-sm font-bold transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all duration-300"
            >
              ⭐ Big Kids
            </Link>
          <Link
            href="/products?category=accessories"
            className="text-sm font-bold transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all duration-300"
          >
            🎒 Accessories
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/10 transition-colors rounded-full"
            onClick={() => setIsOpen(true)}
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5 transition-transform hover:scale-110" />
            {itemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse shadow-lg"
              >
                {itemCount}
              </Badge>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t bg-background">
          <div className="container flex flex-col space-y-2 px-4 py-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/products?category=baby"
              className="text-sm font-bold transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              👶 Baby (0-2 Years)
            </Link>
            <Link
              href="/products?category=toddler"
              className="text-sm font-bold transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              🧸 Toddler (2-4 Years)
            </Link>
            <Link
              href="/products?category=kids"
              className="text-sm font-bold transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              ⭐ Big Kids (4-6 Years)
            </Link>
            <Link
              href="/products?category=accessories"
              className="text-sm font-bold transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              🎒 Accessories
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

