"use client";

import { useState } from "react";
import { Mail, Lock, ShieldCheck, ArrowLeft, KeyRound, CheckCircle2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyebrowLabel } from "../_components/ui/EyebrowLabel";

type RecoveryStep = "email" | "code" | "reset" | "success";

export default function RecoveryPage() {
  const router = useRouter();
  const [step, setStep] = useState<RecoveryStep>("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });

  const handleNext = (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === "email") setStep("code");
      else if (step === "code") setStep("reset");
      else if (step === "reset") setStep("success");
    }, 1200);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen w-full bg-surface-primary flex items-center justify-center relative overflow-hidden selection:bg-accent selection:text-white text-text-primary">
      
      {/* 4-Column Grid Overlay */}
      <div className="fixed inset-0 w-[100vw] max-w-[100vw] mx-auto px-6 md:px-12 grid grid-cols-4 pointer-events-none h-full z-0 opacity-100">
        <div className="border-l border-r border-border-subtle h-full" />
        <div className="border-r border-border-subtle h-full" />
        <div className="border-r border-border-subtle h-full" />
        <div className="border-r border-border-subtle h-full" />
      </div>

      {/* Monochrome Noise */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />

      <div className="w-full max-w-[440px] relative z-10 px-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Email Request */}
          {step === "email" && (
            <motion.div 
              key="email"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col items-center mb-10 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] pointer-events-none" 
                     style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 60%)", filter: "blur(40px)" }} />
                <div className="w-[38px] h-[38px] bg-white/[0.03] border border-border-default flex items-center justify-center rounded-none mb-6 relative z-10">
                  <KeyRound size={20} className="text-accent" />
                </div>
                <h1 className="text-[32px] md:text-[36px] font-semibold tracking-tight text-text-primary leading-none relative z-10">Recovery</h1>
                <p className="text-[14px] text-text-secondary mt-3 leading-[1.65] relative z-10">Enter your email to receive an access token</p>
              </div>

              <div className="bg-surface-secondary border border-border-default p-8 rounded-none relative overflow-hidden group">
                <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />
                
                <form onSubmit={handleNext} className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] ml-1">Identity Email</label>
                    <div className="relative group/input">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within/input:text-accent transition-colors" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full bg-surface-primary border border-border-default rounded-none pl-11 pr-4 py-3.5 text-[13px] text-text-primary placeholder:text-text-muted/30 outline-none focus:border-accent transition-all font-mono"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading || !email}
                    className="mt-2 bg-white text-black px-[18px] py-[14px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none disabled:opacity-50 disabled:cursor-wait cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                      {loading ? <RefreshCw size={14} className="animate-spin" /> : <span>&gt;</span>}
                      <span>{loading ? "SENDING CODE..." : "SEND ACCESS CODE"}</span>
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Step 2: Verification Code */}
          {step === "code" && (
            <motion.div 
              key="code"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col items-center mb-10 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] pointer-events-none" 
                     style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 60%)", filter: "blur(40px)" }} />
                <div className="w-[38px] h-[38px] bg-white/[0.03] border border-border-default flex items-center justify-center rounded-none mb-6 relative z-10">
                  <ShieldCheck size={20} className="text-accent" />
                </div>
                <h1 className="text-[32px] md:text-[36px] font-semibold tracking-tight text-text-primary leading-none relative z-10">Verify</h1>
                <p className="text-[14px] text-text-secondary mt-3 leading-[1.65] relative z-10">Token dispatched to <span className="text-text-primary font-mono">{email}</span></p>
              </div>

              <div className="bg-surface-secondary border border-border-default p-8 rounded-none relative overflow-hidden group">
                <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />
                
                <div className="flex flex-col gap-8 relative z-10">
                  <div className="flex flex-col gap-4">
                    <label className="text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] text-center">6-Digit Access Code</label>
                    <div className="flex justify-between gap-2">
                      {code.map((digit, i) => (
                        <input
                          key={i}
                          id={`code-${i}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleCodeChange(i, e.target.value)}
                          className="w-12 h-14 bg-surface-primary border border-border-default rounded-none text-center text-[18px] font-mono font-bold text-accent focus:border-accent outline-none transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleNext()}
                    disabled={loading || code.some(d => !d)}
                    className="bg-white text-black px-[18px] py-[14px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none disabled:opacity-50 disabled:cursor-wait cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                      {loading ? <RefreshCw size={14} className="animate-spin" /> : <span>&gt;</span>}
                      <span>{loading ? "VERIFYING..." : "VERIFY CODE"}</span>
                    </span>
                  </button>
                  
                  <button className="text-[11px] text-text-muted hover:text-text-primary transition-colors text-center uppercase tracking-widest font-bold">
                    Resend Code
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Password Reset */}
          {step === "reset" && (
            <motion.div 
              key="reset"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col items-center mb-10 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] pointer-events-none" 
                     style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 60%)", filter: "blur(40px)" }} />
                <div className="w-[38px] h-[38px] bg-white/[0.03] border border-border-default flex items-center justify-center rounded-none mb-6 relative z-10">
                  <Lock size={20} className="text-accent" />
                </div>
                <h1 className="text-[32px] md:text-[36px] font-semibold tracking-tight text-text-primary leading-none relative z-10">Reset</h1>
                <p className="text-[14px] text-text-secondary mt-3 leading-[1.65] relative z-10">Initialize your new access passkey</p>
              </div>

              <div className="bg-surface-secondary border border-border-default p-8 rounded-none relative overflow-hidden group">
                <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: "var(--dot-pattern)", backgroundSize: "28px 28px" }} />
                
                <form onSubmit={handleNext} className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] ml-1">New Passkey</label>
                    <div className="relative group/input">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within/input:text-accent transition-colors" />
                      <input 
                        type="password" 
                        required
                        value={passwords.new}
                        onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                        placeholder="••••••••"
                        className="w-full bg-surface-primary border border-border-default rounded-none pl-11 pr-4 py-3.5 text-[13px] text-text-primary placeholder:text-text-muted/30 outline-none focus:border-accent transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[11px] font-medium text-text-muted uppercase tracking-[0.1em] ml-1">Confirm Passkey</label>
                    <div className="relative group/input">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within/input:text-accent transition-colors" />
                      <input 
                        type="password" 
                        required
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                        placeholder="••••••••"
                        className="w-full bg-surface-primary border border-border-default rounded-none pl-11 pr-4 py-3.5 text-[13px] text-text-primary placeholder:text-text-muted/30 outline-none focus:border-accent transition-all font-mono"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading || !passwords.new || passwords.new !== passwords.confirm}
                    className="mt-2 bg-white text-black px-[18px] py-[12px] text-[13px] font-medium transition-colors hover:bg-white group flex items-center justify-center gap-1 rounded-none disabled:opacity-50 disabled:cursor-wait cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                      {loading ? <RefreshCw size={14} className="animate-spin" /> : <span>&gt;</span>}
                      <span>{loading ? "INITIALIZING..." : "RESET PASSWORD"}</span>
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Step 4: Success Message */}
          {step === "success" && (
            <motion.div 
              key="success"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="flex flex-col items-center mb-10 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] pointer-events-none" 
                     style={{ background: "radial-gradient(circle, rgba(74,222,128,0.1) 0%, transparent 60%)", filter: "blur(40px)" }} />
                <div className="w-[60px] h-[60px] bg-green-500/10 border border-green-500/20 flex items-center justify-center rounded-none mb-8 relative z-10">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <h1 className="text-[32px] md:text-[36px] font-semibold tracking-tight text-text-primary leading-none relative z-10">Passkey Set</h1>
                <p className="text-[14px] text-text-secondary mt-3 leading-[1.65] relative z-10">Your engine access has been successfully restored</p>
              </div>

              <Link 
                href="/login"
                className="inline-flex bg-white text-black px-[24px] py-[14px] text-[13px] font-medium transition-colors hover:bg-white group items-center justify-center gap-1 rounded-none cursor-pointer"
              >
                <span className="inline-flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                  <span>&gt;</span>
                  <span>BACK TO LOGIN</span>
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Link */}
        {step !== "success" && (
          <div className="text-center mt-10">
            <button 
              onClick={() => router.back()}
              className="text-[12px] text-text-muted hover:text-text-primary transition-all flex items-center justify-center gap-2 group mx-auto cursor-pointer"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Previous
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
