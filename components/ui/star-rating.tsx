import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number | null;
  ratingCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  ratingCount = 0,
  size = "md",
  showCount = true,
  className,
}: StarRatingProps) {
  if (!rating) return null;

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")}
          />
        ))}
        {hasHalfStar && (
          <div className="relative inline-block">
            <Star
              className={cn(
                sizeClasses[size],
                "text-yellow-400 fill-transparent"
              )}
            />
            <div
              className="absolute left-0 top-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "fill-yellow-400 text-yellow-400"
                )}
              />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(sizeClasses[size], "text-gray-300 fill-transparent")}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-sm text-muted-foreground font-medium ml-1">
          {ratingCount} reviews
        </span>
      )}
    </div>
  );
}
