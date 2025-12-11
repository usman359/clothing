export function serializeProduct(product: any) {
  return {
    ...product,
    price: Number(product.price),
    rating: product.rating ? Number(product.rating) : null,
    ratingCount: product.ratingCount || 0,
  };
}

export function serializeProducts(products: any[]) {
  return products.map(serializeProduct);
}
