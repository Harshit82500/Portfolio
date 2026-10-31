import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScroll } from '../../context/scrollTypes';
import { personalInfo } from '../../data/personalInfo';

interface NavItem {
  number: string;
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { number: '01', label: 'About', id: 'about' },
  { number: '02', label: 'Skills', id: 'skills' },
  { number: '03', label: 'Projects', id: 'projects' },
  { number: '04', label: 'Experience', id: 'experience' },
  { number: '05', label: 'Contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const { scrollTo, activeSection } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key
  React.useEffect(() => {
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0E0C]/90 backdrop-blur-md border-b border-[rgba(236,231,221,0.12)] transition-colors duration-300">
      {/* Locomotive Real-time Scroll Progress Hairline */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-[#FF4B2B] pointer-events-none transition-all duration-75"
        style={{ width: 'calc(var(--scroll-progress, 0) * 100%)' }}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-18 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 group text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF4B2B]"
            aria-label="Scroll to top"
          >
            <span className="font-serif italic text-2xl tracking-tight text-[#ECE7DD] group-hover:text-[#FF4B2B] transition-colors duration-200">
              {personalInfo.fullName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B2B]" />
          </button>

          {/* Availability Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full border border-[rgba(236,231,221,0.12)] bg-[#141311] text-[11px] font-mono tracking-wider uppercase text-[#8A857B]">
            <span
              className={`w-2 h-2 rounded-full ${
                personalInfo.isAvailableForWork
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-[#8A857B]'
              }`}
            />
            <span>
              {personalInfo.isAvailableForWork
                ? 'Available for Work'
                : personalInfo.availabilityStatusText}
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group flex items-baseline gap-1.5 py-2 text-xs font-mono tracking-widest transition-colors duration-200 uppercase ${
                  isActive ? 'text-[#ECE7DD]' : 'text-[#8A857B] hover:text-[#ECE7DD]'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-[#FF4B2B]' : 'text-[#8A857B]/60 group-hover:text-[#FF4B2B]'}`}>
                  {item.number}
                </span>
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#FF4B2B]" />
                  )}
                </span>
              </button>
            );
          })}

          {/* Resume link */}
          <a
            href={personalInfo.resumeDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest border border-[rgba(236,231,221,0.2)] text-[#ECE7DD] hover:border-[#FF4B2B] hover:text-[#FF4B2B] transition-colors duration-200"
          >
            Resume
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#ECE7DD] hover:text-[#FF4B2B] focus-visible:outline-none"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[rgba(236,231,221,0.12)] bg-[#0F0E0C] px-6 py-8 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2 pb-4 border-b border-[rgba(236,231,221,0.1)] text-xs font-mono text-[#8A857B]">
            <span
              className={`w-2 h-2 rounded-full ${
                personalInfo.isAvailableForWork ? 'bg-emerald-400' : 'bg-[#8A857B]'
              }`}
            />
            <span>
              {personalInfo.isAvailableForWork
                ? 'Available for Work'
                : personalInfo.availabilityStatusText}
            </span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="flex items-baseline justify-between text-left py-2 border-b border-[rgba(236,231,221,0.06)] group"
            >
              <span className="font-serif text-2xl tracking-tight text-[#ECE7DD] group-hover:text-[#FF4B2B] transition-colors">
                {item.label}
              </span>
              <span className="font-mono text-xs text-[#8A857B] group-hover:text-[#FF4B2B]">
                {item.number}
              </span>
            </button>
          ))}

          <a
            href={personalInfo.resumeDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center py-3 text-xs font-mono uppercase tracking-widest border border-[#FF4B2B] text-[#FF4B2B] hover:bg-[#FF4B2B] hover:text-[#0F0E0C] transition-colors"
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
};
