import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { certificationsData } from '../../data/certifications';
import { ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { SectionReveal } from '../motion/SectionReveal';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" aria-label="Certifications & Credentials" className="scroll-mt-24">
      <SectionHeader
        number="06"
        label="Credentials & Certifications"
        headline="Continuous specialization & professional learning."
        description="External certificates and guided coursework. In accordance with honesty guidelines, unconfirmed entries are clearly designated."
      />

      <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificationsData.map((cert) => {
          const isPending = cert.name.startsWith('[ADD');

          return (
            <div
              key={cert.id}
              className="p-6 border border-[rgba(236,231,221,0.12)] bg-[#141311] flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#8A857B]">
                  <span>{cert.issueDate}</span>
                  <div className="flex items-center gap-1.5">
                    {cert.isVerified ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 size={12} />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#FF4B2B]">
                        <Clock size={12} />
                        <span>Placeholder</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 className={`font-serif text-2xl text-[#ECE7DD] mb-1 ${isPending ? 'font-mono text-sm text-[#FF4B2B]/90' : ''}`}>
                  {cert.name}
                </h3>

                <p className="font-mono text-xs text-[#8A857B] uppercase tracking-wider mb-4">
                  Issuer: {cert.issuer}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skillsCovered.map((s) => (
                    <Badge key={s} variant="subtle" className="text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(236,231,221,0.06)] flex items-center justify-between text-xs font-mono">
                {cert.credentialUrl && !cert.credentialUrl.startsWith('[ADD') ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#ECE7DD] hover:text-[#FF4B2B] transition-colors"
                  >
                    <span>View Credential</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-[#5A564F]">{cert.credentialUrl}</span>
                )}
              </div>
            </div>
          );
        })}
      </SectionReveal>
    </section>
  );
};
