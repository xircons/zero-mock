"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionWrapper } from "../layout/SectionWrapper";
import { EyebrowLabel } from "../ui/EyebrowLabel";
import { BrutalistButton } from "../ui/BrutalistButton";

type FaqItem = {
  q: string;
  a: string;
};

const faqData: Record<string, FaqItem[]> = {
  Overview: [
    {
      q: "What is the Zero-Mock platform?",
      a: "Zero-Mock is a zero-config CLI tool and cloud SaaS that generates a persistent REST API from a JSON file. Instant endpoints, no backend required."
    },
    {
      q: "Who is Zero-Mock designed for?",
      a: "Frontend developers, QA engineers, and product teams who need real API behavior without waiting on a backend."
    },
    {
      q: "Does Zero-Mock support GraphQL?",
      a: "Yes. Auto-GraphQL generation is included. Define your schema via JSON and Zero-Mock exposes both REST and GraphQL endpoints simultaneously."
    }
  ],
  Security: [
    {
      q: "How is my data secured?",
      a: "All data is encrypted at rest and in transit. We use industry-standard TLS 1.3 for API communication and AES-256 for storage."
    },
    {
      q: "Does it support API Keys?",
      a: "Yes, you can generate and manage multiple API keys per project to control access and track usage per client."
    },
    {
      q: "Is Zero-Mock SOC2 compliant?",
      a: "We are currently in the process of SOC2 Type I certification. Our infrastructure follows strict security-first development lifecycles."
    }
  ],
  Protocols: [
    {
      q: "Which REST methods are supported?",
      a: "We support GET, POST, PUT, PATCH, DELETE, and HEAD. Every method is automatically wired to your JSON data structure."
    },
    {
      q: "Can I simulate WebSocket events?",
      a: "Yes, our Cloud Pro tier allows you to define WebSocket triggers that fire based on REST mutations or scheduled intervals."
    },
    {
      q: "What content types are supported?",
      a: "Zero-Mock primarily handles application/json, but also supports multipart/form-data for file upload simulation."
    }
  ],
  Licensing: [
    {
      q: "Can I use Zero-Mock for commercial projects?",
      a: "Absolutely. Our MIT-licensed CLI is free for everyone. Our Cloud plans include commercial use licenses with higher SLA guarantees."
    },
    {
      q: "Is there a self-hosted enterprise version?",
      a: "Yes, for organizations with strict data residency requirements, we offer a Docker-based enterprise image with private registry access."
    },
    {
      q: "What happens if I exceed my request limit?",
      a: "On the free plan, requests are throttled. On paid plans, you have the option for automatic overages or hard caps to control costs."
    }
  ]
};

export function FaqSection() {
  const categories = Object.keys(faqData);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleTabChange = (category: string) => {
    setActiveTab(category);
    // Auto-open first item ONLY on Overview tab
    setOpenIndex(category === "Overview" ? 0 : null);
  };

  return (
    <SectionWrapper theme="light" id="faq">
      <div className="col-start-1 col-span-4 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 w-full">
        
        {/* Left Column */}
        <div className="col-span-1 md:pr-12 flex flex-col items-start md:border-r border-border-light-default">
          <EyebrowLabel theme="light">FAQ</EyebrowLabel>
          <h2 className="text-[32px] md:text-[48px] font-bold text-text-dark-primary mb-8">
            Common<br/>inquiries.
          </h2>
          <p className="text-[14px] text-text-dark-secondary max-w-[280px] mb-12">
            Everything you need to know about deploying, scaling, and securing your Zero-Mock APIs.
            Can&apos;t find an answer?
          </p>
          <BrutalistButton variant="outline" className="border-text-dark-primary text-text-dark-primary hover:bg-text-dark-primary hover:text-surface-light">
            &gt; Contact Us
          </BrutalistButton>
        </div>

        {/* Right Columns */}
        <div className="col-span-1 md:col-span-3 md:pl-12 flex flex-col">
          {/* Tabs */}
          <div className="grid grid-cols-4 md:flex md:flex-wrap gap-0 mb-12 border border-border-light-default w-full md:w-fit rounded-none">
            {categories.map((tab) => (
              <button 
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-2 md:px-6 py-3 text-[11px] md:text-[13px] font-medium transition-colors border-r border-border-light-default last:border-r-0 md:border-r-0 ${activeTab === tab ? "bg-text-dark-primary text-surface-light" : "bg-transparent text-text-dark-secondary hover:bg-surface-light-alt"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="flex flex-col border-b border-border-light-default min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {faqData[activeTab].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="border-t border-border-light-default flex flex-col group"
                  >
                    <button 
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="flex items-center justify-between py-5 text-left text-[15px] text-text-dark-primary font-medium hover:bg-surface-light-alt transition-colors px-4 -mx-4"
                    >
                      <div className="flex items-center gap-6">
                        <motion.span 
                          animate={{ rotate: openIndex === i ? 45 : 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="text-text-dark-muted w-4 flex justify-center group-hover:text-text-dark-primary transition-colors"
                        >
                          <Plus size={16} />
                        </motion.span>
                        {item.q}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openIndex === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-10 pr-4 pb-8 pt-2 text-[14px] text-text-dark-secondary leading-relaxed max-w-[640px]">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
