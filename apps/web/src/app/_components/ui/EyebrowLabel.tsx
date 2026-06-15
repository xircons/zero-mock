import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EyebrowLabelProps {
  children: React.ReactNode;
  className?: string;
  theme?: "dark" | "light";
}

export function EyebrowLabel({ children, className, theme = "dark" }: EyebrowLabelProps) {
  return (
    <div
      className={cn(
        "text-[11px] uppercase tracking-[0.1em] font-medium flex items-center mb-6",
        theme === "dark" ? "text-text-muted" : "text-text-dark-muted",
        className
      )}
    >
      <span className="mr-2.5 select-none opacity-60">≋</span>
      {children}
    </div>
  );
}
