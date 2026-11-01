import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { DeviconLinkedIn } from '../icons/DeviconLinkedIn';
import { personalInfo } from '../../data/personalInfo';
import { useScroll } from '../../context/scrollTypes';

export const Footer: React.FC = () => {
  const { scrollTo } = useScroll();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border-light bg-paper text-ink pt-16 sm:pt-20 pb-12 mt-24 sm:mt-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col gap-12 sm:gap-16">
        {/* Top: Huge Geometric Wordmark */}
        <div className="border-b border-border-light pb-8 select-none">
          <span className="font-sans font-extrabold tracking-tighter text-4xl sm:text-6xl md:text-7xl lg:text-[7.5vw] leading-none uppercase block text-ink">
            {personalInfo.fullName}
          </span>
        </div>

        {/* Middle Tier: Colophon, Navigation & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Colophon & Mission (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-lg text-ink">
                Data Analyst &amp; Applied ML Developer
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>
            <p className="text-sm font-sans text-ink/70 leading-relaxed max-w-sm">
              Designing actionable quantitative intelligence through rigorous exploratory analysis, predictive modeling, and verified metrics.
            </p>
            <div className="pt-2 font-mono text-xs text-ink/50">
              <span>Local Station Time: </span>
              <span className="text-ink font-medium">{timeStr ? `${timeStr} IST` : 'CALCULATING...'}</span>
            </div>
          </div>

          {/* Nav Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-ink/50 font-semibold">
              Navigation
            </span>
            <div className="flex flex-col gap-2 font-sans text-sm font-medium text-ink">
              <button
                onClick={() => scrollTo('#projects')}
                className="text-left hover:underline decoration-gold decoration-2 transition-all cursor-pointer"
              >
                Selected Work
              </button>
              <button
                onClick={() => scrollTo('#what-i-do')}
                className="text-left hover:underline decoration-gold decoration-2 transition-all cursor-pointer"
              >
                What I Do
              </button>
              <button
                onClick={() => scrollTo('#experience')}
                className="text-left hover:underline decoration-gold decoration-2 transition-all cursor-pointer"
              >
                Trajectory &amp; Experience
              </button>
              <button
                onClick={() => scrollTo('#skills')}
                className="text-left hover:underline decoration-gold decoration-2 transition-all cursor-pointer"
              >
                Skills &amp; Credentials
              </button>
              <button
                onClick={() => scrollTo('#education')}
                className="text-left hover:underline decoration-gold decoration-2 transition-all cursor-pointer"
              >
                Education
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="text-left hover:underline decoration-gold decoration-2 transition-all cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Socials & Back to Top (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between h-full gap-6 md:items-end">
            <div className="flex flex-col md:items-end gap-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-ink/50 font-semibold">
                Social Telemetry
              </span>
              <div className="flex flex-col md:items-end gap-2 text-sm font-sans font-medium text-ink">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline decoration-gold decoration-2 transition-all flex items-center gap-1.5"
                >
                  <SiGithub size={13} color="currentColor" />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline decoration-gold decoration-2 transition-all flex items-center gap-1.5"
                >
                  <DeviconLinkedIn className="w-3.5 h-3.5 fill-current" />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:underline decoration-gold decoration-2 transition-all flex items-center gap-1.5"
                >
                  <span>Email Transmission</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            <button
              onClick={() => scrollTo(0)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-light hover:border-ink hover:bg-ink hover:text-paper text-ink text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-2xs self-start md:self-end"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

        {/* Bottom Tier: Copyright */}
        <div className="pt-8 border-t border-border-light flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink/60">
          <div>
            © 2026 {personalInfo.fullName}. All rights reserved.
          </div>
          <div>
            Typography in Plus Jakarta Sans. Zero speculative telemetry.
          </div>
        </div>
      </div>
    </footer>
  );
};
