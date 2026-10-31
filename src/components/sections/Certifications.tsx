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
        {certificationsData.map((cert) => {
          return (
            <div
              key={cert.id}
              className="p-6 border border-[rgba(236,231,221,0.12)] bg-[#141311] flex flex-col justify-between min-h-[220px] group hover:border-[rgba(236,231,221,0.28)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#8A857B]">
                  <span>{cert.issueDate}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 size={12} />
                      <span>Verified Credential</span>
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-[#ECE7DD] mb-1 group-hover:text-[#FF4B2B] transition-colors">
                  {cert.name}
                </h3>

                <p className="font-mono text-xs text-[#8A857B] uppercase tracking-wider mb-4">
                  Issuer: <span className="text-[#ECE7DD]">{cert.issuer}</span>
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skillsCovered.map((s) => (
                    <Badge key={s} variant="subtle" className="text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(236,231,221,0.06)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-[#8A857B]">
                  <ShieldCheck size={13} className="text-[#FF4B2B]" />
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
