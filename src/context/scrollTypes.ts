import { createContext, useContext } from 'react';
import type LocomotiveScroll from 'locomotive-scroll';
import type { ILenisScrollToOptions, lenisTargetScrollTo } from 'locomotive-scroll';

export interface ScrollContextValue {
  scrollInstance: LocomotiveScroll | null;
  scrollTo: (target: lenisTargetScrollTo, options?: ILenisScrollToOptions) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  prefersReducedMotion: boolean;
}

export const ScrollContext = createContext<ScrollContextValue>({
  scrollInstance: null,
  scrollTo: () => {},
  activeSection: '',
  setActiveSection: () => {},
  prefersReducedMotion: false,
});

export const useScroll = () => useContext(ScrollContext);
