import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ScrollProgress from "../ui/ScrollProgress";
import BackToTop from "../ui/BackToTop";

/**
 * Root layout wrapping every page — navbar at top, footer at bottom.
 * Scrolls to top on route change.
 */
export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
<>
  <ScrollProgress />

  {/* Existing Navbar */}
  <NavBar />

  <main>
    <Outlet />
  </main>
<BackToTop />
  <Footer />
</>
  return (
    <div className="min-h-screen bg-background flex flex-col font-['Inter',sans-serif]">
      <NavBar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
