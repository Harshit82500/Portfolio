import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { DeviconLinkedIn } from '../icons/DeviconLinkedIn';
import { personalInfo } from '../../data/personalInfo';
import { useScroll } from '../../context/scrollTypes';

export const Hero: React.FC = () => {
  const { scrollTo, prefersReducedMotion } = useScroll();
  const [cutoutExists, setCutoutExists] = useState<boolean | null>(null);

  // Probe availability of transparent portrait cutout
  useEffect(() => {
    const img = new Image();
    img.src = '/images/harshit-cutout.png';
    img.onload = () => setCutoutExists(true);
    img.onerror = () => setCutoutExists(false);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative pt-2 sm:pt-4 lg:pt-6 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
    >
      <div className="w-full flex flex-col md:grid md:grid-cols-12 md:gap-x-8 items-end relative">
        {/* 1. Name: HARSHIT (Solid Ink) & VISHWAKARMA (Outlined Hairline, Static Font) */}
        <div className="order-1 md:order-1 md:col-span-12 w-full text-center select-none z-10">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans font-extrabold tracking-tight uppercase leading-[0.88] select-none flex flex-col items-center"
          >
            {/* First name: Solid Ink with clamp sizing */}
            <span
              className="block text-ink whitespace-nowrap"
              style={{ fontSize: 'clamp(3.2rem, 11.5vw, 8.2rem)' }}
            >
              {personalInfo.name}
            </span>
            {/* Surname: Outlined with static font contour elimination */}
            <span
              className="block hero-name-outlined whitespace-nowrap"
              style={{ fontSize: 'clamp(2.05rem, 7.3vw, 5.2rem)' }}
            >
              {personalInfo.surname}
            </span>
          </motion.h1>
        </div>

        {/* 2. Portrait Cut-Out: Centered bottom, overlaps bottom ~25% of name height */}
        {/* On mobile: order-2 (between Name and Role/Description) */}
        {/* On desktop: md:order-3 (center column 5-8 flanking Left and Right columns) */}
        <div className="order-2 md:order-3 md:col-span-4 w-full flex justify-center z-20 -mt-10 sm:-mt-16 lg:-mt-24 pointer-events-auto">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="portrait-container relative portrait-fade-mask w-56 sm:w-68 lg:w-80 cursor-pointer"
          >
            {cutoutExists === true ? (
              <div className="relative w-full aspect-[4/5]">
                {/* Bottom Layer: Static Monochrome Grayscale */}
                <img
                  src="/images/harshit-cutout.png"
                  alt={`${personalInfo.fullName} portrait (monochrome)`}
                  width={380}
                  height={475}
                  className="w-full h-full object-contain select-none pointer-events-none filter grayscale"
                  loading="eager"
                  decoding="async"
                />

                {/* Top Layer: Authentic Color version, fades in on hover (always full opacity on touch) */}
                <img
                  src="/images/harshit-cutout.png"
                  alt={`${personalInfo.fullName} portrait`}
                  width={380}
                  height={475}
                  className="portrait-color-layer absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : cutoutExists === false ? (
              /* Clearly labeled placeholder for transparent cut-out */
              <div className="w-56 sm:w-68 lg:w-80 aspect-[4/5] rounded-2xl border-2 border-dashed border-ink/20 bg-paper-raised/90 flex flex-col items-center justify-center p-6 text-center select-none shadow-sm">
                <div className="w-14 h-14 rounded-full bg-ink/10 flex items-center justify-center mb-3">
                  <span className="font-sans font-extrabold text-xl text-ink">
                    {personalInfo.monogram}
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-ink uppercase tracking-wider mb-1">
                  Portrait Cut-Out
                </span>
                <span className="font-mono text-[10px] text-ink/70 leading-relaxed max-w-[200px]">
                  Place transparent PNG at{' '}
                  <code className="bg-paper px-1 py-0.5 rounded text-ink font-semibold">
                    public/images/harshit-cutout.png
                  </code>
                </span>
              </div>
            ) : (
              /* Preserved dimensional aspect ratio during initial probe */
              <div className="w-56 sm:w-68 lg:w-80 aspect-[4/5]" />
            )}
          </motion.div>
        </div>

        {/* 3. Left Dossier: Role line, narrative description & "View Projects ↗" pill */}
        {/* On mobile: order-3 & order-4 */}
        {/* On desktop: md:order-2 (columns 1-4) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="order-3 md:order-2 md:col-span-4 w-full flex flex-col items-start gap-3 sm:gap-4 mt-6 md:mt-0 z-20"
        >
          {/* Role line */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-ink font-semibold">
            <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
            <span>Data Analyst &amp; Data Scientist (aspiring)</span>
          </div>

          {/* Narrative description */}
          <p className="font-sans text-sm sm:text-base text-ink/75 max-w-sm leading-relaxed">
            {personalInfo.heroDescription}
          </p>

          {/* Action button */}
          <div className="pt-1">
            <button
              onClick={() => scrollTo('#projects')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-paper hover:bg-gold hover:text-ink font-sans font-semibold text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer shadow-sm group"
            >
              <span>View Projects</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </motion.div>

        {/* 4. Right Dossier: Stacked social telemetry pills */}
        {/* On mobile: order-5 (end of stack) */}
        {/* On desktop: md:order-4 (columns 9-12) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="order-4 md:order-4 md:col-span-4 w-full flex flex-col gap-2.5 items-stretch md:items-end mt-6 md:mt-0 z-20"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60 mb-1 self-start md:self-end">
            Connect &amp; Telemetry
          </span>

          {/* GitHub Pill */}
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-border-light bg-paper-raised hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 group text-xs font-mono shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <SiGithub size={14} color="currentColor" />
              <span>GitHub</span>
            </div>
            <ArrowUpRight
              size={13}
              className="text-ink/60 group-hover:text-paper transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* LinkedIn Pill */}
          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-border-light bg-paper-raised hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 group text-xs font-mono shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <DeviconLinkedIn className="w-3.5 h-3.5 fill-current" />
              <span>LinkedIn</span>
            </div>
            <ArrowUpRight
              size={13}
              className="text-ink/60 group-hover:text-paper transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Email Pill */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-full sm:w-auto inline-flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-border-light bg-paper-raised hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 group text-xs font-mono shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <Mail size={14} />
              <span>Email</span>
            </div>
            <ArrowUpRight
              size={13}
              className="text-ink/60 group-hover:text-paper transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
