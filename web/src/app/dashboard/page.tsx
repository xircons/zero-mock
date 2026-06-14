"use client";

import { useState } from "react";
import { Zap, Plus, RefreshCw, X, Activity, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EyebrowLabel } from "../_components/ui/EyebrowLabel";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const INITIAL_ENDPOINTS = [
  { id: "1", path: "/users", records: 1247, methods: ["GET", "POST", "PUT"] },
  { id: "2", path: "/products", records: 8432, methods: ["GET", "PUT", "DELETE"] },
  { id: "3", path: "/orders", records: 23891, methods: ["GET", "POST"] },
  { id: "4", path: "/categories", records: 56, methods: ["GET"] },
];

// --- Sub-Components ---
const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="px-1.5 py-0.5 text-[10px] font-medium border border-border-default text-text-secondary bg-surface-tertiary font-mono rounded-none uppercase tracking-wider">
      {children}
    </span>
  );
};

export default function EndpointsPage() {
  const [endpoints, setEndpoints] = useState(INITIAL_ENDPOINTS);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [showNewModal, setShowNewModal] = useState(false);
  const [newPath, setNewModalPath] = useState("");

  const handleAiGenerate = (id: string) => {
    if (loadingIds.has(id)) return;
    setLoadingIds(prev => new Set(prev).add(id));
    setTimeout(() => {
      setEndpoints(prev => prev.map(ep => 
        ep.id === id ? { ...ep, records: ep.records + Math.floor(Math.random() * 50) + 10 } : ep
      ));
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 1500);
  };

  const handleAddCollection = () => {
    if (!newPath) return;
    const newEp = {
      id: Math.random().toString(36).substr(2, 9),
      path: newPath.startsWith("/") ? newPath : `/${newPath}`,
      records: 0,
      methods: ["GET", "POST"]
    };
    setEndpoints([...endpoints, newEp]);
    setNewModalPath("");
    setShowNewModal(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full overflow-y-auto"
    >
      {/* Noise Texture Background */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />

      {/* Header Section */}
      <div className="p-8 pt-8 border-b border-border-subtle relative z-10 overflow-hidden">
        {/* Header Glow Blob */}
        <div className="absolute top-[-50px] left-[10%] w-[300px] h-[300px] pointer-events-none" 
             style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 45%, transparent 100%)", filter: "blur(40px)" }} />

        {/* Full Surface Dot Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.5]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />

        <div className="flex items-end justify-between relative z-10">
          <div>
            <EyebrowLabel theme="dark" className="!mb-3">API OVERVIEW</EyebrowLabel>
            <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.04em] text-text-primary mb-2 leading-none">Endpoints</h2>
            <p className="text-[14px] text-text-secondary leading-[1.65]">Scale and monitor your data collections in real-time.</p>
          </div>
          <button 
            onClick={() => setShowNewModal(true)}
            className="border border-border-default bg-surface-secondary text-text-primary px-[16px] py-[9px] text-[12px] font-medium hover:border-border-hover transition-colors flex items-center gap-2 rounded-none"
          >
            <Plus size={14} />
            New Collection
          </button>
        </div>
      </div>

      {/* Stats Bar (Full Width, No Gaps, Moved Under Header) */}
      <div className="grid grid-cols-3 border-b border-border-subtle relative z-10 bg-surface-secondary/20">
        {[
          { label: "Daily Requests", value: "1.2M", icon: Activity, color: "text-accent" },
          { label: "Success Rate", value: "99.98%", icon: ShieldCheck, color: "text-text-primary" },
          { label: "Sync Latency", value: "48ms", icon: RefreshCw, color: "text-text-secondary" },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
            key={i} 
            className="p-8 border-r last:border-r-0 border-border-subtle relative overflow-hidden group hover:bg-surface-tertiary/30 transition-colors"
          >
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 110%, black 20%, transparent 35%)" }} />
            <div className="relative z-10">
              <EyebrowLabel theme="dark" className="!mb-3 !tracking-wider !text-[10px]"><span className="flex items-center gap-2"><stat.icon size={12} className="opacity-50" /> {stat.label}</span></EyebrowLabel>
              <div className={cn("text-[28px] font-semibold tracking-[-1px] leading-none", stat.color)}>{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 p-8 relative z-10">
        {/* Table */}
        <div className="border border-border-default rounded-none overflow-hidden bg-surface-secondary relative">
          {endpoints.length === 0 ? (
             <div className="py-20 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" 
                   style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 45%, transparent 100%)", filter: "blur(40px)" }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] text-[8px] font-mono whitespace-pre pointer-events-none leading-none select-none">
                  {`
  ███████╗███████╗██████╗  ██████╗       ███╗   ███╗ ██████╗  ██████╗██╗  ██╗
  ╚══███╔╝██╔════╝██╔══██╗██╔═══██╗      ████╗ ████║██╔═══██╗██╔════╝██║ ██╔╝
    ███╔╝ █████╗  ██████╔╝██║   ██║█████╗██╔████╔██║██║   ██║██║     █████╔╝ 
   ███╔╝  ██╔══╝  ██╔══██╗██║   ██║╚════╝██║╚██╔╝██║██║   ██║██║     ██╔═██╗ 
  ███████╗███████╗██║  ██║╚██████╔╝      ██║ ╚═╝ ██║╚██████╔╝╚██████╗██║  ██╗
  ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝       ╚═╝     ╚═╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝
                  `}
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-text-muted mb-4"><Zap size={32} /></div>
                  <h3 className="text-[18px] font-semibold tracking-tight text-text-primary mb-2">No Endpoints Found</h3>
                  <p className="text-[13px] text-text-secondary mb-6 text-center max-w-[300px]">Create your first collection to start receiving traffic and generating mock data.</p>
                  <button 
                    onClick={() => setShowNewModal(true)}
                    className="border border-border-default bg-surface-primary text-text-primary px-[16px] py-[9px] text-[12px] font-medium hover:border-border-hover transition-colors flex items-center gap-2 rounded-none"
                  >
                    <Plus size={14} />
                    New Collection
                  </button>
                </div>
             </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-tertiary/30">
                  <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px]">Path</th>
                  <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px]">Records</th>
                  <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px]">Methods</th>
                  <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {endpoints.map((ep, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    key={ep.id} 
                    className="hover:bg-surface-tertiary/50 transition-colors group"
                  >
                    <td className="px-6 py-5 font-mono text-[13px] text-accent font-medium underline underline-offset-4 decoration-border-subtle">
                      {ep.path}
                    </td>
                    <td className="px-6 py-5 font-mono text-[13px] text-text-secondary">
                      {ep.records.toLocaleString()}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2 flex-wrap">
                        {ep.methods.map(m => <Badge key={m}>{m}</Badge>)}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => handleAiGenerate(ep.id)}
                        disabled={loadingIds.has(ep.id)}
                        className={cn(
                          "inline-flex items-center gap-2 border px-[12px] py-[6px] rounded-none text-[11px] font-medium transition-colors tracking-wide uppercase",
                          loadingIds.has(ep.id) 
                            ? "border-border-subtle text-text-muted bg-transparent cursor-wait" 
                            : "border-border-default text-text-secondary hover:border-accent-border hover:text-accent hover:bg-accent-dim bg-surface-primary"
                        )}
                      >
                        {loadingIds.has(ep.id) ? (
                          <RefreshCw size={12} className="animate-spin text-text-muted" />
                        ) : (
                          <Zap size={12} className="text-accent" />
                        )}
                        {loadingIds.has(ep.id) ? "Generating" : "AI Generate"}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* New Collection Modal */}
      <AnimatePresence>
        {showNewModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewModal(false)}
              className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[500px] bg-surface-secondary border border-border-default p-10 rounded-none overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] pointer-events-none" 
                   style={{ background: "radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <h3 className="text-[20px] font-semibold tracking-[-0.04em] text-text-primary">New Collection</h3>
                  <p className="text-[13px] text-text-secondary mt-1">Define your dynamic endpoint path.</p>
                </div>
                <button onClick={() => setShowNewModal(false)} className="text-text-muted hover:text-text-primary transition-colors"><X size={20}/></button>
              </div>

              <div className="flex flex-col gap-8 relative z-10">
                <div className="flex flex-col gap-3">
                  <EyebrowLabel theme="dark" className="!mb-0 !text-[10px]">Path Configuration</EyebrowLabel>
                  <div className="flex items-center bg-surface-primary border border-border-default px-4 py-3.5 rounded-none focus-within:border-accent transition-colors">
                    <span className="text-text-muted font-mono text-[14px] mr-2">/</span>
                    <input 
                      type="text" 
                      placeholder="v1/analytics" 
                      autoFocus
                      value={newPath}
                      onChange={(e) => setNewModalPath(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-text-primary font-mono text-[13px] placeholder:text-text-muted" 
                    />
                  </div>
                </div>

                <button 
                  onClick={handleAddCollection}
                  disabled={!newPath}
                  className="bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none disabled:opacity-50"
                >
                  <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                    <span>&gt;</span>
                    <span>CREATE COLLECTION</span>
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
