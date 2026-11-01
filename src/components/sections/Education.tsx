import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { educationData } from '../../data/education';
import { GraduationCap, MapPin } from 'lucide-react';
import { useScroll } from '../../context/scrollTypes';

export const Education: React.FC = () => {
  const { prefersReducedMotion } = useScroll();

  return (
    <section id="education" aria-label="Education" className="scroll-mt-24 pt-8">
      {/* Section Header */}
      <SectionHeader
        number="05"
        label="Academic Foundation"
        headline="Formal engineering degree & computing laboratory practice."
        description="Grounded in computer science theory, algorithms, database systems, and statistical machine learning."
        watermark="STUDIES"
      />

      <div className="flex flex-col">
        {educationData.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-2xl border border-border-light bg-paper p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-xs hover:border-ink/20 transition-all duration-300"
          >
            {/* Degree, Institution & Timeline (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 font-mono text-xs text-ink font-semibold">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <GraduationCap size={15} className="text-ink" />
                <span>{edu.period}</span>
              </div>

              <h3 className="font-sans font-bold text-2xl sm:text-3xl text-ink leading-tight">
                {edu.degree}
              </h3>

              <p className="font-sans text-sm font-semibold uppercase tracking-wider text-ink/75">
                {edu.fieldOfStudy}
              </p>

              <div className="flex items-center gap-2 pt-2 text-xs font-mono text-ink/65 border-t border-border-light/60">
                <MapPin size={13} className="text-ink/60" />
                <span>
                  {edu.institution}, {edu.location}
                </span>
              </div>
            </div>

            {/* Curriculum Focus & Labs (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-border-light lg:pl-8 pt-6 lg:pt-0">
              <span className="font-mono text-xs uppercase tracking-wider text-ink/50">
                Coursework Disciplines &amp; Practical Training
              </span>

              <ul className="flex flex-col gap-3">
                {edu.details?.map((detail, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-ink/75 font-sans flex items-start gap-3 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
