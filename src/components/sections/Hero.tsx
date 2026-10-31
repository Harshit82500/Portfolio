import React, { useState } from 'react';
import { personalInfo } from '../../data/personalInfo';
import { Button } from '../ui/Button';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useScroll } from '../../context/scrollTypes';
import { TextReveal } from '../motion/TextReveal';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { scrollTo, prefersReducedMotion } = useScroll();
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="hero"
      aria-label="Hero Overview"
      className="min-h-[85vh] flex flex-col justify-between pt-12 pb-16 border-b border-[rgba(236,231,221,0.12)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Role, Headline, Description, CTAs */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Static Role Line & Availability Indicator */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4B2B]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#8A857B]">
              {personalInfo.staticRoleLine}
            </span>
            <span className="text-[rgba(236,231,221,0.2)]">/</span>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-[rgba(236,231,221,0.12)] bg-[#141311] text-[10px] font-mono tracking-wider uppercase text-[#8A857B]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  personalInfo.isAvailableForWork ? 'bg-emerald-400 animate-pulse' : 'bg-[#8A857B]'
                }`}
              />
              <span>
                {personalInfo.isAvailableForWork
                  ? 'Available for Q1 2027 Roles'
                  : personalInfo.availabilityStatusText}
              </span>
            </div>
          </motion.div>

          {/* Large Serif Headline with Text Mask Reveal */}
          <h1
            data-scroll
            data-scroll-speed="0.1"
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#ECE7DD] tracking-tight leading-[1.03] max-w-4xl"
          >
            <TextReveal as="span" delay={0.1}>
              {personalInfo.heroHeadline}
            </TextReveal>
          </h1>

          {/* Subtitle / Narrative */}
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-base sm:text-lg text-[#8A857B] font-sans max-w-2xl leading-relaxed"
          >
            {personalInfo.heroDescription}
          </motion.p>

          {/* CTA Buttons with Magnetic Hover */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4 mt-10"
          >
            <Button
              variant="primary"
              size="lg"
              magnetic
              onClick={() => scrollTo('#projects')}
              icon={<ArrowDown size={14} />}
            >
              Selected Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              magnetic
              onClick={() => scrollTo('#contact')}
              icon={<ArrowUpRight size={14} />}
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Editorial Photo Frame or Monogram Fallback */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            data-scroll
            data-scroll-speed="-0.1"
            className="w-full max-w-[320px] aspect-[4/5] border border-[rgba(236,231,221,0.14)] bg-[#141311] p-3 relative group"
          >
            <div className="w-full h-full border border-[rgba(236,231,221,0.08)] bg-[#0F0E0C] overflow-hidden relative flex flex-col items-center justify-center">
              {!imageError ? (
                <img
                  src={personalInfo.photoUrl}
                  alt={`${personalInfo.fullName} portrait`}
                  width={320}
                  height={400}
                  loading="eager"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              ) : (
                /* Neutral Editorial Monogram Fallback */
                <div className="w-full h-full flex flex-col items-center justify-between p-6 text-center select-none bg-[#12110F]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A857B]">
                    PORTRAIT FRAME
                  </span>
                  <div className="flex flex-col items-center">
                    <span className="font-serif italic text-7xl text-[#ECE7DD]/80">
                      {personalInfo.monogram}
                    </span>
                    <span className="w-6 h-[1px] bg-[#FF4B2B] mt-2 mb-3" />
                    <span className="font-mono text-xs text-[#8A857B] uppercase tracking-wider">
                      {personalInfo.fullName}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#5A564F]">
                    [ADD: public/images/harshit.jpg]
                  </span>
                </div>
              )}
            </div>

            {/* Frame metadata label */}
            <div className="flex items-center justify-between mt-3 text-[10px] font-mono uppercase tracking-widest text-[#8A857B]">
              <span>FIG. 01 / PORTRAIT</span>
              <span className="text-[#FF4B2B]">IND</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Footnote Bar */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 pt-6 border-t border-[rgba(236,231,221,0.08)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8A857B]"
      >
        <div className="flex items-center gap-6">
          <span>00 / INTRO</span>
          <span className="hidden sm:inline text-[rgba(236,231,221,0.2)]">•</span>
          <span className="hidden sm:inline">DATA ANALYST & APPLIED ML</span>
        </div>
        <div className="flex items-center gap-2">
          <span>SCROLL FOR ANALYSIS</span>
          <span className="text-[#FF4B2B]">↓</span>
        </div>
      </motion.div>
    </section>
  );
};
