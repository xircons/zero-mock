"use client";

import { 
  Copy, 
  ShieldAlert,
  Globe,
  Cpu,
  Save,
  Check,
  X,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { EyebrowLabel } from "../../_components/ui/EyebrowLabel";

const PROJECT_NAME = "TurnPRO E-Commerce";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
               style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 45%, transparent 100%)", filter: "blur(40px)" }} />
          
          {/* Full Surface Dot Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.5]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10">
            <EyebrowLabel theme="dark" className="!mb-3">CONFIGURATION</EyebrowLabel>
            <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.04em] text-text-primary mb-2 leading-none">Settings</h2>
            <p className="text-[14px] text-text-secondary leading-[1.65]">Configure your workspace environment and global API behavior.</p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none relative z-10"
          >
            <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
              {!saved && <span>&gt;</span>}
              {saved && <Check size={14} />}
              <span>{saved ? "SAVED" : "SAVE CONFIG"}</span>
            </span>
          </button>
        </div>

        {/* Page Content Wrapper */}
        <div className="p-8 relative z-10 flex flex-col gap-10">
          <div className="flex flex-col gap-8">
            {/* General Section */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <EyebrowLabel theme="dark" className="!mb-0"><span className="flex items-center gap-2"><Globe size={14} /> Workspace Settings</span></EyebrowLabel>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-3">
                    <label className="text-[13px] font-medium text-text-primary">Project Name</label>
                    <input type="text" defaultValue={PROJECT_NAME} className="bg-surface-primary border border-border-default rounded-none px-4 py-3 font-mono text-[13px] text-text-primary outline-none focus:border-accent transition-all" />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-[13px] font-medium text-text-primary">Dynamic URL Prefix</label>
                    <div className="bg-surface-primary border border-border-default rounded-none px-4 py-3 font-mono text-[13px] text-text-secondary flex justify-between items-center group">
                      https://api.zero-mock.com/v1/xircons/turnpro
                      <Copy size={16} className="cursor-pointer text-text-muted hover:text-text-primary transition-colors" />
                    </div>
                </div>
              </div>
            </section>

            {/* Infrastructure Section */}
            <section className="flex flex-col gap-6 pt-10 border-t border-border-subtle">
              <div className="flex items-center gap-3">
                <EyebrowLabel theme="dark" className="!mb-0"><span className="flex items-center gap-2"><Cpu size={14} /> Engine Defaults</span></EyebrowLabel>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                    <label className="text-[13px] font-medium text-text-primary">Default Latency (ms)</label>
                    <input type="number" defaultValue="200" className="bg-surface-primary border border-border-default rounded-none px-4 py-3 font-mono text-[13px] text-text-primary outline-none focus:border-accent transition-all" />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-[13px] font-medium text-text-primary">Max Records / Collection</label>
                    <input type="number" defaultValue="50000" className="bg-surface-primary border border-border-default rounded-none px-4 py-3 font-mono text-[13px] text-text-primary outline-none focus:border-accent transition-all" />
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="p-8 border border-red-500/20 bg-red-500/5 rounded-none flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-red-500/10 rounded-none border border-red-500/20">
                  <ShieldAlert size={24} className="text-red-400" />
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-red-400 tracking-[-0.04em] mb-2">Danger Zone</h4>
                  <p className="text-[13px] text-red-400/60 leading-[1.65]">
                    Permanently delete this project, all collections, and all associated API keys. This action cannot be undone.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="bg-transparent border border-red-500/40 text-red-400 px-[16px] py-[9px] text-[12px] font-medium rounded-none hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
              >
                DELETE PROJECT
              </button>
            </section>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowDeleteModal(false);
                setConfirmName("");
              }}
              className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[500px] bg-surface-secondary border border-red-500/30 p-10 rounded-none overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />
              
              <div className="absolute top-0 right-0 w-[200px] h-[200px] pointer-events-none" 
                   style={{ background: "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 80%)", filter: "blur(80px)" }} />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertTriangle size={20} />
                    <h3 className="text-[20px] font-semibold tracking-[-0.04em]">Confirm Deletion</h3>
                  </div>
                  <p className="text-[13px] text-text-secondary mt-1 leading-relaxed">
                    This action is irreversible. All endpoints, mock records, and API keys for <span className="text-text-primary font-mono font-bold underline underline-offset-4">{PROJECT_NAME}</span> will be purged.
                  </p>
                </div>
                <button onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmName("");
                }} className="cursor-pointer text-text-muted hover:text-text-primary transition-colors">
                  <X size={20}/>
                </button>
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex flex-col gap-3">
                  <p className="text-[11px] text-text-muted mb-1 italic">Type the project name to confirm:</p>
                  <div className="flex items-center bg-surface-primary border border-border-default px-4 py-3.5 rounded-none focus-within:border-red-500/50 transition-colors">
                    <input 
                      type="text" 
                      placeholder={PROJECT_NAME} 
                      autoFocus
                      value={confirmName}
                      onChange={(e) => setConfirmName(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-text-primary font-mono text-[13px] placeholder:text-text-muted/30" 
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (confirmName === PROJECT_NAME) {
                      alert("Project initialized for deletion.");
                      window.location.href = "/dashboard";
                    }
                  }}
                  disabled={confirmName !== PROJECT_NAME}
                  className="bg-red-500 text-white px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-red-600 group flex items-center justify-center gap-1 rounded-none disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                    <span>&gt;</span>
                    <span>REMOVE WORKSPACE</span>
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
