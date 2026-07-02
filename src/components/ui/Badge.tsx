import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "success" | "warning" | "danger" | "neutral" | "glass";
}

const variants = {
  primary: "bg-blue-100 text-[#0B5FFF]",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-600",
  neutral: "bg-slate-100 text-slate-600",
  glass: "bg-white/20 border border-white/30 text-white",
};

/** Small label chip used throughout the app. */
export default function Badge({ children, variant = "primary" }: BadgeProps) {
  return (
    <span
      className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
