"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "../layout/SectionWrapper";
import { EyebrowLabel } from "../ui/EyebrowLabel";

export function HeroSection() {
  return (
    <SectionWrapper theme="dark" className="border-t-0 pt-0" hideAllLines={true} fullHeight={true}>
      {/* Background Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>

      {/* Radial Dot Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at center, black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 80%)"
        }}
      />

      {/* Centered wrapper */}
      <div className="col-start-1 col-span-4 grid grid-cols-4 my-auto gap-24">

        {/* ASCII Logo - full width with glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 col-span-4 px-4 md:px-12 relative flex flex-col items-center"
        >

          {/* Glow Blob */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] h-[60%] pointer-events-none rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 45%, transparent 100%)",
              filter: "blur(40px)"
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <EyebrowLabel theme="dark" className="self-start mb-2 -ml-1">
                CLOUD PLATFORM
              </EyebrowLabel>
            </motion.div>

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
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 col-span-4 md:col-start-2 md:col-span-2 px-6"
        >
          <p className="text-[15px] text-text-secondary mb-6">
            Deploy a fully functional REST/GraphQL API from a single JSON file.
            No config. No boilerplate. Just instant mocks.
          </p>

          <motion.button 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={() => window.location.href = "/login"}
            className="mb-12 w-full bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 cursor-pointer"
          >
            <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
              <span>&gt;</span>
              <span> DEPLOY CLOUD MOCK</span>
            </span>
          </motion.button>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
