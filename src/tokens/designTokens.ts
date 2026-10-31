/**
 * Editorial Dark Design Tokens
 * 
 * Strict design system constants matching the Editorial Dark aesthetic:
 * - Ultra-restrained obsidian background with warm ivory text
 * - Single high-energy vermilion accent used sparingly
 * - Hairline borders with zero blur / zero glow
 * - Editorial serif typography paired with clean grotesque body
 * - Consistent custom cubic-bezier easing for all transforms and opacities
 */

export const tokens = {
  colors: {
    // Primary palette
    background: '#0F0E0C',
    backgroundSubtle: '#141311',
    backgroundElevated: '#181715',
    text: '#ECE7DD',
    textMuted: '#8A857B',
    textDim: '#5A564F',

    // Hairline borders
    border: 'rgba(236, 231, 221, 0.12)',
    borderHover: 'rgba(236, 231, 221, 0.28)',
    borderStrong: 'rgba(236, 231, 221, 0.40)',

    // Singular accent (used strictly for interactive signals, small focal points)
    accent: '#FF4B2B',
    accentHover: '#FF6447',
    accentMuted: 'rgba(255, 75, 43, 0.15)',
    accentBorder: 'rgba(255, 75, 43, 0.35)',

    // Utility & status
    success: '#4ADE80',
    error: '#F87171',
    surfaceOverlay: 'rgba(15, 14, 12, 0.85)',
  },

  typography: {
    fonts: {
      display: '"Instrument Serif", Georgia, "Times New Roman", serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "SF Mono", Consolas, monospace',
    },
    tracking: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.04em',
      widest: '0.12em',
    },
    leading: {
      none: '1',
      tight: '1.1',
      snug: '1.25',
      relaxed: '1.6',
    },
  },

  layout: {
    gridColumns: 12,
    maxWidth: '1536px',
    containerPadding: {
      mobile: '1.25rem',  // px-5
      tablet: '2.5rem',   // px-10
      desktop: '4rem',    // px-16
      wide: '6rem',       // px-24
    },
    hairline: '1px solid rgba(236, 231, 221, 0.12)',
  },

  motion: {
    // Single signature easing curve across the entire site
    ease: [0.22, 1, 0.36, 1] as const,
    easeCss: 'cubic-bezier(0.22, 1, 0.36, 1)',
    durations: {
      fast: 0.25,
      normal: 0.5,
      slow: 0.8,
      hero: 1.2,
      preloader: 1.6,
    },
  },
} as const;

export type DesignTokens = typeof tokens;
