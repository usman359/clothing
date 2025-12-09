# Fashion Store - Clothing E-commerce Website

A modern, fully-featured e-commerce website for a clothing brand built with Next.js 15 App Router, TypeScript, Prisma, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog**: Browse products with advanced filtering (category, size, price range)
- 🖼️ **Product Details**: Beautiful product pages with image galleries
- 🛒 **Shopping Cart**: Persistent cart with localStorage, slide-out drawer
- 💳 **Checkout**: Guest checkout with Cash on Delivery (COD) payment
- 📱 **Responsive Design**: Mobile-first, fully responsive design
- ⚡ **Performance**: Optimized images, server-side rendering
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Neon PostgreSQL database (or any PostgreSQL database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database connection string:
```
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample products
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (home)/            # Homepage route group
│   ├── products/          # Product listing and detail pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── order-success/     # Order confirmation page
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── product/          # Product-related components
│   ├── cart/             # Cart components
│   ├── checkout/         # Checkout components
│   └── filters/          # Filter components
├── lib/                   # Utilities and helpers
│   ├── db.ts             # Prisma client
│   ├── cart-context.tsx  # Cart state management
│   ├── validations.ts    # Zod schemas
│   └── utils.ts          # Utility functions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Prisma schema
│   └── seed.ts           # Seed script
└── types/                # TypeScript type definitions
```

## Database Schema

### Product Model
- Basic product information (name, description, price)
- Images array
- Category, sizes, colors
- Stock status

### Order Model
- Customer information
- Shipping address
- Order items (JSON)
- Order status and payment method

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (required)
- `NEXT_PUBLIC_APP_URL` - Application URL (optional, defaults to localhost)

## Features in Detail

### Product Catalog
- Filter by category, size, and price range
- Sort by price or newest
- Pagination support
- Responsive grid layout

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent storage (localStorage)
- Slide-out drawer for quick access

### Checkout Process
- Guest checkout (no account required)
- Form validation with Zod
- Order summary
- Cash on Delivery (COD) payment only

### Order Management
- Unique order numbers
- Order confirmation page
- Order details display

## Customization

### Adding Products

Products are managed manually through the database. You can:

1. Use Prisma Studio:
```bash
npx prisma studio
```

2. Update the seed script in `prisma/seed.ts`

3. Use Prisma Client directly in your code

### Styling

The project uses Tailwind CSS with shadcn/ui components. Customize:

- Colors: Edit `app/globals.css` CSS variables
- Components: Modify components in `components/ui/`
- Theme: Update `tailwind.config.ts`

## Deployment

1. Build the application:
```bash
npm run build
```

2. Set environment variables in your hosting platform

3. Push database schema:
```bash
npm run db:push
```

4. Seed database (optional):
```bash
npm run db:seed
```

5. Deploy to platforms like Vercel, Netlify, or any Node.js hosting

## Future Enhancements

- Search functionality
- Product reviews and ratings
- Wishlist/favorites
- User accounts and authentication
- Order tracking
- Email notifications
- Admin dashboard
- Multiple payment methods
- Product variants management

## License

MIT

## Support

For issues and questions, please open an issue on the repository.
