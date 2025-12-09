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
    {
      name: "Classic White T-Shirt",
      slug: "classic-white-tshirt",
      description:
        "A timeless classic white t-shirt made from premium cotton. Perfect for everyday wear with a comfortable fit and breathable fabric.",
      price: 29.99,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80&auto=format&fit=crop",
      ],
      category: "men",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White"],
      inStock: true,
    },
    {
      name: "Denim Jacket",
      slug: "denim-jacket",
      description:
        "Vintage-inspired denim jacket with a relaxed fit. Features classic button closure and multiple pockets. Perfect for layering.",
      price: 79.99,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80&auto=format&fit=crop",
      ],
      category: "men",
      sizes: ["M", "L", "XL"],
      colors: ["Blue"],
      inStock: true,
    },
    {
      name: "Summer Floral Dress",
      slug: "summer-floral-dress",
      description:
        "Beautiful floral print dress perfect for summer. Lightweight fabric with a flattering A-line silhouette. Ideal for casual and semi-formal occasions.",
      price: 59.99,
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&auto=format&fit=crop",
      ],
      category: "women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Floral Print"],
      inStock: true,
    },
    {
      name: "Black Leather Jacket",
      slug: "black-leather-jacket",
      description:
        "Premium black leather jacket with a sleek design. Features zipper closure and multiple pockets. A timeless piece for your wardrobe.",
      price: 199.99,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80&auto=format&fit=crop",
      ],
      category: "men",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black"],
      inStock: true,
    },
    {
      name: "Knit Sweater",
      slug: "knit-sweater",
      description:
        "Cozy knit sweater perfect for cooler weather. Soft and comfortable with a relaxed fit. Available in multiple colors.",
      price: 49.99,
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80&auto=format&fit=crop",
      ],
      category: "women",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Beige", "Gray", "Navy"],
      inStock: true,
    },
    {
      name: "Cargo Pants",
      slug: "cargo-pants",
      description:
        "Functional cargo pants with multiple pockets. Durable fabric perfect for casual wear. Comfortable fit with adjustable waist.",
      price: 69.99,
      images: [
        "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80&auto=format&fit=crop",
      ],
      category: "men",
      sizes: ["30", "32", "34", "36", "38"],
      colors: ["Khaki", "Black", "Olive"],
      inStock: true,
    },
    {
      name: "Elegant Blazer",
      slug: "elegant-blazer",
      description:
        "Sophisticated blazer perfect for office or formal occasions. Tailored fit with premium fabric. A wardrobe essential.",
      price: 129.99,
      images: [
        "https://images.unsplash.com/photo-1594938291221-94f18ab6d827?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&auto=format&fit=crop",
      ],
      category: "women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Navy", "Black"],
      inStock: true,
    },
    {
      name: "Hooded Sweatshirt",
      slug: "hooded-sweatshirt",
      description:
        "Comfortable hooded sweatshirt made from soft cotton blend. Perfect for casual wear. Features front pocket and adjustable hood.",
      price: 44.99,
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80&auto=format&fit=crop",
      ],
      category: "men",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Gray", "Black", "Navy"],
      inStock: true,
    },
    {
      name: "Silk Scarf",
      slug: "silk-scarf",
      description:
        "Luxurious silk scarf with elegant pattern. Perfect accessory to elevate any outfit. Can be worn in multiple ways.",
      price: 34.99,
      images: [
        "https://images.unsplash.com/photo-1583264116801-95c6c0e4e5b5?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&auto=format&fit=crop",
      ],
      category: "accessories",
      sizes: ["One Size"],
      colors: ["Multicolor"],
      inStock: true,
    },
    {
      name: "Canvas Tote Bag",
      slug: "canvas-tote-bag",
      description:
        "Durable canvas tote bag perfect for everyday use. Spacious interior with sturdy handles. Eco-friendly and stylish.",
      price: 24.99,
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564422167509-47a9e02a2b94?w=800&q=80&auto=format&fit=crop",
      ],
      category: "accessories",
      sizes: ["One Size"],
      colors: ["Natural", "Black"],
      inStock: true,
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
