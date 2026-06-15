"use client";

import { 
  ArrowUpRight,
  Code2,
  Terminal,
  Layers,
  Database,
  Search,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { EyebrowLabel } from "../../_components/ui/EyebrowLabel";

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}

export default function DocumentationPage() {
  const guides = [
    { 
      title: "Quick Start Guide", 
      desc: "Get up and running in under 5 minutes with our CLI and cloud sync.",
      icon: Terminal,
      color: "text-accent"
    },
    { 
      title: "REST API Reference", 
      desc: "Detailed breakdown of all dynamic CRUD endpoints and query parameters.",
      icon: Database,
      color: "text-text-primary"
    },
    { 
      title: "Chaos Engineering", 
      desc: "Simulate failures, latency, and network instability to test resilience.",
      icon: Layers,
      color: "text-text-secondary"
    },
    { 
      title: "GraphQL Integration", 
      desc: "How to leverage the auto-generated GraphQL layer alongside REST.",
      icon: Code2,
      color: "text-text-secondary"
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full overflow-y-auto relative"
    >
      {/* Noise Texture Background */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />

      {/* Header */}
      <div className="flex items-end justify-between border-b border-border-subtle p-8 pt-8 mb-0 relative overflow-y-hidden shrink-0">
        <div className="absolute top-[-50px] right-[10%] w-[300px] h-[300px] pointer-events-none" 
            style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 45%, transparent 100%)", filter: "blur(40px)" }} />
            
        {/* Full Surface Dot Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.12]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />

        <div className="relative z-10">
          <EyebrowLabel theme="dark" className="!mb-3">DEVELOPER RESOURCES</EyebrowLabel>
          <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.04em] text-text-primary mb-2 leading-none">Documentation</h2>
          <p className="text-[14px] text-text-secondary leading-[1.65]">Everything you need to integrate Zero-Mock into your stack.</p>
        </div>
        <div className="relative hidden md:block z-10">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search docs..." 
            className="bg-surface-primary border border-border-default rounded-none pl-11 pr-4 py-2 text-[13px] outline-none focus:border-accent transition-colors w-[240px] text-text-primary placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* Page Content */}
      <div className="p-8 relative z-10 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((doc, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={i} 
              className="p-8 border border-border-default bg-surface-secondary rounded-none hover:border-border-hover transition-colors cursor-pointer group flex flex-col gap-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 110%, black 20%, transparent 70%)" }} />
              <div className="flex justify-between items-start relative z-10">
                <div className={cn("p-3 rounded-none bg-surface-primary border border-border-subtle transition-colors group-hover:border-border-default", doc.color)}>
                  <doc.icon size={20} />
                </div>
                <ArrowUpRight size={20} className="text-text-muted group-hover:text-text-primary transition-colors" />
              </div>
              <div className="relative z-10">
                <h3 className="text-[16px] font-semibold tracking-[-0.04em] text-text-primary mb-2">{doc.title}</h3>
                <p className="text-[13px] text-text-secondary leading-[1.65]">{doc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-8 border border-border-default rounded-none bg-surface-secondary flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
           <div className="flex-1 relative z-10">
              <EyebrowLabel theme="dark" className="!mb-4 !text-[10px]">ADVANCED PATTERNS</EyebrowLabel>
              <h4 className="text-[20px] font-semibold text-text-primary mb-3 tracking-[-0.04em]">Need a custom implementation?</h4>
              <p className="text-[13px] text-text-secondary leading-[1.65] mb-6">
                Our enterprise guides cover SOC2 compliance, multi-region syncing, and custom chaos injection patterns for complex microservice meshes.
              </p>
              <button className="text-[12px] font-medium tracking-widest uppercase text-text-primary hover:text-accent transition-colors flex items-center gap-2 group">
                Browse SDKs <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
           <div className="w-full md:w-[300px] aspect-video bg-surface-primary rounded-none border border-border-default flex items-center justify-center relative group overflow-hidden z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-dim to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <Code2 size={32} className="text-text-muted group-hover:text-text-secondary transition-colors" />
           </div>
        </div>
      </div>
    </motion.div>
  );
}
