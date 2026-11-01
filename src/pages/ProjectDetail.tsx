import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { TextReveal } from '../components/motion/TextReveal';
import { SectionReveal } from '../components/motion/SectionReveal';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[currentIndex];

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-24 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-editorial-accent mb-4 block">
          404 / Case Study Not Found
        </span>
        <h1 className="font-serif text-5xl text-editorial-text mb-6">
          Project Record Unavailable
        </h1>
        <p className="text-editorial-muted text-sm font-sans mb-8">
          The requested project archive does not exist or has been relocated.
        </p>
        <Link to="/#projects">
          <Button variant="outline" size="md" icon={<ArrowLeft size={14} />}>
            Back to Selected Works
          </Button>
        </Link>
      </div>
    );
  }

  // Previous and Next pagination
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  const isInProgress = project.status === 'In Progress';

  return (
    <article className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-20 flex flex-col gap-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-6 border-b border-editorial-border text-xs font-mono">
        <button
          onClick={() => navigate('/#projects')}
          className="inline-flex items-center gap-2 text-editorial-muted hover:text-editorial-text transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} className="text-editorial-accent" />
          <span>BACK TO SELECTED WORKS</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-editorial-muted">ARCHIVE 0{currentIndex + 1} / 0{projectsData.length}</span>
          <span className="text-editorial-border">/</span>
          <Badge variant={isInProgress ? 'accent' : 'neutral'} className="text-[10px]">
            {isInProgress ? 'In Progress' : 'Production'}
          </Badge>
        </div>
      </div>

      {/* Case Study Header */}
      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-editorial-accent tracking-widest uppercase">
            CASE STUDY 0{currentIndex + 1}
          </span>
          <span className="text-editorial-border">•</span>
          <span className="font-mono text-xs text-editorial-muted uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-editorial-border">•</span>
          <span className="font-mono text-xs text-editorial-muted">{project.dateRange}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-editorial-text tracking-tight leading-[1.03]">
          <TextReveal as="span">{project.title}</TextReveal>
        </h1>

        <p className="font-serif italic text-xl sm:text-2xl text-editorial-muted leading-snug">
          {project.subtitle}
        </p>

        {/* Dossier Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border border-editorial-border bg-editorial-surface text-xs font-mono mt-4">
          <div className="flex flex-col gap-1">
            <span className="text-editorial-muted uppercase text-[10px]">Role / Discipline</span>
            <span className="text-editorial-text">{project.role}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-editorial-muted uppercase text-[10px]">Collaborators</span>
            <span className="text-editorial-text flex items-center gap-1.5">
              <Users size={12} className="text-editorial-accent" />
              {project.teamMembers?.join(', ') || 'Independent'}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-editorial-muted uppercase text-[10px]">Domain</span>
            <span className="text-editorial-text">{project.category}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-editorial-muted uppercase text-[10px]">Status</span>
            <span className="text-editorial-text flex items-center gap-1.5">
              {isInProgress ? (
                <>
                  <Clock size={12} className="text-editorial-accent" />
                  <span>In progress, to be added</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={12} className="text-editorial-accent" />
                  <span>Verified Implementation</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* External Repos & Live Demos */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-editorial-border text-editorial-text hover:border-editorial-accent hover:text-editorial-accent text-xs font-mono uppercase tracking-widest transition-colors"
            >
              <SiGithub size={14} color="currentColor" />
              <span>Inspect Source Code</span>
            </a>
          )}

          {project.liveUrl && !project.liveUrl.startsWith('[ADD') && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-editorial-accent text-editorial-accent hover:bg-editorial-accent hover:text-editorial-surface-deep text-xs font-mono uppercase tracking-widest transition-colors"
            >
              <span>Live Application</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </header>

      {/* Hero Visual Panel or Clean Typographic Fallback */}
      <section aria-label="Visual Overview">
        <div className="w-full aspect-[16/9] border border-editorial-border bg-editorial-surface overflow-hidden relative">
          {!imageError && project.image ? (
            <img
              src={project.image}
              alt={`${project.title} Interface`}
              width={1024}
              height={576}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover filter contrast-110"
            />
          ) : (
            <div className="w-full h-full p-8 sm:p-12 flex flex-col justify-between bg-editorial-surface border border-editorial-border/40 select-none">
              <div className="flex items-center justify-between font-mono text-xs uppercase text-editorial-muted">
                <span>ARCHIVE VISUAL RECORD</span>
                <span className="text-editorial-accent">SYS-0{currentIndex + 1}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif italic text-4xl sm:text-6xl text-editorial-text/90 tracking-tight">
                  {project.title}
                </span>
                <span className="font-mono text-sm text-editorial-muted mt-2 uppercase">
                  {project.subtitle}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-editorial-dim">
                <span>SCREENSHOT RECORD PENDING</span>
                <span>[ADD: public{project.image}]</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Case Study Body */}
      <div className="flex flex-col gap-16 text-editorial-text font-sans leading-relaxed">
        {/* 01. Context & Problem Statement */}
        <SectionReveal className="flex flex-col gap-4 border-t border-editorial-border pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-editorial-accent uppercase tracking-widest">01</span>
            <span className="w-4 h-[1px] bg-editorial-border" />
            <span className="font-mono text-xs text-editorial-muted uppercase tracking-widest">
              Context & Problem Statement
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-editorial-text tracking-tight">
            The Analytical Imperative
          </h2>

          <p className="text-editorial-muted text-base sm:text-lg leading-relaxed">
            {project.overview}
          </p>

          <div className="p-6 border border-editorial-border bg-editorial-surface my-2">
            <span className="font-mono text-xs text-editorial-accent uppercase tracking-wider block mb-2">
              Problem Formulation
            </span>
            <p className="text-sm text-editorial-text font-sans leading-relaxed">
              {project.problem}
            </p>
          </div>
        </SectionReveal>

        {/* 02. Architectural Solution */}
        <SectionReveal className="flex flex-col gap-4 border-t border-editorial-border pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-editorial-accent uppercase tracking-widest">02</span>
            <span className="w-4 h-[1px] bg-editorial-border" />
            <span className="font-mono text-xs text-editorial-muted uppercase tracking-widest">
              System Architecture & Methodology
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-editorial-text tracking-tight">
            Engineering Decisions & Pipeline
          </h2>

          <p className="text-editorial-muted text-base leading-relaxed">
            {project.solution}
          </p>

          <div className="grid grid-cols-1 gap-3 my-4">
            {project.architecture.map((item, idx) => (
              <div
                key={idx}
                className="p-5 border border-editorial-border/60 bg-editorial-surface flex items-start gap-3.5"
              >
                <Layers size={16} className="text-editorial-accent shrink-0 mt-0.5" />
                <p className="text-sm text-editorial-text font-sans leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Technology stack pill grid */}
          <div className="pt-4 border-t border-editorial-border/60">
            <span className="font-mono text-[11px] uppercase tracking-widest text-editorial-muted block mb-3">
              Implemented Tooling & Libraries
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 font-mono text-xs border border-editorial-border bg-editorial-bg text-editorial-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* 03. Empirical Benchmarks & Evaluation */}
        <SectionReveal className="flex flex-col gap-4 border-t border-editorial-border pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-editorial-accent uppercase tracking-widest">03</span>
            <span className="w-4 h-[1px] bg-editorial-border" />
            <span className="font-mono text-xs text-editorial-muted uppercase tracking-widest">
              Empirical Benchmarks & Validation
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-editorial-text tracking-tight">
            Performance & Evaluation
          </h2>

          {project.verifiedMetrics ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-2">
              {project.verifiedMetrics.map((m) => (
                <div
                  key={m.label}
                  className="p-6 border border-editorial-border bg-editorial-surface flex flex-col justify-between"
                >
                  <span className="font-serif text-4xl text-editorial-text mb-2">{m.value}</span>
                  <div>
                    <span className="font-mono text-xs uppercase text-editorial-accent block">
                      {m.label}
                    </span>
                    {m.description && (
                      <span className="font-sans text-xs text-editorial-muted block mt-1">
                        {m.description}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 border border-editorial-accent/30 bg-editorial-accent/5 my-2">
              <span className="font-mono text-xs text-editorial-accent uppercase tracking-wider block mb-2">
                Honesty Rule / Metrics Pending Verification
              </span>
              <p className="font-mono text-xs text-editorial-accent/90">
                {project.caseStudyPlaceholder || '[ADD: result after I provide it]'}
              </p>
              <p className="text-xs text-editorial-muted mt-2 font-sans">
                In strict accordance with honesty principles, no speculative or synthetic scores are reported for this project until verified benchmarks are provided.
              </p>
            </div>
          )}
        </SectionReveal>

        {/* 04. Engineering Challenges & Mitigations */}
        <SectionReveal className="flex flex-col gap-4 border-t border-editorial-border pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-editorial-accent uppercase tracking-widest">04</span>
            <span className="w-4 h-[1px] bg-editorial-border" />
            <span className="font-mono text-xs text-editorial-muted uppercase tracking-widest">
              Engineering Challenges & Mitigations
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-editorial-text tracking-tight">
            Technical Friction Points
          </h2>

          <ul className="flex flex-col gap-3 my-2">
            {project.keyChallenges.map((challenge, idx) => (
              <li
                key={idx}
                className="p-5 border border-editorial-border/60 bg-editorial-surface text-sm text-editorial-muted font-sans flex items-start gap-3 leading-relaxed"
              >
                <AlertCircle size={16} className="text-editorial-accent shrink-0 mt-0.5" />
                <span className="text-editorial-text">{challenge}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>

        {/* 05. Honest Limitations */}
        <SectionReveal className="flex flex-col gap-4 border-t border-editorial-border pt-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-editorial-accent uppercase tracking-widest">05</span>
            <span className="w-4 h-[1px] bg-editorial-border" />
            <span className="font-mono text-xs text-editorial-muted uppercase tracking-widest">
              System Limitations & Honesty Scope
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-editorial-text tracking-tight">
            Boundary Conditions
          </h2>

          <div className="p-6 border border-editorial-border bg-editorial-surface my-2">
            <ul className="flex flex-col gap-3">
              {project.limitations.map((limit, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm text-editorial-muted font-sans flex items-start gap-3 leading-relaxed"
                >
                  <AlertTriangle size={14} className="text-editorial-muted shrink-0 mt-1" />
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>

      {/* Pagination Footer: Next / Previous Project Navigation */}
      <nav
        aria-label="Case Study Pagination"
        className="pt-12 border-t border-editorial-border grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {prevProject ? (
          <Link
            to={`/project/${prevProject.id}`}
            className="p-6 border border-editorial-border bg-editorial-surface hover:border-editorial-accent/40 transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-editorial-muted uppercase mb-2">
              <ArrowLeft size={13} className="text-editorial-accent group-hover:-translate-x-1 transition-transform" />
              <span>Previous Case Study</span>
            </div>
            <span className="font-serif text-2xl text-editorial-text group-hover:text-editorial-accent transition-colors">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextProject && (
          <Link
            to={`/project/${nextProject.id}`}
            className="p-6 border border-editorial-border bg-editorial-surface hover:border-editorial-accent/40 transition-all flex flex-col justify-between items-end text-right group sm:col-start-2"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-editorial-muted uppercase mb-2">
              <span>Next Case Study</span>
              <ArrowRight size={13} className="text-editorial-accent group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="font-serif text-2xl text-editorial-text group-hover:text-editorial-accent transition-colors">
              {nextProject.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
};
