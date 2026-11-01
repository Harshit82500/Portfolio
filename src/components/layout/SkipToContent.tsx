import React from 'react';

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-4 focus:py-2 focus:bg-editorial-accent focus:text-editorial-bg focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider focus:outline-none"
    >
      Skip to main content
    </a>
  );
};
