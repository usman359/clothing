"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const imageUrl = images[selectedImage] || "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
        <Image
          src={imageUrl}
          alt={`${name} - Image ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border-2 transition-colors",
                selectedImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground"
              )}
            >
              <Image
                src={image || "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&q=80"}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 12vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

