"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Trash2, Mail, Shield, Users } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EyebrowLabel } from "../../_components/ui/EyebrowLabel";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const INITIAL_TEAM = [
  { id: "u1", name: "Ada Lovelace", email: "ada@turnpro.dev", role: "OWNER", joined: "2026-01-15" },
  { id: "u2", name: "Grace Hopper", email: "grace@turnpro.dev", role: "EDITOR", joined: "2026-03-22" },
  { id: "u3", name: "Alan Turing", email: "alan@turnpro.dev", role: "VIEWER", joined: "2026-05-04" },
];

const RoleBadge = ({ role }: { role: string }) => {
  const isOwner = role === "OWNER";
  const isEditor = role === "EDITOR";
  
  return (
    <span className={cn(
      "px-2 py-0.5 text-[10px] font-bold border font-mono rounded-none uppercase tracking-wider",
      isOwner ? "bg-accent-dim text-accent border-accent-border" : 
      isEditor ? "bg-surface-tertiary text-text-primary border-border-default" : 
      "bg-transparent text-text-muted border-border-subtle"
    )}>
      {role}
    </span>
  );
};

export default function TeamPage() {
  const [team, setTeam] = useState(INITIAL_TEAM);

  const removeMember = (id: string) => {
    setTeam(team.filter(member => member.id !== id));
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
            <EyebrowLabel theme="dark" className="!mb-3">WORKSPACE</EyebrowLabel>
            <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.04em] text-text-primary mb-2 leading-none">Team & Access</h2>
            <p className="text-[14px] text-text-secondary leading-[1.65]">Manage workspace collaborators and API access roles.</p>
          </div>
          <button className="bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none relative z-10">
            <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
              <span>&gt;</span>
              <span>INVITE MEMBER</span>
            </span>
          </button>
        </div>

        {/* Page Content Wrapper */}
        <div className="p-8 relative z-10 flex flex-col gap-8">
          {/* Data Table */}
          <div className="border border-border-default rounded-none overflow-hidden bg-surface-secondary relative">
            {team.length === 0 ? (
              <div className="py-24 flex flex-col items-center justify-center relative overflow-hidden">
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
                    <div className="text-text-muted mb-4"><Users size={32} /></div>
                    <h3 className="text-[18px] font-semibold tracking-tight text-text-primary mb-2">No Team Members</h3>
                    <p className="text-[13px] text-text-secondary mb-6 text-center max-w-[300px]">Invite collaborators to manage and mock API endpoints together.</p>
                    <button className="bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none">
                      <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                        <span>&gt;</span>
                        <span>INVITE MEMBER</span>
                      </span>
                    </button>
                  </div>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle bg-surface-tertiary/30">
                    <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px]">Member</th>
                    <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px]">Role</th>
                    <th className="px-6 py-4 text-[10px] font-medium text-text-muted uppercase tracking-[0.8px] text-right">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {team.map((member, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      key={member.id} 
                      className="hover:bg-surface-tertiary/50 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-none bg-surface-primary border border-border-default flex items-center justify-center text-text-secondary uppercase font-bold text-[12px]">
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-text-primary tracking-tight">{member.name}</span>
                            <span className="text-[11px] text-text-secondary font-mono">{member.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <RoleBadge role={member.role} />
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end relative z-10 overflow-hidden">
                          <div className="flex flex-col items-start gap-1 transition-all duration-300">
                            <EyebrowLabel theme="dark" className="!mb-0 !text-[10px] !tracking-wider">JOINED</EyebrowLabel>
                            <div className="text-[12px] text-text-secondary font-mono leading-none">{member.joined}</div>
                          </div>
                          <div className="w-0 group-hover:w-16 overflow-hidden transition-all duration-300 flex justify-end">
                            {member.role !== "OWNER" ? (
                              <button 
                                onClick={() => removeMember(member.id)}
                                className="p-3 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-none transition-all border border-transparent hover:border-red-400/20"
                                title="Revoke Access"
                              >
                                <Trash2 size={16} />
                              </button>
                            ) : (
                              <div className="p-3 w-[40px] h-[40px]"></div>
                            )}
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Security Notice */}
          <div className="p-6 border border-border-default bg-surface-primary rounded-none flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group hover:border-border-hover transition-colors">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 110%, black 20%, transparent 70%)" }} />
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-surface-tertiary border border-border-default rounded-none">
                <Shield size={16} className="text-accent" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-text-primary mb-1">Role-Based Access Control (RBAC)</div>
                <p className="text-[13px] text-text-secondary leading-[1.65]">
                  Editors can modify mock data and schemas. Viewers are restricted to read-only API access.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
