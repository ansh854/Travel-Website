import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Tag,
  Shield,
  Headphones,
  RotateCcw,
  Send,
  Plane,
} from "lucide-react";

import SearchForm from "../components/ui/SearchForm";
import SectionHeader from "../components/ui/SectionHeader";
import DestinationCard from "../components/ui/DestinationCard";
import PackageCard from "../components/ui/PackageCard";
import HotelCard from "../components/ui/HotelCard";
import OfferCard from "../components/ui/OfferCard";
import TestimonialCarousel from "../components/ui/TestimonialCarousel";
import Button from "../components/ui/Button";

import {
  destinations,
  packages,
  hotels,
  offers,
  reviews,
} from "../data/index";

// ─── Why Choose Us data ───────────────────────────────────────────────────────
const WHY_FEATURES = [
  {
    icon: <Tag size={28} className="text-[#0B5FFF]" />,
    bg: "bg-blue-50",
    title: "Best Price Guarantee",
    desc: "We match any lower price you find — or refund the difference, no questions asked.",
  },
  {
    icon: <Shield size={28} className="text-[#00BFA5]" />,
    bg: "bg-teal-50",
    title: "Secure Booking",
    desc: "256-bit SSL encryption and PCI-DSS compliance protect every transaction.",
  },
  {
    icon: <Headphones size={28} className="text-[#FF7A00]" />,
    bg: "bg-orange-50",
    title: "24/7 Support",
    desc: "Real humans, around the clock — call, chat, or email any time, anywhere.",
  },
  {
    icon: <RotateCcw size={28} className="text-purple-500" />,
    bg: "bg-purple-50",
    title: "Easy Cancellation",
    desc: "Flexible booking with free cancellation on most hotels and packages.",
  },
];

