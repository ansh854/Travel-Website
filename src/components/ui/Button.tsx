import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variantClasses = {
  primary:
    "bg-gradient-to-r from-[#0B5FFF] to-[#00BFA5] hover:from-blue-600 hover:to-teal-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35",
  secondary:
    "bg-[#0B5FFF] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35",
  outline:
    "border border-[#0B5FFF] text-[#0B5FFF] hover:bg-[#0B5FFF] hover:text-white",
  ghost:
    "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
  danger:
    "bg-red-500 hover:bg-red-600 text-white",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-2xl",
};

/** Reusable button component with multiple variants and sizes. */
export default function Button({
  children,
  variant = "secondary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold font-['Inter'] transition-all duration-200
        active:scale-95 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#0B5FFF] focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
