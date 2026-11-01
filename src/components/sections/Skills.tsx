import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { skillsData } from '../../data/skills';
import { certificationsData } from '../../data/certifications';
import {
  SiPython,
  SiCplusplus,
  SiPandas,
  SiNumpy,
  SiPostgresql,
  SiSqlite,
  SiScikitlearn,
  SiJupyter,
  SiMongodb,
  SiFlask,
  SiFastapi,
  SiGit,
  SiGithub,
  SiDocker,
} from '@icons-pack/react-simple-icons';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { useScroll } from '../../context/scrollTypes';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
  SiPython,
  SiCplusplus,
  SiPandas,
  SiNumpy,
  SiPostgresql,
  SiSqlite,
  SiScikitlearn,
  SiJupyter,
  SiMongodb,
  SiFlask,
  SiFastapi,
  SiGit,
  SiGithub,
  SiDocker,
};

const skillCategories = [
  'Languages',
  'Data Science & ML',
  'Databases & Systems',
  'Backend & Tools',
] as const;

export const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { prefersReducedMotion } = useScroll();

  return (
    <section id="skills" aria-label="Skills & Credentials" className="scroll-mt-24 py-[var(--space-section)]">
      {/* Section Header */}
      <SectionHeader
        number="04"
        label="Skills & Credentials"
        title="Authentic tooling, frameworks & verified certifications."
        description="Structured by domain with official Simple Icons and Devicon brand assets. Strictly no fabricated percentage bars or proficiency meters."
        watermark="STACK"
      />

      {/* Part A: Technical Stack Rows */}
      <div className="flex flex-col mt-[var(--space-header-to-content)] mb-[var(--space-block)]">
        {skillCategories.map((category, catIndex) => {
          const categorySkills = skillsData.filter((s) => s.category === category);

          return (
            <motion.div
              key={category}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{
                duration: 0.45,
                delay: catIndex * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="py-7 sm:py-8 border-b border-border-light grid grid-cols-1 md:grid-cols-12 gap-6 items-center group"
            >
              {/* Category Label (4 cols) */}
              <div className="md:col-span-4 flex items-center gap-3">
                <span className="font-mono text-xs text-ink/40 font-semibold">
                  0{catIndex + 1}
                </span>
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-ink tracking-tight">
                  {category}
                </h3>
              </div>

              {/* Skills Row Pills (8 cols) */}
              <div className="md:col-span-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
                {categorySkills.map((skill) => {
                  const isHovered = hoveredSkill === skill.name;
                  const IconComponent = skill.iconKey ? iconMap[skill.iconKey] : null;

                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-border-light bg-paper hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 cursor-default select-none group/item shadow-2xs"
                    >
                      <div className="w-4 h-4 flex items-center justify-center shrink-0">
                        {IconComponent ? (
                          <IconComponent
                            size={16}
                            color={isHovered ? skill.brandColor : 'currentColor'}
                            className="transition-colors duration-200"
                          />
                        ) : skill.iconType === 'missing' ? (
                          <span className="font-sans font-bold text-xs text-ink">
                            PBi
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-ink/60">
                            {skill.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span className="font-sans text-xs font-semibold tracking-wide">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Part B: Verified Certifications Rows */}
      <div className="mt-[var(--space-block)]">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
            Verified Credentials &amp; Simulations
          </span>
          <span className="w-8 h-[1px] bg-border-light" />
        </div>

        <div className="flex flex-col border-t border-border-light">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="py-6 sm:py-7 border-b border-border-light grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center hover:bg-ink/[0.015] transition-colors duration-200"
            >
              {/* Issuer & Date (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-1">
                <span className="font-mono text-xs font-semibold text-ink">
                  {cert.issuer}
                </span>
                <span className="font-mono text-[11px] text-ink/50">
                  {cert.issueDate}
                </span>
              </div>

              {/* Credential Name & Skills (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-sans font-bold text-base sm:text-lg text-ink">
                    {cert.name}
                  </h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsCovered.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-full border border-border-light text-[10px] font-mono text-ink/65 bg-paper"
                    >
                      {s}
                    </span>
                  ))}
                  {cert.skillsCovered.length > 3 && (
                    <span className="text-[10px] font-mono text-ink/40 self-center">
                      +{cert.skillsCovered.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Verification Code / ID (3 cols) */}
              <div className="lg:col-span-3 flex lg:justify-end items-center gap-1.5 font-mono text-xs text-ink/60">
                <ShieldCheck size={14} className="text-ink/60 shrink-0" />
                <span className="truncate">
                  {cert.credentialId ? `ID: ${cert.credentialId}` : `Code: ${cert.verificationCode}`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Honest Icon Audit Note */}
      <div className="mt-[var(--space-block)] p-4 rounded-xl border border-border-light bg-paper-raised flex items-start gap-3 text-xs font-mono text-ink/70">
        <AlertCircle size={15} className="text-ink shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ink">Verification Standard:</strong> Microsoft Power BI is represented with a custom typographical monogram because it has no published vector glyph in either official Simple Icons or Devicon libraries.
        </p>
      </div>
    </section>
  );
};
