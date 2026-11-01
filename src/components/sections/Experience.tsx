import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { experienceData } from '../../data/experience';
import { Badge } from '../ui/Badge';
import { MapPin, Calendar } from 'lucide-react';
import { SectionReveal } from '../motion/SectionReveal';

export const Experience: React.FC = () => {
  return (
    <section id="experience" aria-label="Experience & Trajectory" className="scroll-mt-24">
      <SectionHeader
        number="04"
        label="Trajectory & Experience"
        headline="Academic, project & engineering background."
        description="A chronological record of technical initiatives, machine learning implementations, and laboratory projects. No inflated corporate titles."
      />

      <SectionReveal className="flex flex-col border-t border-editorial-border">
        {experienceData.map((item, idx) => {
          const isPending = item.role.startsWith('[ADD');

          return (
            <div
              key={item.id}
              data-scroll
              data-scroll-speed={idx % 2 === 0 ? "0.15" : "-0.15"}
              className="py-10 border-b border-editorial-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group loco-skew hover:bg-editorial-surface/40 transition-colors duration-300"
            >
              {/* Period & Organization (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-editorial-muted">
                  <Calendar size={13} className="text-editorial-accent" />
                  <span>{item.period}</span>
                  <span className="text-editorial-border">/</span>
                  <Badge variant="subtle" className="text-[10px]">
                    {item.type}
                  </Badge>
                </div>

                <h3 className={`font-serif text-2xl sm:text-3xl text-editorial-text mt-1 ${isPending ? 'text-editorial-accent/90 font-mono text-lg' : ''}`}>
                  {item.role}
                </h3>

                <div className="flex items-center gap-2 text-xs font-mono text-editorial-muted">
                  <span className="text-editorial-text">{item.organization}</span>
                  <span className="text-editorial-border">•</span>
                  <div className="flex items-center gap-1">
                    <MapPin size={11} />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Highlights & Tech Stack (8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <ul className="flex flex-col gap-2.5">
                  {item.highlights.map((highlight, hIdx) => {
                    const isHighlightPending = highlight.startsWith('[ADD');
                    return (
                      <li
                        key={hIdx}
                        className={`text-sm sm:text-base text-editorial-muted font-sans flex items-start gap-3 leading-relaxed ${
                          isHighlightPending ? 'font-mono text-xs text-editorial-accent/90' : ''
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent mt-2 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-editorial-border/60">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono border border-editorial-border/60 text-editorial-muted bg-editorial-surface"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </SectionReveal>
    </section>
  );
};
