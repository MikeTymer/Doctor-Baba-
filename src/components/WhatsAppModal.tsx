import React, { useEffect, useRef } from 'react';
import { useWhatsApp } from '../context/WhatsAppContext';
import { 
  MessageCircle, 
  Send, 
  X, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Check
} from 'lucide-react';

const QUICK_TOPICS = [
  { label: 'Relationship Reconciliation', text: 'Hello Doctor Baba Mukisa, I would like guidance regarding relationship reconciliation and emotional harmony.' },
  { label: 'Spiritual Consultation', text: 'Hello Doctor Baba Mukisa, I am reaching out for an authentic traditional spiritual consultation.' },
  { label: 'Ancestral Guidance', text: 'Hello Doctor Baba Mukisa, I am seeking ancestral spiritual advice for clarity and life momentum.' },
  { label: 'Spiritual Cleansing', text: 'Hello Doctor Baba Mukisa, I am inquiring about traditional herbal cleansing and spiritual shielding.' },
  { label: 'Urgent Consultation', text: 'Hello Doctor Baba Mukisa, I need urgent personal guidance regarding a critical matter.' },
];

export const WhatsAppModal: React.FC = () => {
  const { 
    isOpen, 
    hasSent,
    message, 
    originalMessage, 
    recipientNumber, 
    closeWhatsApp, 
    setMessage, 
    resetMessage, 
    sendMessage 
  } = useWhatsApp();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when modal opens & handle Escape key
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(
            textareaRef.current.value.length,
            textareaRef.current.value.length
          );
        }
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeWhatsApp();
        } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          sendMessage();
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
  }, [isOpen, closeWhatsApp, sendMessage]);

  if (!isOpen) return null;

  const isModified = message.trim() !== originalMessage.trim();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm transition-all duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeWhatsApp();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
    >
      <div 
        id="whatsapp-composer-modal"
        className="relative w-full max-w-lg bg-slate-900 border-t sm:border border-amber-500/30 rounded-t-3xl sm:rounded-2xl shadow-2xl shadow-emerald-950/60 overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[88vh] animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-2 duration-200"
      >
        {/* Mobile Pull Handle Indicator */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900">
          <div className="w-10 h-1 rounded-full bg-slate-600/80" />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border-b border-amber-500/20 px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-serif font-bold text-base sm:text-lg border-2 border-emerald-400/80 shadow-md">
                BM
              </div>
              <span 
                className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" 
                title="Available on WhatsApp"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 id="whatsapp-modal-title" className="text-base sm:text-lg font-bold text-white font-serif tracking-wide">
                  Doctor Baba Mukisa
                </h3>
                <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Practitioner" />
              </div>
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                WhatsApp: +{recipientNumber}
              </p>
            </div>
          </div>

          <button
            id="close-whatsapp-modal"
            type="button"
            onClick={closeWhatsApp}
            className="text-slate-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
            aria-label="Close message window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with smooth responsive scrolling */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto overscroll-contain flex-1">
          
          {/* Post-send confirmation notice (Keeps the main window open) */}
          {hasSent ? (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm space-y-1.5 animate-in fade-in zoom-in-95 duration-200 shadow-inner">
              <div className="flex items-center gap-2 font-bold text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp Opened In New Tab!</span>
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed pl-6">
                Your message is ready to send to Doctor Baba Mukisa. This window remains open so you can edit, send additional details, or keep your place on the site.
              </p>
              <div className="pl-6 pt-1">
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-emerald-100 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Didn't open? Click here to launch WhatsApp again
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Customize your message:</span> You can edit or add personal details below before opening WhatsApp. This window will stay open for your reference.
              </div>
            </div>
          )}

          {/* Quick context topic presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select or switch inquiry topic:
            </label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {QUICK_TOPICS.map((topic) => {
                const isSelected = message === topic.text;
                return (
                  <button
                    key={topic.label}
                    type="button"
                    onClick={() => setMessage(topic.text)}
                    className={`text-xs px-3 py-2 min-h-[38px] rounded-lg border transition-all text-left flex items-center cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-900/70 border-emerald-400 text-emerald-200 font-semibold shadow-sm ring-1 ring-emerald-500/30'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-amber-500/40 active:scale-[0.98]'
                    }`}
                  >
                    {topic.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Textarea editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="whatsapp-message-input" className="text-xs font-semibold text-slate-200">
                Message Content:
              </label>
              {isModified && (
                <button
                  type="button"
                  onClick={resetMessage}
                  className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors min-h-[32px] px-1 cursor-pointer"
                  title="Restore button's initial contextual message"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset to original
                </button>
              )}
            </div>

            <div className="relative">
              <textarea
                id="whatsapp-message-input"
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Write your personal message to Doctor Baba Mukisa..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-y leading-relaxed font-sans"
              />
              <div className="flex items-center justify-between mt-1 px-1">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Tip: Press <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-slate-700 font-mono">⌘/Ctrl + Enter</kbd> to send
                </span>
                <span className="text-[11px] text-slate-400 ml-auto">
                  {message.length} characters
                </span>
              </div>
            </div>
          </div>

          {/* Security & Confidentiality assurance */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>End-to-end encrypted direct connection. No personal data is stored on this website.</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-950 border-t border-slate-800 px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={closeWhatsApp}
            className="px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
          >
            {hasSent ? 'Done / Close' : 'Cancel'}
          </button>

          <button
            id="send-whatsapp-btn"
            type="button"
            onClick={() => sendMessage()}
            disabled={!message.trim()}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-5 sm:px-6 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-950 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-100" />
            <span>{hasSent ? 'Re-send / Send Update' : 'Send on WhatsApp'}</span>
            <Send className="w-3.5 h-3.5 text-emerald-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
