import { AccentColor, FontStyle, LayoutDensity } from "../types";

export interface ColorScheme {
  name: string;
  hex: string;
  primaryBg: string;
  primaryText: string;
  primaryBorder: string;
  secondaryBg: string;
  tagBg: string;
  badgeBorder: string;
  subtleBg: string;
}

export const colorThemes: Record<AccentColor, ColorScheme> = {
  indigo: {
    name: "Royal Indigo",
    hex: "#4f46e5",
    primaryBg: "bg-indigo-600",
    primaryText: "text-indigo-600",
    primaryBorder: "border-indigo-600",
    secondaryBg: "bg-indigo-50",
    tagBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    badgeBorder: "border-indigo-300",
    subtleBg: "bg-indigo-900",
  },
  navy: {
    name: "Classic Navy",
    hex: "#1e3a8a",
    primaryBg: "bg-blue-900",
    primaryText: "text-blue-900",
    primaryBorder: "border-blue-900",
    secondaryBg: "bg-blue-50",
    tagBg: "bg-blue-50 text-blue-800 border-blue-200",
    badgeBorder: "border-blue-300",
    subtleBg: "bg-slate-900",
  },
  emerald: {
    name: "Forest Emerald",
    hex: "#059669",
    primaryBg: "bg-emerald-600",
    primaryText: "text-emerald-700",
    primaryBorder: "border-emerald-600",
    secondaryBg: "bg-emerald-50",
    tagBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    badgeBorder: "border-emerald-300",
    subtleBg: "bg-emerald-950",
  },
  slate: {
    name: "Executive Slate",
    hex: "#334155",
    primaryBg: "bg-slate-800",
    primaryText: "text-slate-800",
    primaryBorder: "border-slate-800",
    secondaryBg: "bg-slate-100",
    tagBg: "bg-slate-100 text-slate-800 border-slate-300",
    badgeBorder: "border-slate-300",
    subtleBg: "bg-slate-900",
  },
  crimson: {
    name: "Deep Crimson",
    hex: "#be123c",
    primaryBg: "bg-rose-700",
    primaryText: "text-rose-700",
    primaryBorder: "border-rose-700",
    secondaryBg: "bg-rose-50",
    tagBg: "bg-rose-50 text-rose-800 border-rose-200",
    badgeBorder: "border-rose-300",
    subtleBg: "bg-rose-950",
  },
  amber: {
    name: "Warm Bronze",
    hex: "#b45309",
    primaryBg: "bg-amber-700",
    primaryText: "text-amber-800",
    primaryBorder: "border-amber-700",
    secondaryBg: "bg-amber-50",
    tagBg: "bg-amber-50 text-amber-900 border-amber-200",
    badgeBorder: "border-amber-300",
    subtleBg: "bg-amber-950",
  },
  rose: {
    name: "Modern Rose",
    hex: "#e11d48",
    primaryBg: "bg-pink-600",
    primaryText: "text-pink-600",
    primaryBorder: "border-pink-600",
    secondaryBg: "bg-pink-50",
    tagBg: "bg-pink-50 text-pink-700 border-pink-200",
    badgeBorder: "border-pink-300",
    subtleBg: "bg-pink-950",
  },
};

export function getFontClass(font: FontStyle): string {
  switch (font) {
    case "serif":
      return "font-serif-clean";
    case "mono":
      return "font-mono-clean";
    case "display":
      return "font-display-clean";
    case "sans":
    default:
      return "font-sans";
  }
}

export function getDensityClass(density: LayoutDensity): {
  containerPadding: string;
  sectionGap: string;
  itemGap: string;
  bulletSpacing: string;
  headingMargin: string;
} {
  switch (density) {
    case "compact":
      return {
        containerPadding: "p-6 sm:p-8",
        sectionGap: "space-y-3.5",
        itemGap: "space-y-2",
        bulletSpacing: "space-y-1 text-xs",
        headingMargin: "mb-1.5 pb-1",
      };
    case "spacious":
      return {
        containerPadding: "p-10 sm:p-14",
        sectionGap: "space-y-7",
        itemGap: "space-y-4",
        bulletSpacing: "space-y-2 text-sm",
        headingMargin: "mb-3 pb-1.5",
      };
    case "normal":
    default:
      return {
        containerPadding: "p-8 sm:p-10",
        sectionGap: "space-y-5",
        itemGap: "space-y-3",
        bulletSpacing: "space-y-1.5 text-xs sm:text-[13px]",
        headingMargin: "mb-2 pb-1",
      };
  }
}
