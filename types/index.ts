export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  color?: string
  quantity: number
  slug: string
}

export interface Cart {
  items: CartItem[]
  total: number
}

export type ProductCategory = "men" | "women" | "accessories" | "sale"

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL"