// ─── Hero section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero — search travel"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&h=1000&fit=crop&auto=format"
          alt="Dramatic mountain landscape"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-teal-900/20" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10"
        >
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00BFA5] animate-pulse" />
            Over 2.4 million travellers trust Ansh Travel
          </div>

          <h1 className="font-['Poppins'] text-4xl sm:text-5xl lg:text-[64px] font-bold text-white leading-tight mb-4">
           Explore India & Beyond
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA5] to-[#0B5FFF]">
             with Ansh Travels
            </span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
            Best prices on flights, hotels, trains, and holiday packages — all
            in one place.
          </p>
        </motion.div>

        {/* Search form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <SearchForm dark />
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-12 text-white/80"
        >
          {[
            { val: "500+", label: "Airlines" },
            { val: "1M+", label: "Hotels" },
            { val: "200+", label: "Countries" },
            { val: "24/7", label: "Support" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="text-white font-bold text-2xl font-['Poppins']">
                {val}
              </div>
              <div className="text-white/55 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

// ─── Offers section ───────────────────────────────────────────────────────────
function OffersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 310 : -310,
      behavior: "smooth",
    });

  return (
    <section className="py-20 bg-background" aria-label="Special offers">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Hot Deals"
          title="Special Offers & Discounts"
          subtitle="Exclusive deals available for a limited time — grab them before they're gone"
        />

        <div className="relative mt-10">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll offers left"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-border flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={18} className="text-slate-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          >
            {offers.map((o, i) => (
              <OfferCard key={o.id} offer={o} index={i} />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll offers right"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-border flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={18} className="text-slate-600" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Destinations section ─────────────────────────────────────────────────────
function DestinationsSection() {
  return (
    <section className="py-20 bg-[#EEF2F8]" aria-label="Popular destinations">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Explore"
          title="Popular Destinations"
          subtitle="Handpicked destinations loved by millions of travellers worldwide"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {destinations.map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Packages section ─────────────────────────────────────────────────────────
function PackagesSection() {
  return (
    <section className="py-20 bg-background" aria-label="Holiday packages">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Packages"
          title="Holiday Packages"
          subtitle="All-inclusive curated experiences for every kind of traveller"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {packages.slice(0, 3).map((p, i) => (
            <PackageCard key={p.id} pkg={p} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" size="lg">
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Hotels section ───────────────────────────────────────────────────────────
function HotelsSection() {
  return (
    <section className="py-20 bg-[#EEF2F8]" aria-label="Hotel recommendations">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Stays"
          title="Top Hotel Picks"
          subtitle="Exceptional properties chosen for quality, value, and experience"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {hotels.slice(0, 4).map((h, i) => (
            <HotelCard key={h.id} hotel={h} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why choose us ────────────────────────────────────────────────────────────
function WhySection() {
  return (
    <section className="py-20 bg-background" aria-label="Why choose Ansh Travel">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Why Ansh Travel"
          title="Travel Smarter, Every Time"
          subtitle="Built for travellers who value experience, not just price"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {WHY_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group p-6 rounded-2xl border border-border bg-card hover:shadow-2xl hover:shadow-slate-200/80 transition-shadow duration-300 cursor-default"
            >
              <div
                className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
              >
                {f.icon}
              </div>
              <h3 className="font-['Poppins'] font-bold text-[#1E293B] text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section
      className="py-20 bg-gradient-to-br from-[#0B5FFF] to-[#00BFA5] relative overflow-hidden"
      aria-label="Customer testimonials"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/10 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-['Poppins'] font-bold text-white text-4xl lg:text-5xl mb-3">
            What travellers say
          </h2>
          <p className="text-white/70 text-lg">
            Real experiences from our community of explorers
          </p>
        </div>
        <TestimonialCarousel reviews={reviews} />
      </div>
    </section>
  );
}

// ─── App Download ─────────────────────────────────────────────────────────────
function AppDownloadSection() {
  return (
    <section className="py-20 bg-background" aria-label="Download the Ansh Travel app">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#1E293B] to-slate-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Content */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <span className="inline-block bg-[#0B5FFF]/20 text-[#60A5FA] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 w-fit">
              Mobile App
            </span>
            <h2 className="font-['Poppins'] font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">
              Travel on the go.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA5] to-[#0B5FFF]">
                Book in seconds.
              </span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Get exclusive app-only deals, real-time flight alerts, and manage
              all your bookings from anywhere — even offline.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {[
                { store: "App Store", icon: "🍎", sub: "Download on the" },
                { store: "Google Play", icon: "▶", sub: "Get it on" },
              ].map(({ store, icon, sub }) => (
                <button
                  key={store}
                  aria-label={`Download on ${store}`}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl px-5 py-3.5 transition-all hover:shadow-lg"
                >
                  <span className="text-2xl">{icon}</span>
                  <div className="text-left">
                    <div className="text-white/60 text-[10px]">{sub}</div>
                    <div className="font-['Poppins'] font-bold text-sm">
                      {store}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { val: "4.9★", label: "App Store" },
                { val: "10M+", label: "Downloads" },
                { val: "App of", label: "the Year" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                >
                  <div className="text-white font-bold text-lg font-['Poppins']">
                    {val}
                  </div>
                  <div className="text-slate-400 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative flex items-end justify-center pt-10 px-8 min-h-[380px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B5FFF]/20 to-[#00BFA5]/10" />
            <div className="relative z-10 w-52 bg-slate-900 rounded-[2.5rem] border-4 border-slate-700 shadow-2xl overflow-hidden">
              <div className="h-7 bg-slate-900 flex items-center justify-center">
                <div className="w-20 h-4 bg-slate-800 rounded-full" />
              </div>
              <div className="bg-gradient-to-br from-[#0B5FFF] to-[#00BFA5] p-4 min-h-80 relative overflow-hidden">
                <div className="text-white text-xs font-bold mb-3 font-['Poppins']">
                  Ansh Travels
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-3 mb-3">
                  <div className="text-white text-[10px] font-semibold mb-0.5">
                   New Delhi → Kochi 
                  </div>
                  <div className="text-white/70 text-[9px]">
                    Jul 15 · 1 Adult · Economy
                  </div>
                  <div className="text-white font-bold text-sm mt-1">₹ 10,821</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <img
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&h=80&fit=crop&auto=format"
                    alt="Bali"
                    loading="lazy"
                    className="w-full h-14 object-cover rounded-lg mb-2"
                  />
                  <div className="text-white text-[10px] font-semibold">
                   Kerala  Serenity Escape
                  </div>
                  <div className="text-white/70 text-[9px]">
                    7N · 5-star · from ₹14,999*
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur p-2.5 flex justify-around">
                  {[Plane, "🏨", "📦", "👤"].map((item, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${
                        i === 0 ? "bg-white" : "bg-white/20"
                      }`}
                    >
                      {i === 0 ? (
                        <Plane
                          size={14}
                          className="text-[#0B5FFF]"
                        />
                      ) : (
                        item
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-16 bg-[#EEF2F8]" aria-label="Newsletter signup">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#0B5FFF] via-blue-600 to-[#00BFA5] rounded-3xl p-8 sm:p-12 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/10" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-white/10" />
          </div>

          <div className="relative z-10">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Newsletter
            </span>
            <h2 className="font-['Poppins'] font-bold text-white text-3xl lg:text-4xl mb-3">
              Get the best deals first
            </h2>
            <p className="text-white/80 text-base lg:text-lg mb-8 max-w-xl mx-auto">
              Join 840,000+ travellers and be first to know about flash sales
              and exclusive discounts.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/20 border border-white/30 rounded-2xl px-8 py-4 inline-flex items-center gap-3 text-white font-semibold"
              >
                ✓ You're subscribed! Watch your inbox for great deals.
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  aria-label="Email address"
                  className="flex-1 w-full bg-white/20 backdrop-blur border border-white/30 text-white placeholder:text-white/50 rounded-2xl px-5 py-3.5 text-sm outline-none focus:bg-white/30 transition-colors"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-white hover:bg-slate-100 text-[#0B5FFF] font-bold text-sm px-6 py-3.5 rounded-2xl flex items-center gap-2 transition-all hover:shadow-lg active:scale-95"
                >
                  Subscribe
                  <Send size={15} />
                </button>
              </form>
            )}

            <p className="text-white/50 text-xs mt-4">
              No spam, unsubscribe any time. 🔒 Privacy guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────
/**
 * Home page — full landing page with hero, offers, destinations,
 * packages, hotels, why-us, testimonials, app download, and newsletter.
 */
export default function Home() {
  return (
    <>
      {/* SEO meta handled at router level; title set in head */}
      <HeroSection />
      <OffersSection />
      <DestinationsSection />
      <PackagesSection />
      <HotelsSection />
      <WhySection />
      <TestimonialsSection />
      <AppDownloadSection />
      <NewsletterSection />
    </>
  );
}
