import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

/**
 * Application root.
 * RouterProvider handles all routing; pages are lazy-loaded via Suspense.
 */
function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing logo mark */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B5FFF] to-[#00BFA5] animate-pulse" />
        <p className="text-slate-400 text-sm font-medium">Loading Ansh Travels…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
