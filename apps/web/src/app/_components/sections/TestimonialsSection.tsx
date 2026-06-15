"use client";

import { motion } from "framer-motion";
import { Leaf, CircleDot, Orbit, Moon } from "lucide-react";
import { SectionWrapper } from "../layout/SectionWrapper";
import { EyebrowLabel } from "../ui/EyebrowLabel";

const testimonials = [
  {
    icon: <Leaf size={28} className="stroke-[#111] stroke-[1.5px]" />,
    title: "Infrastructure that finally scales",
    company: "Vertex Labs",
    review: "The reliability of Zero-Mock is unmatched. We migrated our entire API layer and hit production in days, not weeks."
  },
  {
    icon: <CircleDot size={28} className="stroke-[#111] stroke-[1.5px]" />,
    title: "Saved us months of R&D",
    company: "FlowState AI",
    review: "Instead of building our own mock logic from scratch, we used Zero-Mock. Prototype to global launch in two weeks."
  },
  {
    icon: <Orbit size={28} className="stroke-[#111] stroke-[1.5px]" />,
    title: "Precision in every response",
    company: "Neural Sync",
    review: "The schema validation and chaos testing tools let us simulate edge cases we'd never thought to test manually."
  },
  {
    icon: <Moon size={28} className="stroke-[#111] stroke-[1.5px]" />,
    title: "Enterprise-grade by default",
    company: "Sentinel Ops",
    review: "Our non-technical stakeholders can now map out complex API behaviors without writing a single line of code."
  }
];

export function TestimonialsSection() {
  return (
    <SectionWrapper theme="light" className="pb-0" id="testimonials">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="col-start-1 col-span-4 md:col-span-2 mb-24 px-0"
      >
        <EyebrowLabel theme="light">TESTIMONIALS</EyebrowLabel>
        <h2 className="text-[40px] md:text-[56px] font-bold text-text-dark-primary mb-8 max-w-[400px]">
          Trusted by the<br/>pioneers.
        </h2>
        <p className="text-[15px] text-text-dark-secondary max-w-[480px]">
          From high-growth startups to enterprise research labs, Zero-Mock is the chosen infrastructure for teams building the next era of APIs.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="col-start-1 col-span-4 grid grid-cols-1 md:grid-cols-4 w-full border-t border-border-light-default">
        {testimonials.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 p-8 min-h-[360px] border border-border-light-default flex flex-col justify-between hover:bg-surface-light-alt transition-colors duration-300"
          >
            <div className="flex items-center gap-4">
              {item.icon}
              <h3 className="text-[14px] font-semibold text-text-dark-primary">
                {item.title}
              </h3>
            </div>
            
            <div className="mt-auto">
              <div className="text-[11px] font-medium uppercase tracking-widest text-text-dark-muted mb-4">RATING 5/5</div>
              <p className="text-[13px] text-text-dark-secondary mb-8 leading-relaxed">
                &quot;{item.review}&quot;
              </p>
              
              <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1 w-4 opacity-20">
                  <div className="h-[2px] w-full bg-text-dark-primary"></div>
                  <div className="h-[2px] w-full bg-text-dark-primary"></div>
                  <div className="h-[2px] w-full bg-text-dark-primary"></div>
                </div>
                <span className="text-[10px] font-medium tracking-widest uppercase text-text-dark-muted">
                  {item.company}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </SectionWrapper>
  );
}
