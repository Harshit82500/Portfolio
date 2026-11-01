import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Send,
} from 'lucide-react';
import {
  SiPython,
  SiCplusplus,
  SiPandas,
  SiNumpy,
  SiPostgresql,
  SiSqlite,
  SiScikitlearn,
  SiJupyter,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithub,
  SiDocker,
  SiReact,
  SiTypescript,
  SiPytorch,
  SiTailwindcss,
  SiFirebase,
} from '@icons-pack/react-simple-icons';
import { TextReveal } from '../components/motion/TextReveal';

const techIconMap: Record<string, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
  Python: SiPython,
  'C++': SiCplusplus,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  PostgreSQL: SiPostgresql,
  SQLite: SiSqlite,
  'Scikit-learn': SiScikitlearn,
  Jupyter: SiJupyter,
  FastAPI: SiFastapi,
  Flask: SiFlask,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  React: SiReact,
  TypeScript: SiTypescript,
  PyTorch: SiPytorch,
  'Tailwind CSS': SiTailwindcss,
  Firebase: SiFirebase,
};

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[currentIndex];

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-24 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-gold mb-4 block font-semibold">
          404 / Case Study Not Found
        </span>
        <h1 className="font-sans font-bold text-4xl sm:text-5xl text-ink mb-6">
          Project Record Unavailable
        </h1>
        <p className="text-ink/65 text-sm font-sans mb-8">
          The requested project archive does not exist or has been relocated.
        </p>
        <button
          onClick={() => navigate('/#projects')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-paper text-xs font-sans font-semibold uppercase tracking-wider hover:bg-gold hover:text-ink transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Selected Works</span>
        </button>
      </div>
    );
  }

  // Previous and Next pagination
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  const isInProgress = project.status === 'In Progress';

  return (
    <article className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-16 flex flex-col gap-12 sm:gap-16">
      {/* Top Navigation Pill & Archive Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border-light text-xs font-mono">
        <button
          onClick={() => navigate('/#projects')}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-light bg-paper hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Selected Work</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-ink/60 font-semibold">
            ARCHIVE 0{currentIndex + 1} / 0{projectsData.length}
          </span>
          <span className="text-border-light">•</span>
          <span
            className={`px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
              isInProgress
                ? 'bg-gold text-ink'
                : 'border border-border-light text-ink/75 bg-paper'
            }`}
          >
            {isInProgress ? 'In Progress' : 'Production'}
          </span>
        </div>
      </div>

      {/* Case Study Header */}
      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">
            CASE STUDY 0{currentIndex + 1}
          </span>
          <span className="text-ink/40">•</span>
          <span className="font-mono text-xs text-ink/70 uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-ink/40">•</span>
          <span className="font-mono text-xs text-ink/60">{project.dateRange}</span>
        </div>

        <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl text-ink tracking-tight leading-[1.02]">
          <TextReveal as="span">{project.title}</TextReveal>
        </h1>

        <p className="font-sans text-xl sm:text-2xl text-ink/75 font-medium leading-snug">
          {project.subtitle}
        </p>

        <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed max-w-3xl">
          {project.summary}
        </p>

        {/* Action Buttons: Source, Live Demo, Contact */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-paper hover:bg-gold hover:text-ink text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm"
            >
              <SiGithub size={14} color="currentColor" />
              <span>Inspect Source Code</span>
              <ExternalLink size={12} />
            </a>
          )}

          {project.liveUrl && !project.liveUrl.startsWith('[ADD') ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-light hover:border-ink hover:bg-ink hover:text-paper text-ink text-xs font-sans font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Live Application</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-dashed border-border-light text-xs font-mono text-ink/50">
              <span>[ADD: Live Demo URL]</span>
            </span>
          )}

          <button
            onClick={() => navigate('/#contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-light hover:border-ink hover:bg-ink hover:text-paper text-ink text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>Contact Me</span>
            <Send size={12} />
          </button>
        </div>

        {/* Meta Column Bar (Role, Timeline, Tools with real logos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-7 rounded-2xl border border-border-light bg-[#F5F2E8] text-xs font-mono mt-4">
          <div className="flex flex-col gap-1">
            <span className="text-ink/50 uppercase text-[10px]">Role / Discipline</span>
            <span className="text-ink font-semibold">{project.role}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-ink/50 uppercase text-[10px]">Timeline</span>
            <span className="text-ink flex items-center gap-1.5 font-medium">
              <Calendar size={12} className="text-gold" />
              {project.dateRange}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-ink/50 uppercase text-[10px]">Collaborators</span>
            <span className="text-ink flex items-center gap-1.5 font-medium">
              <Users size={12} className="text-gold" />
              {project.teamMembers?.join(', ') || 'Independent Solo Project'}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-ink/50 uppercase text-[10px]">Implementation Status</span>
            <span className="text-ink flex items-center gap-1.5 font-medium">
              {isInProgress ? (
                <>
                  <Clock size={12} className="text-gold" />
                  <span>In progress, to be added</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={12} className="text-gold" />
                  <span>Verified Implementation</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Tools Row with Real Logos */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="font-mono text-xs uppercase text-ink/50 mr-2">Tools:</span>
          {project.techStack.map((tech) => {
            const Icon = techIconMap[tech];
            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-light bg-paper text-xs font-mono text-ink/80 shadow-2xs"
              >
                {Icon && <Icon size={13} color="currentColor" />}
                <span>{tech}</span>
              </span>
            );
          })}
        </div>
      </header>

      {/* Large Hero Visual Panel or Clean Typographic Fallback */}
      <section aria-label="Visual Overview">
        <div className="w-full aspect-[16/9] rounded-2xl border border-border-light bg-[#E8E4D5] overflow-hidden relative shadow-sm">
          {!imageError && project.image ? (
            <img
              src={project.image}
              alt={`${project.title} Interface preview`}
              width={1024}
              height={576}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover filter contrast-105"
            />
          ) : (
            <div className="w-full h-full p-8 sm:p-12 flex flex-col justify-between bg-[#EAE6D7] select-none text-ink">
              <div className="flex items-center justify-between font-mono text-xs uppercase text-ink/60">
                <span>ARCHIVE VISUAL RECORD</span>
                <span className="font-semibold text-ink">SYS-0{currentIndex + 1}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-3xl sm:text-5xl text-ink tracking-tight">
                  {project.title}
                </span>
                <span className="font-mono text-sm text-ink/70 mt-2 uppercase">
                  {project.subtitle}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-ink/50 border-t border-ink/10 pt-4">
                <span>SCREENSHOT RECORD PENDING</span>
                <span>[ADD: public{project.image}]</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Full Case Study Sections from the Brief */}
      <div className="flex flex-col gap-14 text-ink font-sans leading-relaxed">
        {/* 01. Context & Problem Statement */}
        <div className="flex flex-col gap-4 border-t border-border-light pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">01</span>
            <span className="w-6 h-[1px] bg-border-light" />
            <span className="font-mono text-xs text-ink/60 uppercase tracking-widest">
              Problem &amp; Context
            </span>
          </div>

          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ink tracking-tight">
            The Analytical Problem Statement
          </h2>

          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            {project.overview}
          </p>

          <div className="p-6 rounded-xl border border-border-light bg-[#F5F2E8] my-2">
            <span className="font-mono text-xs uppercase tracking-wider text-gold font-semibold block mb-2">
              Specific Failure Mode Addressed:
            </span>
            <p className="text-sm font-sans text-ink/80 leading-relaxed">
              {project.problem}
            </p>
          </div>
        </div>

        {/* 02. The Solution & Architecture */}
        <div className="flex flex-col gap-4 border-t border-border-light pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">02</span>
            <span className="w-6 h-[1px] bg-border-light" />
            <span className="font-mono text-xs text-ink/60 uppercase tracking-widest">
              Solution &amp; Engineering Decisions
            </span>
          </div>

          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ink tracking-tight">
            Architecture &amp; Pipeline Design
          </h2>

          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            {project.solution}
          </p>

          <div className="flex flex-col gap-3 mt-4">
            <span className="font-mono text-xs uppercase tracking-wider text-ink/60">
              Technical Pipeline Components:
            </span>
            <div className="grid grid-cols-1 gap-3">
              {project.architecture.map((item, idx) => {
                const [headline, ...rest] = item.split(':');
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-border-light bg-paper flex items-start gap-4"
                  >
                    <span className="font-mono text-xs text-gold font-semibold shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <div>
                      <strong className="font-sans text-sm text-ink block mb-1">
                        {headline}:
                      </strong>
                      <span className="font-sans text-xs text-ink/75 leading-relaxed">
                        {rest.join(':')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 03. Key Engineering Challenges */}
        <div className="flex flex-col gap-4 border-t border-border-light pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">03</span>
            <span className="w-6 h-[1px] bg-border-light" />
            <span className="font-mono text-xs text-ink/60 uppercase tracking-widest">
              Obstacles &amp; Constraints
            </span>
          </div>

          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ink tracking-tight">
            Key Technical Challenges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {project.keyChallenges.map((challenge, idx) => {
              const [title, ...body] = challenge.split(':');
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-border-light bg-[#F5F2E8] flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs text-gold font-semibold block mb-2">
                      CHALLENGE 0{idx + 1}
                    </span>
                    <h3 className="font-sans font-bold text-base text-ink mb-2">
                      {title}
                    </h3>
                    <p className="font-sans text-xs text-ink/75 leading-relaxed">
                      {body.join(':')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 04. Verified Empirical Metrics */}
        <div className="flex flex-col gap-4 border-t border-border-light pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">04</span>
            <span className="w-6 h-[1px] bg-border-light" />
            <span className="font-mono text-xs text-ink/60 uppercase tracking-widest">
              Quantitative Verification
            </span>
          </div>

          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ink tracking-tight">
            Empirical Performance Metrics
          </h2>

          {project.verifiedMetrics && project.verifiedMetrics.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {project.verifiedMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-border-light bg-paper flex flex-col items-center text-center justify-center min-h-[120px]"
                >
                  <span className="font-sans font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
                    {metric.value}
                  </span>
                  <span className="font-mono text-xs text-gold font-semibold uppercase tracking-wider mt-1">
                    {metric.label}
                  </span>
                  {metric.description && (
                    <span className="font-sans text-[11px] text-ink/60 mt-1">
                      {metric.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-border-light bg-[#F5F2E8] text-xs font-mono text-ink/70">
              <span className="text-gold font-semibold block mb-1">Empirical Benchmark Status:</span>
              <p>{project.caseStudyPlaceholder || '[ADD: result after I provide it]'}</p>
            </div>
          )}
        </div>

        {/* 05. Limitations & Boundaries */}
        <div className="flex flex-col gap-4 border-t border-border-light pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">05</span>
            <span className="w-6 h-[1px] bg-border-light" />
            <span className="font-mono text-xs text-ink/60 uppercase tracking-widest">
              Boundaries &amp; Honest Limitations
            </span>
          </div>

          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ink tracking-tight">
            Model Limitations &amp; Scope
          </h2>

          <ul className="flex flex-col gap-3">
            {project.limitations.map((limit, idx) => (
              <li
                key={idx}
                className="text-sm font-sans text-ink/80 flex items-start gap-3 p-4 rounded-xl border border-border-light bg-[#F5F2E8]"
              >
                <AlertCircle size={16} className="text-gold shrink-0 mt-0.5" />
                <span>{limit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 06. Deliverables & Artifacts */}
        <div className="flex flex-col gap-4 border-t border-border-light pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-gold uppercase tracking-widest font-semibold">06</span>
            <span className="w-6 h-[1px] bg-border-light" />
            <span className="font-mono text-xs text-ink/60 uppercase tracking-widest">
              Deliverables &amp; Code Artifacts
            </span>
          </div>

          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ink tracking-tight">
            Engineered Artifacts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {project.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-border-light bg-paper flex items-center gap-3"
              >
                <CheckCircle2 size={16} className="text-gold shrink-0" />
                <span className="text-xs font-mono text-ink/85 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Pagination Bottom */}
      <nav aria-label="Case Study Pagination" className="pt-10 border-t border-border-light flex items-center justify-between gap-4">
        {prevProject ? (
          <Link
            to={`/project/${prevProject.id}`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink hover:text-gold transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Prev: {prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            to={`/project/${nextProject.id}`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink hover:text-gold transition-colors ml-auto"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowRight size={14} />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
};
