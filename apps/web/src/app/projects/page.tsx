"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Server, 
  Database, 
  Plus, 
  ChevronDown,
  User,
  Activity,
  Box,
  Zap,
  ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EyebrowLabel } from "../_components/ui/EyebrowLabel";
import { useState } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOCK_PROJECTS = [
  {
    id: "turnpro",
    name: "TurnPRO E-Commerce",
    icon: Database,
    badge: "PRO",
    endpoints: 42,
    syncTime: "2m ago",
    size: "1.2MB"
  },
  {
    id: "ninjalingo",
    name: "NinjaLingo App",
    icon: Server,
    badge: "FREE",
    endpoints: 8,
    syncTime: "1h ago",
    size: "145KB"
  },
  {
    id: "internal-cms",
    name: "Internal CMS Layer",
    icon: Box,
    badge: "PRO",
    endpoints: 124,
    syncTime: "Just now",
    size: "4.8MB"
  }
];

export default function ProjectsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="min-h-screen w-full bg-surface-primary text-text-primary flex flex-col relative overflow-hidden selection:bg-accent selection:text-white">
      
      {/* 4-Column Grid Overlay */}
      <div className="fixed inset-0 w-[100vw] max-w-[1280px] mx-auto px-5 md:px-8 grid grid-cols-4 pointer-events-none h-full z-0 opacity-100">
        <div className="border-l border-r border-border-subtle h-full" />
        <div className="border-r border-border-subtle h-full" />
        <div className="border-r border-border-subtle h-full" />
        <div className="border-r border-border-subtle h-full" />
      </div>

      {/* Monochrome Noise */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />

      {/* Header */}
      <header className="h-[72px] border-b border-border-subtle flex items-center justify-between px-8 bg-surface-primary/80 backdrop-blur relative z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img src="/logo/zero-mock-white-logo.png" alt="ZERO-MOCK" className="h-10 w-auto" />
          </Link>
          <div className="flex items-baseline gap-3">
            <span className="text-[13px] text-text-muted">/</span>
            <span className="text-[13px] font-medium text-text-secondary">All Projects</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center px-4 h-[42px] border border-border-default bg-surface-secondary/30 group transition-all duration-500 hover:border-border-hover overflow-hidden rounded-none">
            <div className="w-6 h-6 bg-accent-dim border border-accent-border flex items-center justify-center mr-3 shrink-0">
              <User size={12} className="text-accent" />
            </div>
            <span className="text-[13px] font-mono text-text-secondary">ada@turnpro.dev</span>
            <div className="flex items-center w-0 group-hover:w-[90px] transition-all duration-500 ease-[0.16, 1, 0.3, 1] overflow-hidden whitespace-nowrap">
              <span className="text-text-muted mx-2">/</span>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="text-[11px] font-semibold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest cursor-pointer"
              >
                Logout?
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto relative z-10 flex flex-col">
        
        {/* Header Section */}
        <div className="mx-8 p-8 border-b border-border-subtle relative z-10 overflow-hidden shrink-0">
          {/* Header Glow Blob */}
          <div className="absolute top-[-50px] right-[10%] w-[300px] h-[300px] pointer-events-none" 
              style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 45%, transparent 100%)", filter: "blur(60px)" }} />
              
          {/* Full Surface Dot Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.5]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />

          <div className="flex items-end justify-between relative z-10">
            <div>
              <EyebrowLabel theme="dark" className="!mb-3">YOUR DASHBOARD</EyebrowLabel>
              <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.04em] text-text-primary mb-2 leading-none">Workspaces</h2>
              <p className="text-[14px] text-text-secondary leading-[1.65]">Select a project or create a new one to start mocking API environments.</p>
            </div>
            <button className="bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none relative z-10">
              <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                <span>&gt;</span>
                <span>NEW WORKSPACE</span>
              </span>
            </button>
          </div>
        </div>

        <div className="p-8 flex flex-col gap-10">
          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {MOCK_PROJECTS.map((project, i) => (
              <Link key={project.id} href="/dashboard" className="block outline-none group">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-surface-secondary border border-border-default p-8 h-[240px] flex flex-col justify-between group-hover:border-border-hover transition-all duration-300 relative overflow-hidden rounded-none"
                >
                  {/* Dot Grid Pattern with Mask */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-100 transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      backgroundImage: "var(--dot-pattern)",
                      backgroundSize: "28px 28px",
                      maskImage: "radial-gradient(ellipse 80% 80% at 50% 110%, black 20%, transparent 70%)",
                    }}
                  />

                  <div className="flex justify-between items-start relative z-10">
                    <div className="p-3 bg-surface-primary border border-border-default rounded-none group-hover:border-accent-border group-hover:text-accent transition-colors">
                      <project.icon size={20} />
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 text-[10px] font-bold border font-mono rounded-none uppercase tracking-wider",
                      project.badge === "PRO" 
                        ? "bg-accent-dim text-accent border-accent-border" 
                        : "bg-surface-tertiary text-text-muted border-border-subtle"
                    )}>
                      {project.badge}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-text-primary mb-6 group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                    
                    <div className="flex items-center justify-between border-t border-border-subtle pt-4 mt-auto">
                      <div className="flex items-center gap-4 text-[11px] font-mono text-text-muted uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Activity size={12} className="opacity-40"/> {project.endpoints} EPs</span>
                        <span className="flex items-center gap-1.5"><Database size={12} className="opacity-40"/> {project.size}</span>
                      </div>
                      <div className="text-[10px] text-text-muted font-medium flex items-center gap-1">
                        SYNC <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" /> {project.syncTime}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Empty State / Billing Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="p-8 border border-border-default bg-surface-secondary flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden rounded-none group hover:border-border-hover transition-colors"
          >
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 110%, black 20%, transparent 70%)" }} />
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-4 bg-surface-primary rounded-none border border-border-default transition-colors group-hover:border-accent-border">
                <Zap size={20} className="text-accent" />
              </div>
              <div>
                <EyebrowLabel theme="dark" className="!mb-1">PLAN CAPACITY</EyebrowLabel>
                <div className="text-[16px] font-semibold text-text-primary mb-1 tracking-tight">1 / 1 Free Projects Used</div>
                <p className="text-[13px] text-text-secondary leading-relaxed">Upgrade to PRO for unlimited workspaces, dedicated endpoints, and priority cloud sync.</p>
              </div>
            </div>
            
            <button className="w-full md:w-auto bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none relative z-10 cursor-pointer">
              <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                <span>&gt;</span>
                <span>UPGRADE TO PRO</span>
              </span>
            </button>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
