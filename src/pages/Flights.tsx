import { useState } from "react";
import { motion } from "motion/react";
import {
  Plane,
  Clock,
  Wifi,
  Utensils,
  Monitor,
  Briefcase,
  Filter,
  ArrowRight,
  Star,
  ChevronDown,
} from "lucide-react";
import SearchForm from "../components/ui/SearchForm";
import SectionHeader from "../components/ui/SectionHeader";
import OfferCard from "../components/ui/OfferCard";
import { flights, offers } from "../data/index";
import Button from "../components/ui/Button";

const amenityIcons: Record<string, JSX.Element> = {
  meal: <Utensils size={13} />,
  wifi: <Wifi size={13} />,
  entertainment: <Monitor size={13} />,
  lounge: <Briefcase size={13} />,
};

type SortOption = "price" | "duration" | "departure";

/**
 * Flights search results page.
 * Features filter sidebar, sortable flight cards, and special offers.
 */
export default function Flights() {
  const [sort, setSort] = useState<SortOption>("price");
  const [maxPrice, setMaxPrice] = useState(1500);

  const sorted = [...flights]
    .filter((f) => f.price <= maxPrice)
    .sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "duration") return a.duration.localeCompare(b.duration);
      return a.departure.localeCompare(b.departure);
    });

  return (
    <>
      {/* Page hero */}
      <section
        className="relative pt-24 pb-12 bg-gradient-to-br from-[#0B5FFF] via-blue-700 to-[#00BFA5] overflow-hidden"
        aria-label="Flight search"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-4">
              <Plane size={14} className="rotate-45" />
              Search & Book Flights
            </div>
            <h1 className="font-['Poppins'] font-bold text-white text-4xl lg:text-5xl mb-2">
              Find Your Flight
            </h1>
            <p className="text-white/70">
              Compare prices across 500+ airlines worldwide
            </p>
          </motion.div>
          <SearchForm dark defaultTab="Flights" />
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar filters */}
            <aside className="lg:col-span-1" aria-label="Flight filters">
              <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
                <div className="flex items-center gap-2 mb-5">
                  <Filter size={18} className="text-[#0B5FFF]" />
                  <span className="font-['Poppins'] font-semibold text-[#1E293B]">
                    Filters
                  </span>
                </div>

                {/* Price range */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-slate-700 block mb-3">
                    Max Price: <span className="text-[#0B5FFF]">${maxPrice}</span>
                  </label>
                  <input
                    type="range"
                    min={400}
                    max={1500}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    aria-label="Maximum price filter"
                    className="w-full accent-[#0B5FFF]"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>$400</span>
                    <span>$1,500</span>
                  </div>
                </div>

                {/* Stops */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Stops
                  </p>
                  {["Non-stop", "1 Stop", "2+ Stops"].map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-2 py-1.5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-[#0B5FFF] w-4 h-4 rounded"
                      />
                      <span className="text-sm text-slate-600">{s}</span>
                    </label>
                  ))}
                </div>

                {/* Airlines */}
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Airlines
                  </p>
                  {["IndiGo", "Air Asia", "Singapore Airlines", "Emirates"].map(
                    (a) => (
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
                    )
                  )}
                </div>
              </div>
            </aside>

            {/* Flight results */}
            <div className="lg:col-span-3">
              {/* Sort bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                <p className="text-slate-500 text-sm">
                  Showing{" "}
                  <span className="font-semibold text-[#1E293B]">
                    {sorted.length}
                  </span>{" "}
                  flights · Delhi → Bali · 15 Jul
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Sort by:</span>
                  {(["price", "duration", "departure"] as SortOption[]).map(
                    (s) => (
                      <button
                        key={s}
                        onClick={() => setSort(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                          sort === s
                            ? "bg-[#0B5FFF] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {s}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-4">
                {sorted.map((flight, i) => (
                  <motion.article
                    key={flight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="bg-card border border-border rounded-2xl p-5 hover:shadow-xl hover:shadow-slate-200/70 transition-shadow duration-300"
                    aria-label={`${flight.airline} flight — ${flight.departure} to ${flight.arrival}`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Airline */}
                      <div className="flex items-center gap-3 sm:w-40 shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#0B5FFF] to-[#00BFA5] rounded-xl flex items-center justify-center text-white font-bold text-sm">
                          {flight.logo}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-[#1E293B]">
                            {flight.airline}
                          </div>
                          <div className="text-xs text-slate-400">
                            {flight.class}
                          </div>
                        </div>
                      </div>

                      {/* Route */}
                      <div className="flex-1 flex items-center justify-between sm:justify-center gap-4">
                        <div className="text-center">
                          <div className="font-['Poppins'] font-bold text-xl text-[#1E293B]">
                            {flight.departure}
                          </div>
                          <div className="text-xs text-slate-400">
                            {flight.from}
                          </div>
                          <div className="text-xs text-slate-500">
                            {flight.fromCity}
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock size={11} />
                            {flight.duration}
                          </span>
                          <div className="relative w-full flex items-center">
                            <div className="h-px flex-1 bg-slate-200" />
                            <Plane
                              size={14}
                              className="text-[#0B5FFF] rotate-90 shrink-0 mx-1"
                            />
                            <div className="h-px flex-1 bg-slate-200" />
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {flight.stops === 0
                              ? "Non-stop"
                              : `${flight.stops} stop · ${flight.stopCity}`}
                          </span>
                        </div>

                        <div className="text-center">
                          <div className="font-['Poppins'] font-bold text-xl text-[#1E293B]">
                            {flight.arrival}
                          </div>
                          <div className="text-xs text-slate-400">
                            {flight.to}
                          </div>
                          <div className="text-xs text-slate-500">
                            {flight.toCity}
                          </div>
                        </div>
                      </div>

                      {/* Amenities + price */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-2 sm:w-36 shrink-0">
                        <div className="flex gap-1.5 flex-wrap justify-end">
                          {flight.amenities.map((a) => (
                            <span
                              key={a}
                              title={a}
                              className="text-slate-400 bg-slate-100 p-1.5 rounded-lg"
                            >
                              {amenityIcons[a]}
                            </span>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="text-slate-400 text-xs line-through">
                            ${flight.originalPrice}
                          </div>
                          <div className="font-['Poppins'] font-bold text-2xl text-[#0B5FFF]">
                            ${flight.price}
                          </div>
                          <div className="text-slate-400 text-[10px]">
                            {flight.seats} seats left
                          </div>
                        </div>
                        <Button variant="secondary" size="sm">
                          Book
                          <ArrowRight size={13} />
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}

                {sorted.length === 0 && (
                  <div className="text-center py-16 text-slate-400">
                    <Plane size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No flights match your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers strip */}
      <section className="py-16 bg-[#EEF2F8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Flight Deals"
            title="Exclusive Flight Offers"
            subtitle="Save more with these limited-time promo codes"
          />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 mt-8">
            {offers.slice(0, 4).map((o, i) => (
              <OfferCard key={o.id} offer={o} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
