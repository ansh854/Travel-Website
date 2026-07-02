import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  trip: string;
}

interface TestimonialCarouselProps {
  reviews: Review[];
}

/**
 * Auto-advancing testimonial carousel with manual prev/next and dot navigation.
 */
export default function TestimonialCarousel({ reviews }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = reviews.length;

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % total),
    [total]
  );
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  // Auto-advance every 5 seconds unless hovered
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  // Visible cards: current, next, next+1
  const indices = [current, (current + 1) % total, (current + 2) % total];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {indices.map((idx, pos) => {
          const r = reviews[idx];
          return (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: pos === 1 ? 1 : 0.75, y: 0 }}
              transition={{ duration: 0.45 }}
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all ${
                pos === 1 ? "md:scale-105 bg-white/20 shadow-xl" : ""
              }`}
            >
              {/* Quote icon */}
              <Quote
                size={24}
                className="text-white/30 mb-3"
                fill="currentColor"
              />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(r.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    fill="#FFD700"
                    className="text-amber-400"
                  />
                ))}
              </div>

              <p className="text-white/90 text-sm leading-relaxed mb-4 italic">
                "{r.text}"
              </p>

              <div className="text-white/50 text-[10px] uppercase tracking-widest mb-4">
                {r.trip}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                <img
                  src={r.avatar}
                  alt={r.name}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
                />
                <div>
                  <div className="text-white font-semibold text-sm">
                    {r.name}
                  </div>
                  <div className="text-white/60 text-xs">{r.location}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to review ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-8" : "bg-white/40 w-2"
            }`}
          />
        ))}

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
