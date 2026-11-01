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
    <header className="fixed top-0 left-0 right-0 z-50 bg-editorial-bg/90 backdrop-blur-md border-b border-editorial-border transition-colors duration-300">
      {/* Locomotive Real-time Scroll Progress Hairline */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-editorial-accent pointer-events-none transition-all duration-75"
        style={{ width: 'calc(var(--scroll-progress, 0) * 100%)' }}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-18 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 group text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial-accent"
            aria-label="Scroll to top"
          >
            <span className="font-serif italic text-2xl tracking-tight text-editorial-text group-hover:text-editorial-accent transition-colors duration-200">
              {personalInfo.fullName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent" />
          </button>

          {/* Availability Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full border border-editorial-border bg-editorial-surface text-[11px] font-mono tracking-wider uppercase text-editorial-muted">
            <span
              className={`w-2 h-2 rounded-full ${
                personalInfo.isAvailableForWork
                  ? 'bg-editorial-accent animate-pulse'
                  : 'bg-editorial-muted'
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
                  isActive ? 'text-editorial-text' : 'text-editorial-muted hover:text-editorial-text'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-editorial-accent' : 'text-editorial-muted/60 group-hover:text-editorial-accent'}`}>
                  {item.number}
                </span>
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-editorial-accent" />
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
            className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest border border-editorial-border text-editorial-text hover:border-editorial-accent hover:text-editorial-accent transition-colors duration-200"
          >
            Resume
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-editorial-text hover:text-editorial-accent focus-visible:outline-none"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-editorial-border bg-editorial-bg px-6 py-8 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2 pb-4 border-b border-editorial-border/60 text-xs font-mono text-editorial-muted">
            <span
              className={`w-2 h-2 rounded-full ${
                personalInfo.isAvailableForWork ? 'bg-editorial-accent' : 'bg-editorial-muted'
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
              className="flex items-baseline justify-between text-left py-2 border-b border-editorial-border/40 group"
            >
              <span className="font-serif text-2xl tracking-tight text-editorial-text group-hover:text-editorial-accent transition-colors">
                {item.label}
              </span>
              <span className="font-mono text-xs text-editorial-muted group-hover:text-editorial-accent">
                {item.number}
              </span>
            </button>
          ))}

          <a
            href={personalInfo.resumeDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center py-3 text-xs font-mono uppercase tracking-widest border border-editorial-accent text-editorial-accent hover:bg-editorial-accent hover:text-editorial-bg transition-colors"
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
};
