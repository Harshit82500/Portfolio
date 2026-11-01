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
    // Primary palette ("Slate & Sage" mid-tone dark)
    background: '#2B3631',
    surface: '#35423C',
    surfaceDeep: '#232C28',
    backgroundSubtle: '#35423C',
    backgroundElevated: '#3F4E47',
    text: '#EFEBDD',
    textMuted: '#B2BDB6',
    textDim: '#85948A',

    // Hairline borders
    border: 'rgba(239, 235, 221, 0.14)',
    borderHover: 'rgba(239, 235, 221, 0.28)',
    borderStrong: 'rgba(239, 235, 221, 0.42)',

    // Singular accent (used strictly for interactive signals, small focal points)
    accent: '#E9C46A',
    accentHover: '#F0D38D',
    accentMuted: 'rgba(233, 196, 106, 0.15)',
    accentBorder: 'rgba(233, 196, 106, 0.35)',

    // Utility & status
    success: '#E9C46A',
    error: '#F87171',
    surfaceOverlay: 'rgba(43, 54, 49, 0.85)',
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
    hairline: '1px solid rgba(239, 235, 221, 0.14)',
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
