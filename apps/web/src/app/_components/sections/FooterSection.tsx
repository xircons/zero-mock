"use client";

import { Globe, MessageSquare, Users } from "lucide-react";
import { EyebrowLabel } from "../ui/EyebrowLabel";
import { BrutalistButton } from "../ui/BrutalistButton";
import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="relative w-[100vw] overflow-hidden bg-surface-primary flex flex-col items-center pt-24 md:pt-32 pb-0 z-10 border-t border-border-subtle">

      {/* Background Dot Grid & Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "var(--dot-pattern)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="w-full relative z-10">

        {/* Newsletter CTA */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 pb-16 md:pb-20 p-8 border-b border-border-subtle">
          <div className="text-left">
            <EyebrowLabel theme="dark">GET STARTED</EyebrowLabel>
            <h2 className="text-[32px] md:text-[48px] font-bold text-text-primary leading-[1.1] mb-6">
              Get smarter about<br className="hidden md:block" />API systems.
            </h2>
            <p className="text-[14px] md:text-[15px] text-text-secondary max-w-[320px]">
              Weekly insights on mock infrastructure, AI workflows, and real builds.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-surface-tertiary/50 border border-border-default sm:border-r-0 px-5 py-4 md:py-3 text-[14px] text-text-primary placeholder-text-muted outline-none w-full sm:min-w-[280px] focus:bg-surface-tertiary transition-colors mb-2 sm:mb-0"
            />
            <button className="bg-white text-black px-6 py-4 md:py-3 text-[13px] font-semibold transition-colors hover:bg-white group flex items-center justify-center gap-1 border border-black whitespace-nowrap">
              <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                <span>&gt;</span>
                <span>SEND</span>
              </span>
            </button>
          </div>
        </div>

        {/* 4-Col Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-12 w-full mb-24 md:mb-40 p-8">
          {/* Col 1 - Brand */}
          <div className="col-span-2 md:col-span-1 mb-8 md:mb-0">
            <Image
              src="/logo/zero-mock-white-logo.png"
              alt="zero-mock"
              width={160}
              height={40}
              className="h-8 w-auto object-contain opacity-90"
            />
          </div>

          {/* Col 2 - Quick Links */}
          <div className="col-span-1 flex flex-col gap-5">
            <div className="text-[11px] uppercase font-medium tracking-widest text-text-muted mb-3">QUICK LINKS</div>
            <a href="#" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">Home</a>
            <a href="#" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">Pricing</a>
            <a href="#" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">About</a>
            <a href="#" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">Projects</a>
          </div>

          {/* Col 3 - Company */}
          <div className="col-span-1 flex flex-col gap-5">
            <div className="text-[11px] uppercase font-medium tracking-widest text-text-muted mb-3">OTHER LINKS</div>
            <a href="#" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">Terms</a>
            <a href="#" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">Privacy</a>
            <a href="#" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">Hire</a>
            <a href="#" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">Book A Call</a>
          </div>

          {/* Col 4 - Socials */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5 mt-8 md:mt-0">
            <div className="text-[11px] uppercase font-medium tracking-widest text-text-muted mb-3">CONNECT</div>
            <div className="flex items-center gap-4">
              <a href="#" className="border border-border-default p-3 rounded-none text-text-secondary hover:text-text-primary hover:border-text-primary transition-all duration-200">
                <Globe size={18} />
              </a>
              <a href="#" className="border border-border-default p-3 rounded-none text-text-secondary hover:text-text-primary hover:border-text-primary transition-all duration-200">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="border border-border-default p-3 rounded-none text-text-secondary hover:text-text-primary hover:border-text-primary transition-all duration-200">
                <Users size={18} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ASCII Logo - full width with glow */}
      <div className="w-full px-6 md:px-12 relative flex flex-col items-center mb-16 md:mb-24 mt-auto">

        {/* Glow Blob */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] h-[120%] pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 45%, transparent 100%)",
            filter: "blur(40px)"
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="sr-only">Mock Now</h1>
          <pre
            aria-hidden="true"
            className="font-mono text-[11px] sm:text-[20px] md:text-[32px] lg:text-[42px] leading-[1.1] text-text-primary whitespace-pre text-center"
            style={{ filter: "drop-shadow(0 0 24px rgba(255,255,255,0.35))" }}
          >
            {`▗▄▄▄▄▖▗▄▄▄▖▗▄▄▖  ▗▄▖ ▗▖  ▗▖ ▗▄▖  ▗▄▄▖▗▖ ▗▖
   ▗▞▘▐▌   ▐▌ ▐▌▐▌ ▐▌▐▛▚▞▜▌▐▌ ▐▌▐▌   ▐▌▗▞▘
 ▗▞▘  ▐▛▀▀▘▐▛▀▚▖▐▌ ▐▌▐▌  ▐▌▐▌ ▐▌▐▌   ▐▛▚▖ 
▐▙▄▄▄▖▐▙▄▄▖▐▌ ▐▌▝▚▄▞▘▐▌  ▐▌▝▚▄▞▘▝▚▄▄▖▐▌ ▐▌`}
          </pre>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full border-t border-border-subtle py-6 text-center z-10 relative bg-surface-primary">
        <div className="text-[11px] text-text-muted font-mono uppercase tracking-widest">
          © 2026 Zero-mock. All rights reserved.
        </div>
      </div>

    </footer>
  );
}
