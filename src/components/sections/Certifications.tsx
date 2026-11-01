import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { certificationsData } from '../../data/certifications';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { SectionReveal } from '../motion/SectionReveal';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" aria-label="Certifications & Credentials" className="scroll-mt-24">
      <SectionHeader
        number="06"
        label="Credentials & Certifications"
        headline="Continuous specialization & verified credentials."
        description="Official professional certifications and quantitative simulations from Oracle, JPMorgan Chase, Deloitte, and Medi-Caps University."
      />

      <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificationsData.map((cert, index) => {
          return (
            <div
              key={cert.id}
              data-scroll
              data-scroll-speed={index % 2 === 0 ? "0.15" : "-0.15"}
              className="p-6 border border-editorial-border bg-editorial-surface flex flex-col justify-between min-h-[220px] group hover:border-editorial-accent/40 transition-all loco-skew"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-editorial-muted">
                  <span>{cert.issueDate}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center gap-1 text-editorial-accent">
                      <CheckCircle2 size={12} />
                      <span>Verified Credential</span>
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-editorial-text mb-1 group-hover:text-editorial-accent transition-colors">
                  {cert.name}
                </h3>

                <p className="font-mono text-xs text-editorial-muted uppercase tracking-wider mb-4">
                  Issuer: <span className="text-editorial-text">{cert.issuer}</span>
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skillsCovered.map((s) => (
                    <Badge key={s} variant="subtle" className="text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-editorial-border/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-editorial-muted">
                  <ShieldCheck size={13} className="text-editorial-accent" />
                  <span>
                    {cert.credentialId
                      ? `ID: ${cert.credentialId}`
                      : `Code: ${cert.verificationCode}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </SectionReveal>
    </section>
  );
};
