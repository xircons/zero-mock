"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "../layout/SectionWrapper";
import { EyebrowLabel } from "../ui/EyebrowLabel";
import { BrutalistButton } from "../ui/BrutalistButton";

const stats = [
  { value: "12ms", desc: "Average latency for\nreal-time inference." },
  { value: "10x", desc: "Increase in manual\ntask processing speed." },
  { value: "99%", desc: "Uptime for critical\nagent infrastructure." },
];

export function StatisticsSection() {
  return (
    <SectionWrapper theme="dark" className="py-16 md:py-20" id="statistics" hideInternalLines={true}>
      <div className="col-start-1 col-span-4 flex flex-col w-full relative">

        {/* Top Header Row */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-12 p-8 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 border-t border-border-subtle relative z-10"
        >
          <div className="max-w-[500px]">
            <EyebrowLabel theme="dark">PERFORMANCE</EyebrowLabel>
            <h2 className="text-[32px] md:text-[48px] font-bold text-text-primary mb-6 leading-tight tracking-tighter">
              Speed and stability across every deployment.
            </h2>
            <p className="text-[15px] text-text-secondary leading-relaxed">
              We measure success by the speed and scale of your neural ops, ensuring ultra-low latency and consistent uptime for critical infrastructure.
            </p>
          </div>
          <button className="bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1">
            <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
              <span>&gt;</span>
              <span> VIEW REPORT</span>
            </span>
          </button>
        </motion.div>

        {/* 3-Column Stats Grid */}
        <div className="grid grid-cols-3 w-full relative border-t border-border-subtle">
          {/* Dot Grid Background for Stats Area */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30 z-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(circle at center, black 0%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 100%)"
            }}
          />

          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20, 
                delay: i * 0.15 
              }}
              className="col-span-1 p-4 sm:p-10 md:p-14 border-b border-r border-border-subtle last:border-r-0 relative flex flex-col justify-center min-h-[240px] sm:min-h-[360px] hover:bg-white/[0.03] transition-[background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 group"
            >
              {/* Corner bracket SVG top-right */}
              <svg className="absolute top-4 right-4 sm:top-8 sm:right-8 w-3 h-3 sm:w-4 sm:h-4 text-border-hover group-hover:text-white transition-colors" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M0 0H12V12" strokeLinecap="square" />
              </svg>

              <div className="text-[32px] sm:text-[64px] md:text-[88px] font-bold text-text-primary mb-2 sm:mb-4 tracking-tighter leading-none">
                {stat.value}
              </div>
              
              <p className="text-[9px] sm:text-[13px] font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] text-text-muted leading-tight sm:leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
