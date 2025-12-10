import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { serializeProducts } from "@/lib/serialize";
import {
  ArrowRight,
  Heart,
  Shield,
  Smile,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  let featuredProducts = [];
  try {
    const products = await db.product.findMany({
      take: 6,
      where: { inStock: true },
      orderBy: { createdAt: "desc" },
    });
    featuredProducts = serializeProducts(products);
  } catch (error) {
    console.error("Database error:", error);
    // Continue with empty products array if database is not configured
  }

  const categories = [
    {
      name: "Baby (0-2 Years)",
      href: "/products?category=baby",
      description: "Soft & cozy for little ones",
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
    },
    {
      name: "Toddler (2-4 Years)",
      href: "/products?category=toddler",
      description: "Fun & playful styles",
      image:
        "https://images.unsplash.com/photo-1605360012249-7c46e2f7cbbf?w=800&q=80",
    },
    {
      name: "Big Kids (4-6 Years)",
      href: "/products?category=kids",
      description: "Cool & colorful designs",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    },
    {
      name: "Accessories",
      href: "/products?category=accessories",
      description: "Hats, socks & more fun!",
      image:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-pink-400 via-purple-400 via-yellow-300 to-cyan-400 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zMCAzMGMyIDAgMy0xIDMtMyAwLTIgMC0zIDAtNWMwLTEgMC0yLTEtM2gtNGMtMSAwLTIgMC0zIDF2OGMwIDIgMSAzIDMgM3oiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjIiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxjaXJjbGUgY3g9IjQ1IiBjeT0iNDUiIHI9IjIiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="max-w-3xl space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-sm font-bold shadow-lg">
              <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
              <span>✨ New Fun Collection!</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Little Stars
              <br />
              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                Kids Store
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl leading-relaxed font-semibold drop-shadow-md">
              🎈 Where kids find their favorite outfits!
              <br />
              Colorful, comfy & fun clothing for ages 0-6 ✨
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                asChild
                className="text-base px-8 py-5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-2xl shadow-pink-500/50 transition-all hover:scale-105 rounded-full font-bold"
              >
                <Link href="/products" className="flex items-center">
                  <Smile className="mr-2 h-5 w-5" />
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-5 border-2 border-white/40 text-white hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-105 rounded-full font-bold shadow-lg"
                asChild
              >
                <Link href="/products" className="flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  Explore Collection
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="relative -mt-8 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-2 border-pink-200 dark:border-pink-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-2xl mb-2 text-pink-700 dark:text-pink-300">
                🚚 Free Shipping
              </h3>
              <p className="text-muted-foreground text-base font-medium">
                On orders over $50
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-2xl mb-2 text-blue-700 dark:text-blue-300">
                🛡️ Safe & Secure
              </h3>
              <p className="text-muted-foreground text-base font-medium">
                100% safe checkout
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4 shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-2xl mb-2 text-yellow-700 dark:text-yellow-300">
                ⭐ Super Quality
              </h3>
              <p className="text-muted-foreground text-base font-medium">
                Soft & comfy for kids
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            👕 Shop by Age
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Find the perfect outfits for your little ones! 🎨
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 group-hover:from-black/90 transition-colors duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                <h3 className="text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-200 mb-6 text-lg">
                  {category.description}
                </p>
                <Button
                  variant="secondary"
                  className="group-hover:bg-white group-hover:text-black group-hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                ⭐ Featured Products
              </h2>
              <p className="text-xl text-muted-foreground font-medium">
                Our most loved items! ❤️
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="mt-4 sm:mt-0"
            >
              <Link href="/products" className="flex items-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 backdrop-blur-sm border-2 border-pink-200 dark:border-pink-800 shadow-lg">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="text-base font-bold text-pink-700 dark:text-pink-300">
                Our Story
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              About Little Stars
            </h2>
            <div className="space-y-6 text-xl leading-relaxed font-medium">
              <p className="text-muted-foreground">
                🌟 We make clothes that kids actually want to wear! Our
                collection is all about fun, comfort, and letting little ones
                express their colorful personalities. Every piece is made with
                love, using soft, safe materials that parents trust.
              </p>
              <p className="text-muted-foreground">
                ✨ From cozy baby onesies to cool big kid outfits, we've got
                something special for every little star aged 0-10! Because kids
                deserve clothes that make them smile as much as you do! 😊
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="mt-8 px-10 py-7 text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full font-bold shadow-xl"
            >
              <Link href="/products" className="flex items-center">
                <Heart className="mr-2 h-6 w-6" />
                Explore Our Collection
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
