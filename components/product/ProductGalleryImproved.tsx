"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryImprovedProps {
  images: string[];
  name: string;
}

export function ProductGalleryImproved({
  images,
  name,
}: ProductGalleryImprovedProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const displayImages =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
        ];

  return (
    <div className="flex gap-4">
      {/* Thumbnail Gallery - Vertical on Left */}
      {displayImages.length > 1 && (
        <div className="flex flex-col gap-2 flex-shrink-0">
          {displayImages.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative w-20 h-20 overflow-hidden rounded-md border-2 transition-all",
                selectedImage === index
                  ? "border-black scale-105"
                  : "border-gray-200 hover:border-gray-400"
              )}
            >
              <Image
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
        <Image
          src={displayImages[selectedImage]}
          alt={`${name} - Image ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
