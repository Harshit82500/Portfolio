import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { educationData } from '../../data/education';
import { BookOpen, Award } from 'lucide-react';
import { SectionReveal } from '../motion/SectionReveal';

export const Education: React.FC = () => {
  return (
    <section id="education" aria-label="Education" className="scroll-mt-24">
      <SectionHeader
        number="05"
        label="Academic Foundation"
        headline="Formal degree studies & engineering curriculum."
        description="Grounded in computer science fundamentals, algorithm complexity, data structures, and statistical computing."
      />

      <SectionReveal className="grid grid-cols-1 gap-6">
        {educationData.map((edu) => (
          <div
            key={edu.id}
            data-scroll
            data-scroll-speed="0.1"
            className="p-8 border border-editorial-border bg-editorial-surface grid grid-cols-1 lg:grid-cols-12 gap-8 items-start loco-skew"
          >
            {/* Degree & Institution (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-mono text-xs text-editorial-accent tracking-widest uppercase">
                {edu.period}
              </span>
              <h3 className="font-serif text-3xl text-editorial-text leading-tight">
                {edu.degree}
              </h3>
              <p className="font-mono text-xs uppercase tracking-wider text-editorial-muted">
                {edu.fieldOfStudy}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs font-mono text-editorial-text">
                <BookOpen size={13} className="text-editorial-muted" />
                <span>{edu.institution}</span>
              </div>

              {edu.metricsPlaceholder && (
                <div className="mt-4 p-3 border border-editorial-border/60 bg-editorial-bg text-[11px] font-mono text-editorial-accent/90">
                  <span>Score: {edu.metricsPlaceholder}</span>
                </div>
              )}
            </div>

            {/* Coursework & Labs (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-editorial-muted">
                Curriculum Focus & Practical Laboratories
              </span>
              <ul className="flex flex-col gap-2.5">
                {edu.details?.map((detail, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-editorial-muted font-sans flex items-start gap-3 leading-relaxed"
                  >
                    <Award size={14} className="text-editorial-accent shrink-0 mt-1" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </SectionReveal>
    </section>
  );
};
