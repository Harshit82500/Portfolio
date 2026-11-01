import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { whatIDoData } from '../../data/whatIDo';
import { useScroll } from '../../context/scrollTypes';

export const WhatIDo: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { prefersReducedMotion } = useScroll();

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="what-i-do" aria-label="What I Do / Focus Domains" className="scroll-mt-24 py-[var(--space-section)]">
      {/* Section Header */}
      <SectionHeader
        number="02"
        label="What I Do"
        title="Analytical rigor, calibrated systems & clear visual telemetry."
        description="Core competencies and primary engineering disciplines. Click any discipline to review technical deliverables and architecture."
        watermark="FOCUS"
      />

      {/* Interactive Rows */}
      <div className="flex flex-col mt-[var(--space-header-to-content)]">
        {whatIDoData.map((item, index) => {
          const isExpanded = expandedId === item.id;

          return (
            <div key={item.id} className="border-b border-border-light">
              {/* Row Header (Clickable) */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => toggleRow(item.id)}
                className={`py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group transition-colors duration-200 select-none ${
                  isExpanded ? 'bg-ink/5 px-4 sm:px-6 rounded-t-xl' : 'hover:px-2'
                }`}
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-ink/40 group-hover:text-ink transition-colors">
                    {item.number}
                  </span>
                  <h3 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ink tracking-tight uppercase transition-all duration-200 group-hover:translate-x-1">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <span className="hidden sm:inline-block font-mono text-xs uppercase tracking-wider text-ink/50">
                    {item.category}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-full border border-border-light flex items-center justify-center transition-all duration-300 ${
                      isExpanded
                        ? 'bg-ink text-paper rotate-90'
                        : 'group-hover:border-ink group-hover:bg-gold group-hover:text-ink group-hover:rotate-45'
                    }`}
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.div>

              {/* Expanded Ink Panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, height: 0, marginBottom: 0 }
                    }
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="bg-ink text-paper rounded-2xl p-6 sm:p-10 border border-border-dark shadow-2xl relative">
                      {/* Close button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(null);
                        }}
                        className="absolute top-5 right-5 sm:top-7 sm:right-7 p-2 rounded-full border border-border-dark text-paper/70 hover:text-gold hover:border-gold transition-colors cursor-pointer"
                        aria-label="Close details"
                      >
                        <X size={18} />
                      </button>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Content (7 cols) */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs uppercase tracking-widest text-gold">
                              {item.number} / {item.category}
                            </span>
                          </div>

                          <h4 className="font-sans font-bold text-2xl sm:text-3xl text-paper tracking-tight">
                            {item.tagline}
                          </h4>

                          <p className="font-sans text-sm sm:text-base text-paper/80 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Key Deliverables */}
                          <div className="pt-2">
                            <span className="font-mono text-xs uppercase tracking-wider text-gold block mb-3">
                              Key Technical Deliverables:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {item.deliverables.map((deliv, dIdx) => (
                                <div key={dIdx} className="flex items-start gap-2 text-xs font-sans text-paper/85">
                                  <CheckCircle2 size={13} className="text-gold shrink-0 mt-0.5" />
                                  <span>{deliv}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tools & Environment */}
                          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border-dark">
                            <span className="font-mono text-[10px] uppercase text-paper/50 tracking-wider mr-2">
                              Stack:
                            </span>
                            {item.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-2.5 py-0.5 rounded-full border border-border-dark bg-white/5 font-mono text-[11px] text-paper/80"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right: Floating, Slightly Tilted Visual Mockup Card (5 cols) */}
                        <div className="lg:col-span-5 flex justify-center">
                          <motion.div
                            initial={prefersReducedMotion ? false : { rotate: 0, scale: 0.95 }}
                            animate={{ rotate: 3, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-[340px] aspect-[4/3] rounded-xl bg-slate border border-border-dark p-6 shadow-2xl flex flex-col justify-between relative group/mock select-none"
                          >
                            <div className="flex items-center justify-between border-b border-border-dark pb-3 text-[10px] font-mono uppercase tracking-wider text-paper/60">
                              <span>SIGNAL VISUALIZER</span>
                              <span className="text-gold">SYS-{item.number}</span>
                            </div>

                            <div className="flex flex-col items-center justify-center py-4 text-center">
                              <span className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold mb-3 font-mono font-bold text-sm bg-gold/10">
                                {item.number}
                              </span>
                              <span className="font-sans font-bold text-base text-paper">
                                {item.mockupPlaceholder}
                              </span>
                              <span className="font-mono text-[10px] text-paper/50 mt-1">
                                [ADD: Verified dashboard screenshot]
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[9px] font-mono text-paper/40 border-t border-border-dark pt-3">
                              <span>VERIFIED TELEMETRY</span>
                              <span>CONFIDENTIAL ARCHIVE</span>
                            </div>

                            {/* Corner Glow Accent */}
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
