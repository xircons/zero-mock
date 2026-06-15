"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "../layout/SectionWrapper";
import { EyebrowLabel } from "../ui/EyebrowLabel";
import { TerminalWindow } from "../ui/TerminalWindow";

export function CliSection() {
  return (
    <SectionWrapper theme="dark" id="cli" hideInternalLines={true}>
      <div className="col-start-1 col-span-4 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 w-full p-8 items-center">
        
        {/* Left Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-2 pr-0 md:pr-12"
        >
          <EyebrowLabel theme="dark">LOCAL CLI</EyebrowLabel>
          <h2 className="text-[32px] md:text-[48px] font-bold text-text-primary leading-[1.1] mb-8">
            Run Zero-Mock<br/>locally in seconds.
          </h2>
          <p className="text-[15px] text-text-secondary leading-relaxed max-w-[380px] mb-12">
            The same power as the cloud platform, running entirely on your machine.
            Zero config. One command. Persistent data.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-widest">Global</div>
              <div className="bg-surface-tertiary/30 border border-border-default px-5 py-4 flex flex-col gap-2 text-[14px] font-mono text-text-primary shadow-inner group transition-colors hover:border-border-hover">
                <div className="flex items-center gap-4">
                  <span className="text-text-muted select-none">npm</span>
                  <span>install -g @xirconsss/zero-mock</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-[11px] font-mono text-text-muted uppercase tracking-widest">One-off with npx</div>
              <div className="bg-surface-tertiary/30 border border-border-default px-5 py-4 flex items-center gap-4 text-[14px] font-mono text-text-primary shadow-inner group transition-colors hover:border-border-hover">
                <span className="text-text-muted select-none">npx</span>
                @xirconsss/zero-mock
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Terminal */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-2 flex justify-center md:justify-end"
        >
          <TerminalWindow>
            <div className="font-mono text-[10px] leading-tight mb-4 select-none text-center">
              <div className="text-[#bfdbfe]">  ▗▄▄▄▄▖▗▄▄▄▖▗▄▄▖  ▗▄▖ ▗▖  ▗▖ ▗▄▖  ▗▄▄▖▗▖ ▗▖</div>
              <div className="text-[#60a5fa]">     ▗▞▘▐▌   ▐▌ ▐▌▐▌ ▐▌▐▛▚▞▜▌▐▌ ▐▌▐▌   ▐▌▗▞▘</div>
              <div className="text-[#2563eb]">   ▗▞▘  ▐▛▀▀▘▐▛▀▚▖▐▌ ▐▌▐▌  ▐▌▐▌ ▐▌▐▌   ▐▛▚▖ </div>
              <div className="text-[#1e3a8a]">  ▐▙▄▄▄▖▐▙▄▄▖▐▌ ▐▌▝▚▄▞▘▐▌  ▐▌▝▚▄▞▘▝▚▄▄▖▐▌ ▐▌</div>
            </div>
            
            <div className="text-center w-full mb-6">
              <div className="text-text-primary font-bold text-[13px]">Zero-Mock By Xircons</div>
              <div className="text-text-muted text-[10px]">Zero-config REST API setup in seconds</div>
              <div className="text-text-muted text-[10px]">last session 1d ago</div>
            </div>

            <div className="font-mono text-[12px] leading-relaxed text-text-muted">
              <div className="border border-border-default/50 rounded-lg overflow-hidden">
                <div className="flex justify-between px-4 py-3">
                  <span> · Target File</span>
                  <span className="text-text-primary">./db.json <span className="text-[#28c840]">✓</span></span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span> · Default Port</span>
                  <span className="text-text-primary">3000 <span className="text-[#28c840]">✓</span></span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span> · Latency</span>
                  <span className="text-text-primary">200ms <span className="text-[#28c840]">✓</span></span>
                </div>
                <div className="flex justify-between px-4 py-3 border-b border-border-default/30">
                  <span> · Watch Mode</span>
                  <span className="text-text-primary">Active <span className="text-[#28c840]">✓</span></span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span> · last used 1d ago </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-1 text-[13px]">
              <div className="text-text-primary flex items-center gap-2">
                <span className="text-[#60A5FA]">◆</span> What would you like to do?
              </div>
              <div className="pl-6 text-[#28c840]">▶ Continue</div>
              <div className="pl-6 text-text-muted opacity-60">◈ Change configuration</div>
              <div className="pl-6 text-text-muted opacity-60">✕ Cancel</div>
            </div>
          </TerminalWindow>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
