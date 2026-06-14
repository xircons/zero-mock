"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function CenterpieceSection() {
  return (
    <section className="relative w-[100vw] overflow-x-hidden min-h-[60vh] bg-surface-primary flex items-center justify-center border-t border-border-subtle border-b">
      
      {/* Full Surface Dot Grid */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "var(--dot-pattern)",
          backgroundSize: "28px 28px"
        }}
      />

      {/* Center Logo & Pulsing Radial Glow */}
      <div className="relative z-10 w-[400px] h-[400px] flex items-center justify-center">
        {/* Animated Glow Blob */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(96,165,250,0.2) 0%, rgba(96,165,250,0.05) 50%, transparent 70%)"
          }}
        />
        
        {/* Central Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <Image 
            src="/logo/zero-mock-white-logo.png" 
            alt="zero-mock logo" 
            width={320} 
            height={80} 
            className="w-[280px] md:w-[320px] h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          />
        </motion.div>
      </div>

    </section>
  );
}
