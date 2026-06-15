"use client";

import { motion } from "framer-motion";
import { Download, CreditCard } from "lucide-react";
import { EyebrowLabel } from "../../_components/ui/EyebrowLabel";

// --- Mock Data ---
const INVOICES = [
  { id: "INV-2026-001", date: "2026-06-01", amount: "$5.00", status: "PAID" }
];

export default function BillingPage() {
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
        <div className="flex items-end justify-between border-b border-border-subtle p-8 pt-8 relative overflow-y-hidden">
          <div className="absolute top-[-50px] right-[10%] w-[300px] h-[300px] pointer-events-none" 
             style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 45%, transparent 100%)", filter: "blur(40px)" }} />

          {/* Full Surface Dot Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.5]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10">
            <EyebrowLabel theme="dark" className="!mb-3">SUBSCRIPTION</EyebrowLabel>
            <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.04em] text-text-primary mb-2 leading-none">Billing & Usage</h2>
            <p className="text-[14px] text-text-secondary leading-[1.65]">Monitor your limits and manage your subscription.</p>
          </div>
        </div>

        <div className="flex-1 p-8 flex flex-col relative z-10">
          {/* Section 1: Current Plan Overview */}
          <div className="bg-surface-secondary border border-border-default rounded-none p-8 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 110%, black 20%, transparent 70%)" }} />
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-4 bg-surface-primary rounded-none border border-border-default">
                <CreditCard size={24} className="text-text-secondary" />
              </div>
              <div>
                <EyebrowLabel theme="dark" className="!mb-1 !text-[10px]">CURRENT PLAN</EyebrowLabel>
                <h3 className="text-[24px] font-semibold tracking-[-1px] text-text-primary leading-none">HACKER (Free Tier)</h3>
              </div>
            </div>
            <button className="bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none relative z-10">
              <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                <span>&gt;</span>
                <span>UPGRADE TO PRO - $5/mo</span>
              </span>
            </button>
          </div>

          {/* Section 2: Usage Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
            {/* Card 1: Data Storage */}
            <div className="bg-surface-secondary border border-border-default rounded-none p-6 flex flex-col justify-between h-[140px] relative overflow-hidden">
              <div className="relative z-10">
                 <EyebrowLabel theme="dark" className="!mb-0 !text-[10px]">DATA STORAGE</EyebrowLabel>
              </div>
              <div className="relative z-10 mt-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[18px] font-semibold text-text-primary tracking-[-0.5px]">145 KB</span>
                  <span className="text-[11px] font-mono text-text-secondary">/ 200 KB Used</span>
                </div>
                <div className="w-full h-2 bg-surface-tertiary rounded-none overflow-hidden border border-border-subtle">
                  <div className="h-full bg-accent" style={{ width: '72.5%' }}></div>
                </div>
              </div>
            </div>

            {/* Card 2: AI Generations */}
            <div className="bg-surface-secondary border border-border-default rounded-none p-6 flex flex-col justify-between h-[140px] relative overflow-hidden">
              <div className="relative z-10">
                 <EyebrowLabel theme="dark" className="!mb-0 !text-[10px]">AI GENERATIONS</EyebrowLabel>
              </div>
              <div className="relative z-10 mt-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[18px] font-semibold text-text-primary tracking-[-0.5px]">45</span>
                  <span className="text-[11px] font-mono text-text-secondary">/ 50 Requests</span>
                </div>
                <div className="w-full h-2 bg-surface-tertiary rounded-none overflow-hidden border border-border-subtle">
                  <div className="h-full bg-accent" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            {/* Card 3: Cloud Projects */}
            <div className="bg-surface-secondary border border-border-default rounded-none p-6 flex flex-col justify-between h-[140px] relative overflow-hidden">
              <div className="relative z-10">
                 <EyebrowLabel theme="dark" className="!mb-0 !text-[10px]">CLOUD PROJECTS</EyebrowLabel>
              </div>
              <div className="relative z-10 mt-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[18px] font-semibold text-text-primary tracking-[-0.5px]">1</span>
                  <span className="text-[11px] font-mono text-text-secondary">/ 1 Active Workspace</span>
                </div>
                <div className="w-full h-2 bg-surface-tertiary rounded-none overflow-hidden border border-border-subtle">
                  <div className="h-full bg-accent" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Billing History */}
          <div className="flex flex-col gap-4">
            <EyebrowLabel theme="dark" className="!mb-0">BILLING HISTORY</EyebrowLabel>
            <div className="border border-border-default rounded-none overflow-hidden bg-surface-secondary">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle bg-surface-tertiary/30">
                    <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px]">Date</th>
                    <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px]">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px]">Status</th>
                    <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px] text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {INVOICES.map((invoice, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      key={i} 
                      className="hover:bg-surface-tertiary/50 transition-colors group"
                    >
                      <td className="px-6 py-5 text-[12px] font-mono text-text-secondary">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-5 font-mono text-[13px] text-text-primary">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-2 py-0.5 text-[10px] font-bold border font-mono rounded-none uppercase tracking-wider bg-surface-tertiary text-text-primary border-border-default">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-text-muted hover:text-text-primary transition-colors" title="Download PDF">
                          <Download size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
