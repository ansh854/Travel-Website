import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plane,
  Hotel,
  Train,
  Bus,
  Package,
  Car,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ArrowRight,
  ArrowLeftRight,
} from "lucide-react";
import Button from "./Button";

type SearchTab = "Flights" | "Hotels" | "Trains" | "Buses" | "Holidays" | "Cabs";
type TripType = "One Way" | "Round Trip" | "Multi City";

const TABS: { label: SearchTab; icon: JSX.Element }[] = [
  { label: "Flights", icon: <Plane size={15} /> },
  { label: "Hotels", icon: <Hotel size={15} /> },
  { label: "Trains", icon: <Train size={15} /> },
  { label: "Buses", icon: <Bus size={15} /> },
  { label: "Holidays", icon: <Package size={15} /> },
  { label: "Cabs", icon: <Car size={15} /> },
];

interface SearchFieldProps {
  icon: JSX.Element;
  label: string;
  placeholder: string;
  dark?: boolean;
}

function SearchField({ icon, label, placeholder, dark = false }: SearchFieldProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-colors group ${
        dark
          ? "bg-white/10 hover:bg-white/20 border border-white/20"
          : "bg-slate-50 hover:bg-slate-100 border border-slate-100"
      }`}
    >
      <div className="shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <div
          className={`text-[10px] font-semibold uppercase tracking-wide ${
            dark ? "text-white/50" : "text-slate-400"
          }`}
        >
          {label}
        </div>
        <div
          className={`text-sm font-semibold truncate ${
            dark ? "text-white/90" : "text-slate-700"
          }`}
        >
          {placeholder}
        </div>
      </div>
      <ChevronDown
        size={13}
        className={`shrink-0 ${dark ? "text-white/40" : "text-slate-400"}`}
      />
    </div>
  );
}

interface SearchFormProps {
  /** Dark (glassmorphism) mode for use on the hero */
  dark?: boolean;
  /** Pre-selected tab */
  defaultTab?: SearchTab;
}

/**
 * Full-featured search form used on the hero and individual service pages.
 * Supports Flights, Hotels, Trains, Buses, Holidays, and Cabs.
 */
export default function SearchForm({
  dark = false,
  defaultTab = "Flights",
}: SearchFormProps) {
  const [activeTab, setActiveTab] = useState<SearchTab>(defaultTab);
  const [tripType, setTripType] = useState<TripType>("Round Trip");

  const isRoundTrip = tripType !== "One Way";

  return (
    <div
      className={`rounded-3xl p-2 ${
        dark
          ? "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
          : "bg-white shadow-xl shadow-slate-200/60 border border-border"
      }`}
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 px-2 pt-1 pb-3 overflow-x-auto scrollbar-hide">
        {TABS.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            aria-pressed={activeTab === label}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              activeTab === label
                ? dark
                  ? "bg-white text-[#0B5FFF] shadow-md"
                  : "bg-[#0B5FFF] text-white shadow-md shadow-blue-500/25"
                : dark
                ? "text-white/80 hover:text-white hover:bg-white/10"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Trip type selector — Flights only */}
      <AnimatePresence>
        {activeTab === "Flights" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-5 px-4 pb-3 overflow-hidden"
          >
            {(["One Way", "Round Trip", "Multi City"] as TripType[]).map((t) => (
              <label
                key={t}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <div
                  role="radio"
                  aria-checked={tripType === t}
                  onClick={() => setTripType(t)}
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    tripType === t
                      ? dark
                        ? "border-white bg-white"
                        : "border-[#0B5FFF] bg-[#0B5FFF]"
                      : dark
                      ? "border-white/50 bg-transparent"
                      : "border-slate-300 bg-transparent"
                  }`}
                >
                  {tripType === t && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        dark ? "bg-[#0B5FFF]" : "bg-white"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    dark ? "text-white/90" : "text-slate-600"
                  }`}
                >
                  {t}
                </span>
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fields grid */}
      <div
        className={`rounded-2xl p-3 grid gap-2 ${
          dark ? "" : "bg-slate-50/50"
        } ${
          activeTab === "Flights"
            ? isRoundTrip
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
        }`}
      >
        {activeTab === "Flights" && (
          <>
            <div className="lg:col-span-1">
              <SearchField
                dark={dark}
                icon={<MapPin size={17} className="text-[#0B5FFF]" />}
                label="From"
                placeholder="Delhi, India"
              />
            </div>
            <div className="lg:col-span-1 relative">
              <SearchField
                dark={dark}
                icon={<MapPin size={17} className="text-[#0B5FFF]" />}
                label="To"
                placeholder="Bali, Indonesia"
              />
              {/* Swap button */}
              <button
                aria-label="Swap origin and destination"
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-border rounded-full shadow-sm flex items-center justify-center hover:bg-blue-50 transition-colors hidden lg:flex"
              >
                <ArrowLeftRight size={11} className="text-[#0B5FFF]" />
              </button>
            </div>
            <div className="lg:col-span-1">
              <SearchField
                dark={dark}
                icon={<Calendar size={17} className="text-[#00BFA5]" />}
                label="Departure"
                placeholder="15 Jul 2025"
              />
            </div>
            {isRoundTrip && (
              <div className="lg:col-span-1">
                <SearchField
                  dark={dark}
                  icon={<Calendar size={17} className="text-[#00BFA5]" />}
                  label="Return"
                  placeholder="22 Jul 2025"
                />
              </div>
            )}
            <div className="lg:col-span-1">
              <SearchField
                dark={dark}
                icon={<Users size={17} className="text-[#FF7A00]" />}
                label="Travellers & Class"
                placeholder="1 Adult, Economy"
              />
            </div>
          </>
        )}

        {activeTab === "Hotels" && (
          <>
            <div className="sm:col-span-2">
              <SearchField
                dark={dark}
                icon={<MapPin size={17} className="text-[#0B5FFF]" />}
                label="Destination"
                placeholder="Bali, Indonesia"
              />
            </div>
            <SearchField
              dark={dark}
              icon={<Calendar size={17} className="text-[#00BFA5]" />}
              label="Check-in"
              placeholder="15 Jul 2025"
            />
            <SearchField
              dark={dark}
              icon={<Calendar size={17} className="text-[#00BFA5]" />}
              label="Check-out"
              placeholder="22 Jul 2025"
            />
            <SearchField
              dark={dark}
              icon={<Users size={17} className="text-[#FF7A00]" />}
              label="Guests & Rooms"
              placeholder="2 Guests, 1 Room"
            />
          </>
        )}

        {(activeTab === "Trains" || activeTab === "Buses") && (
          <>
            <SearchField
              dark={dark}
              icon={<MapPin size={17} className="text-[#0B5FFF]" />}
              label="From"
              placeholder="New Delhi"
            />
            <SearchField
              dark={dark}
              icon={<MapPin size={17} className="text-[#0B5FFF]" />}
              label="To"
              placeholder="Mumbai"
            />
            <SearchField
              dark={dark}
              icon={<Calendar size={17} className="text-[#00BFA5]" />}
              label="Journey Date"
              placeholder="15 Jul 2025"
            />
            <SearchField
              dark={dark}
              icon={<Users size={17} className="text-[#FF7A00]" />}
              label="Passengers"
              placeholder="1 Passenger"
            />
          </>
        )}

        {activeTab === "Holidays" && (
          <>
            <div className="sm:col-span-2">
              <SearchField
                dark={dark}
                icon={<MapPin size={17} className="text-[#0B5FFF]" />}
                label="Destination"
                placeholder="Bali, Maldives…"
              />
            </div>
            <SearchField
              dark={dark}
              icon={<Calendar size={17} className="text-[#00BFA5]" />}
              label="Travel Date"
              placeholder="15 Jul 2025"
            />
            <SearchField
              dark={dark}
              icon={<Users size={17} className="text-[#FF7A00]" />}
              label="Travellers"
              placeholder="2 Adults, 1 Child"
            />
          </>
        )}

        {activeTab === "Cabs" && (
          <>
            <div className="sm:col-span-2">
              <SearchField
                dark={dark}
                icon={<MapPin size={17} className="text-[#0B5FFF]" />}
                label="Pick-up"
                placeholder="Enter city or airport"
              />
            </div>
            <SearchField
              dark={dark}
              icon={<MapPin size={17} className="text-[#0B5FFF]" />}
              label="Drop-off"
              placeholder="Hotel or address"
            />
            <SearchField
              dark={dark}
              icon={<Calendar size={17} className="text-[#00BFA5]" />}
              label="Pick-up Date & Time"
              placeholder="15 Jul · 10:00"
            />
          </>
        )}

        {/* Search button */}
        <Button variant="primary" size="lg" className="!rounded-xl h-full min-h-[56px]">
          Search
          <ArrowRight size={17} />
        </Button>
      </div>
    </div>
  );
}
