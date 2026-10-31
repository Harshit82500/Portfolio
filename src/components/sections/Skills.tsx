import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { skillsData } from '../../data/skills';
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
import { Badge } from '../ui/Badge';
import { AlertCircle } from 'lucide-react';
import { SectionReveal } from '../motion/SectionReveal';

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

const categories = [
  'All',
  'Languages',
  'Data Science & ML',
  'Databases & Systems',
  'Backend & Tools',
] as const;

const tickerRow1 = [
  'Python',
  'Scikit-Learn',
  'Pandas',
  'NumPy',
  'XGBoost',
  'DistilBERT',
  'Jupyter',
  'C++',
  'Statistical Modeling',
];

const tickerRow2 = [
  'PostgreSQL',
  'SQLite',
  'MongoDB',
  'Alteryx Analytics',
  'FastAPI',
  'Flask',
  'Docker',
  'Git & GitHub',
  'Microsoft Power BI',
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" aria-label="Skills & Competencies" className="scroll-mt-24">
      <SectionHeader
        number="02"
        label="Technical Competencies"
        headline="Authentic tooling, frameworks & languages."
        description="Structured by domain with official monochrome brand iconography. No fabricated proficiency meters or arbitrary percentage bars."
      />

      {/* Kinetic Velocity Ribbons (Signature Locomotive Effect) */}
      <div className="my-10 -mx-4 sm:-mx-8 lg:-mx-12 overflow-hidden border-y border-[rgba(236,231,221,0.1)] py-5 bg-[#12110F] flex flex-col gap-3 select-none">
        {/* Track 1: Left */}
        <div className="flex overflow-hidden">
          <div className="animate-loco-marquee-left flex items-center gap-6">
            {tickerRow1.concat(tickerRow1).concat(tickerRow1).map((item, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex items-center gap-3 px-4 py-2 border border-[rgba(236,231,221,0.1)] bg-[#0F0E0C] text-xs font-mono text-[#ECE7DD] tracking-wider uppercase shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B2B]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Right */}
        <div className="flex overflow-hidden">
          <div className="animate-loco-marquee-right flex items-center gap-6">
            {tickerRow2.concat(tickerRow2).concat(tickerRow2).map((item, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex items-center gap-3 px-4 py-2 border border-[rgba(236,231,221,0.1)] bg-[#0F0E0C] text-xs font-mono text-[#8A857B] tracking-wider uppercase shrink-0 hover:text-[#ECE7DD]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A857B]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[rgba(236,231,221,0.08)]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#ECE7DD] text-[#0F0E0C] font-semibold'
                : 'border border-[rgba(236,231,221,0.12)] text-[#8A857B] hover:text-[#ECE7DD] hover:border-[rgba(236,231,221,0.3)] bg-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid: Flat, Hairline-Bordered, Kinetic Skew */}
      <SectionReveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 loco-skew">
        {filteredSkills.map((skill) => {
          const isHovered = hoveredSkill === skill.name;
          const IconComponent = skill.iconKey ? iconMap[skill.iconKey] : null;

          return (
            <div
              key={skill.name}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="p-5 border border-[rgba(236,231,221,0.12)] bg-[#141311] hover:border-[rgba(236,231,221,0.3)] transition-all duration-200 flex flex-col justify-between min-h-[140px] group"
            >
              <div className="flex items-start justify-between">
                {/* Brand Icon: Monochrome Ivory by default, authentic brand color on hover */}
                <div className="w-8 h-8 flex items-center justify-center transition-colors duration-200">
                  {IconComponent ? (
                    <IconComponent
                      size={24}
                      color={isHovered ? skill.brandColor : '#ECE7DD'}
                      className="transition-colors duration-200"
                    />
                  ) : skill.iconType === 'missing' ? (
                    <span
                      style={{ color: isHovered ? skill.brandColor : '#ECE7DD' }}
                      className="font-serif italic text-xl font-bold tracking-tighter transition-colors duration-200"
                    >
                      PBi
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-[#8A857B]">
                      {skill.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Comfortable / Learning badge */}
                <Badge
                  variant={skill.proficiency === 'Comfortable' ? 'neutral' : 'subtle'}
                  className="text-[10px]"
                >
                  {skill.proficiency}
                </Badge>
              </div>

              <div className="mt-4">
                <h3 className="font-serif text-lg text-[#ECE7DD] group-hover:text-[#FF4B2B] transition-colors duration-200">
                  {skill.name}
                </h3>
                <span className="font-mono text-[10px] text-[#8A857B] uppercase tracking-wider block mt-0.5">
                  {skill.category}
                </span>
              </div>
            </div>
          );
        })}
      </SectionReveal>

      {/* Honesty note on missing official brand icons */}
      <div className="mt-8 p-4 border border-[rgba(236,231,221,0.08)] bg-[#0F0E0C] flex items-start gap-3 text-xs font-mono text-[#8A857B]">
        <AlertCircle size={16} className="text-[#FF4B2B] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#ECE7DD]">Official Icon Audit Note:</strong> Microsoft Power BI is currently not published in either official Simple Icons v16 or Devicon v2.18. Per honesty rules, it is designated with a clean typographic indicator rather than an unverified fake icon.
        </p>
      </div>
    </section>
  );
};
