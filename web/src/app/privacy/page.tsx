"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Eye, Shield, Fingerprint, Lock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionWrapper } from "../_components/layout/SectionWrapper";
import { EyebrowLabel } from "../_components/ui/EyebrowLabel";

export default function PrivacyPage() {
  const router = useRouter();
  const sections = [
    {
      icon: <Eye size={20} />,
      title: "1. Data Collection",
      content: "We collect information you provide directly to us when you create an account, such as your email and username. We also automatically collect metadata about your dynamic API usage to improve engine performance."
    },
    {
      icon: <Shield size={20} />,
      title: "2. Data Usage",
      content: "Your data is used to provide, maintain, and improve our dynamic mocking services. We do not sell your personal data. We may use anonymized aggregate data for infrastructure scaling analytics."
    },
    {
      icon: <Fingerprint size={20} />,
      title: "3. Security Protocols",
      content: "We implement enterprise-grade encryption and security measures to protect your access tokens and dynamic schemas. Zero-Mock uses SOC2 compliant data stores for all session information."
    },
    {
      icon: <Lock size={20} />,
      title: "4. Your Rights",
      content: "You have the right to access, rectify, or delete your personal information at any time via your engine settings. For complete workspace purges, please refer to our project deletion workflow."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-surface-light text-text-dark-primary selection:bg-black selection:text-white">
      {/* Navigation for Light Section */}
      <nav className="fixed top-0 left-0 w-full z-[70] px-6 md:px-12 py-6 flex justify-between items-center bg-surface-light/80 backdrop-blur-md border-b border-border-light">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img src="/logo/zero-mock-dark-logo.png" alt="ZERO-MOCK" className="h-10 w-auto" />
          </Link>
          <div className="flex items-baseline gap-3">
            <span className="text-[13px] text-text-dark-muted">/</span>
            <Link href="/register" className="text-[13px] font-medium text-text-dark-muted hover:text-black transition-colors">Register</Link>
            <span className="text-[13px] text-text-dark-muted">/</span>
            <span className="text-[13px] font-medium text-black">Privacy Policy</span>
          </div>
        </div>
        <Link href="/login" className="text-[12px] font-bold uppercase tracking-widest hover:underline underline-offset-4">Sign In</Link>
      </nav>

      <SectionWrapper theme="light" className="pt-40 pb-24" hideInternalLines={true}>
        {/* Header Area (Cols 1-2) */}
        <div className="col-span-4 md:col-span-2 mb-16 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <EyebrowLabel theme="light" className="!mb-6">PRIVACY CORE</EyebrowLabel>
            <h1 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.05] mb-8 text-black">
              Privacy <br /> Policy
            </h1>
            <p className="text-[16px] text-text-dark-muted leading-[1.7] max-w-[400px]">
              Last updated: June 15, 2026. Your data privacy is our primary infrastructure mandate. 
            </p>
            
            <div className="mt-12">
              <Link href="/terms" className="text-[13px] font-bold text-black hover:opacity-60 transition-all flex items-center gap-2 group">
                READ TERMS OF SERVICE <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Content Area (Cols 3-4) */}
        <div className="col-span-4 md:col-span-2 flex flex-col gap-16 md:pl-12">
          {sections.map((section, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 border-b border-border-light pb-12 last:border-0"
            >
              <div className="flex items-center gap-3 text-black">
                <div className="p-2 bg-black/5 rounded-none border border-black/10">
                  {section.icon}
                </div>
                <h3 className="text-[18px] font-semibold tracking-tight">{section.title}</h3>
              </div>
              <p className="text-[14px] text-text-dark-muted leading-loose pl-11">
                {section.content}
              </p>
            </motion.div>
          ))}
          
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
             className="p-8 bg-black/5 border border-black/10 rounded-none mt-4"
          >
            <p className="text-[13px] text-text-dark-muted leading-relaxed italic">
              Our privacy framework is designed to protect developers first. No hidden tracking, no data selling, just pure engineering tools.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Footer minimal */}
      <footer className="py-12 border-t border-border-light bg-surface-light text-center">
         <div className="text-[11px] text-text-dark-muted font-mono uppercase tracking-[0.2em]">
            © 2026 Zero-mock infrastructure. All rights reserved.
         </div>
      </footer>
    </div>
  );
}
