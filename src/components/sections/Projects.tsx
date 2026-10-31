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
      <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-[rgba(236,231,221,0.08)]">
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

      {/* Large Image-Led Project Rows / Panels */}
      <SectionReveal className="flex flex-col gap-12 lg:gap-16">
        {filteredProjects.map((project, index) => {
          const hasImageError = imageErrors[project.id] || !project.image;
          const isInProgress = project.status === 'In Progress';

          return (
            <article
              key={project.id}
              className="border border-[rgba(236,231,221,0.12)] bg-[#141311] hover:border-[rgba(236,231,221,0.28)] transition-all duration-300 p-6 sm:p-8 lg:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Side: Editorial Typography & Case Study Content (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Header Metadata */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="font-mono text-xs text-[#FF4B2B] tracking-widest uppercase">
                        PROJECT 0{index + 1}
                      </span>
                      <span className="text-[rgba(236,231,221,0.2)]">/</span>
                      <Badge variant="subtle" className="text-[10px]">
                        {project.category}
                      </Badge>
                      {isInProgress && (
                        <Badge variant="accent" className="text-[10px]">
                          {project.statusLabel || 'In Progress'}
                        </Badge>
                      )}
                      <span className="font-mono text-xs text-[#8A857B] ml-auto">
                        {project.dateRange}
                      </span>
                    </div>

                    {/* Project Title */}
                    <Link
                      to={`/project/${project.id}`}
                      className="group inline-block focus-visible:outline-none"
                    >
                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#ECE7DD] tracking-tight group-hover:text-[#FF4B2B] transition-colors duration-200">
                        {project.title}
                      </h3>
                    </Link>

                    {/* Subtitle */}
                    <p className="font-serif italic text-lg sm:text-xl text-[#8A857B] mt-1 mb-6">
                      {project.subtitle}
                    </p>

                    {/* Summary */}
                    <p className="text-sm sm:text-base text-[#8A857B] font-sans leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Verified Metrics or Explicit Placeholder */}
                    <div className="my-6 p-4 border border-[rgba(236,231,221,0.08)] bg-[#0F0E0C]">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A857B] block mb-3">
                        {project.verifiedMetrics ? 'Empirical Benchmarks (Verified)' : 'Empirical Benchmarks'}
                      </span>
                      {project.verifiedMetrics ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {project.verifiedMetrics.map((m) => (
                            <div key={m.label} className="flex flex-col">
                              <span className="font-serif text-2xl text-[#ECE7DD]">{m.value}</span>
                              <span className="font-mono text-[10px] text-[#8A857B] uppercase mt-0.5">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-mono text-xs text-[#FF4B2B]/90">
                          {project.caseStudyPlaceholder || '[ADD: result after I provide it]'}
                        </p>
                      )}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[11px] font-mono border border-[rgba(236,231,221,0.08)] text-[#8A857B] bg-[#12110F]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Team & Role Credits */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[rgba(236,231,221,0.08)] text-xs font-mono text-[#8A857B]">
                      <div>
                        <span className="text-[#ECE7DD]">Role:</span> {project.role}
                      </div>
                      {project.teamMembers && (
                        <div className="flex items-center gap-1.5">
                          <Users size={12} className="text-[#FF4B2B]" />
                          <span>Team:</span> {project.teamMembers.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions / Links */}
                  <div className="flex flex-wrap items-center gap-4 mt-8 pt-4 border-t border-[rgba(236,231,221,0.08)]">
                    <Link
                      to={`/project/${project.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#FF4B2B] text-[#FF4B2B] hover:bg-[#FF4B2B] hover:text-[#0F0E0C] text-xs font-mono uppercase tracking-widest transition-colors duration-200"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight size={14} />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#8A857B] hover:text-[#ECE7DD] transition-colors"
                      >
                        <SiGithub size={13} color="#8A857B" />
                        <span>Repository</span>
                      </a>
                    )}

                    {project.liveUrl && !project.liveUrl.startsWith('[ADD') && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#8A857B] hover:text-[#ECE7DD] transition-colors"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Side: Image Panel or Clean Typographic Fallback (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="w-full aspect-[16/10] border border-[rgba(236,231,221,0.12)] bg-[#0F0E0C] overflow-hidden relative group/img">
                    {!hasImageError ? (
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        loading="lazy"
                        width={600}
                        height={375}
                        onError={() => handleImageError(project.id)}
                        className="w-full h-full object-cover filter grayscale contrast-115 group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-700 ease-out"
                      />
                    ) : (
                      /* Clean Typographic Minimalist Editorial Fallback */
                      <div className="w-full h-full p-8 flex flex-col justify-between bg-[#11100E] border border-[rgba(236,231,221,0.06)] select-none">
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[#8A857B]">
                          <span>CASE STUDY ARCHIVE</span>
                          <span className="text-[#FF4B2B]">SYS-0{index + 1}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-serif italic text-3xl sm:text-4xl text-[#ECE7DD]/90 tracking-tight">
                            {project.title}
                          </span>
                          <span className="font-mono text-xs text-[#8A857B] mt-1 uppercase">
                            {project.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#5A564F]">
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
