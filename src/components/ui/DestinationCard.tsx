import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import StarRating from "./StarRating";
import Badge from "./Badge";

interface Destination {
  id: number;
  city: string;
  country: string;
  price: number;
  rating: number;
  reviews: number;
  desc: string;
  img: string;
  tag: string;
}

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

/**
 * Card displaying a travel destination with image, price, rating, and CTA.
 * Animates in staggered order based on `index`.
 */
export default function DestinationCard({
  destination: d,
  index = 0,
}: DestinationCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-300/50 transition-shadow duration-300 cursor-pointer border border-border"
      aria-label={`${d.city}, ${d.country} — from $${d.price}`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-200">
        <img
          src={d.img}
          alt={`${d.city}, ${d.country}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <Badge variant="glass">{d.tag}</Badge>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="text-white font-['Poppins'] font-bold text-xl leading-tight">
              {d.city}
            </div>
            <div className="flex items-center gap-1 text-white/80 text-xs font-medium">
              <MapPin size={11} />
              {d.country}
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5 text-right">
            <div className="text-white/70 text-[10px]">From</div>
            <div className="text-white font-bold text-sm">${d.price}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-slate-500 text-sm leading-relaxed mb-3 line-clamp-2">
          {d.desc}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarRating rating={d.rating} />
            <span className="text-slate-700 text-xs font-semibold">
              {d.rating}
            </span>
            <span className="text-slate-400 text-xs">
              ({d.reviews.toLocaleString()})
            </span>
          </div>
          <button
            className="text-[#0B5FFF] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
            aria-label={`Explore ${d.city}`}
          >
            Explore <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
