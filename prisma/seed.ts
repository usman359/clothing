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
      name: "Adorable Unicorn Print T-Shirt",
      slug: "unicorn-print-tshirt",
      description:
        "Magical unicorn print t-shirt that kids absolutely love! Made from super soft cotton. Perfect for playtime and everyday adventures. Age 2-4 years.",
      price: 24.99,
      images: [
        "/images/img1.jpeg",
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80&auto=format&fit=crop",
      ],
      category: "toddler",
      sizes: ["2Y", "3Y", "4Y"],
      colors: ["Pink", "Purple", "Blue"],
      inStock: true,
      rating: 4.5,
      ratingCount: 23,
    },
    {
      name: "Cute Dinosaur Hoodie",
      slug: "dinosaur-hoodie",
      description:
        "Roar-some dinosaur hoodie that's perfect for little explorers! Soft fleece lining keeps kids cozy. With fun dinosaur details on the hood. Age 3-6 years.",
      price: 39.99,
      images: [
        "/images/img1.jpeg",
        "https://images.unsplash.com/photo-1605360012249-7c46e2f7cbbf?w=800&q=80&auto=format&fit=crop",
      ],
      category: "toddler",
      sizes: ["3Y", "4Y", "5Y", "6Y"],
      colors: ["Green", "Blue", "Gray"],
      inStock: true,
      rating: 4.8,
      ratingCount: 45,
    },
    {
      name: "Princess Rainbow Dress",
      slug: "princess-rainbow-dress",
      description:
        "Sparkly rainbow dress that makes every little girl feel like a princess! Twirl-worthy design with soft tulle skirt. Perfect for parties and playtime. Age 4-6 years.",
      price: 34.99,
      images: [
        "/images/img1.jpeg",
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80&auto=format&fit=crop",
      ],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y"],
      colors: ["Rainbow", "Pink", "Purple"],
      inStock: true,
      rating: 5.0,
      ratingCount: 67,
    },
    {
      name: "Cozy Bunny Onesie",
      slug: "bunny-onesie",
      description:
        "Adorably soft bunny onesie for your little bunny! Super cozy with a cute bunny hood and ears. Perfect for bedtime or playtime. Age 6-12 months.",
      price: 29.99,
      images: [
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605360012249-7c46e2f7cbbf?w=800&q=80&auto=format&fit=crop",
      ],
      category: "baby",
      sizes: ["6M", "12M", "18M"],
      colors: ["Pink", "Gray", "White"],
      inStock: true,
      rating: 4.9,
      ratingCount: 89,
    },
    {
      name: "Adventure Explorer Pants",
      slug: "explorer-pants",
      description:
        "Tough and comfy cargo pants for little adventurers! Multiple pockets for treasures. Durable fabric that can handle any adventure. Age 4-6 years.",
      price: 32.99,
      images: [
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605360012249-7c46e2f7cbbf?w=800&q=80&auto=format&fit=crop",
      ],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y"],
      colors: ["Khaki", "Navy", "Olive"],
      inStock: true,
      rating: 4.6,
      ratingCount: 28,
    },
    {
      name: "Little Gentleman Blazer Set",
      slug: "gentleman-blazer-set",
      description:
        "Dapper blazer set for special occasions! Includes matching pants. Makes every little boy look sharp and handsome. Age 4-6 years.",
      price: 44.99,
      images: [
        "https://images.unsplash.com/photo-1605360012249-7c46e2f7cbbf?w=800&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80&auto=format&fit=crop",
      ],
      category: "kids",
      sizes: ["4Y", "5Y", "6Y"],
      colors: ["Navy", "Black", "Gray"],
      inStock: true,
      rating: 4.4,
      ratingCount: 19,
    },
    {
      name: "Cozy Animal Print Hoodie",
      slug: "animal-print-hoodie",
      description:
        "Super soft hoodie with cute animal print! Features a cozy hood and front pocket. Kids love the fun animal designs. Age 2-6 years.",
      price: 27.99,
      images: [
        "/images/img1.jpeg",
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80&auto=format&fit=crop",
      ],
      category: "toddler",
      sizes: ["2Y", "3Y", "4Y", "5Y", "6Y"],
      colors: ["Pink", "Blue", "Gray"],
      inStock: true,
      rating: 4.3,
      ratingCount: 52,
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
