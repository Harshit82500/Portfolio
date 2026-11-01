import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useScroll } from '../../context/scrollTypes';
import { personalInfo } from '../../data/personalInfo';
import { projectsData } from '../../data/projects';
import { experienceData } from '../../data/experience';
import { LetterRoll } from '../ui/LetterRoll';

interface NavLinkItem {
  label: string;
  id: string;
  superscript?: string | number;
}

export const Navbar: React.FC = () => {
  const { scrollTo, activeSection, prefersReducedMotion } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavLinkItem[] = [
    { label: 'Work', id: 'projects', superscript: projectsData.length },
    { label: 'What I Do', id: 'what-i-do' },
    {
      label: 'Experience',
      id: 'experience',
      superscript: experienceData.filter((e) => !e.isPlaceholder).length,
    },
    { label: 'Contact', id: 'contact' },
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      scrollTo(`#${id}`);
    } else {
      navigate(`/#${id}`);
      setTimeout(() => {
        scrollTo(`#${id}`);
      }, 150);
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      scrollTo(0);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border-light transition-colors duration-300">
      {/* Scroll Progress Hairline */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-gold pointer-events-none transition-all duration-75"
        style={{ width: 'calc(var(--scroll-progress, 0) * 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-18 flex items-center justify-between">
        {/* Left: Availability Pill & Monogram */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full px-1 py-0.5"
            aria-label="Scroll to top"
          >
            <span className="font-sans font-bold text-lg sm:text-xl tracking-tight text-ink group-hover:opacity-85 transition-opacity duration-200">
              {personalInfo.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold group-hover:scale-125 transition-transform duration-200" />
          </button>

          {/* Availability Pill (controlled by personalInfo.isAvailableForWork, default OFF) */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-light bg-paper text-[11px] font-mono tracking-wider text-ink/75">
            <span
              className={`w-2 h-2 rounded-full ${
                personalInfo.isAvailableForWork
                  ? 'bg-gold animate-pulse'
                  : 'bg-ink/40'
              }`}
            />
            <span>
              {personalInfo.isAvailableForWork
                ? 'Available for Q1 2027'
                : personalInfo.availabilityStatusText}
            </span>
          </div>
        </div>

        {/* Center: Desktop Nav Items with Letter-Roll Hover */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group relative py-2 font-sans text-xs tracking-wider uppercase font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-ink' : 'text-ink/65 hover:text-ink'
                }`}
              >
                <LetterRoll text={item.label} superscript={item.superscript} />
                {isActive && (
                  <motion.span
                    layoutId="navActiveIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Solid Ink Resume Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={personalInfo.resumeDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-sans font-semibold tracking-wide rounded-full bg-ink text-paper hover:bg-gold hover:text-ink transition-all duration-200 shadow-sm cursor-pointer"
          >
            <span>Resume</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink hover:opacity-75 focus-visible:outline-none cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Full-Screen Mobile Menu with Staggered Links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-18 bg-paper z-50 flex flex-col justify-between px-6 py-10 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {/* Availability pill in mobile drawer */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-light bg-paper self-start text-xs font-mono text-ink/75">
                <span
                  className={`w-2 h-2 rounded-full ${
                    personalInfo.isAvailableForWork ? 'bg-gold' : 'bg-ink/40'
                  }`}
                />
                <span>
                  {personalInfo.isAvailableForWork
                    ? 'Available for Q1 2027'
                    : personalInfo.availabilityStatusText}
                </span>
              </div>

              {/* Staggered Links */}
              <div className="flex flex-col gap-5 mt-4">
                {navLinks.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center justify-between text-left py-3 border-b border-border-light group cursor-pointer"
                  >
                    <span className="font-sans font-bold text-3xl sm:text-4xl text-ink group-hover:translate-x-2 transition-transform duration-200">
                      {item.label}
                    </span>
                    {item.superscript !== undefined && (
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-full border border-border-light text-ink/60">
                        0{item.superscript}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile Resume Action */}
            <div className="pt-8 border-t border-border-light flex flex-col gap-4">
              <a
                href={personalInfo.resumeDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 text-xs font-sans font-semibold uppercase tracking-widest rounded-full bg-ink text-paper hover:bg-gold hover:text-ink transition-colors flex items-center justify-center gap-2"
              >
                <span>Download Resume</span>
                <ArrowUpRight size={14} />
              </a>

              <p className="text-center font-mono text-[11px] text-ink/50">
                {personalInfo.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
