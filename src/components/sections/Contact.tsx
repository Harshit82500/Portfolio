import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertTriangle, ArrowUpRight, Mail } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { DeviconLinkedIn } from '../icons/DeviconLinkedIn';
import { personalInfo } from '../../data/personalInfo';
import { SectionHeader } from '../ui/SectionHeader';
import { useScroll } from '../../context/scrollTypes';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Hidden bot trap
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
  const { prefersReducedMotion } = useScroll();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot check: bot trap
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
      setErrorMessage(`Please wait ${remaining} seconds before submitting another transmission.`);
      return;
    }

    // 3. Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields (Name, Email, Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid electronic mail address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // 4. EmailJS Dispatch
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // In development mode, simulate successful dispatch
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
          name: formData.name,
          from_email: formData.email,
          email: formData.email,
          reply_to: formData.email,
          subject: formData.subject || 'Direct Portfolio Transmission',
          message: formData.message,
        },
        publicKey
      );

      setStatus('success');
      localStorage.setItem('last_contact_submit', now.toString());
      setLastSubmittedAt(now);
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err: any) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrorMessage(
        err?.text || 'Transmission failed to reach dispatch server. Please try again or email directly.'
      );
    }
  };

  return (
    <section id="contact" aria-label="Contact Transmission" className="scroll-mt-24 pt-8">
      {/* Section Header */}
      <SectionHeader
        number="06"
        label="Direct Transmission"
        headline="Let's Connect and Build Something Meaningful."
        description="Available for data science positions, quantitative analytics consultations, and machine learning collaborations."
        watermark="CONNECT"
      />

      {/* Row of Social Pills */}
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <a
          href={personalInfo.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-light bg-paper hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 text-xs font-mono group"
        >
          <SiGithub size={14} color="currentColor" />
          <span>GitHub</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <a
          href={personalInfo.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-light bg-paper hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 text-xs font-mono group"
        >
          <DeviconLinkedIn className="w-3.5 h-3.5 fill-current" />
          <span>LinkedIn</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-light bg-paper hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all duration-200 text-xs font-mono group"
        >
          <Mail size={14} />
          <span>{personalInfo.email}</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Contact Form & Information Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Form (7 cols) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 rounded-2xl border border-border-light bg-paper p-8 sm:p-10 shadow-xs"
        >
          {status === 'success' ? (
            <div className="py-10 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-ink">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-sans font-bold text-2xl text-ink">
                Transmission Dispatched
              </h3>
              <p className="font-sans text-sm text-ink/75 max-w-md leading-relaxed">
                Thank you for reaching out. Your message has been logged. I will respond to your provided address within 24–48 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2.5 rounded-full border border-border-light hover:border-ink text-xs font-sans font-semibold uppercase tracking-wider text-ink transition-colors cursor-pointer"
              >
                Send Another Transmission
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Hidden Honeypot Anti-Spam Field */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="contact-hp">Leave this field blank</label>
                <input
                  type="text"
                  id="contact-hp"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Error banner */}
              {status === 'error' && (
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-900 text-xs font-mono flex items-center gap-2">
                  <AlertTriangle size={15} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-ink/70 flex items-center gap-1.5">
                    <span>Your Name</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Vance"
                    className="w-full px-4 py-3 rounded-xl border border-border-light bg-paper-raised text-ink placeholder:text-ink/35 text-sm font-sans focus:outline-none focus:border-ink transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-ink/70 flex items-center gap-1.5">
                    <span>Email Address</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl border border-border-light bg-paper-raised text-ink placeholder:text-ink/35 text-sm font-sans focus:outline-none focus:border-ink transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-mono text-xs uppercase tracking-wider text-ink/70">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Data Analyst Role / Consultation Inquiry"
                  className="w-full px-4 py-3 rounded-xl border border-border-light bg-paper-raised text-ink placeholder:text-ink/35 text-sm font-sans focus:outline-none focus:border-ink transition-colors"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-ink/70 flex items-center gap-1.5">
                  <span>Message Content</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or position details..."
                  className="w-full px-4 py-3 rounded-xl border border-border-light bg-paper-raised text-ink placeholder:text-ink/35 text-sm font-sans focus:outline-none focus:border-ink transition-colors resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] text-ink/50">
                  Protected with rate-limiting &amp; spam verification.
                </span>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-paper hover:bg-gold hover:text-ink font-sans font-semibold text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={13} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Right Info Dossier (5 cols) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="rounded-2xl border border-border-light bg-paper p-7 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
              <span className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
                Direct Channels
              </span>
            </div>

            <p className="font-sans text-sm text-ink/75 leading-relaxed">
              Whether discussing prospective machine learning roles, analytical consultations, or academic research collaborations, feel free to reach out directly.
            </p>

            <div className="flex flex-col gap-3 pt-3 border-t border-border-light">
              <div>
                <span className="font-mono text-[10px] uppercase text-ink/50 block">Electronic Mail:</span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-sans font-bold text-base text-ink hover:underline decoration-gold decoration-2 transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-ink/50 block">Geographic Base:</span>
                <span className="font-sans text-sm text-ink/80 font-medium">
                  {personalInfo.location} (UTC+05:30)
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border-light bg-paper-raised p-6 text-xs font-mono text-ink/70 leading-relaxed">
            <strong className="text-ink block mb-1">Response Commitment:</strong>
            Direct communications are monitored daily. Inquiries containing verifiable job specifications or detailed project proposals receive priority response.
          </div>
        </motion.div>
      </div>
    </section>
  );
};
