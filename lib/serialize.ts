export function serializeProduct(product: any) {
  return {
    ...product,
    price: Number(product.price),
  }
}

export function serializeProducts(products: any[]) {
  return products.map(serializeProduct)
}

