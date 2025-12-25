"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Menu, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const { getItemCount, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = getItemCount();

  return (
    <header className="w-full border-b border-pink-200/50 bg-white/95 backdrop-blur-lg supports-backdrop-filter:bg-white/90 shadow-md">
      <div className="container mx-auto flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/logo.png"
            alt="TinnyTrends Logo"
            width={150}
            height={150}
            className="object-cover"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <Link
            href="/collections"
            className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200 relative group"
          >
            All Products
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-pink-500 to-purple-500 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
          </Link>
          <Link
            href="/products?category=baby"
            className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200 relative group"
          >
            👶 Baby
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-pink-500 to-purple-500 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
          </Link>
          <Link
            href="/products?category=toddler"
            className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200 relative group"
          >
            🧸 Toddler
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-pink-500 to-purple-500 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
          </Link>
          <Link
            href="/products?category=kids"
            className="px-4 py-2 text-base font-semibold text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200 relative group"
          >
            ⭐ Big Kids
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-pink-500 to-purple-500 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></span>
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-full hover:bg-pink-100 transition-all duration-200 hover:scale-110"
            onClick={() => setIsOpen(true)}
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-pink-600" />
            {itemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold bg-pink-500 hover:bg-pink-600 shadow-lg border-2 border-white"
              >
                {itemCount}
              </Badge>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10 rounded-full hover:bg-pink-100 transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-pink-200/50 bg-white shadow-lg">
          <nav className="container mx-auto flex flex-col px-4 py-4 space-y-1">
            <Link
              href="/"
              className="px-4 py-3 text-lg font-semibold text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/collections"
              className="px-4 py-3 text-lg font-semibold text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              href="/products?category=baby"
              className="px-4 py-3 text-lg font-semibold text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              👶 Baby (0-2 Years)
            </Link>
            <Link
              href="/products?category=toddler"
              className="px-4 py-3 text-lg font-semibold text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              🧸 Toddler (2-4 Years)
            </Link>
            <Link
              href="/products?category=kids"
              className="px-4 py-3 text-lg font-semibold text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              ⭐ Big Kids (4-6 Years)
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
