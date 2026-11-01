import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { projectsData } from '../../data/projects';
import { Badge } from '../ui/Badge';
import { ArrowUpRight, ExternalLink, Users } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { SectionReveal } from '../motion/SectionReveal';
import { Link } from 'react-router-dom';

const categories = ['All', 'Machine Learning', 'NLP & Extensions', 'Data Systems'] as const;

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" aria-label="Selected Projects" className="scroll-mt-24">
      <SectionHeader
        number="03"
        label="Selected Works"
        headline="Featured systems, predictive models & browser services."
        description="Comprehensive case studies structured around authentic problem statements, architectural decisions, and honest empirical metrics."
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-editorial-border/60">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-editorial-text text-editorial-bg font-semibold'
                : 'border border-editorial-border text-editorial-muted hover:text-editorial-text hover:border-editorial-accent/40 bg-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Locomotive Sticky Stacking Deck */}
      <SectionReveal className="relative flex flex-col pb-16">
        {filteredProjects.map((project, index) => {
          const hasImageError = imageErrors[project.id] || !project.image;
          const isInProgress = project.status === 'In Progress';

          return (
            <article
              key={project.id}
              style={{
                top: `calc(5.5rem + ${index * 1.5}rem)`,
                zIndex: index + 10,
              }}
              className="loco-deck-card loco-skew border border-editorial-border bg-editorial-surface hover:border-editorial-accent/40 p-6 sm:p-8 lg:p-12 mb-12 relative overflow-hidden group"
            >
              {/* Locomotive Parallax Background Index */}
              <span
                data-scroll
                data-scroll-speed="-0.5"
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -right-4 font-serif italic text-8xl sm:text-9xl text-editorial-text/[0.03] select-none z-0"
              >
                0{index + 1}
              </span>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Side: Editorial Typography & Case Study Content (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Header Metadata */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="font-mono text-xs text-editorial-accent tracking-widest uppercase">
                        PROJECT 0{index + 1}
                      </span>
                      <span className="text-editorial-border">/</span>
                      <Badge variant="subtle" className="text-[10px]">
                        {project.category}
                      </Badge>
                      {isInProgress && (
                        <Badge variant="accent" className="text-[10px]">
                          {project.statusLabel || 'In Progress'}
                        </Badge>
                      )}
                      <span className="font-mono text-xs text-editorial-muted ml-auto">
                        {project.dateRange}
                      </span>
                    </div>

                    {/* Project Title */}
                    <Link
                      to={`/project/${project.id}`}
                      className="group/link inline-block focus-visible:outline-none"
                    >
                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-editorial-text tracking-tight group-hover/link:text-editorial-accent transition-colors duration-200">
                        {project.title}
                      </h3>
                    </Link>

                    {/* Subtitle */}
                    <p className="font-serif italic text-lg sm:text-xl text-editorial-muted mt-1 mb-6">
                      {project.subtitle}
                    </p>

                    {/* Summary */}
                    <p className="text-sm sm:text-base text-editorial-muted font-sans leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Verified Metrics or Explicit Placeholder */}
                    <div className="my-6 p-4 border border-editorial-border/60 bg-editorial-bg">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-editorial-muted block mb-3">
                        {project.verifiedMetrics ? 'Empirical Benchmarks (Verified)' : 'Empirical Benchmarks'}
                      </span>
                      {project.verifiedMetrics ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {project.verifiedMetrics.map((m) => (
                            <div key={m.label} className="flex flex-col">
                              <span className="font-serif text-2xl text-editorial-text">{m.value}</span>
                              <span className="font-mono text-[10px] text-editorial-muted uppercase mt-0.5">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-mono text-xs text-editorial-accent/90">
                          {project.caseStudyPlaceholder || '[ADD: result after I provide it]'}
                        </p>
                      )}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[11px] font-mono border border-editorial-border/60 text-editorial-muted bg-editorial-surface"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Team & Role Credits */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-editorial-border/60 text-xs font-mono text-editorial-muted">
                      <div>
                        <span className="text-editorial-text">Role:</span> {project.role}
                      </div>
                      {project.teamMembers && (
                        <div className="flex items-center gap-1.5">
                          <Users size={12} className="text-editorial-accent" />
                          <span>Team:</span> {project.teamMembers.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions / Links */}
                  <div className="flex flex-wrap items-center gap-4 mt-8 pt-4 border-t border-editorial-border/60">
                    <Link
                      to={`/project/${project.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-editorial-accent text-editorial-accent hover:bg-editorial-accent hover:text-editorial-surface-deep text-xs font-mono uppercase tracking-widest transition-colors duration-200"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight size={14} />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-editorial-muted hover:text-editorial-text transition-colors"
                      >
                        <SiGithub size={13} color="currentColor" />
                        <span>Repository</span>
                      </a>
                    )}

                    {project.liveUrl && !project.liveUrl.startsWith('[ADD') && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-editorial-muted hover:text-editorial-text transition-colors"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Side: Image Panel with Locomotive Parallax Window */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="w-full aspect-[16/10] border border-editorial-border bg-editorial-bg overflow-hidden relative group/img">
                    {!hasImageError ? (
                      <div className="w-full h-full overflow-hidden">
                        <img
                          data-scroll
                          data-scroll-speed="-0.3"
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          loading="lazy"
                          width={600}
                          height={375}
                          onError={() => handleImageError(project.id)}
                          className="w-full h-full object-cover filter grayscale contrast-115 group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-700 ease-out"
                        />
                      </div>
                    ) : (
                      /* Clean Typographic Minimalist Editorial Fallback */
                      <div className="w-full h-full p-8 flex flex-col justify-between bg-editorial-surface border border-editorial-border/40 select-none">
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase text-editorial-muted">
                          <span>CASE STUDY ARCHIVE</span>
                          <span className="text-editorial-accent">SYS-0{index + 1}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-serif italic text-3xl sm:text-4xl text-editorial-text/90 tracking-tight">
                            {project.title}
                          </span>
                          <span className="font-mono text-xs text-editorial-muted mt-1 uppercase">
                            {project.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-editorial-dim">
                          <span>SCREENSHOT PENDING</span>
                          <span>[ADD: public{project.image}]</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </SectionReveal>
    </section>
  );
};
