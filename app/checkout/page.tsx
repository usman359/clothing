import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-pink-50/30 dark:to-pink-950/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete your order by filling in the details below
          </p>
        </div>
        <CheckoutForm />
      </div>
    </div>
  );
}
