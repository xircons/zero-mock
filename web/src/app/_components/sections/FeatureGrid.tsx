"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Shield, Bot, Cloud, Database } from "lucide-react";
import { DotGridCard } from "../ui/DotGridCard";
import { SectionWrapper } from "../layout/SectionWrapper";

const scrollText = "Zero-Mock gives your team a persistent, intelligent REST API from a single JSON file. Generate endpoints, inject chaos, sync across environments, and ship faster than ever. Built for the engineers who refuse to wait on backend.";

const features = [
  {
    icon: <Shield size={32} className="stroke-white stroke-[1.5px]" />,
    title: "Secure Guard",
    description: "Fortify AI deployments with robust security protocols and strict data privacy standards."
  },
  {
    icon: <Bot size={32} className="stroke-white stroke-[1.5px]" />,
    title: "Agent Build",
    description: "Tailored AI agents for your needs with custom logic and deep workflow integrations."
  },
  {
    icon: <Cloud size={32} className="stroke-white stroke-[1.5px]" />,
    title: "Cloud Scale",
    description: "Infrastructure for high-traffic AI apps. Fast, responsive, always on."
  },
  {
    icon: <Database size={32} className="stroke-white stroke-[1.5px]" />,
    title: "Data Mining",
    description: "Transform raw information into intelligence powering your organization's data stores."
  }
];

function RevealWord({
  word,
  start,
  end,
  scrollYProgress,
}: {
  word: string;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["var(--color-text-muted)", "var(--color-text-primary)"]
  );

  return <motion.span style={{ color, opacity }}>{word}</motion.span>;
}

export function FeatureGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = scrollText.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.6", "end 0.8"]
  });

  return (
    <SectionWrapper theme="dark" className="!p-0" id="feature-grid" hideInternalLines={true}>
      {/* Scroll Reveal Text Area */}
      <div
        ref={containerRef}
        className="col-start-1 col-span-4 md:col-start-2 md:col-span-2 py-24 md:py-32 md:px-0"
      >
        <p className="text-[32px] md:text-[48px] font-medium text-text-primary p-8 flex flex-wrap gap-x-[0.25em] leading-[1.1] tracking-[-0.04em]">
          {words.map((word, i) => {
            const slice = 1 / words.length;
            const start = i * slice;
            const end = Math.min(start + slice * 3, 1);

            return (
              <RevealWord
                key={i}
                word={word}
                start={start}
                end={end}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </p>
      </div>

      {/* Feature Cards Grid (4 columns) */}
      <div className="col-start-1 col-span-4 grid grid-cols-1 md:grid-cols-4 w-full">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <DotGridCard
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}