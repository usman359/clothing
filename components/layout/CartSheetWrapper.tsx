"use client";

import { useCart } from "@/lib/cart-context";
import { CartSheet } from "./CartSheet";

export function CartSheetWrapper() {
  const { isOpen, setIsOpen } = useCart();

  return <CartSheet open={isOpen} onOpenChange={setIsOpen} />;
}
