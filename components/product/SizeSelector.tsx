"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SizeSelectorProps {
  sizes: string[]
  selectedSize: string | null
  onSizeSelect: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSizeSelect }: SizeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Size</label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Button
            key={size}
            type="button"
            variant={selectedSize === size ? "default" : "outline"}
            size="sm"
            onClick={() => onSizeSelect(size)}
            className={cn(
              "min-w-[3rem]",
              selectedSize === size && "bg-primary text-primary-foreground"
            )}
          >
            {size}
          </Button>
        ))}
      </div>
      {!selectedSize && (
        <p className="text-sm text-destructive">Please select a size</p>
      )}
    </div>
  )
}

