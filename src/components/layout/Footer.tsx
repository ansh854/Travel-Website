import { Link } from "react-router";
import {
  Plane,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const COLS = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "#" },
      { label: "Careers", to: "#" },
      { label: "Press", to: "#" },
      { label: "Blog", to: "#" },
      { label: "Investor Relations", to: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "#" },
      { label: "Contact Us", to: "#" },
      { label: "Cancellation Policy", to: "#" },
      { label: "COVID Travel Info", to: "#" },
      { label: "Accessibility", to: "#" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Flights", to: "/flights" },
      { label: "Hotels", to: "/hotels" },
      { label: "Trains", to: "/trains" },
      { label: "Buses", to: "/buses" },
      { label: "Holiday Packages", to: "/holidays" },
      { label: "Visa Services", to: "#" },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "List Your Hotel", to: "#" },
      { label: "Affiliate Program", to: "#" },
      { label: "Corporate Travel", to: "#" },
      { label: "Travel Agents", to: "#" },
      { label: "API Access", to: "#" },
    ],
  },
];

const SOCIAL = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Youtube, label: "YouTube" },
];

const PAYMENTS = ["VISA", "MC", "AMEX", "PayPal", "UPI", "GPay", "NetBanking"];

/**
 * Full multi-column site footer with social links, payment badges, and legal copy.
 */
export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 mb-4"
              aria-label="Ansh Travels home"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0B5FFF] to-[#00BFA5] flex items-center justify-center">
                <Plane size={16} className="text-white rotate-45" />
              </div>
              <span className="font-['Poppins'] font-bold text-xl">
                Ansh Travels<span className="text-[#FF7A00]">X</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your smart travel companion. Find, compare, and book flights,
              hotels, trains, and holiday packages at the best prices.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5 mb-6">
              {SOCIAL.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-[#0B5FFF] rounded-xl flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-2.5">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Phone size={14} className="text-[#00BFA5] shrink-0" />
                +91 9829171329
              </a>
              <a
                href="mailto:support@Ansh Travels.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Mail size={14} className="text-[#00BFA5] shrink-0" />
                support@AnshTravels.com
              </a>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin size={14} className="text-[#00BFA5] shrink-0" />
                123 Travel Lane, Jaipur Rajasthan
              </div>
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-['Poppins'] font-semibold text-sm mb-4 text-white">
                {col.title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Payment methods */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-slate-500 text-xs mr-2">We accept:</span>
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="bg-white/10 border border-white/10 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md"
              >
                {p}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} Ansh Travels Pvt. Ltd. All rights
              reserved.
            </p>
            <div className="flex gap-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (l) => (
                  <a
                    key={l}
                    href="#"
                    className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
                  >
                    {l}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
