import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TerminalWindowProps {
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ children, className }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[540px] bg-[#0A0A0A] border border-border-default rounded-none overflow-hidden shadow-2xl hover:border-border-hover transition-colors duration-300",
        className
      )}
    >
      {/* Header Bar */}
      <div className="bg-surface-primary border-b border-border-default px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-80" />
        </div>
        <div className="text-[11px] text-text-muted font-mono select-none uppercase tracking-widest">
          zero-mock — bash
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-[13px] leading-loose text-text-secondary overflow-x-auto whitespace-pre">
        {children}
      </div>
    </div>
  );
}
