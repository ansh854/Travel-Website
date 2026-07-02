import { motion } from "motion/react";
import { Check, Star } from "lucide-react";
import Button from "./Button";

interface Package {
  id: number;
  name: string;
  duration: string;
  hotel: string;
  stars: number;
  price: number;
  originalPrice: number;
  discount: number;
  img: string;
  tag: string;
  includes: string[];
  destination: string;
}

interface PackageCardProps {
  pkg: Package;
  index?: number;
}

/**
 * Premium holiday package card with discount badge, inclusions, and pricing.
 */
export default function PackageCard({ pkg: p, index = 0 }: PackageCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-300/50 transition-shadow duration-300 border border-border cursor-pointer"
      aria-label={`${p.name} — $${p.price} per person`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-slate-200">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-[#FF7A00] text-white text-[10px] font-bold px-3 py-1 rounded-full">
            {p.tag}
          </span>
          <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">
            {p.discount}% OFF
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="font-['Poppins'] font-bold text-white text-lg leading-snug">
            {p.name}
          </div>
          <div className="text-white/75 text-xs mt-0.5">{p.destination}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Duration + Hotel */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-500 text-sm">{p.duration}</span>
          <div className="flex items-center gap-1">
            {[...Array(p.stars)].map((_, i) => (
              <Star key={i} size={11} fill="#F59E0B" className="text-amber-400" />
            ))}
            <span className="text-slate-500 text-xs ml-1">{p.hotel}</span>
          </div>
        </div>

        {/* Includes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {p.includes.map((inc) => (
            <span
              key={inc}
              className="flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-semibold px-2.5 py-1 rounded-lg"
            >
              <Check size={10} strokeWidth={3} />
              {inc}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div>
            <div className="text-slate-400 text-xs line-through">
              ${p.originalPrice.toLocaleString()}
            </div>
            <div className="font-['Poppins'] font-bold text-2xl text-[#1E293B] leading-tight">
              ${p.price.toLocaleString()}
              <span className="text-slate-400 text-sm font-normal"> /person</span>
            </div>
          </div>
          <Button variant="secondary" size="md">
            Book Now
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
