import { useState } from "react";
import { motion } from "motion/react";
import { Hotel, Filter, Star, SlidersHorizontal } from "lucide-react";
import SearchForm from "../components/ui/SearchForm";
import SectionHeader from "../components/ui/SectionHeader";
import HotelCard from "../components/ui/HotelCard";
import { hotels } from "../data/index";

const CATEGORIES = ["All", "Resort", "Boutique", "Ryokan", "Water Villa", "Heritage", "City Hotel", "Palace"];

/**
 * Hotels search and listing page with category filter and grid layout.
 */
export default function Hotels() {
  const [selected, setSelected] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2500);

  const filtered = hotels.filter((h) => {
    const catMatch = selected === "All" || h.category === selected;
    const ratingMatch = h.rating >= minRating;
    const priceMatch = h.price <= maxPrice;
    return catMatch && ratingMatch && priceMatch;
  });

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-24 pb-12 bg-gradient-to-br from-[#00BFA5] via-teal-600 to-[#0B5FFF] overflow-hidden"
        aria-label="Hotel search"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-4">
              <Hotel size={14} />
              Search Hotels & Stays
            </div>
            <h1 className="font-['Poppins'] font-bold text-white text-4xl lg:text-5xl mb-2">
              Find Your Perfect Stay
            </h1>
            <p className="text-white/70">
              Over 1 million hotels, resorts, and unique stays worldwide
            </p>
          </motion.div>
          <SearchForm dark defaultTab="Hotels" />
        </div>
      </section>

      {/* Listings */}
      <section className="py-12 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                aria-pressed={selected === cat}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selected === cat
                    ? "bg-[#0B5FFF] text-white shadow-lg shadow-blue-500/25"
                    : "bg-card border border-border text-slate-600 hover:border-[#0B5FFF] hover:text-[#0B5FFF]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1" aria-label="Hotel filters">
              <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
                <div className="flex items-center gap-2 mb-5">
                  <SlidersHorizontal size={18} className="text-[#0B5FFF]" />
                  <span className="font-['Poppins'] font-semibold text-[#1E293B]">
                    Filters
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-slate-700 block mb-3">
                    Max Price/Night:{" "}
                    <span className="text-[#0B5FFF]">${maxPrice}</span>
                  </label>
                  <input
                    type="range"
                    min={100}
                    max={2500}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    aria-label="Maximum price per night"
                    className="w-full accent-[#0B5FFF]"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>$100</span>
                    <span>$2,500</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Minimum Rating
                  </p>
                  <div className="flex gap-1.5">
                    {[0, 3, 4, 4.5].map((r) => (
                      <button
                        key={r}
                        onClick={() => setMinRating(r)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                          minRating === r
                            ? "bg-amber-50 border-amber-300 text-amber-700"
                            : "border-border text-slate-500 hover:border-amber-300"
                        }`}
                      >
                        {r === 0 ? (
                          "Any"
                        ) : (
                          <>
                            <Star size={11} fill="currentColor" className="text-amber-400" />
                            {r}+
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Amenities
                  </p>
                  {["Pool", "Spa", "WiFi", "Restaurant", "Gym"].map((a) => (
                    <label
                      key={a}
                      className="flex items-center gap-2 py-1.5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-[#0B5FFF] w-4 h-4 rounded"
                      />
                      <span className="text-sm text-slate-600">{a}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-5">
                <p className="text-slate-500 text-sm">
                  Showing{" "}
                  <span className="font-semibold text-[#1E293B]">
                    {filtered.length}
                  </span>{" "}
                  properties
                </p>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((h, i) => (
                    <HotelCard key={h.id} hotel={h} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400">
                  <Hotel size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No hotels match your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
