"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1920&q=90&auto=format&fit=crop",
    title: "Little Stars",
    subtitle: "Kids Store",
    description:
      "🎈 Where kids find their favorite outfits! Colorful, comfy & fun clothing for ages 0-6 ✨",
    buttonText: "Shop Now",
    buttonLink: "/collections",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920&q=90&auto=format&fit=crop",
    title: "Premium Quality",
    subtitle: "Soft & Comfy",
    description:
      "⭐ Made with love using soft, safe materials that parents trust!",
    buttonText: "Shop Now",
    buttonLink: "/collections",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1920&q=90&auto=format&fit=crop",
    title: "Fun & Playful",
    subtitle: "For Every Adventure",
    description:
      "🌟 Perfect outfits for playtime, parties, and everyday adventures!",
    buttonText: "Shop Now",
    buttonLink: "/collections",
  },
];

export function HeroSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/50 !opacity-100",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            const navigation = swiper.params.navigation;
            if (navigation) {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover"
                sizes="100vw"
                unoptimized={false}
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/40" />
            </div>
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl space-y-6 animate-fade-in">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/50 text-sm font-bold text-pink-600 shadow-xl mb-4">
                    <span>New Fun Collection!</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white drop-shadow-2xl">
                    {slide.title}
                    <br />
                    <span className="bg-linear-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                      {slide.subtitle}
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl leading-relaxed font-semibold drop-shadow-lg">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      size="lg"
                      asChild
                      className="text-base px-8 md:px-10 py-6 md:py-7 bg-pink-500 hover:bg-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-full font-bold"
                    >
                      <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-base px-8 md:px-10 py-6 md:py-7 border-2 border-white/60 text-white hover:bg-white/30 hover:border-white backdrop-blur-sm transition-all duration-300 hover:scale-105 rounded-full font-bold shadow-xl"
                      asChild
                    >
                      <Link href="/collections">Explore Collection</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        ref={prevRef}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:bg-white/30 hover:border-white/60 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 stroke-3" />
      </button>

      <button
        ref={nextRef}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:bg-white/30 hover:border-white/60 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 stroke-3" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent z-20 pointer-events-none"></div>
    </section>
  );
}
