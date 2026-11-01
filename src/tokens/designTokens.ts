/**
 * Typography-Led Minimalist Design Tokens
 * 
 * Strict design system constants matching the typography-led aesthetic:
 * - Paper light background (#EFEBDD) with dark ink typography (#232C28)
 * - Full dark ink experience section (#232C28)
 * - Single gold accent (#E9C46A) used with restraint
 * - Clean geometric grotesque typography (Plus Jakarta Sans) with tight tracking
 * - Consistent custom cubic-bezier easing for all transforms and opacities
 */

export const tokens = {
  colors: {
    // Primary palette (Dymas / Editorial light system)
    paper: '#EFEBDD',
    ink: '#232C28',
    slate: '#2B3631',
    gold: '#E9C46A',
    goldHover: '#F0D38D',
    mutedDark: '#A5B0A8',
    mutedLight: 'rgba(35, 44, 40, 0.62)',

    // Hairlines
    borderLight: 'rgba(35, 44, 40, 0.12)',
    borderLightHover: 'rgba(35, 44, 40, 0.28)',
    borderDark: 'rgba(239, 235, 221, 0.14)',
    borderDarkHover: 'rgba(239, 235, 221, 0.28)',

    // Semantic tokens
    background: '#EFEBDD',
    surface: '#F6F3EB',
    surfaceDeep: '#232C28',
    text: '#232C28',
    textMuted: 'rgba(35, 44, 40, 0.62)',
    textDim: 'rgba(35, 44, 40, 0.45)',
    border: 'rgba(35, 44, 40, 0.12)',
    accent: '#E9C46A',
    accentHover: '#F0D38D',
    accentMuted: 'rgba(233, 196, 106, 0.15)',
    accentBorder: 'rgba(233, 196, 106, 0.35)',

    // Status
    success: '#10B981',
    error: '#EF4444',
  },

  typography: {
    fonts: {
      display: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      body: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
      tight: '1.05',
      snug: '1.25',
      relaxed: '1.6',
    },
  },

  layout: {
    gridColumns: 12,
    maxWidth: '1440px',
    hairline: '1px solid rgba(35, 44, 40, 0.12)',
  },

  motion: {
    // Single signature easing curve across the entire site
    ease: [0.22, 1, 0.36, 1] as const,
    easeCss: 'cubic-bezier(0.22, 1, 0.36, 1)',
    durations: {
      fast: 0.25,
      normal: 0.45,
      slow: 0.75,
      hero: 1.1,
    },
  },
} as const;

export type DesignTokens = typeof tokens;
