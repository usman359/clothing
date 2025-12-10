import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              ⭐ Little Stars Kids Store
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs font-medium">
              ✨ Where kids find their favorite outfits! Colorful, comfy & fun clothing for ages 0-10. Made with love! ❤️
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110 p-2 rounded-full hover:bg-primary/10"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110 p-2 rounded-full hover:bg-primary/10"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110 p-2 rounded-full hover:bg-primary/10"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products?category=baby" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300 font-medium">
                  👶 Baby (0-2 Years)
                </Link>
              </li>
              <li>
                <Link href="/products?category=toddler" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300 font-medium">
                  🧸 Toddler (2-4 Years)
                </Link>
              </li>
              <li>
                <Link href="/products?category=kids" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300 font-medium">
                  ⭐ Big Kids (4-6 Years)
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300 font-medium">
                  🎒 Accessories
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300 font-medium">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider">About</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} Little Stars Kids Store. Made with ❤️ for kids!
          </p>
        </div>
      </div>
    </footer>
  )
}

