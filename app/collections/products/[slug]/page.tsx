import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductGalleryImproved } from "@/components/product/ProductGalleryImproved";
import { ProductDetailActions } from "@/components/product/ProductDetailActions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { serializeProduct } from "@/lib/serialize";
import type { Metadata } from "next";
import { SocialSharing } from "@/components/product/SocialSharing";
import { SimilarProducts } from "@/components/product/SimilarProducts";
import { AskQuestionButton } from "@/components/product/AskQuestionButton";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - TinnyTrends`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await db.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  const serializedProduct = serializeProduct(product);
  const originalPrice = Number(product.price) * 2;

  // Use actual product images only (no duplication)
  const productImages =
    product.images.length > 0
      ? product.images
      : [
          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
        ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images - Left Side */}
          <div className="w-full">
            <ProductGalleryImproved
              images={productImages}
              name={product.name}
            />
          </div>

          {/* Product Info - Right Side */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {product.name}
              </h1>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <p className="text-2xl md:text-3xl font-bold text-red-600">
                  Rs.{product.price.toFixed(2)}
                </p>
                <p className="text-lg text-muted-foreground line-through">
                  Rs.{originalPrice.toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping calculated at checkout.
              </p>
            </div>

            {/* Product Actions */}
            <ProductDetailActions product={serializedProduct} />

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger className="text-left font-semibold">
                  DESCRIPTION
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {product.description}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="exchange">
                <AccordionTrigger className="text-left font-semibold">
                  EXCHANGE AND RETURN POLICY
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We offer a hassle-free exchange and return policy. Items can
                    be exchanged or returned within 7 days of delivery, provided
                    they are in original condition with tags attached. For
                    exchanges, please contact our customer service team.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-left font-semibold">
                  SHIPPING POLICY
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    We ship all orders within 1-2 business days. Standard
                    shipping takes 3-5 business days. Express shipping options
                    are available at checkout. Free shipping on orders over
                    Rs.5000.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq">
                <AccordionTrigger className="text-left font-semibold">
                  FAQ
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <p className="font-semibold mb-1">
                        What sizes are available?
                      </p>
                      <p>Available sizes: {product.sizes.join(", ")}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">
                        How do I care for this product?
                      </p>
                      <p>
                        Follow the care instructions on the label. Most items
                        are machine washable on gentle cycle.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">
                        Is this product in stock?
                      </p>
                      <p>
                        {product.inStock
                          ? "Yes, this product is currently in stock."
                          : "This product is currently out of stock."}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ask">
                <AccordionTrigger className="text-left font-semibold">
                  ASK A QUESTION
                </AccordionTrigger>
                <AccordionContent>
                  <AskQuestionButton
                    productName={product.name}
                    productSlug={product.slug}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Social Sharing */}
            <SocialSharing
              productName={product.name}
              productImage={product.images[0] || ""}
              productSlug={product.slug}
            />

            {/* Customer Reviews Section */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-gray-300">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">
                      ☆
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">No reviews yet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <SimilarProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
}
