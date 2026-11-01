import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { projectsData } from '../../data/projects';
import { useScroll } from '../../context/scrollTypes';

const filterTabs = ['All', 'Data Analytics', 'Machine Learning', 'Python'] as const;
type FilterTab = (typeof filterTabs)[number];

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const { prefersReducedMotion } = useScroll();

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Data Analytics') {
      return (
        project.category === 'Data Systems' ||
        project.techStack.includes('Pandas') ||
        project.title.includes('EduRetain') ||
        project.title.includes('Compass')
      );
    }
    if (activeFilter === 'Machine Learning') {
      return project.category === 'Machine Learning' || project.category === 'NLP & Extensions';
    }
    if (activeFilter === 'Python') {
      return project.techStack.includes('Python');
    }
    return true;
  });

  return (
    <section id="projects" aria-label="Selected Works" className="scroll-mt-24 pt-8">
      {/* Section Header with Huge Faint Watermark Word */}
      <SectionHeader
        number="01"
        label="Selected Work"
        headline="Predictive models, analytics systems & browser engines."
        description="Comprehensive case studies grounded in authentic problem statements, reproducible architectures, and empirical metrics."
        watermark="WORKS"
      />

      {/* Filter Tabs as Small Text Toggles with Animated Underline */}
      <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-12 pb-4 border-b border-border-light text-xs font-sans uppercase tracking-wider font-semibold">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`relative py-2 transition-colors duration-200 cursor-pointer ${
                isActive ? 'text-ink' : 'text-ink/50 hover:text-ink'
              }`}
            >
              <span>{tab}</span>
              {isActive && (
                <motion.div
                  layoutId="activeProjectFilter"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Two-Column Card Grid: screenshot, title, tech tag pills, soft shadow & subtle lift */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const hasImageError = imageErrors[project.id] || !project.image;
            const isInProgress = project.status === 'In Progress';

            return (
              <motion.article
                key={project.id}
                layout
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col justify-between rounded-2xl border border-border-light bg-paper p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-ink/20 cursor-pointer"
              >
                <Link to={`/project/${project.id}`} className="flex flex-col h-full focus:outline-none">
                  {/* Top Screenshot or Clean Typographic Placeholder */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-border-light bg-[#E8E4D5] relative mb-6">
                    {!hasImageError ? (
                      <img
                        src={project.image}
                        alt={`${project.title} Interface preview`}
                        loading="lazy"
                        onError={() => handleImageError(project.id)}
                        className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    ) : (
                      /* Clean Typographic Minimalist Placeholder */
                      <div className="w-full h-full p-6 flex flex-col justify-between bg-[#EAE6D7] select-none text-ink">
                        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-ink/60">
                          <span>CASE ARCHIVE 0{index + 1}</span>
                          <span className="font-semibold text-ink">SYS-{project.id.slice(0, 3).toUpperCase()}</span>
                        </div>

                        <div className="flex flex-col">
                          <span className="font-sans font-bold text-2xl sm:text-3xl tracking-tight text-ink">
                            {project.title}
                          </span>
                          <span className="font-mono text-xs text-ink/65 mt-1 uppercase">
                            {project.category}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-ink/50 border-t border-ink/10 pt-3">
                          <span>SCREENSHOT ARCHIVE</span>
                          <span>{project.dateRange}</span>
                        </div>
                      </div>
                    )}

                    {/* In Progress Badge Pill */}
                    {isInProgress && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold text-ink text-[10px] font-mono font-semibold uppercase tracking-wider shadow-sm">
                          <Clock size={11} />
                          <span>In progress</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title and Category Header */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60 block mb-1">
                        {project.category}
                      </span>
                      <h3 className="font-sans font-bold text-xl sm:text-2xl text-ink group-hover:text-gold transition-colors duration-200">
                        {project.title}
                      </h3>
                    </div>

                    <div className="p-2 rounded-full border border-border-light group-hover:border-ink group-hover:bg-ink group-hover:text-paper transition-all duration-200 shrink-0">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Short Summary */}
                  <p className="font-sans text-sm text-ink/70 leading-relaxed line-clamp-3 mb-6 mt-1 flex-1">
                    {project.summary}
                  </p>

                  {/* Tech Tag Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-border-light/70 mt-auto">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[11px] font-mono rounded-full border border-border-light text-ink/75 bg-paper/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="text-[10px] font-mono text-ink/50 px-1">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};
