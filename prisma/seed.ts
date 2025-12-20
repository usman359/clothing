require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ["info", "warn", "error"],
});

async function main() {
  console.log("Seeding database...");

  const products = [
    // Classic Collection - Original Jackets
    {
      name: "Classic Winter Jacket - Black",
      slug: "classic-jacket-black",
      description:
        "Premium winter jacket with superior insulation. Features a stylish design with multiple pockets and a comfortable fit. Perfect for cold weather adventures.",
      price: 89.99,
      images: ["/images/extracted/jacket_black.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Black"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Classic Winter Jacket - Grey",
      slug: "classic-jacket-grey",
      description:
        "Versatile grey winter jacket with modern styling. Warm, durable, and perfect for everyday wear. Features adjustable hood and secure zipper closure.",
      price: 89.99,
      images: ["/images/extracted/jacket_grey.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Grey"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Classic Winter Jacket - Brown",
      slug: "classic-jacket-brown",
      description:
        "Stylish brown winter jacket with premium materials. Offers excellent warmth and comfort for outdoor activities. Timeless design that never goes out of style.",
      price: 89.99,
      images: ["/images/extracted/jacket_brown.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Brown"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Classic Winter Jacket - Red",
      slug: "classic-jacket-red",
      description:
        "Bold red winter jacket that stands out. High-quality construction with cozy lining. Perfect for kids who love vibrant colors.",
      price: 89.99,
      images: ["/images/extracted/jacket_red.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Red"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Classic Winter Jacket - Beige Pink",
      slug: "classic-jacket-beige-pink",
      description:
        "Elegant beige-pink winter jacket with a soft, feminine touch. Combines style and warmth perfectly. Ideal for fashion-conscious kids.",
      price: 89.99,
      images: ["/images/extracted/jacket_beige_pink.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Beige", "Pink"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Classic Winter Jacket - Pink",
      slug: "classic-jacket-pink",
      description:
        "Adorable pink winter jacket that kids love. Soft, warm, and stylish with excellent insulation. Perfect for winter playtime.",
      price: 89.99,
      images: ["/images/extracted/jacket_pink_top.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Pink"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },

    // Batch 2 Collection
    {
      name: "Premium Winter Jacket - Beige",
      slug: "batch2-jacket-beige",
      description:
        "Sophisticated beige winter jacket with premium fur-trimmed hood. Offers superior warmth and a luxurious look. Perfect for special occasions and everyday wear.",
      price: 94.99,
      images: ["/images/extracted/batch2_jacket_beige.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Beige"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Premium Winter Jacket - Black",
      slug: "batch2-jacket-black",
      description:
        "Sleek black winter jacket with fur-trimmed hood. Classic design with modern features. Excellent warmth and durability for active kids.",
      price: 94.99,
      images: ["/images/extracted/batch2_jacket_black.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Black"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Premium Winter Jacket - Pink",
      slug: "batch2-jacket-pink",
      description:
        "Beautiful pink winter jacket with luxurious fur trim. Combines fashion and function perfectly. Kids will love the stylish design and cozy warmth.",
      price: 94.99,
      images: ["/images/extracted/batch2_jacket_pink.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Pink"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Premium Winter Jacket - Purple",
      slug: "batch2-jacket-purple",
      description:
        "Vibrant purple winter jacket with premium insulation. Features a stylish fur-trimmed hood and multiple pockets. Perfect for standing out in the crowd.",
      price: 94.99,
      images: ["/images/extracted/batch2_jacket_purple.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Purple"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Premium Winter Jacket - Red",
      slug: "batch2-jacket-red",
      description:
        "Eye-catching red winter jacket with superior quality. Warm, comfortable, and stylish. Great for outdoor winter activities.",
      price: 94.99,
      images: ["/images/extracted/batch2_jacket_red.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Red"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },

    // Batch 3 Collection
    {
      name: "Deluxe Winter Jacket - Beige",
      slug: "batch3-jacket-beige",
      description:
        "Deluxe beige winter jacket with exceptional warmth. Premium materials and expert craftsmanship. Perfect for the coldest winter days.",
      price: 99.99,
      images: ["/images/extracted/batch3_jacket_beige.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Beige"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Deluxe Winter Jacket - Black",
      slug: "batch3-jacket-black",
      description:
        "Premium black winter jacket with superior insulation. Timeless design with modern features. Built to last through many winters.",
      price: 99.99,
      images: ["/images/extracted/batch3_jacket_black.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Black"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Deluxe Winter Jacket - Green",
      slug: "batch3-jacket-green",
      description:
        "Stylish green winter jacket with excellent warmth. Unique color that stands out. Perfect for nature-loving kids.",
      price: 99.99,
      images: ["/images/extracted/batch3_jacket_green.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Green"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Deluxe Winter Jacket - Peach",
      slug: "batch3-jacket-peach",
      description:
        "Lovely peach winter jacket with soft, warm lining. Beautiful color and comfortable fit. Great for everyday winter wear.",
      price: 99.99,
      images: ["/images/extracted/batch3_jacket_peach.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Peach"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Deluxe Winter Jacket - Pink",
      slug: "batch3-jacket-pink",
      description:
        "Charming pink winter jacket with premium quality. Soft, warm, and stylish. A favorite among kids who love pink.",
      price: 99.99,
      images: ["/images/extracted/batch3_jacket_pink.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Pink"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Deluxe Winter Jacket - Red",
      slug: "batch3-jacket-red",
      description:
        "Bold red winter jacket with exceptional warmth. High-quality materials and construction. Perfect for active outdoor play.",
      price: 99.99,
      images: ["/images/extracted/batch3_jacket_red.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Red"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Deluxe Winter Jacket - Back View",
      slug: "batch3-jacket-back",
      description:
        "Premium winter jacket showcasing excellent back design. Features reinforced stitching and durable materials. Built for comfort and longevity.",
      price: 99.99,
      images: ["/images/extracted/batch3_jacket_back.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Black"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },

    // Batch 4 Collection
    {
      name: "Elite Winter Jacket - Beige",
      slug: "batch4-jacket-beige",
      description:
        "Elite beige winter jacket with superior craftsmanship. Premium insulation and stylish design. Perfect for discerning parents.",
      price: 104.99,
      images: ["/images/extracted/batch4_jacket_beige.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Beige"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Elite Winter Jacket - Black",
      slug: "batch4-jacket-black",
      description:
        "Premium black winter jacket with exceptional quality. Timeless style with modern warmth technology. A wardrobe essential.",
      price: 104.99,
      images: ["/images/extracted/batch4_jacket_black.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Black"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Elite Winter Jacket - Navy",
      slug: "batch4-jacket-navy",
      description:
        "Sophisticated navy winter jacket with premium features. Classic color with modern design. Perfect for any occasion.",
      price: 104.99,
      images: ["/images/extracted/batch4_jacket_navy.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Navy"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "Elite Winter Jacket - Red",
      slug: "batch4-jacket-red",
      description:
        "Striking red winter jacket with top-tier quality. Vibrant color and excellent warmth. Makes a bold fashion statement.",
      price: 104.99,
      images: ["/images/extracted/batch4_jacket_red.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Red"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },

    // Batch 5 Collection - UIM Brand
    {
      name: "UIM Winter Jacket - Black",
      slug: "batch5-jacket-black",
      description:
        "Premium UIM branded winter jacket in classic black. Features fur-trimmed hood, multiple utility pockets, and superior insulation. Perfect for extreme cold weather.",
      price: 109.99,
      images: ["/images/extracted/batch5_jacket_black.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Black"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "UIM Winter Jacket - Navy",
      slug: "batch5-jacket-navy",
      description:
        "Stylish UIM navy winter jacket with premium quality. Features branded utility pockets and luxurious fur trim. Excellent for outdoor adventures.",
      price: 109.99,
      images: ["/images/extracted/batch5_jacket_navy.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Navy"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "UIM Winter Jacket - Olive",
      slug: "batch5-jacket-olive",
      description:
        "Trendy UIM olive winter jacket with military-inspired design. Premium materials and exceptional warmth. Perfect for adventurous kids.",
      price: 109.99,
      images: ["/images/extracted/batch5_jacket_olive.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Olive"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
    {
      name: "UIM Winter Jacket - Grey",
      slug: "batch5-jacket-grey",
      description:
        "Versatile UIM grey winter jacket with modern styling. Features premium insulation and branded details. Great for everyday wear.",
      price: 109.99,
      images: ["/images/extracted/batch5_jacket_grey.png"],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
      colors: ["Grey"],
      inStock: true,
      rating: 0,
      ratingCount: 0,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        category: product.category,
        sizes: product.sizes,
        colors: product.colors,
        inStock: product.inStock,
        rating: product.rating,
        ratingCount: product.ratingCount,
      },
      create: product,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
