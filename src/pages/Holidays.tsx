import { useState } from "react";
import { motion } from "motion/react";
import { Package, Filter } from "lucide-react";
import SearchForm from "../components/ui/SearchForm";
import SectionHeader from "../components/ui/SectionHeader";
import PackageCard from "../components/ui/PackageCard";
import DestinationCard from "../components/ui/DestinationCard";
import TestimonialCarousel from "../components/ui/TestimonialCarousel";
import { packages, destinations, reviews } from "../data/index";
import Button from "../components/ui/Button";

const THEMES = ["All", "Beach", "Adventure", "Cultural", "Luxury", "Romantic", "Family"];
const DURATIONS = ["Any", "1-5 Days", "6-8 Days", "9-12 Days", "13+ Days"];

/**
 * Holiday packages page with theme filters, full package grid,
 * popular destinations strip, and testimonials.
 */
export default function Holidays() {
  const [theme, setTheme] = useState("All");
  const [duration, setDuration] = useState("Any");
  const [maxBudget, setMaxBudget] = useState(5000);

  // Simple budget filter (real app would use theme/duration from data)
  const filtered = packages.filter((p) => p.price <= maxBudget);

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-24 pb-12 overflow-hidden"
        aria-label="Holiday packages search"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1800&h=700&fit=crop&auto=format"
            alt="Aerial view of tropical coastline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 to-slate-900/90" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-4">
              <Package size={14} />
              All-Inclusive Holiday Packages
            </div>
            <h1 className="font-['Poppins'] font-bold text-white text-4xl lg:text-5xl mb-3">
              Your Dream Holiday Awaits
            </h1>
            <p className="text-white/70 text-lg max-w-lg mx-auto">
              Curated packages with flights, hotels, meals, and experiences —
              all sorted for you.
            </p>
          </motion.div>
          <SearchForm dark defaultTab="Holidays" />
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          {/* Filters row */}
          <div className="flex flex-col lg:flex-row gap-5 mb-10">
            {/* Theme pills */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  aria-pressed={theme === t}
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    theme === t
                      ? "bg-[#0B5FFF] text-white shadow-lg shadow-blue-500/25"
                      : "bg-card border border-border text-slate-600 hover:border-[#0B5FFF] hover:text-[#0B5FFF]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Duration + Budget */}
            <div className="flex items-center gap-3 ml-auto shrink-0">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                aria-label="Filter by duration"
                className="px-3 py-2 rounded-xl border border-border bg-card text-sm text-slate-600 outline-none focus:border-[#0B5FFF] transition-colors"
              >
                {DURATIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <Filter size={15} className="text-slate-500 shrink-0" />
                <label className="text-sm text-slate-500 whitespace-nowrap">
                  Budget: <span className="text-[#0B5FFF] font-semibold">${maxBudget.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={100}
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  aria-label="Maximum budget filter"
                  className="w-24 accent-[#0B5FFF]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-500 text-sm">
              <span className="font-semibold text-[#1E293B]">{filtered.length}</span> packages found
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <PackageCard key={p.id} pkg={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p>No packages match your budget. Try increasing your filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Popular destinations */}
      <section className="py-16 bg-[#EEF2F8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Inspiration"
            title="Popular Destinations"
            subtitle="Need help deciding? These are our most loved picks"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {destinations.slice(0, 3).map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-16 bg-gradient-to-br from-[#0B5FFF] to-[#00BFA5] relative overflow-hidden"
        aria-label="Holiday customer reviews"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/10 translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Reviews
            </span>
            <h2 className="font-['Poppins'] font-bold text-white text-4xl mb-2">
              Holiday Memories
            </h2>
            <p className="text-white/70">Real stories from real travellers</p>
          </div>
          <TestimonialCarousel reviews={reviews} />
        </div>
      </section>
    </>
  );
}
