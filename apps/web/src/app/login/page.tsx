"use client";

import { useState } from "react";
import { CloudLightning, Mail, Lock, Terminal, Globe, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper } from "../_components/layout/SectionWrapper";
import { EyebrowLabel } from "../_components/ui/EyebrowLabel";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { window.location.href = "/projects"; }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-surface-primary selection:bg-accent selection:text-white text-text-primary">
      {/* Monochrome Noise Texture */}
      <div className="fixed inset-0 opacity-[0.035] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />

      <SectionWrapper theme="dark" fullHeight className="!py-0" hideAllLines={false}>

        {/* Left Side: Branding/Intro (Columns 1-2) */}
        <div className="col-span-4 md:col-span-2 flex flex-col justify-center border-r border-border-subtle h-full px-4 md:px-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="absolute top-0 left-0 w-[300px] h-[300px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />

            <h1 className="text-[36px] md:text-[52px] font-semibold tracking-[-0.04em] text-text-primary leading-[1.05] mb-8">
              Access the <br />
              <span className="text-text-muted">Dynamic Engine.</span>
            </h1>
            <p className="text-[14px] text-text-secondary leading-[1.7] max-w-[340px] mb-12">
              Zero-Mock provides a persistent, intelligent REST layer. Initialize your session to manage collections and inject chaos in real-time.
            </p>

            <div className="grid grid-cols-2 gap-11 border-t border-border-subtle pt-12">
              <div className="flex flex-col gap-3">
                <div className="text-[10px] font-bold text-accent tracking-widest uppercase">Connectivity</div>
                <p className="text-[12px] text-text-secondary leading-relaxed">Full spec-compliant GraphQL and REST endpoints available instantly.</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-[10px] font-bold text-accent tracking-widest uppercase">Reliability</div>
                <p className="text-[12px] text-text-secondary leading-relaxed">99.99% uptime with global sync across all developer environments.</p>
              </div>
            </div>
          </motion.div>

          {/* Absolute Watermark to not affect centering */}
          <div className="hidden md:block absolute bottom-12 left-0 opacity-[0.05] text-[10px] font-mono leading-none select-none pointer-events-none">
            {`
  ███████╗███████╗██████╗  ██████╗ 
  ╚══███╔╝██╔════╝██╔══██╗██╔═══██╗
    ███╔╝ █████╗  ██████╔╝██║   ██║
   ███╔╝  ██╔══╝  ██╔══██╗██║   ██║
  ███████╗███████╗██║  ██║╚██████╔╝
  ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ 
            `}
          </div>
        </div>

        {/* Right Side: Login Form (Columns 3-4) */}
        <div className="col-span-4 md:col-span-2 py-12 md:py-24 flex flex-col justify-center items-start h-full md:pl-10 relative">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[420px] relative"
          >
            <div className="absolute -top-10 -right-10 w-[250px] h-[250px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 60%)", filter: "blur(50px)" }} />

            <div className="mb-10 relative z-10">
              <EyebrowLabel theme="dark" className="!mb-4">AUTHENTICATION</EyebrowLabel>
              <h2 className="text-[28px] font-semibold tracking-tight text-text-primary mb-2">Sign in to Zero-Mock</h2>
              <p className="text-[13px] text-text-secondary">Enter your credentials to access the dynamic engine.</p>
            </div>

            <div className="bg-surface-secondary border border-border-default p-8 rounded-none relative overflow-hidden group mb-8">
              {/* Dot Grid Background */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] ml-1">Email</label>
                  <div className="relative group/input">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within/input:text-accent transition-colors" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      className="w-full bg-surface-primary border border-border-default rounded-none pl-11 pr-4 py-3.5 text-[13px] text-text-primary placeholder:text-text-muted/30 outline-none focus:border-accent transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[11px] font-medium text-text-muted uppercase tracking-[0.1em]">Password</label>
                    <Link href="/recovery" className="text-[10px] font-medium text-accent hover:text-accent-hover transition-colors">Forgot?</Link>
                  </div>
                  <div className="relative group/input">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within/input:text-accent transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      className="w-full bg-surface-primary border border-border-default rounded-none pl-11 pr-12 py-3.5 text-[13px] text-text-primary placeholder:text-text-muted/30 outline-none focus:border-accent transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none disabled:opacity-50 disabled:cursor-wait cursor-pointer"
                >
                  <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                    {!loading && <span>&gt;</span>}
                    <span>{loading ? "AUTHENTICATING..." : "SIGN IN TO WORKSPACE"}</span>
                  </span>
                </button>

                {/* Social Auth */}
                <div className="mt-2 relative z-10">
                  <div className="relative mb-6 flex justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-subtle"></div></div>
                    <span className="bg-surface-secondary px-3 text-[10px] uppercase tracking-widest text-text-muted relative z-10">Connect via</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 border border-border-default py-3 rounded-none text-[12px] font-medium text-text-secondary hover:border-border-hover hover:text-text-primary transition-all bg-surface-primary cursor-pointer">
                      <Terminal size={14} /> GitHub
                    </button>
                    <button className="flex items-center justify-center gap-2 border border-border-default py-3 rounded-none text-[12px] font-medium text-text-secondary hover:border-border-hover hover:text-text-primary transition-all bg-surface-primary cursor-pointer">
                      <Globe size={14} /> Google
                    </button>
                  </div>
                </div>

              </form>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[13px] text-text-secondary">
                New here? <Link href="/register" className="text-accent hover:underline underline-offset-4 ml-1">Create Account</Link>
              </p>
              <div className="flex gap-4">
                <Terminal size={14} className="text-text-muted hover:text-text-primary cursor-pointer transition-colors" />
                <Globe size={14} className="text-text-muted hover:text-text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
