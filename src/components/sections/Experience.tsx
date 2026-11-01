import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { experienceData, type ExperienceItem } from '../../data/experience';
import { useScroll } from '../../context/scrollTypes';

export const Experience: React.FC = () => {
  const [hoveredExp, setHoveredExp] = useState<ExperienceItem | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { prefersReducedMotion } = useScroll();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || prefersReducedMotion) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Experience & Trajectory"
      onMouseMove={handleMouseMove}
      className="scroll-mt-24 -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12 py-[var(--space-section)] bg-ink-deep text-paper relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header (Dark Mode with Faint Watermark) */}
        <SectionHeader
          number="03"
          label="Experience"
          title="Chronological trajectory & applied analytics practice."
          description="Verified internships and practical system implementations. Every milestone is empirically grounded with zero fabricated titles."
          watermark="CAREER"
          dark
        />

        {/* Experience Rows */}
        <div className="flex flex-col mt-[var(--space-header-to-content)]">
          {experienceData.map((item, index) => {
            const isPlaceholder = item.isPlaceholder || item.role.startsWith('[ADD');

            return (
              <motion.div
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => !isTouchDevice && setHoveredExp(item)}
                onMouseLeave={() => !isTouchDevice && setHoveredExp(null)}
                className={`py-8 sm:py-10 border-b border-border-dark grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start transition-colors duration-200 group cursor-default ${
                  isPlaceholder ? 'opacity-70 hover:opacity-100' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* 1. Period & Type (3 cols) */}
                <div className="lg:col-span-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-gold">
                    <Calendar size={13} />
                    <span>{item.period}</span>
                  </div>
                  <span className="font-mono text-[11px] text-paper/50 uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>

                {/* 2. Organization & Role (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-2">
                  <h3
                    className={`font-sans font-bold text-2xl sm:text-3xl text-paper tracking-tight group-hover:text-gold transition-colors duration-200 ${
                      isPlaceholder ? 'font-mono text-xl text-gold/90' : ''
                    }`}
                  >
                    {item.role}
                  </h3>

                  <div className="flex items-center gap-2 font-mono text-xs text-paper/60">
                    <span className="text-paper/90 font-medium">{item.organization}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={11} />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Highlights & Tech (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <ul className="flex flex-col gap-2">
                    {item.highlights.map((highlight, hIdx) => (
                      <li
                        key={hIdx}
                        className={`text-xs sm:text-sm text-paper/75 font-sans leading-relaxed flex items-start gap-2.5 ${
                          highlight.startsWith('[ADD') ? 'font-mono text-gold/80 text-xs' : ''
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-full border border-border-dark text-[10px] font-mono text-paper/60 bg-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Tilted Cursor-Following Preview Thumbnail (Desktop Only) */}
      <AnimatePresence>
        {hoveredExp && !isTouchDevice && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 3,
              x: mousePos.x + 24,
              y: mousePos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.85, rotate: -4 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220, mass: 0.15 }}
            style={{ position: 'fixed', top: 0, left: 0 }}
            className="pointer-events-none z-50 w-64 aspect-[16/10] rounded-xl overflow-hidden border border-gold/40 bg-slate shadow-2xl p-4 flex flex-col justify-between text-paper"
          >
            <div className="flex items-center justify-between border-b border-border-dark pb-2 text-[10px] font-mono uppercase tracking-wider text-gold">
              <span>EXPERIENCE PREVIEW</span>
              <ArrowUpRight size={12} />
            </div>

            <div className="flex flex-col my-auto">
              <span className="font-sans font-bold text-base text-paper line-clamp-1">
                {hoveredExp.organization}
              </span>
              <span className="font-mono text-xs text-paper/60 line-clamp-1 mt-0.5">
                {hoveredExp.role}
              </span>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-paper/40 pt-2 border-t border-border-dark">
              <span>{hoveredExp.period}</span>
              <span className="text-gold">{hoveredExp.type}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
