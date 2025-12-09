"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortSelectorProps {
  currentSort: string
  searchParams: Record<string, string | string[] | undefined>
}

export function SortSelector({ currentSort, searchParams }: SortSelectorProps) {
  const router = useRouter()

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams()
    
    Object.entries(searchParams).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => params.append(key, v))
      } else if (val) {
        params.set(key, val)
      }
    })
    
    params.set("sort", value)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  )
}

