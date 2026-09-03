import React, { useState, useEffect, useRef } from 'react';
import { useEmail } from '../context/EmailContext';
import { 
  Mail, 
  Send, 
  X, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

const QUICK_EMAIL_TEMPLATES = [
  {
    label: 'Spiritual Consultation',
    subject: 'Spiritual Consultation Inquiry - Doctor Baba Mukisa',
    body: 'Hello Doctor Baba Mukisa,\n\nI am contacting you from your website to schedule a personal spiritual consultation.\n\nMy name:\nLocation:\nMy primary situation / questions:\n\nLooking forward to your guidance.'
  },
  {
    label: 'Relationship Reconciliation',
    subject: 'Relationship Reconciliation Guidance - Doctor Baba Mukisa',
    body: 'Hello Doctor Baba Mukisa,\n\nI am reaching out regarding relationship reconciliation guidance.\n\nMy name:\nPartner name:\nOur current situation:\n\nThank you for your assistance.'
  },
  {
    label: 'Herbal Cleansing & Shielding',
    subject: 'Inquiry on Traditional Herbal Cleansing & Spiritual Shielding',
    body: 'Hello Doctor Baba Mukisa,\n\nI am interested in learning more about your traditional herbal cleansing, home protection, and spiritual shielding practices.\n\nPlease let me know the recommended consultation process.'
  },
  {
    label: 'Urgent Consultation',
    subject: 'URGENT: Spiritual Consultation Request - Doctor Baba Mukisa',
    body: 'Hello Doctor Baba Mukisa,\n\nI have an urgent personal matter and would deeply appreciate your prompt spiritual advice and consultation.\n\nPlease contact me at your earliest convenience.\n\nMy phone number:\nMy name:'
  }
];

export const EmailModal: React.FC = () => {
  const { 
    isOpen, 
    hasSent,
    recipientEmail, 
    subject, 
    body, 
    originalSubject, 
    originalBody, 
    closeEmail, 
    setSubject, 
    setBody, 
    resetEmail, 
    launchEmailProvider 
  } = useEmail();

  const [copied, setCopied] = useState(false);
  const subjectInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (subjectInputRef.current) {
          subjectInputRef.current.focus();
        }
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeEmail();
        } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          launchEmailProvider('default');
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, closeEmail, launchEmailProvider]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  const isModified = subject.trim() !== originalSubject.trim() || body.trim() !== originalBody.trim();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm transition-all duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeEmail();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
    >
      <div 
        id="email-composer-modal"
        className="relative w-full max-w-xl bg-slate-900 border-t sm:border border-amber-500/30 rounded-t-3xl sm:rounded-2xl shadow-2xl shadow-amber-950/60 overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[88vh] animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-2 duration-200"
      >
        {/* Mobile Pull Handle Indicator */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900">
          <div className="w-10 h-1 rounded-full bg-slate-600/80" />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-slate-900 border-b border-amber-500/20 px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-900/70 border-2 border-amber-400/80 flex items-center justify-center text-amber-300 font-serif font-bold text-lg shadow-md shrink-0">
              <Mail className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 id="email-modal-title" className="text-base sm:text-lg font-bold text-white font-serif tracking-wide">
                Email Doctor Baba Mukisa
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-amber-300 font-mono select-all">
                  {recipientEmail}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-[11px] text-amber-400 hover:text-amber-200 flex items-center gap-1 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                  title="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            id="close-email-modal"
            type="button"
            onClick={closeEmail}
            className="text-slate-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
            aria-label="Close email window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto overscroll-contain flex-1">
          
          {/* Post-send confirmation notice (keeps main window open) */}
          {hasSent ? (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm space-y-1.5 animate-in fade-in zoom-in-95 duration-200 shadow-inner">
              <div className="flex items-center gap-2 font-bold text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Your Email Service Provider Opened!</span>
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed pl-6">
                Your email draft with Doctor Baba Mukisa's address (<strong className="font-mono text-white">{recipientEmail}</strong>) is ready to send in your email client. This window remains open for your reference.
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Choose your email service below:</span> You can edit the subject and message before launching your preferred email provider (Gmail, Outlook, Yahoo, or your default mail app).
              </div>
            </div>
          )}

          {/* Quick subject & body presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select inquiry template:
            </label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {QUICK_EMAIL_TEMPLATES.map((tmpl) => {
                const isSelected = subject === tmpl.subject;
                return (
                  <button
                    key={tmpl.label}
                    type="button"
                    onClick={() => {
                      setSubject(tmpl.subject);
                      setBody(tmpl.body);
                    }}
                    className={`text-xs px-3 py-1.5 min-h-[36px] rounded-lg border transition-all text-left flex items-center cursor-pointer ${
                      isSelected
                        ? 'bg-amber-900/60 border-amber-400 text-amber-200 font-semibold shadow-sm ring-1 ring-amber-500/30'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-amber-500/40 active:scale-[0.98]'
                    }`}
                  >
                    {tmpl.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="email-subject-input" className="text-xs font-semibold text-slate-200">
                Email Subject:
              </label>
              {isModified && (
                <button
                  type="button"
                  onClick={resetEmail}
                  className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors min-h-[30px] px-1 cursor-pointer"
                  title="Reset to default text"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset text
                </button>
              )}
            </div>
            <input
              id="email-subject-input"
              ref={subjectInputRef}
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject of your spiritual inquiry..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-sans"
            />
          </div>

          {/* Message Body Field */}
          <div>
            <label htmlFor="email-body-input" className="block text-xs font-semibold text-slate-200 mb-1">
              Message Body:
            </label>
            <div className="relative">
              <textarea
                id="email-body-input"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                placeholder="Write your email message to Doctor Baba Mukisa..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-y leading-relaxed font-sans"
              />
              <div className="flex items-center justify-between mt-1 px-1">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Tip: Select your provider below to launch your email app
                </span>
                <span className="text-[11px] text-slate-400 ml-auto">
                  {body.length} characters
                </span>
              </div>
            </div>
          </div>

          {/* Choose Your Service Provider Section */}
          <div className="pt-1">
            <label className="block text-xs font-bold text-amber-300 mb-2">
              Send directly with your email service provider:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Gmail Button */}
              <button
                type="button"
                id="send-via-gmail-btn"
                onClick={() => launchEmailProvider('gmail')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 hover:border-red-500/60 transition-all text-slate-100 group min-h-[58px] cursor-pointer shadow-sm active:scale-[0.98]"
                title="Compose directly in Gmail (browser / app)"
              >
                <div className="w-6 h-6 rounded-md bg-red-600/20 text-red-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xs">G</span>
                </div>
                <span className="text-xs font-semibold">Gmail</span>
                <span className="text-[10px] text-slate-400">Google Web / App</span>
              </button>

              {/* Outlook / Hotmail Button */}
              <button
                type="button"
                id="send-via-outlook-btn"
                onClick={() => launchEmailProvider('outlook')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 hover:border-blue-500/60 transition-all text-slate-100 group min-h-[58px] cursor-pointer shadow-sm active:scale-[0.98]"
                title="Compose directly in Outlook / Hotmail"
              >
                <div className="w-6 h-6 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xs">O</span>
                </div>
                <span className="text-xs font-semibold">Outlook</span>
                <span className="text-[10px] text-slate-400">Hotmail / MS 365</span>
              </button>

              {/* Yahoo Mail Button */}
              <button
                type="button"
                id="send-via-yahoo-btn"
                onClick={() => launchEmailProvider('yahoo')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 hover:border-purple-500/60 transition-all text-slate-100 group min-h-[58px] cursor-pointer shadow-sm active:scale-[0.98]"
                title="Compose directly in Yahoo Mail"
              >
                <div className="w-6 h-6 rounded-md bg-purple-600/20 text-purple-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <span className="font-bold text-xs">Y!</span>
                </div>
                <span className="text-xs font-semibold">Yahoo Mail</span>
                <span className="text-[10px] text-slate-400">Yahoo Web / App</span>
              </button>

              {/* Default Mail App (Apple Mail / Windows Mail / Smartphone Client) */}
              <button
                type="button"
                id="send-via-default-mail-btn"
                onClick={() => launchEmailProvider('default')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-amber-950/50 hover:bg-amber-900/60 border border-amber-600/60 hover:border-amber-400 transition-all text-amber-200 group min-h-[58px] cursor-pointer shadow-sm active:scale-[0.98]"
                title="Open in your default email application"
              >
                <div className="w-6 h-6 rounded-md bg-amber-600/20 text-amber-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold">Default Mail</span>
                <span className="text-[10px] text-amber-300/80">Apple / Win / Phone</span>
              </button>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Sends directly from your personal email account to Doctor Baba Mukisa's verified inbox.</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 border-t border-slate-800 px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={closeEmail}
            className="px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
          >
            {hasSent ? 'Done / Close' : 'Cancel'}
          </button>

          <button
            type="button"
            id="primary-send-email-btn"
            onClick={() => launchEmailProvider('default')}
            className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-slate-950 font-bold px-5 sm:px-6 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-950 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Open in Email App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
