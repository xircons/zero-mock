import { type ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BrutalistButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
}

export const BrutalistButton = forwardRef<HTMLButtonElement, BrutalistButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 rounded-none active:scale-[0.98]";
    
    const variants = {
      primary: "bg-text-primary text-text-dark-primary hover:bg-surface-light-alt shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none border border-transparent",
      secondary: "bg-text-dark-primary text-text-primary hover:bg-surface-tertiary",
      outline: "border border-border-light-default dark:border-border-default bg-transparent text-text-dark-primary dark:text-text-primary hover:border-text-dark-primary dark:hover:border-text-primary"
    };

    const sizes = {
      default: "h-10 px-[24px] py-[10px] text-[13px]",
      sm: "h-8 px-[16px] py-[8px] text-[12px]",
      lg: "h-12 px-[32px] py-[12px] text-[14px]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
BrutalistButton.displayName = "BrutalistButton";
