"use client";

import { 
  Play, 
  Copy, 
  Code2, 
  Cpu, 
  Zap, 
  ArrowRight,
  Search,
  Maximize2,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EyebrowLabel } from "../../_components/ui/EyebrowLabel";
import { TerminalWindow } from "../../_components/ui/TerminalWindow";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOCK_SCHEMA = `type Query {
  users(id: ID, name: String): [User]
  products(id: ID, price_gte: Float): [Product]
}

type User {
  id: ID!
  name: String
  records: Int
}

type Product {
  id: ID!
  name: String
  records: Int
}`;

const MOCK_QUERY = `query GetActiveUsers {
  users(limit: 5) {
    id
    name
  }
}`;

const MOCK_RESPONSE = `{
  "data": {
    "users": [
      { "id": "1", "name": "Alice" },
      { "id": "2", "name": "Bob" },
      { "id": "3", "name": "Charlie" }
    ]
  }
}`;

export default function GraphQLPage() {
  const [query, setQuery] = useState(MOCK_QUERY);
  const [executing, setExecuting] = useState(false);

  const handleExecute = () => {
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
    }, 800);
  };

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

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-end justify-between border-b border-border-subtle p-8 pt-8 mb-0 relative overflow-y-hidden shrink-0">
          <div className="absolute top-[-50px] right-[10%] w-[300px] h-[300px] pointer-events-none" 
             style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 45%, transparent 100%)", filter: "blur(60px)" }} />

          {/* Full Surface Dot Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.5]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />
          
          <div className="relative z-10">
            <EyebrowLabel theme="dark" className="!mb-3"><span className="flex items-center gap-2"><Cpu size={12} /> AUTO-GENERATED ENGINE</span></EyebrowLabel>
            <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.04em] text-text-primary mb-2 leading-none text-nowrap">GraphQL Engine</h2>
            <p className="text-[14px] text-text-secondary leading-[1.65]">Unified query layer for all your dynamic REST collections.</p>
          </div>
          <div className="flex gap-4 relative z-10">
             <div className="flex items-center gap-3 px-4 py-2 bg-surface-secondary border border-border-default rounded-none">
                <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="text-[11px] font-mono text-text-secondary">ENDPOINT ACTIVE: /graphql</span>
             </div>
          </div>
        </div>

        {/* Page Content Wrapper */}
        <div className="flex-1 grid grid-cols-12 gap-8 p-8 overflow-hidden min-h-[600px]">
          {/* Left: Schema Viewer */}
          <div className="col-span-4 flex flex-col gap-6">
             <div className="flex items-center justify-between">
                <EyebrowLabel theme="dark" className="!mb-0 !text-[10px]">INFERRED SCHEMA</EyebrowLabel>
                <button className="text-text-muted hover:text-text-primary transition-colors"><Copy size={14}/></button>
             </div>
             <TerminalWindow className="max-w-none h-full flex flex-col">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Code2 size={16} className="text-text-muted" />
                </div>
                <pre className="text-accent">{MOCK_SCHEMA}</pre>
             </TerminalWindow>
          </div>

          {/* Right: Playground */}
          <div className="col-span-8 flex flex-col gap-6">
             <div className="flex items-center justify-between">
                <EyebrowLabel theme="dark" className="!mb-0 !text-[10px]">INTERACTIVE PLAYGROUND</EyebrowLabel>
                <div className="flex items-center gap-4">
                   <button className="text-[11px] font-medium tracking-widest text-text-muted hover:text-text-primary flex items-center gap-2 transition-colors">
                      <Search size={14} /> FORMAT
                   </button>
                   <button className="text-[11px] font-medium tracking-widest text-text-muted hover:text-text-primary flex items-center gap-2 transition-colors">
                      <Maximize2 size={14} /> FULLSCREEN
                   </button>
                </div>
             </div>
             
             <div className="flex-1 grid grid-rows-2 gap-4">
                {/* Editor */}
                <div className="bg-surface-primary border border-border-default rounded-none overflow-hidden flex flex-col">
                   <div className="px-4 py-3 border-b border-border-subtle bg-surface-tertiary flex items-center justify-between">
                      <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">Editor.gql</span>
                      <button 
                        onClick={handleExecute}
                        className="bg-white text-black px-[16px] py-[8px] text-[11px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none"
                      >
                        <span className="inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-1">
                          <Play size={10} className="fill-current" />
                          <span>RUN QUERY</span>
                        </span>
                      </button>
                   </div>
                   <textarea 
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     className="flex-1 p-6 bg-transparent border-none outline-none font-mono text-[13px] text-text-secondary resize-none leading-[1.65]"
                   />
                </div>

                {/* Result */}
                <TerminalWindow className="max-w-none flex flex-col">
                   <div className="flex-1 p-6 font-mono text-[13px] text-[#4ade80] overflow-y-auto leading-[1.65]">
                      {executing ? (
                        <div className="flex items-center gap-3">
                           <RefreshCw size={14} className="animate-spin text-text-muted" />
                           <span className="text-text-muted uppercase text-[12px] tracking-[2px] font-medium animate-pulse">Executing Trace...</span>
                        </div>
                      ) : (
                        <pre>{MOCK_RESPONSE}</pre>
                      )}
                   </div>
                </TerminalWindow>
             </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
