import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartSheetWrapper } from "@/components/layout/CartSheetWrapper";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { Toaster } from "sonner";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Little Stars Kids Store - Adorable Clothing for Kids 0-6 Years",
  description:
    "Discover our magical collection of fun, colorful, and comfortable clothing for kids. Quality fashion that kids love to wear!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartSheetWrapper />
            <WhatsAppButton />
            <ScrollToTopButton />
          </div>
          <Toaster richColors position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
