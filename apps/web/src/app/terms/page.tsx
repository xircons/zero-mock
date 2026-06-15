"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ScrollText, ShieldCheck, Scale, FileWarning, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionWrapper } from "../_components/layout/SectionWrapper";
import { EyebrowLabel } from "../_components/ui/EyebrowLabel";

export default function TermsPage() {
  const router = useRouter();
  const sections = [
    {
      icon: <Scale size={20} />,
      title: "1. Acceptance of Terms",
      content: "By accessing or using Zero-Mock, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use our service. We provide a platform for dynamic API mocking and development tools."
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "2. User Conduct",
      content: "Users are responsible for all activity under their account. You may not use Zero-Mock for any illegal purposes or to violate any laws in your jurisdiction. The engine is intended for development and testing environments."
    },
    {
      icon: <FileWarning size={20} />,
      title: "3. Termination",
      content: "We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
    },
    {
      icon: <ScrollText size={20} />,
      title: "4. Limitation of Liability",
      content: "Zero-Mock shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses."
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
            <span className="text-[13px] font-medium text-black">Terms of Service</span>
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
            <EyebrowLabel theme="light" className="!mb-6">LEGAL CORE</EyebrowLabel>
            <h1 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.05] mb-8 text-black">
              Terms of <br /> Service
            </h1>
            <p className="text-[16px] text-text-dark-muted leading-[1.7] max-w-[400px]">
              Last updated: June 15, 2026. Please read these terms carefully before initializing your engine profile.
            </p>
            
            <div className="mt-12">
              <Link href="/privacy" className="text-[13px] font-bold text-black hover:opacity-60 transition-all flex items-center gap-2 group">
                READ PRIVACY POLICY <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" />
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
              If you have any questions regarding these terms, please contact our legal infrastructure team at legal@zero-mock.com
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
