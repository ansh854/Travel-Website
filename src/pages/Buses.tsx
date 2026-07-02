import { motion } from "motion/react";
import { Bus, Clock, Users, Wifi, Wind, Coffee, Droplets, ArrowRight } from "lucide-react";
import SearchForm from "../components/ui/SearchForm";
import SectionHeader from "../components/ui/SectionHeader";
import { buses } from "../data/index";
import Button from "../components/ui/Button";
import StarRating from "../components/ui/StarRating";

const amenityIcon: Record<string, JSX.Element> = {
  ac: <Wind size={13} />,
  charging: <Wifi size={13} />,
  blanket: <Coffee size={13} />,
  water: <Droplets size={13} />,
};

const amenityLabel: Record<string, string> = {
  ac: "A/C",
  charging: "Charging",
  blanket: "Blanket",
  water: "Water",
};

/**
 * Bus search and listing page.
 */
export default function Buses() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-24 pb-12 bg-gradient-to-br from-[#FF7A00] via-orange-600 to-slate-800 overflow-hidden"
        aria-label="Bus search"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-4">
              <Bus size={14} />
              Book Bus Tickets
            </div>
            <h1 className="font-['Poppins'] font-bold text-white text-4xl lg:text-5xl mb-2">
              Travel by Bus
            </h1>
            <p className="text-white/70">
              Affordable, comfortable intercity buses across India
            </p>
          </motion.div>
          <SearchForm dark defaultTab="Buses" />
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Buses"
            title="Available Buses"
            subtitle="Showing results for Delhi → Popular Routes · 15 Jul"
            left
          />

          <div className="flex flex-col gap-4 mt-8">
            {buses.map((bus, i) => (
              <motion.article
                key={bus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/70 transition-shadow duration-300"
                aria-label={`${bus.operator} — ${bus.departure} to ${bus.arrival}`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                  {/* Operator */}
                  <div className="md:w-48 shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FF7A00] to-orange-600 rounded-xl flex items-center justify-center text-white mb-2">
                      <Bus size={18} />
                    </div>
                    <div className="font-['Poppins'] font-bold text-[#1E293B] text-sm">
                      {bus.operator}
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5">{bus.type}</div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <StarRating rating={bus.rating} />
                      <span className="text-xs text-slate-500">{bus.rating}</span>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex-1 flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-['Poppins'] font-bold text-2xl text-[#1E293B]">
                        {bus.departure}
                      </div>
                      <div className="text-sm text-slate-500">{bus.from}</div>
                    </div>

                    <div className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={11} />
                        {bus.duration}
                      </span>
                      <div className="relative w-full flex items-center gap-1">
                        <div className="h-0.5 flex-1 bg-slate-200 rounded" />
                        <Bus size={16} className="text-[#FF7A00] shrink-0" />
                        <div className="h-0.5 flex-1 bg-slate-200 rounded" />
                      </div>
                      <span className="text-[10px] text-slate-400">Direct</span>
                    </div>

                    <div className="text-center">
                      <div className="font-['Poppins'] font-bold text-2xl text-[#1E293B]">
                        {bus.arrival}
                      </div>
                      <div className="text-sm text-slate-500">{bus.to}</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="md:w-44 shrink-0">
                    <p className="text-xs text-slate-500 mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {bus.amenities.map((a) => (
                        <span
                          key={a}
                          className="flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-1 rounded-lg"
                        >
                          {amenityIcon[a]}
                          {amenityLabel[a]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:w-36 shrink-0">
                    <div className="text-right">
                      <div className="text-slate-400 text-xs line-through">
                        ₹{bus.originalPrice}
                      </div>
                      <div className="font-['Poppins'] font-bold text-2xl text-[#FF7A00]">
                        ₹{bus.price}
                      </div>
                      <div className="text-slate-400 text-[10px] flex items-center gap-1">
                        <Users size={10} />
                        {bus.seats} seats left
                      </div>
                    </div>
                    <Button variant="primary" size="sm">
                      Book
                      <ArrowRight size={13} />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-12 bg-[#EEF2F8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { val: "1,200+", label: "Bus Operators", icon: "🚌" },
              { val: "10,000+", label: "Routes", icon: "🗺️" },
              { val: "50M+", label: "Tickets Booked", icon: "🎟️" },
              { val: "4.5★", label: "Avg. Rating", icon: "⭐" },
            ].map(({ val, label, icon }) => (
              <div
                key={label}
                className="bg-card border border-border rounded-2xl p-5 text-center"
              >
                <div className="text-3xl mb-2">{icon}</div>
                <div className="font-['Poppins'] font-bold text-xl text-[#1E293B]">
                  {val}
                </div>
                <div className="text-slate-400 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
