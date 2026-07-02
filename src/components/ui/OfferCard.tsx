import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface Offer {
  id: number;
  title: string;
  desc: string;
  badge: string;
  colorFrom: string;
  colorTo: string;
  code: string;
  validTill: string;
}

interface OfferCardProps {
  offer: Offer;
  index?: number;
}

/**
 * Promotional offer card with one-click coupon copy.
 */
export default function OfferCard({ offer: o, index = 0 }: OfferCardProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(o.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`shrink-0 w-72 bg-gradient-to-br ${o.colorFrom} ${o.colorTo} rounded-2xl p-6 text-white relative overflow-hidden cursor-pointer`}
    >
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute -right-4 -bottom-10 w-24 h-24 rounded-full bg-white/5" />

      <div className="relative z-10">
        {/* Badge */}
        <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
          {o.badge}
        </span>

        <h3 className="font-['Poppins'] font-bold text-lg leading-snug mb-2">
          {o.title}
        </h3>
        <p className="text-white/80 text-sm mb-4">{o.desc}</p>

        {/* Valid till */}
        <p className="text-white/60 text-[10px] mb-3">Valid till: {o.validTill}</p>

        {/* Coupon row */}
        <div className="flex items-center justify-between">
          <div className="bg-white/20 border border-white/30 rounded-lg px-3 py-1.5 text-xs font-mono font-bold tracking-widest">
            {o.code}
          </div>
          <button
            onClick={copyCode}
            aria-label={`Copy code ${o.code}`}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-3 py-1.5"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
