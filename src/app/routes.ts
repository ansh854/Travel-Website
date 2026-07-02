import { createBrowserRouter } from "react-router";
import { lazy } from "react";

// Layout
import RootLayout from "../components/layout/RootLayout";

// Lazy-load pages for code splitting
const Home = lazy(() => import("../pages/Home"));
const Flights = lazy(() => import("../pages/Flights"));
const Hotels = lazy(() => import("../pages/Hotels"));
const Trains = lazy(() => import("../pages/Trains"));
const Buses = lazy(() => import("../pages/Buses"));
const Holidays = lazy(() => import("../pages/Holidays"));
const NotFound = lazy(() => import("../pages/NotFound"));

/**
 * Application route configuration.
 * All pages are lazy-loaded for faster initial load.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "flights", Component: Flights },
      { path: "hotels", Component: Hotels },
      { path: "trains", Component: Trains },
      { path: "buses", Component: Buses },
      { path: "holidays", Component: Holidays },
      { path: "*", Component: NotFound },
    ],
  },
]);
