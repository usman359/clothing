"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const categories = ["men", "women", "accessories"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38", "One Size"]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState<number[]>([
    parseInt(searchParams.get("minPrice") || "0"),
    parseInt(searchParams.get("maxPrice") || "500"),
  ])

  const selectedCategory = searchParams.get("category") || ""
  const selectedSizes = searchParams.getAll("size")

  const updateSearchParams = (key: string, value: string | string[], clear = false) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (clear || !value || (Array.isArray(value) && value.length === 0)) {
      params.delete(key)
    } else if (Array.isArray(value)) {
      params.delete(key)
      value.forEach((v) => params.append(key, v))
    } else {
      params.set(key, value)
    }

    router.push(`/products?${params.toString()}`)
  }

  const handleSizeToggle = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size]
    updateSearchParams("size", newSizes)
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
    const params = new URLSearchParams(searchParams.toString())
    params.set("minPrice", values[0].toString())
    params.set("maxPrice", values[1].toString())
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/products")
    setPriceRange([0, 500])
  }

  const hasActiveFilters =
    selectedCategory || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 500

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={selectedCategory || "all"}
            onValueChange={(value) => updateSearchParams("category", value === "all" ? "" : value, value === "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Size Filter */}
        <div className="space-y-3">
          <Label>Sizes</Label>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={selectedSizes.includes(size)}
                  onCheckedChange={() => handleSizeToggle(size)}
                />
                <Label
                  htmlFor={`size-${size}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={500}
            step={10}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}

