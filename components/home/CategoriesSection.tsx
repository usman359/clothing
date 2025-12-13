import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Baby (0-2 Years)",
    href: "/products?category=baby",
    description: "Soft & cozy clothing for little ones",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
  },
  {
    name: "Toddler (2-4 Years)",
    href: "/products?category=toddler",
    description: "Fun & playful clothing styles",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80",
  },
  {
    name: "Big Kids (4-6 Years)",
    href: "/products?category=kids",
    description: "Cool & colorful clothing designs",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-12 md:py-16 bg-linear-to-b from-white via-pink-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Shop by Age
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Find the perfect clothing for your little ones!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl aspect-4/3 bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 transition-all duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-100 mb-3 md:mb-4 text-sm md:text-base font-medium leading-relaxed">
                  {category.description}
                </p>
                <Button className="bg-white/90 text-gray-900 hover:bg-white hover:text-pink-600 group-hover:scale-105 transition-all duration-300 shadow-lg font-semibold text-sm px-4 py-2">
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
