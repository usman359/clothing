"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AskQuestionModal } from "@/components/product/AskQuestionModal";

interface AskQuestionButtonProps {
  productName: string;
  productSlug: string;
}

export function AskQuestionButton({
  productName,
  productSlug,
}: AskQuestionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <p className="text-muted-foreground mb-4">
        Have a question about this product? Click below and we&apos;ll get back
        to you as soon as possible.
      </p>
      <Button
        variant="outline"
        className="border-black"
        onClick={() => setIsOpen(true)}
      >
        Ask a Question
      </Button>
      <AskQuestionModal
        open={isOpen}
        onOpenChange={setIsOpen}
        productName={productName}
        productSlug={productSlug}
      />
    </>
  );
}
