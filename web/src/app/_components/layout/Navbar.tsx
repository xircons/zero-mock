"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Image from "next/image";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 20);

      // detect if currently over a light section
      const testimonials = document.getElementById("testimonials");
      const faq = document.getElementById("faq");

      const checkInView = (el: HTMLElement | null) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        // Navbar is roughly 80px high, check if top of viewport is within section
        return rect.top <= 80 && rect.bottom >= 80;
      };

      setIsLightSection(checkInView(testimonials) || checkInView(faq));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 w-full z-[70] transition-all duration-300 px-6 md:px-12 py-2 md:py-4 flex justify-between items-center",
          !menuOpen && scrolled ? (isLightSection ? "bg-surface-light/85 backdrop-blur-xl border-b border-border-light-subtle py-2 md:py-4" : "bg-surface-primary/85 backdrop-blur-xl border-b border-border-subtle py-3 md:py-4") : "bg-transparent"
        )}
      >
        <div className="relative transition-all duration-300 w-[200px] h-10 md:h-12">
          <Image
            src="/logo/zero-mock-white-logo.png"
            alt="zero-mock"
            width={200}
            height={48}
            className={clsx(
              "h-10 md:h-12 w-auto object-contain absolute top-0 left-0 transition-opacity duration-300",
              !menuOpen && isLightSection ? "opacity-0" : "opacity-100"
            )}
          />
          <Image
            src="/logo/zero-mock-dark-logo.png"
            alt="zero-mock"
            width={200}
            height={48}
            className={clsx(
              "h-10 md:h-12 w-auto object-contain absolute top-0 left-0 transition-opacity duration-300",
              !menuOpen && isLightSection ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-50 w-11 h-11 flex items-center justify-center cursor-pointer group"
        >
          <div className="relative w-5 h-3">
            <span
              className={clsx(
                "absolute left-0 top-0 w-full h-[1.5px] transition-all duration-300",
                menuOpen ? "rotate-45 top-1/2 -translate-y-1/2 bg-black" : (isLightSection && !menuOpen ? "bg-black" : "bg-white"),
                !menuOpen && "group-hover:translate-y-[1px]"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 bottom-0 w-full h-[1.5px] transition-all duration-300",
                menuOpen ? "-rotate-45 bottom-1/2 translate-y-1/2 bg-black" : (isLightSection && !menuOpen ? "bg-black" : "bg-white"),
                !menuOpen && "group-hover:-translate-y-[1px]"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[60] flex flex-row overflow-hidden">
            {/* Left Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 bg-surface-primary flex flex-col justify-between p-8 md:p-12 overflow-y-auto border-r border-border-subtle"
            >
              <div />
              <div className="text-[11px] text-text-muted font-mono uppercase tracking-widest">
                © 2026 Zero-mock. All rights reserved.
              </div>
            </motion.div>

            {/* Right Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 bg-surface-light flex flex-col p-8 md:p-12 overflow-y-auto"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 pt-16">
                <div className="flex flex-col gap-2 md:gap-4">
                  <div className="text-[10px] uppercase tracking-widest text-text-dark-muted font-medium">QUICK LINKS</div>
                  {["Home", "Pricing", "About", "Projects", "Articles", "Contact Us"].map((link) => (
                    <a
                      key={link}
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="text-[28px] md:text-[36px] font-semibold tracking-tighter text-text-dark-primary border border-transparent transition-colors duration-200 hover:text-white hover:bg-surface-primary hover:border-border-subtle px-3 -mx-3"
                    >
                      {link}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col gap-2 md:gap-4">
                  <div className="text-[10px] uppercase tracking-widest text-text-dark-muted font-medium">OTHER LINKS</div>
                  {["Terms & Conditions", "Privacy Policies", "Hire via Contra", "Book A Call"].map((link) => (
                    <a
                      key={link}
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="text-[28px] md:text-[36px] font-semibold tracking-tighter text-text-dark-primary border border-transparent transition-colors duration-200 hover:text-white hover:bg-surface-primary hover:border-border-subtle px-3 -mx-3"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-text-dark-muted font-mono">
                {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
