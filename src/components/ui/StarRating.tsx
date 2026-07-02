import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
}

/** Renders filled/empty stars for a given numeric rating. */
export default function StarRating({ rating, size = 12 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-slate-200 fill-slate-200"
          }
        />
      ))}
    </div>
  );
}
