"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { Database, Key, FileText, Settings, Terminal as TerminalIcon, Server, CloudLightning, RefreshCw, AlertCircle, Users, CreditCard, PanelLeftClose, PanelLeftOpen, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EyebrowLabel } from "../_components/ui/EyebrowLabel";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data for Sidebar/Layout ---
const LOG_MESSAGES = [
  "[GET] /users ➔ 200 131ms",
  "[POST] /orders ➔ 201 442ms",
  "[GET] /products ➔ 200 89ms",
  "[PUT] /users/12 ➔ 204 210ms",
  "[DELETE] /products/843 ➔ 204 156ms",
  "[GET] /orders/23 ➔ 200 120ms",
];

// --- Brutalist Components ---
const BrutalistToggle = ({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: () => void }) => (
  <div className="flex items-center justify-between py-4 border-b border-border-subtle last:border-b-0 group cursor-pointer" onClick={onToggle}>
    <span className="text-[13px] font-medium text-text-secondary group-hover:text-text-primary transition-colors">{label}</span>
    <button 
      className={cn(
        "w-9 h-5 rounded-none border flex items-center px-0.5 transition-all duration-300 cursor-pointer",
        enabled ? "bg-accent-dim border-accent-border justify-end" : "bg-transparent border-border-default justify-start"
      )}
    >
      <div className={cn(
        "w-3 h-3 rounded-none transition-all duration-300",
        enabled ? "bg-accent" : "bg-text-muted"
      )} />
    </button>
  </div>
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [chaosMode, setChaosMode] = useState(false);
  const [failRate, setFailRate] = useState(15);
  const [chaosLatency, setChaosLatency] = useState(500);
  const [graphQL, setGraphQL] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Track global mouse for tooltip
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    if (isSidebarCollapsed && hoveredItem) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isSidebarCollapsed, hoveredItem]);

  // Simulate Live Logs
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs(prev => [...prev.slice(-12), `${timestamp} ${randomLog}`]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => setIsDeploying(false), 2000);
  };

  const navGroups = [
    {
      title: "API ENGINE",
      items: [
        { icon: Database, label: "Endpoints", href: "/dashboard" },
        { icon: CloudLightning, label: "GraphQL", href: "/dashboard/graphql" },
      ]
    },
    {
      title: "ACCESS & SECURITY",
      items: [
        { icon: Key, label: "API Keys", href: "/dashboard/keys" },
        { icon: Users, label: "Team", href: "/dashboard/team" },
      ]
    },
    {
      title: "WORKSPACE CONFIG",
      items: [
        { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
      ]
    },
    {
      title: "RESOURCES",
      items: [
        { icon: FileText, label: "Documentation", href: "/dashboard/docs" },
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface-primary selection:bg-accent selection:text-white text-text-primary">
      
      {/* Header */}
      <header className="h-[72px] border-b border-border-subtle flex items-center justify-between px-8 bg-surface-primary/80 backdrop-blur relative z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img src="/logo/zero-mock-white-logo.png" alt="ZERO-MOCK" className="h-[18px] w-auto" />
          </Link>
          <div className="flex items-baseline gap-3">
            <span className="text-[13px] text-text-muted">/</span>
            <Link href="/projects" className="text-[13px] font-medium text-text-muted hover:text-text-primary transition-colors">All Projects</Link>
            <span className="text-[13px] text-text-muted">/</span>
            <span className="text-[13px] font-medium text-text-secondary">TurnPRO E-Commerce</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
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
          ) : (
            <Link href="/login" className="bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none cursor-pointer">
              <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                <span>&gt;</span>
                <span>LOGIN</span>
              </span>
            </Link>
          )}
        </div>
      </header>

      {/* Main Container: Flexbox */}
      <div className="flex-1 flex w-full h-[calc(100vh-72px)] relative z-10">
        
        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarCollapsed ? 72 : "25%" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between border-r border-border-subtle bg-surface-primary shrink-0 overflow-hidden relative z-50"
        >
          <nav className={cn("flex flex-col gap-6", isSidebarCollapsed ? "p-4 items-center" : "p-8")}>
            <div className={cn("flex items-center", isSidebarCollapsed ? "justify-center mb-0" : "justify-between mb-4")}>
              <motion.div
                initial={false}
                animate={{ opacity: isSidebarCollapsed ? 0 : 1, width: isSidebarCollapsed ? 0 : "auto" }}
                className="overflow-hidden whitespace-nowrap"
              >
                <EyebrowLabel theme="dark" className="!mb-0">NAVIGATION</EyebrowLabel>
              </motion.div>
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
                className="text-text-muted hover:text-text-primary transition-colors p-1 cursor-pointer"
              >
                {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navGroups.map((group) => (
                <div key={group.title} className="flex flex-col gap-1">
                  {!isSidebarCollapsed && (
                    <div className="px-3 mb-2">
                      <div className="text-[10px] font-bold text-text-muted tracking-[0.15em] uppercase opacity-60">
                        {group.title}
                      </div>
                    </div>
                  )}
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link 
                        key={item.label}
                        href={item.href}
                        onMouseEnter={() => isSidebarCollapsed && setHoveredItem(item.label)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={cn(
                          "flex items-center py-2.5 text-[13px] rounded-none transition-all border border-transparent overflow-hidden whitespace-nowrap group/nav",
                          isSidebarCollapsed ? "justify-center px-0 w-10 h-10" : "px-3",
                          isActive 
                            ? "bg-surface-secondary text-text-primary font-medium border-border-default" 
                            : "text-text-secondary hover:bg-surface-tertiary hover:text-text-primary font-normal"
                        )}
                      >
                        <item.icon size={16} strokeWidth={isActive ? 2.5 : 1.5} className={cn("shrink-0 transition-transform duration-200 group-hover/nav:scale-110", isActive ? "text-accent" : "")} />
                        <motion.span 
                          initial={false}
                          animate={{ 
                            opacity: isSidebarCollapsed ? 0 : 1, 
                            width: isSidebarCollapsed ? 0 : "auto",
                            marginLeft: isSidebarCollapsed ? 0 : 12 
                          }}
                          className="block overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </nav>

          <div className={cn("transition-all duration-300", isSidebarCollapsed ? "p-4" : "p-8")}>
            <div className={cn(
              "bg-surface-secondary border border-border-default p-4 rounded-none overflow-hidden whitespace-nowrap transition-all duration-300",
              isSidebarCollapsed ? "opacity-0 h-0 p-0 border-0" : "opacity-100 h-auto"
            )}>
              <EyebrowLabel theme="dark" className="!mb-2">LOCAL SYNC</EyebrowLabel>
              <div className="font-mono text-[11px] text-text-secondary flex gap-2 overflow-x-hidden">
                <span className="text-accent">$</span>
                <span className="truncate">npx zero-mock pull</span>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Cursor Tooltip */}
        <AnimatePresence>
          {isSidebarCollapsed && hoveredItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: mousePos.x + 12,
                y: mousePos.y + 12
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                x: { type: "spring", damping: 30, stiffness: 400, restDelta: 0.001 },
                y: { type: "spring", damping: 30, stiffness: 400, restDelta: 0.001 },
                opacity: { duration: 0.2 }
              }}
              className="fixed top-0 left-0 pointer-events-none z-[100] px-3 py-1.5 bg-white text-black text-[11px] font-bold uppercase tracking-widest border border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] whitespace-nowrap"
            >
              {hoveredItem}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Workspace (Dynamic Content) */}
        <div className="flex-1 relative bg-surface-primary overflow-hidden min-w-0">
           {children}
        </div>

        {/* Right Panel (Settings & Logs) - Only show on main dashboard page */}
        {pathname === "/dashboard" && (
          <aside className="w-[25%] shrink-0 flex flex-col bg-surface-secondary border-l border-border-subtle">
            <div className="p-8 border-b border-border-subtle relative overflow-hidden bg-surface-secondary">
              <EyebrowLabel theme="dark">ENGINE SETTINGS</EyebrowLabel>
              <div className="flex flex-col relative z-10">
                <BrutalistToggle 
                  label="Auto-GraphQL" 
                  enabled={graphQL} 
                  onToggle={() => setGraphQL(!graphQL)} 
                />
                <BrutalistToggle 
                  label="Data Persistence" 
                  enabled={true} 
                  onToggle={() => {}} 
                />
                <BrutalistToggle 
                  label="Chaos Mode" 
                  enabled={chaosMode} 
                  onToggle={() => setChaosMode(!chaosMode)} 
                />
                <AnimatePresence>
                  {chaosMode && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-red-500/5 border border-red-500/20 flex flex-col gap-5 rounded-none">
                        <div className="flex items-start gap-2 text-red-400 font-mono text-[11px]">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold uppercase tracking-wider mb-1">Chaos Engine Active</div>
                            <div className="text-red-400/70">Injecting faults into live traffic.</div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-[11px] font-mono text-text-secondary">
                            <span>Fail Rate</span>
                            <div className="flex items-center gap-1">
                              <input 
                                type="number" 
                                min="0" max="100" 
                                value={failRate} 
                                onChange={(e) => setFailRate(Math.min(100, Math.max(0, Number(e.target.value))))}
                                className="w-8 bg-transparent border-b border-border-secondary-500/20 text-accent text-right outline-none focus:border-accent transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <span className="text-accent">%</span>
                            </div>
                          </div>
                          <input 
                            type="range" 
                            min="0" max="100" 
                            value={failRate} 
                            onChange={(e) => setFailRate(Number(e.target.value))}
                            className="w-full h-1 bg-surface-tertiary appearance-none cursor-pointer"
                            style={{ accentColor: "var(--color-accent)" }}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-[11px] font-mono text-text-secondary">
                            <span>Added Latency</span>
                            <div className="flex items-center gap-1">
                              <input 
                                type="number" 
                                min="0" max="5000" step="100"
                                value={chaosLatency} 
                                onChange={(e) => setChaosLatency(Math.min(5000, Math.max(0, Number(e.target.value))))}
                                className="w-8 bg-transparent border-b border-border-secondary-500/20 text-accent text-right outline-none focus:border-accent transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <span className="text-accent">ms</span>
                            </div>
                          </div>
                          <input 
                            type="range" 
                            min="0" max="5000" step="100"
                            value={chaosLatency} 
                            onChange={(e) => setChaosLatency(Number(e.target.value))}
                            className="w-full h-1 bg-surface-tertiary appearance-none cursor-pointer"
                            style={{ accentColor: "var(--color-accent)" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden bg-surface-secondary relative">
              <div className="p-6 border-b border-border-subtle flex items-center gap-2 relative z-10">
                <EyebrowLabel theme="dark" className="!mb-0"><span className="flex items-center gap-2"><TerminalIcon size={12} className="text-accent" /> LIVE TRAFFIC</span></EyebrowLabel>
              </div>
              <div className="flex-1 p-6 font-mono text-[11px] text-text-secondary overflow-y-auto leading-[1.8] scrollbar-hide relative">
                <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')]" style={{ backgroundSize: '200px 200px' }}></div>
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 110%, black 20%, transparent 70%)" }} />
                <div className="relative z-10 flex flex-col gap-1.5">
                  {logs.map((log, i) => {
                    const isError = log.includes("500") || log.includes("404");
                    const isSuccess = log.includes("200") || log.includes("201");
                    return (
                      <div key={i} className="flex gap-3">
                        <span className="text-text-muted select-none">›</span>
                        <span className={cn(
                          "transition-colors duration-500",
                          isError ? "text-red-400/80" : isSuccess ? "text-accent/80" : "text-text-secondary"
                        )}>{log}</span>
                      </div>
                    );
                  })}
                  <div ref={logEndRef} />
                </div>
              </div>
            </div>
          </aside>
        )}

      </div>
    </div>
  );
}
