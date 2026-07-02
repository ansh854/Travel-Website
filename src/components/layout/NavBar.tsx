import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Plane,
  Globe,
  ChevronDown,
  Menu,
  X,
  User,
  LogIn,
} from "lucide-react";
import Button from "../ui/Button";

const NAV_LINKS = [
  
  { label: "Home", to: "/" },
  { label: "Flights", to: "/flights" },
  { label: "Hotels", to: "/hotels" },
  { label: "Holidays", to: "/holidays" },
  { label: "Trains", to: "/trains" },
  { label: "Buses", to: "/buses" },
];
];

/**
 * Sticky transparent-to-solid navigation bar.
 * Becomes white with shadow after 60px of scroll.
 */
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-200/60"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Ansh Travels home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0B5FFF] to-[#00BFA5] flex items-center justify-center">
              <Plane size={16} className="text-white rotate-45" />
            </div>
            <span
              className={`font-bold text-xl tracking-tight font-['Poppins'] transition-colors ${
                scrolled || mobileOpen ? "text-[#1E293B]" : "text-white"
              }`}
            >
              ANSH <span className="text-[#FF7A00]">TRAVELS</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? scrolled
                        ? "text-[#0B5FFF] bg-blue-50"
                        : "text-white bg-white/15"
                      : scrolled
                      ? "text-slate-600 hover:text-[#0B5FFF] hover:bg-blue-50"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language selector */}
            <button
              className={`hidden sm:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                scrolled
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Language selector"
            >
              <Globe size={15} />
              <span>EN</span>
              <ChevronDown size={11} />
            </button>

            {/* Currency */}
            <button
              className={`hidden md:flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                scrolled
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Currency selector"
            >
              USD
              <ChevronDown size={11} />
            </button>

            {/* Sign In */}
            <Button variant="secondary" size="sm" className="hidden sm:flex">
              <LogIn size={15} />
              Sign In
            </Button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                scrolled || mobileOpen
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-border bg-white/95 backdrop-blur-md"
            >
              <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <NavLink
                    key={l.label}
                    to={l.to}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-blue-50 text-[#0B5FFF]"
                          : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <div className="mt-2 pt-2 border-t border-border flex gap-2">
                  <Button variant="outline" size="md" fullWidth>
                    <User size={15} />
                    Sign Up
                  </Button>
                  <Button variant="secondary" size="md" fullWidth>
                    <LogIn size={15} />
                    Sign In
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
