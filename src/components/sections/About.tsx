import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { personalInfo } from '../../data/personalInfo';
import { SectionReveal } from '../motion/SectionReveal';

export const About: React.FC = () => {
  return (
    <section id="about" aria-label="About Section" className="scroll-mt-24">
      <SectionHeader
        number="01"
        label="Philosophy & Approach"
        headline="Translating raw ambiguity into verifiable, statistical clarity."
        description="A quantitative mindset anchored in machine learning engineering, structured database modeling, and uncompromising data ethics."
      />

      {/* Asymmetric 12-Column Grid */}
      <SectionReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Narrative Columns (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-[#ECE7DD]/90 font-sans leading-relaxed text-base sm:text-lg">
          <p className="font-serif italic text-2xl sm:text-3xl text-[#ECE7DD] leading-snug border-l-2 border-[#FF4B2B] pl-6 my-2">
            "Real-world data is inherently noisy and imperfect. The goal isn't to force an illusion of perfection, but to measure and illuminate reality with utmost precision."
          </p>

          <p className="text-[#8A857B] text-base leading-relaxed">
            I approach data analysis and applied machine learning from first principles. Rather than treating models as opaque black boxes or optimizing arbitrary loss functions in isolation, I focus on the end-to-end telemetry: understanding the exact data generation process, diagnosing feature leakage, handling edge-case distributions, and engineering interpretable architectures.
          </p>

          <p className="text-[#8A857B] text-base leading-relaxed">
            My background spans building calibrated predictive classifiers (such as student churn triage models in higher education), fine-tuning transformer models for browser-level deceptive pattern detection, and building automated data extraction pipelines.
          </p>

          {/* Core Working Tenets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-4 border-t border-[rgba(236,231,221,0.08)]">
            <div className="p-5 border border-[rgba(236,231,221,0.12)] bg-[#141311]">
              <span className="font-mono text-[11px] text-[#FF4B2B] uppercase tracking-widest block mb-2">
                01 / RIGOR
              </span>
              <h3 className="font-serif text-lg text-[#ECE7DD] mb-1">
                Zero Guesswork
              </h3>
              <p className="text-xs text-[#8A857B] leading-relaxed">
                Hypotheses verified with statistical testing and reproducible notebooks.
              </p>
            </div>

            <div className="p-5 border border-[rgba(236,231,221,0.12)] bg-[#141311]">
              <span className="font-mono text-[11px] text-[#FF4B2B] uppercase tracking-widest block mb-2">
                02 / ARCHITECTURE
              </span>
              <h3 className="font-serif text-lg text-[#ECE7DD] mb-1">
                Clean Pipelines
              </h3>
              <p className="text-xs text-[#8A857B] leading-relaxed">
                From ingestion to evaluation, every data transformation step is deterministic.
              </p>
            </div>

            <div className="p-5 border border-[rgba(236,231,221,0.12)] bg-[#141311]">
              <span className="font-mono text-[11px] text-[#FF4B2B] uppercase tracking-widest block mb-2">
                03 / ETHICS
              </span>
              <h3 className="font-serif text-lg text-[#ECE7DD] mb-1">
                Full Honesty
              </h3>
              <p className="text-xs text-[#8A857B] leading-relaxed">
                Clear reporting of model confidence intervals, recall limits, and limitations.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Dossier (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 border border-[rgba(236,231,221,0.14)] bg-[#141311]">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#FF4B2B] block mb-4">
              Profile Dossier
            </span>
            <dl className="flex flex-col gap-4 text-xs font-mono">
              <div className="flex justify-between pb-3 border-b border-[rgba(236,231,221,0.08)]">
                <dt className="text-[#8A857B] uppercase">Discipline</dt>
                <dd className="text-[#ECE7DD] text-right">Data Analysis & ML</dd>
              </div>
              <div className="flex justify-between pb-3 border-b border-[rgba(236,231,221,0.08)]">
                <dt className="text-[#8A857B] uppercase">Location</dt>
                <dd className="text-[#ECE7DD] text-right">{personalInfo.location}</dd>
              </div>
              <div className="flex justify-between pb-3 border-b border-[rgba(236,231,221,0.08)]">
                <dt className="text-[#8A857B] uppercase">Primary Languages</dt>
                <dd className="text-[#ECE7DD] text-right">Python, SQL, C++</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#8A857B] uppercase">Current Focus</dt>
                <dd className="text-[#ECE7DD] text-right">Predictive Modeling & NLP</dd>
              </div>
            </dl>
          </div>

          <div className="p-6 border border-[rgba(236,231,221,0.12)] bg-[#0F0E0C]">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8A857B] block mb-2">
              Note on Accuracy & Claims
            </span>
            <p className="text-xs font-sans text-[#8A857B] leading-relaxed">
              Every project and skill listed in this portfolio is grounded in actual codebase commits and verifiable artifacts. Missing information or ongoing studies are kept as explicit placeholders.
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};
