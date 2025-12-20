"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AskQuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  productSlug: string;
}

export function AskQuestionModal({
  open,
  onOpenChange,
  productName,
  productSlug,
}: AskQuestionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.question) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          productName,
          productSlug,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send question");
      }

      toast.success("Question sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", question: "" });
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to send question", {
        description: "Please try again or contact us via WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Ask a Question
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Have a question about{" "}
            <span className="font-semibold">{productName}</span>? We&apos;ll get
            back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border-gray-300"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border-gray-300"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              placeholder="Type your question here..."
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="border-gray-300 min-h-[100px]"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
            >
              {isSubmitting ? "Sending..." : "Send Question"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
