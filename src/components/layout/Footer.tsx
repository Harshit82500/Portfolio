import React, { useState, useEffect } from 'react';
import { personalInfo } from '../../data/personalInfo';
import { useScroll } from '../../context/scrollTypes';
import { ArrowUp } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { DeviconLinkedIn } from '../icons/DeviconLinkedIn';

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
    <footer className="border-t border-[rgba(236,231,221,0.12)] bg-[#0F0E0C] text-[#8A857B] text-xs font-mono pt-16 pb-12 mt-32 relative overflow-hidden">
      {/* Locomotive Grand Curtain Reveal Typography */}
      <div
        data-scroll
        data-scroll-speed="-2"
        aria-hidden="true"
        className="w-full overflow-hidden select-none border-b border-[rgba(236,231,221,0.06)] pb-8 mb-12 text-center"
      >
        <span className="font-serif italic text-5xl sm:text-7xl lg:text-[9vw] text-[#ECE7DD]/[0.04] tracking-tight leading-none uppercase block">
          HARSHIT VISHWAKARMA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col gap-12">
        {/* Top Tier: Colophon & Editorial Masthead */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-2xl text-[#ECE7DD]">
                {personalInfo.fullName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B2B]" />
            </div>
            <p className="text-sm font-sans text-[#8A857B] leading-relaxed max-w-sm">
              Data Analyst & Machine Learning Developer. Focused on calibrated models, statistical honesty, and clean architecture.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="text-[#ECE7DD] uppercase tracking-widest text-[11px]">
              System Colophon
            </span>
            <p className="text-[11px] leading-relaxed text-[#8A857B]">
              Engineered with React 19, TypeScript, Tailwind CSS, Motion, and Locomotive Scroll v5. Typeset in Instrument Serif and Inter. Zero tracking telemetry.
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 md:items-end">
            <div className="flex flex-col md:items-end">
              <span className="text-[#ECE7DD] uppercase tracking-widest text-[11px]">
                Local Time
              </span>
              <span className="text-sm text-[#ECE7DD] font-mono mt-1">
                {timeStr ? `${timeStr} IST (UTC+5:30)` : 'CALCULATING...'}
              </span>
            </div>

            <button
              onClick={() => scrollTo(0)}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 border border-[rgba(236,231,221,0.14)] text-[#ECE7DD] hover:border-[#FF4B2B] hover:text-[#FF4B2B] uppercase tracking-widest text-[11px] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Quick Links */}
        <div className="pt-8 border-t border-[rgba(236,231,221,0.08)] flex flex-wrap items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 {personalInfo.fullName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ECE7DD] transition-colors flex items-center gap-1.5"
            >
              <SiGithub size={13} color="#8A857B" />
              <span>GitHub</span>
            </a>
            {personalInfo.linkedinUrl && !personalInfo.linkedinUrl.startsWith('[ADD') && (
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ECE7DD] transition-colors flex items-center gap-1.5"
              >
                <DeviconLinkedIn size={13} color="#8A857B" />
                <span>LinkedIn</span>
              </a>
            )}
            <a
              href={personalInfo.resumeDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ECE7DD] transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
