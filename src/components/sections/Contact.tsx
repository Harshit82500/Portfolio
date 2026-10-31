import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { personalInfo } from '../../data/personalInfo';
import { Button } from '../ui/Button';
import { Send, CheckCircle2, AlertTriangle, ArrowUpRight, Mail } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { DeviconLinkedIn } from '../icons/DeviconLinkedIn';
import { SectionReveal } from '../motion/SectionReveal';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Hidden anti-spam trap
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmittedAt, setLastSubmittedAt] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check: if filled, quietly abort (bot trap)
    if (formData.honeypot) {
      console.warn('Bot detected via honeypot.');
      setStatus('success');
      return;
    }

    // 2. Client-side rate limit: 60 seconds between submissions
    const now = Date.now();
    const storedLast = localStorage.getItem('last_contact_submit');
    const lastTime = storedLast ? parseInt(storedLast, 10) : lastSubmittedAt;
    if (now - lastTime < 60000) {
      const remaining = Math.ceil((60000 - (now - lastTime)) / 1000);
      setStatus('error');
      setErrorMessage(`Please wait ${remaining} seconds before submitting another message.`);
      return;
    }

    // 3. Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // 4. EmailJS Dispatch
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // In local development without configured API keys, simulate successful mock dispatch
      console.info('EmailJS environment variables not set. Simulating development dispatch.');
      setTimeout(() => {
        setStatus('success');
        localStorage.setItem('last_contact_submit', now.toString());
        setLastSubmittedAt(now);
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      }, 1000);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
        },
        publicKey
      );

      setStatus('success');
      localStorage.setItem('last_contact_submit', now.toString());
      setLastSubmittedAt(now);
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err: any) {
      console.error('EmailJS submission error:', err);
      setStatus('error');
      setErrorMessage('Failed to send transmission. Please email directly or try again later.');
    }
  };

  return (
    <section id="contact" aria-label="Contact Transmission" className="scroll-mt-24">
      <SectionHeader
        number="07"
        label="Direct Transmission"
        headline="Initiate a dialogue or discuss opportunities."
        description="Available for data science positions, quantitative analytics consultations, and machine learning collaborations."
      />

      <SectionReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Dossier & Direct Channels (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF4B2B] block mb-4">
              Direct Channels
            </span>
            <p className="text-base text-[#8A857B] font-sans leading-relaxed mb-8">
              Whether you have an inquiry regarding predictive modeling, dataset architecture, or potential career roles, feel free to send a direct message.
            </p>

            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="p-4 border border-[rgba(236,231,221,0.12)] bg-[#141311]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8A857B] uppercase mb-1">
                  <Mail size={13} className="text-[#FF4B2B]" />
                  <span>Electronic Mail</span>
                </div>
                {personalInfo.email.startsWith('[ADD') ? (
                  <span className="font-mono text-xs text-[#FF4B2B]/90">{personalInfo.email}</span>
                ) : (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-serif text-lg text-[#ECE7DD] hover:text-[#FF4B2B] transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                )}
              </div>

              {/* GitHub */}
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-[rgba(236,231,221,0.12)] bg-[#141311] hover:border-[rgba(236,231,221,0.28)] transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8A857B] uppercase mb-1">
                    <SiGithub size={13} color="#FF4B2B" />
                    <span>Version Control</span>
                  </div>
                  <span className="font-serif text-lg text-[#ECE7DD] group-hover:text-[#FF4B2B] transition-colors">
                    github.com/Harshit82500
                  </span>
                </div>
                <ArrowUpRight size={16} className="text-[#8A857B] group-hover:text-[#FF4B2B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* LinkedIn */}
              <div className="p-4 border border-[rgba(236,231,221,0.12)] bg-[#141311]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8A857B] uppercase mb-1">
                  <DeviconLinkedIn size={14} color="#FF4B2B" />
                  <span>Professional Network</span>
                </div>
                {personalInfo.linkedinUrl.startsWith('[ADD') ? (
                  <span className="font-mono text-xs text-[#FF4B2B]/90">{personalInfo.linkedinUrl}</span>
                ) : (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-lg text-[#ECE7DD] hover:text-[#FF4B2B] transition-colors inline-flex items-center gap-1"
                  >
                    <span>View LinkedIn Profile</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(236,231,221,0.08)] text-xs font-mono text-[#8A857B]">
            <span>ENCRYPTION & PRIVACY: No telemetry cookies or trackers are embedded.</span>
          </div>
        </div>

        {/* Right Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 border border-[rgba(236,231,221,0.14)] bg-[#141311] flex flex-col gap-6"
            noValidate
          >
            {/* Hidden honeypot field (anti-spam bot trap) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Leave blank</label>
              <input
                id="website"
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-mono text-xs uppercase tracking-wider text-[#8A857B]"
                >
                  Your Name <span className="text-[#FF4B2B]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  className="px-4 py-3 bg-[#0F0E0C] border border-[rgba(236,231,221,0.14)] text-[#ECE7DD] placeholder-[#5A564F] text-sm font-sans focus-visible:outline-none focus-visible:border-[#FF4B2B]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-xs uppercase tracking-wider text-[#8A857B]"
                >
                  Your Email <span className="text-[#FF4B2B]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. jane@organization.com"
                  className="px-4 py-3 bg-[#0F0E0C] border border-[rgba(236,231,221,0.14)] text-[#ECE7DD] placeholder-[#5A564F] text-sm font-sans focus-visible:outline-none focus-visible:border-[#FF4B2B]"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="subject"
                className="font-mono text-xs uppercase tracking-wider text-[#8A857B]"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Data Scientist Role Inquiry / Project Collaboration"
                className="px-4 py-3 bg-[#0F0E0C] border border-[rgba(236,231,221,0.14)] text-[#ECE7DD] placeholder-[#5A564F] text-sm font-sans focus-visible:outline-none focus-visible:border-[#FF4B2B]"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-mono text-xs uppercase tracking-wider text-[#8A857B]"
              >
                Message <span className="text-[#FF4B2B]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Detail the scope of inquiry, project requirements, or relevant timeline..."
                className="px-4 py-3 bg-[#0F0E0C] border border-[rgba(236,231,221,0.14)] text-[#ECE7DD] placeholder-[#5A564F] text-sm font-sans focus-visible:outline-none focus-visible:border-[#FF4B2B] resize-none"
              />
            </div>

            {/* Status alerts */}
            {status === 'error' && (
              <div
                role="alert"
                aria-live="assertive"
                className="p-3 border border-red-500/40 bg-red-950/20 text-red-400 text-xs font-mono flex items-center gap-2"
              >
                <AlertTriangle size={14} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {status === 'success' && (
              <div
                role="alert"
                aria-live="polite"
                className="p-4 border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 text-xs font-mono flex items-center gap-2"
              >
                <CheckCircle2 size={16} className="shrink-0" />
                <span>Message delivered successfully. Thank you for reaching out.</span>
              </div>
            )}

            {/* Submit button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                magnetic
                disabled={status === 'loading'}
                icon={<Send size={14} />}
                className="w-full sm:w-auto"
              >
                {status === 'loading' ? 'Transmitting...' : 'Dispatch Message'}
              </Button>
            </div>
          </form>
        </div>
      </SectionReveal>
    </section>
  );
};
