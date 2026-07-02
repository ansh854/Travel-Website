import { motion } from "motion/react";
import { Train, Clock, Users, ArrowRight, Zap } from "lucide-react";
import SearchForm from "../components/ui/SearchForm";
import SectionHeader from "../components/ui/SectionHeader";
import { trains } from "../data/index";
import Button from "../components/ui/Button";
import StarRating from "../components/ui/StarRating";

const TYPE_COLOR: Record<string, string> = {
  Superfast: "bg-blue-100 text-[#0B5FFF]",
  Express: "bg-teal-100 text-[#00BFA5]",
  Premium: "bg-purple-100 text-purple-700",
};

/**
 * Train search and listing page.
 */
export default function Trains() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-24 pb-12 bg-gradient-to-br from-slate-800 via-slate-700 to-[#0B5FFF] overflow-hidden"
        aria-label="Train search"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-4">
              <Train size={14} />
              Book Train Tickets
            </div>
            <h1 className="font-['Poppins'] font-bold text-white text-4xl lg:text-5xl mb-2">
              Travel by Rail
            </h1>
            <p className="text-white/70">
              Fast, comfortable, and affordable train journeys across India
            </p>
          </motion.div>
          <SearchForm dark defaultTab="Trains" />
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-background">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Trains"
            title="Available Trains"
            subtitle="Showing results for New Delhi → Popular Destinations · 15 Jul"
            left
          />

          <div className="flex flex-col gap-4 mt-8">
            {trains.map((train, i) => (
              <motion.article
                key={train.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/70 transition-shadow duration-300"
                aria-label={`${train.name} — ${train.departure} to ${train.arrival}`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                  {/* Train info */}
                  <div className="md:w-56 shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          TYPE_COLOR[train.type]
                        }`}
                      >
                        {train.type}
                      </span>
                    </div>
                    <div className="font-['Poppins'] font-bold text-[#1E293B] text-base">
                      {train.name}
                    </div>
                    <div className="text-slate-400 text-xs">#{train.number}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <StarRating rating={train.rating} />
                      <span className="text-xs text-slate-500">{train.rating}</span>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex-1 flex items-center gap-4 min-w-0">
                    <div className="text-center">
                      <div className="font-['Poppins'] font-bold text-2xl text-[#1E293B]">
                        {train.departure}
                      </div>
                      <div className="text-xs font-bold text-slate-500">
                        {train.from}
                      </div>
                      <div className="text-xs text-slate-400">
                        {train.fromCity}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={11} />
                        {train.duration}
                      </span>
                      <div className="relative w-full flex items-center gap-1">
                        <div className="h-0.5 flex-1 bg-slate-200 rounded" />
                        <Train
                          size={16}
                          className="text-[#0B5FFF] shrink-0"
                        />
                        <div className="h-0.5 flex-1 bg-slate-200 rounded" />
                      </div>
                      <span className="text-[10px] text-slate-400">Direct</span>
                    </div>

                    <div className="text-center">
                      <div className="font-['Poppins'] font-bold text-2xl text-[#1E293B]">
                        {train.arrival}
                      </div>
                      <div className="text-xs font-bold text-slate-500">
                        {train.to}
                      </div>
                      <div className="text-xs text-slate-400">
                        {train.toCity}
                      </div>
                    </div>
                  </div>

                  {/* Classes */}
                  <div className="md:w-40 shrink-0">
                    <p className="text-xs text-slate-500 mb-2">Available Classes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {train.classes.map((cls) => (
                        <span
                          key={cls}
                          className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:w-36 shrink-0">
                    <div className="text-right">
                      <div className="font-['Poppins'] font-bold text-2xl text-[#0B5FFF]">
                        ₹{train.price.toLocaleString()}
                      </div>
                      <div className="text-slate-400 text-[10px] flex items-center gap-1">
                        <Users size={10} />
                        {train.seats} seats left
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      Book Now
                      <ArrowRight size={13} />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Info banner */}
      <section className="py-12 bg-[#EEF2F8]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: <Zap size={22} className="text-[#FF7A00]" />, title: "Instant Booking", desc: "Confirm your seat in seconds with our real-time booking system." },
              { icon: <Train size={22} className="text-[#0B5FFF]" />, title: "All Train Types", desc: "Rajdhani, Shatabdi, Vande Bharat, and all IRCTC trains covered." },
              { icon: <Users size={22} className="text-[#00BFA5]" />, title: "Group Booking", desc: "Book for groups of up to 12 passengers with a single reservation." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-semibold text-[#1E293B] text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
