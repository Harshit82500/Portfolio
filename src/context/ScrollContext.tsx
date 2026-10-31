import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import type { ILenisScrollToOptions, lenisTargetScrollTo } from 'locomotive-scroll';
import { ScrollContext } from './scrollTypes';

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollInstance, setScrollInstance] = useState<LocomotiveScroll | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const location = useLocation();
  const instanceRef = useRef<LocomotiveScroll | null>(null);

  // Listen to prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Initialize Locomotive Scroll v5
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion by skipping smooth scroll
    if (prefersReducedMotion) {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
        setScrollInstance(null);
      }
      return;
    }

    let isCancelled = false;

    try {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }

      const instance = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.08,
          duration: 1.2,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        },
      });

      if (!isCancelled) {
        instanceRef.current = instance;
        queueMicrotask(() => {
          if (!isCancelled) setScrollInstance(instance);
        });
      } else {
        instance.destroy();
      }
    } catch (err) {
      console.warn('Locomotive Scroll failed to initialize:', err);
    }

    return () => {
      isCancelled = true;
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
        setScrollInstance(null);
      }
    };
  }, [prefersReducedMotion]);

  // Route change: reset scroll to top and refresh dimensions
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.scrollTo(0, { immediate: true });
      const timer = window.setTimeout(() => {
        instanceRef.current?.resize();
      }, 100);
      return () => window.clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Viewport intersection observer for active section detection
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Scroll to helper
  const scrollTo = useCallback((target: lenisTargetScrollTo, options?: ILenisScrollToOptions) => {
    if (instanceRef.current) {
      instanceRef.current.scrollTo(target, {
        offset: -70, // Header clearance
        duration: 1.1,
        ...options,
      });
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }
  }, [prefersReducedMotion]);

  return (
    <ScrollContext.Provider
      value={{
        scrollInstance,
        scrollTo,
        activeSection,
        setActiveSection,
        prefersReducedMotion,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
