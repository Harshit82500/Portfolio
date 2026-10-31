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

      <SectionReveal className="flex flex-col border-t border-[rgba(236,231,221,0.12)]">
        {experienceData.map((item, idx) => {
          const isPending = item.role.startsWith('[ADD');

          return (
            <div
              key={item.id}
              data-scroll
              data-scroll-speed={idx % 2 === 0 ? "0.15" : "-0.15"}
              className="py-10 border-b border-[rgba(236,231,221,0.12)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group loco-skew hover:bg-[#141311]/40 transition-colors duration-300"
            >
              {/* Period & Organization (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8A857B]">
                  <Calendar size={13} className="text-[#FF4B2B]" />
                  <span>{item.period}</span>
                  <span className="text-[rgba(236,231,221,0.2)]">/</span>
                  <Badge variant="subtle" className="text-[10px]">
                    {item.type}
                  </Badge>
                </div>

                <h3 className={`font-serif text-2xl sm:text-3xl text-[#ECE7DD] mt-1 ${isPending ? 'text-[#FF4B2B]/90 font-mono text-lg' : ''}`}>
                  {item.role}
                </h3>

                <div className="flex items-center gap-2 text-xs font-mono text-[#8A857B]">
                  <span className="text-[#ECE7DD]">{item.organization}</span>
                  <span className="text-[rgba(236,231,221,0.2)]">•</span>
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
                        className={`text-sm sm:text-base text-[#8A857B] font-sans flex items-start gap-3 leading-relaxed ${
                          isHighlightPending ? 'font-mono text-xs text-[#FF4B2B]/90' : ''
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B2B] mt-2 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-[rgba(236,231,221,0.06)]">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono border border-[rgba(236,231,221,0.08)] text-[#8A857B] bg-[#141311]"
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
