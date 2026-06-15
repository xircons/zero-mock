import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DotGridCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export function DotGridCard({ title, description, icon, className }: DotGridCardProps) {
  return (
    <div
      className={cn(
        "group relative min-h-[280px] p-[32px_24px] flex flex-col border-r border-t border-[var(--border-overlay)] last:border-r-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-300",
        className
      )}
    >
      {/* Dot Grid with fade mask */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 80%)"
        }}
      />
      
      {/* Bottom Glow Blob */}
      <div 
        className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-full h-[300px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "var(--glow-subtle)"
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-start pt-[15%] relative z-10">
        <div className="text-text-secondary group-hover:text-text-primary group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
      </div>

      <div className="relative z-10 mt-auto text-left transform group-hover:translate-y-[-4px] transition-transform duration-300">
        <h3 className="text-[14px] font-semibold text-text-primary mb-2.5">{title}</h3>
        <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
