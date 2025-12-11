import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-pink-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Shop by Age
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Find the perfect outfits for your little ones!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 transition-all duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-200 mb-4 md:mb-6 text-base md:text-lg font-medium">
                  {category.description}
                </p>
                <Button
                  className="bg-white/90 text-gray-900 hover:bg-white hover:text-pink-600 group-hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

