import { motion } from "motion/react";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  /** Align left instead of center */
  left?: boolean;
  /** Override label pill colour — default is blue */
  labelColor?: "blue" | "teal" | "orange";
}

const labelColors = {
  blue: "bg-blue-100 text-[#0B5FFF]",
  teal: "bg-teal-100 text-[#00BFA5]",
  orange: "bg-orange-100 text-[#FF7A00]",
};

/**
 * Reusable animated section header used across all pages.
 */
export default function SectionHeader({
  label,
  title,
  subtitle,
  left = false,
  labelColor = "blue",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={left ? "text-left" : "text-center"}
    >
      <span
        className={`inline-block ${labelColors[labelColor]} text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4`}
      >
        {label}
      </span>
      <h2 className="font-['Poppins'] font-bold text-[#1E293B] text-3xl lg:text-5xl mb-3 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-slate-500 text-base lg:text-lg ${left ? "" : "max-w-xl mx-auto"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
