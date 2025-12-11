import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Heart, Sparkles } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-purple-50/50 via-pink-50/50 to-blue-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-pink-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="text-base font-bold text-pink-700">
              Our Story
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            About Little Stars
          </h2>
          <div className="space-y-6 text-lg md:text-xl leading-relaxed">
            <p className="text-gray-700 font-medium">
              We make clothes that kids actually want to wear! Our collection is all about fun, comfort, and letting little ones express their colorful personalities. Every piece is made with love, using soft, safe materials that parents trust.
            </p>
            <p className="text-gray-700 font-medium">
              From cozy baby onesies to cool big kid outfits, we&apos;ve got something special for every little star aged 0-6! Because kids deserve clothes that make them smile as much as you do!
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 border border-pink-200 shadow-sm">
              <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
              <span className="text-sm font-semibold text-gray-700">Made with Love</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 border border-purple-200 shadow-sm">
              <Sparkles className="h-5 w-5 text-purple-500 fill-purple-500" />
              <span className="text-sm font-semibold text-gray-700">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 border border-blue-200 shadow-sm">
              <Star className="h-5 w-5 text-blue-500 fill-blue-500" />
              <span className="text-sm font-semibold text-gray-700">Kid Approved</span>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="mt-8 px-8 md:px-10 py-6 md:py-7 text-base md:text-lg bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Link href="/collections">
              Explore Our Collection
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

