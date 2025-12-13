import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Heart, Sparkles } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-linear-to-b from-purple-50/50 via-pink-50/50 to-blue-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/80 backdrop-blur-sm border-2 border-pink-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            <span className="text-lg md:text-xl font-bold text-pink-700">
              Our Story
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            About Little Stars
          </h2>
          <div className="space-y-8 text-xl md:text-2xl leading-relaxed">
            <p className="text-gray-700 font-medium">
              We make clothes that kids actually want to wear! Our collection is
              all about fun, comfort, and letting little ones express their
              colorful personalities. Every piece is made with love, using soft,
              safe materials that parents trust.
            </p>
            <p className="text-gray-700 font-medium">
              From cozy baby onesies to cool big kid outfits, we&apos;ve got
              something special for every little star aged 0-6! Because kids
              deserve clothes that make them smile as much as you do!
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5 pt-6">
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/80 border border-pink-200 shadow-sm">
              <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
              <span className="text-base md:text-lg font-semibold text-gray-700">
                Made with Love
              </span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/80 border border-purple-200 shadow-sm">
              <Sparkles className="h-6 w-6 text-purple-500 fill-purple-500" />
              <span className="text-base md:text-lg font-semibold text-gray-700">
                Premium Quality
              </span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/80 border border-blue-200 shadow-sm">
              <Star className="h-6 w-6 text-blue-500 fill-blue-500" />
              <span className="text-base md:text-lg font-semibold text-gray-700">
                Kid Approved
              </span>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="mt-10 px-10 md:px-12 py-7 md:py-8 text-lg md:text-xl bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Link href="/collections">Explore Our Collection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
