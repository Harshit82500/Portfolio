import { siteConfig } from '../config/site';

/**
 * Typography-Led Minimalist Design Tokens (Softer Palette)
 * 
 * Strict design system constants matching the softer, low eye-strain aesthetic:
 * - paper (page background): #D8D5C4
 * - paper-raised (cards, pills, inputs): #E3E0D0
 * - ink (text and dark buttons): #1F2824
 * - ink-deep (Experience section background): #1C2421
 * - slate: #2B3631
 * - muted on light: rgba(31,40,36,0.72) (exceeds 4.5:1 WCAG AA)
 * - muted on dark: #A5B0A8
 * - border on light: rgba(31,40,36,0.16)
 * - gold: #E9C46A (fills, dots, underlines, hover backgrounds only)
 */

export const tokens = {
  site: siteConfig,
  colors: {
    // Primary palette
    paper: '#D8D5C4',
    paperRaised: '#E3E0D0',
    ink: '#1F2824',
    inkDeep: '#1C2421',
    slate: '#2B3631',
    gold: '#E9C46A',
    goldHover: '#F0D38D',
    mutedDark: '#A5B0A8',
    mutedLight: 'rgba(31, 40, 36, 0.72)',

    // Hairlines
    borderLight: 'rgba(31, 40, 36, 0.16)',
    borderLightHover: 'rgba(31, 40, 36, 0.30)',
    borderDark: 'rgba(216, 213, 196, 0.16)',
    borderDarkHover: 'rgba(216, 213, 196, 0.32)',

    // Semantic tokens
    background: '#D8D5C4',
    surface: '#E3E0D0',
    surfaceDeep: '#1C2421',
    text: '#1F2824',
    textMuted: 'rgba(31, 40, 36, 0.72)',
    textDim: 'rgba(31, 40, 36, 0.50)',
    border: 'rgba(31, 40, 36, 0.16)',
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
    hairline: '1px solid rgba(31, 40, 36, 0.16)',
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
