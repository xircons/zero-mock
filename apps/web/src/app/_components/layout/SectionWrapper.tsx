import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  theme?: "dark" | "light" | "darkest";
  id?: string;
  hideInternalLines?: boolean;
  hideAllLines?: boolean;
  fullHeight?: boolean;
}

export function SectionWrapper({ 
  children, 
  className, 
  theme = "dark", 
  id,
  hideInternalLines = false,
  hideAllLines = false,
  fullHeight = false
}: SectionWrapperProps) {
  const backgrounds = {
    dark: "bg-surface-primary",
    light: "bg-surface-light text-text-dark-primary",
    darkest: "bg-surface-primary"
  };

  const borders = {
    dark: "border-t border-border-subtle",
    light: "border-t border-border-light-subtle",
    darkest: "border-t border-border-subtle"
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full max-w-[100vw] py-12 md:py-20 z-10 flex flex-col",
        fullHeight && "min-h-[100vh]",
        backgrounds[theme],
        borders[theme],
        className
      )}
    >
      {/* Embedded Grid Lines */}
      {!hideAllLines && (
        <div className="absolute inset-0 max-w-[1280px] mx-auto px-5 md:px-8 grid grid-cols-4 pointer-events-none z-0">
          <div className={cn("border-l border-[var(--border-overlay)] h-full", !hideInternalLines && "border-r")} />
          <div className={cn("h-full", !hideInternalLines && "border-r border-[var(--border-overlay)]")} />
          <div className={cn("h-full", !hideInternalLines && "border-r border-[var(--border-overlay)]")} />
          <div className="border-r border-[var(--border-overlay)] h-full" />
        </div>
      )}

      <div className="max-w-[1280px] w-full mx-auto mt-12 px-5 md:px-8 grid grid-cols-4 flex-1 relative z-10">
        {children}
      </div>
    </section>
  );
}