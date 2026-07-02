import { Link } from "react-router";
import { motion } from "motion/react";
import { Plane, Home, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";

/**
 * 404 Not Found page with animated illustration and navigation back home.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Animated plane */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-gradient-to-br from-[#0B5FFF] to-[#00BFA5] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/30"
        >
          <Plane size={44} className="text-white rotate-45" />
        </motion.div>

        <h1 className="font-['Poppins'] font-bold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#0B5FFF] to-[#00BFA5] mb-2">
          404
        </h1>
        <h2 className="font-['Poppins'] font-bold text-[#1E293B] text-2xl mb-3">
          Lost in Transit
        </h2>
        <p className="text-slate-500 text-base leading-relaxed mb-8">
          Looks like this page has flown the coop. Let us get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg">
              <Home size={18} />
              Back to Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="outline" size="lg">
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
