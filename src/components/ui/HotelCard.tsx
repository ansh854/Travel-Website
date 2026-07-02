import { motion } from "motion/react";
import { MapPin, Wifi, Waves, Dumbbell, Star, Coffee } from "lucide-react";
import Badge from "./Badge";
import Button from "./Button";

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  amenities: string[];
  img: string;
  category: string;
  badge: string;
}

interface HotelCardProps {
  hotel: Hotel;
  index?: number;
}

const amenityIcon = (a: string) => {
  const map: Record<string, JSX.Element> = {
    wifi: <Wifi size={12} />,
    pool: <Waves size={12} />,
    gym: <Dumbbell size={12} />,
    spa: <Star size={12} />,
    restaurant: <Coffee size={12} />,
    garden: <MapPin size={12} />,
    diving: <Waves size={12} />,
    terrace: <Star size={12} />,
    fireplace: <Star size={12} />,
  };
  return map[a] ?? <Star size={12} />;
};

/**
 * Card for displaying a hotel with image, amenities, rating, and price.
 */
export default function HotelCard({ hotel: h, index = 0 }: HotelCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/80 transition-shadow duration-300 border border-border cursor-pointer"
      aria-label={`${h.name} in ${h.location}`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-200">
        <img
          src={h.img}
          alt={h.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="glass">{h.category}</Badge>
        </div>

        {/* Rating chip */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-xl px-2.5 py-1.5 flex items-center gap-1">
          <Star size={11} fill="#F59E0B" className="text-amber-400" />
          <span className="text-slate-800 text-xs font-bold">{h.rating}</span>
        </div>

        {/* Best badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#FF7A00] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            {h.badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-['Poppins'] font-semibold text-[#1E293B] text-sm leading-snug mb-0.5 truncate">
          {h.name}
        </h3>
        <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
          <MapPin size={11} />
          {h.location}
        </div>

        {/* Amenities */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {h.amenities.map((a) => (
            <span
              key={a}
              className="flex items-center gap-1 bg-slate-100 text-slate-500 text-[10px] font-medium px-2 py-1 rounded-lg capitalize"
            >
              {amenityIcon(a)}
              {a}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <div className="font-['Poppins'] font-bold text-[#0B5FFF] text-lg leading-none">
              ${h.price}
            </div>
            <div className="text-slate-400 text-[10px] mt-0.5">per night</div>
          </div>
          <Button variant="outline" size="sm">
            View
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
