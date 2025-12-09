import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/ProductCard"
import { db } from "@/lib/db"
import { serializeProducts } from "@/lib/serialize"
import { ArrowRight, TrendingUp, Sparkles } from "lucide-react"

export default async function HomePage() {
  let featuredProducts = []
  try {
    const products = await db.product.findMany({
      take: 6,
      where: { inStock: true },
      orderBy: { createdAt: "desc" },
    })
    featuredProducts = serializeProducts(products)
  } catch (error) {
    console.error("Database error:", error)
    // Continue with empty products array if database is not configured
  }

  const categories = [
    {
      name: "Men's Collection",
      href: "/products?category=men",
      description: "Stylish clothing for men",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    },
    {
      name: "Women's Collection",
      href: "/products?category=women",
      description: "Elegant fashion for women",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    },
    {
      name: "Accessories",
      href: "/products?category=accessories",
      description: "Complete your look",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>New Collection Available</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Style That Speaks
              <br />
              <span className="text-gray-300">Your Story</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Discover our latest collection of premium clothing designed for the modern lifestyle.
              Quality meets style in every piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-base">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base border-white text-white hover:bg-white hover:text-black" asChild>
                <Link href="/products?category=sale">
                  View Sale
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
            >
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-200 mb-4">{category.description}</p>
                <Button variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" asChild>
              <Link href="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">About Fashion Store</h2>
          <p className="text-lg text-muted-foreground">
            We believe that fashion should be accessible, sustainable, and empowering. Our carefully
            curated collection brings together the best in contemporary design with a commitment to
            quality and ethical production.
          </p>
          <p className="text-muted-foreground">
            From everyday essentials to statement pieces, every item in our collection is chosen to
            help you express your unique style while feeling comfortable and confident.
          </p>
          <Button asChild variant="outline">
            <Link href="/products">Explore Our Collection</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
