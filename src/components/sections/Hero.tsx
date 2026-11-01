import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { DeviconLinkedIn } from '../icons/DeviconLinkedIn';
import { personalInfo } from '../../data/personalInfo';
import { useScroll } from '../../context/scrollTypes';

export const Hero: React.FC = () => {
  const { scrollTo, prefersReducedMotion } = useScroll();
  const [imageError, setImageError] = useState(false);
  const [isCutoutAvailable, setIsCutoutAvailable] = useState(false);

  // Check if cutout image is present; if it fails to load, gracefully fall back to harshit.jpg in the arch frame
  const portraitSource = isCutoutAvailable
    ? '/images/harshit-cutout.png'
    : '/images/harshit.jpg';

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative pt-6 sm:pt-10 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* 1. Huge Typography Header: One part filled, one part outlined */}
      <div className="relative z-10 w-full text-center">
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-extrabold tracking-tighter uppercase leading-[0.88] select-none text-[15vw] sm:text-[13vw] lg:text-[11.5vw]"
        >
          {/* First name: Solid Ink */}
          <span className="block text-ink">{personalInfo.name}</span>
          {/* Surname: Outlined Hairline / Bold Stroke */}
          <span className="block text-transparent [-webkit-text-stroke:1.5px_#232C28] sm:[-webkit-text-stroke:2px_#232C28] lg:[-webkit-text-stroke:3px_#232C28]">
            {personalInfo.surname}
          </span>
        </motion.h1>

        {/* 2. Overlapping Portrait: Arch-shaped frame overlapping the bottom of the huge name */}
        <div className="relative -mt-12 sm:-mt-20 lg:-mt-28 z-20 flex justify-center pointer-events-auto">
          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, scale: 0.92, y: 30 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-52 sm:w-68 lg:w-80 aspect-[4/5] rounded-t-full overflow-hidden border-2 border-ink bg-paper shadow-2xl relative group"
          >
            {!imageError ? (
              <motion.img
                src={portraitSource}
                alt={`${personalInfo.fullName} portrait`}
                loading="eager"
                onError={() => {
                  if (isCutoutAvailable) {
                    setIsCutoutAvailable(false);
                  } else {
                    setImageError(true);
                  }
                }}
                initial={prefersReducedMotion ? false : { filter: 'grayscale(100%)' }}
                animate={{ filter: 'grayscale(0%)' }}
                transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              /* Fallback if image path is unavailable */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-paper">
                <span className="font-sans font-extrabold text-5xl text-ink">
                  {personalInfo.monogram}
                </span>
                <span className="font-mono text-[10px] text-ink/60 uppercase tracking-widest mt-2">
                  [ADD: public/images/harshit.jpg]
                </span>
              </div>
            )}

            {/* Subtle arch frame accent hairline */}
            <div className="absolute inset-0 rounded-t-full pointer-events-none ring-1 ring-inset ring-ink/10" />
          </motion.div>
        </div>
      </div>

      {/* 3. Lower Dossier: Left column (role, narrative, button) & Right column (stacked social pills) */}
      <div className="relative z-20 mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-end pt-8 border-t border-border-light">
        {/* Left Column: Role, Description & View Projects Pill */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7 lg:col-span-8 flex flex-col items-start gap-4"
        >
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-ink font-semibold">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>Data Analyst &amp; Data Scientist (aspiring)</span>
          </div>

          <p className="font-sans text-base sm:text-lg text-ink/75 max-w-xl leading-relaxed">
            {personalInfo.heroDescription}
          </p>

          <div className="pt-2">
            <button
              onClick={() => scrollTo('#projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-paper hover:bg-gold hover:text-ink font-sans font-semibold text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer shadow-sm group"
            >
              <span>View Projects</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Stacked Social Pills with Authentic Icons */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 lg:col-span-4 flex flex-col gap-2.5 items-stretch md:items-end"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50 mb-1 self-start md:self-end">
            Connect &amp; Telemetry
          </span>

          {/* GitHub Pill */}
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-border-light bg-paper hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 group text-xs font-mono"
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
            className="w-full md:w-auto inline-flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-border-light bg-paper hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 group text-xs font-mono"
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
            className="w-full md:w-auto inline-flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-border-light bg-paper hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 group text-xs font-mono"
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
