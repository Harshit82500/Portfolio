import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FilmGrain } from './FilmGrain';
import { CustomCursor } from './CustomCursor';
import { SkipToContent } from './SkipToContent';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-editorial-bg text-editorial-text flex flex-col selection:bg-editorial-accent selection:text-editorial-bg">
      {/* Accessibility Skip Link */}
      <SkipToContent />

      {/* Film Grain Texture Overlay */}
      <FilmGrain />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Fixed Editorial Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 pt-18 focus:outline-none">
        {children}
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};
