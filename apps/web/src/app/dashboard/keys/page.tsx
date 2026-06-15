"use client";

import { useState } from "react";
import { 
  Plus, 
  Copy, 
  Trash2, 
  Key,
  ShieldCheck,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EyebrowLabel } from "../../_components/ui/EyebrowLabel";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const INITIAL_KEYS = [
  { id: "k1", name: "Development", key: "zm_live_8f2e_c8a7_9b2d_4f1e", created: "2026-06-12" },
  { id: "k2", name: "Production", key: "zm_live_4d5a_1b9e_7c3f_0a2b", created: "2026-06-10" },
];

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(INITIAL_KEYS);

  const deleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
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
           {/* Header Glow Blob */}
           <div className="absolute top-[-50px] right-[10%] w-[300px] h-[300px] pointer-events-none" 
             style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 45%, transparent 100%)", filter: "blur(40px)" }} />

           {/* Full Surface Dot Grid */}
           <div className="absolute inset-0 pointer-events-none opacity-[0.5]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10">
            <EyebrowLabel theme="dark" className="!mb-3">SECURITY</EyebrowLabel>
            <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.04em] text-text-primary mb-2 leading-none">API Keys</h2>
            <p className="text-[14px] text-text-secondary leading-[1.65]">Manage access tokens for your external applications.</p>
          </div>
          <button className="bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none relative z-10">
            <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
              <span>&gt;</span>
              <span>CREATE NEW KEY</span>
            </span>
          </button>
        </div>

        {/* Page Content Wrapper */}
        <div className="p-8 relative z-10 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {keys.length === 0 ? (
               <div className="py-24 border border-border-default bg-surface-secondary flex flex-col items-center justify-center relative overflow-hidden rounded-none">
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
                    <div className="text-text-muted mb-4"><Shield size={32} /></div>
                    <h3 className="text-[18px] font-semibold tracking-tight text-text-primary mb-2">No API Keys</h3>
                    <p className="text-[13px] text-text-secondary mb-6 text-center max-w-[300px]">Generate a security token to authenticate your external requests.</p>
                    <button className="bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none">
                      <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                        <span>&gt;</span>
                        <span>CREATE KEY</span>
                      </span>
                    </button>
                  </div>
               </div>
            ) : (
              keys.map((k, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  key={k.id} 
                  className="p-8 border border-border-default bg-surface-secondary flex items-center justify-between group hover:border-border-hover transition-all rounded-none relative overflow-hidden"
                >
                  {/* Optional dot texture on card hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 110%, black 20%, transparent 70%)" }} />
                  
                  <div className="flex flex-col gap-3 relative z-10 flex-1 mr-10">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent-dim border border-accent-border p-1.5 rounded-none">
                        <Key size={14} className="text-accent" />
                      </div>
                      <div className="text-[14px] font-semibold text-text-primary tracking-tight">{k.name}</div>
                    </div>
                    <div className="font-mono text-[13px] w-full text-text-secondary flex items-center justify-between gap-4 bg-surface-primary px-4 py-2 rounded-none border border-border-default">
                      <span className="tracking-widest truncate">{k.key}</span>
                      <button className="text-text-muted hover:text-accent transition-colors shrink-0"><Copy size={16}/></button>
                    </div>
                  </div>
                  <div className="flex items-center self-center relative z-10">
                    <div className="flex flex-col items-start gap-1 transition-all duration-300">
                      <EyebrowLabel theme="dark" className="!mb-0 !text-[10px]">CREATED</EyebrowLabel>
                      <div className="text-[12px] text-text-secondary font-mono leading-none">{k.created}</div>
                    </div>
                    <div className="w-0 group-hover:w-16 overflow-hidden transition-all duration-300 flex justify-end">
                      <button 
                        onClick={() => deleteKey(k.id)}
                        className="p-3 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-none transition-all border border-transparent hover:border-red-400/20"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            
            {keys.length > 0 && (
              <motion.button 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: keys.length * 0.1, duration: 0.5 }}
                className="mt-6 border border-dashed border-border-default py-12 rounded-none text-[12px] font-medium text-text-muted hover:border-border-hover hover:text-accent hover:bg-surface-tertiary transition-all flex flex-col items-center justify-center gap-4 group"
              >
                <div className="p-3 border border-border-default rounded-none group-hover:border-accent-border transition-colors">
                  <Plus size={20}/>
                </div>
                CREATE NEW SECURITY TOKEN
              </motion.button>
            )}
          </div>

          {/* Security Notice */}
          <div className="p-6 bg-surface-tertiary border border-border-default rounded-none flex items-start gap-4">
            <ShieldCheck size={20} className="text-accent shrink-0 mt-1" />
            <div>
              <EyebrowLabel theme="dark" className="!mb-2">SECURITY BEST PRACTICES</EyebrowLabel>
              <p className="text-[13px] text-text-secondary leading-[1.65] max-w-[700px]">
                Never expose your live API keys in client-side code. Use environment variables or proxy your requests through a secure server. Zero-mock tokens provide full read/write access to your dynamic collections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
