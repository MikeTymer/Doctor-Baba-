import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SITE_INFO } from '../data/initialData';

interface EmailContextType {
  isOpen: boolean;
  hasSent: boolean;
  recipientEmail: string;
  subject: string;
  body: string;
  originalSubject: string;
  originalBody: string;
  openEmail: (initialSubject?: string, initialBody?: string) => void;
  closeEmail: () => void;
  setSubject: (subj: string) => void;
  setBody: (b: string) => void;
  resetEmail: () => void;
  launchEmailProvider: (provider: 'default' | 'gmail' | 'outlook' | 'yahoo') => void;
}

const DEFAULT_SUBJECT = "Spiritual Consultation Inquiry - Doctor Baba Mukisa";
const DEFAULT_BODY = "Hello Doctor Baba Mukisa,\n\nI am contacting you from your website regarding a spiritual consultation.\n\nMy name:\nMy inquiry:\n\nThank you.";

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [body, setBody] = useState(DEFAULT_BODY);
  const [originalSubject, setOriginalSubject] = useState(DEFAULT_SUBJECT);
  const [originalBody, setOriginalBody] = useState(DEFAULT_BODY);

  const recipientEmail = SITE_INFO.email || "help@doctorbabamukisa.com";

  const openEmail = useCallback((initialSubject?: string, initialBody?: string) => {
    const subjToUse = initialSubject?.trim() || DEFAULT_SUBJECT;
    const bodyToUse = initialBody?.trim() || DEFAULT_BODY;

    setSubject(subjToUse);
    setBody(bodyToUse);
    setOriginalSubject(subjToUse);
    setOriginalBody(bodyToUse);
    setHasSent(false);
    setIsOpen(true);
  }, []);

  const closeEmail = useCallback(() => {
    setIsOpen(false);
  }, []);

  const resetEmail = useCallback(() => {
    setSubject(originalSubject);
    setBody(originalBody);
  }, [originalSubject, originalBody]);

  const launchEmailProvider = useCallback((provider: 'default' | 'gmail' | 'outlook' | 'yahoo') => {
    let url = '';
    const encodedTo = encodeURIComponent(recipientEmail);
    const encodedSubject = encodeURIComponent(subject.trim());
    const encodedBody = encodeURIComponent(body.trim());

    switch (provider) {
      case 'gmail':
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;
        break;
      case 'outlook':
        url = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`;
        break;
      case 'yahoo':
        url = `https://compose.mail.yahoo.com/?to=${encodedTo}&subj=${encodedSubject}&body=${encodedBody}`;
        break;
      case 'default':
      default:
        url = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;
        break;
    }

    try {
      if (provider === 'default') {
        // Mailto links trigger default app
        window.location.href = url;
      } else {
        // Webmail providers open in a new tab so main window remains open
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch {
      window.location.href = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    }

    setHasSent(true);
  }, [recipientEmail, subject, body]);

  // Intercept any clicks on mailto: links pointing to SITE_INFO.email
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a');
      if (!anchor || !anchor.href) return;

      if (anchor.dataset.noIntercept === 'true') return;

      const href = anchor.getAttribute('href') || '';
      if (href.startsWith('mailto:') && (href.includes(recipientEmail) || href.includes('doctorbabamukisa.com'))) {
        e.preventDefault();
        e.stopPropagation();

        try {
          const urlObj = new URL(anchor.href);
          const searchParams = new URLSearchParams(urlObj.search);
          const customSubj = searchParams.get('subject') || DEFAULT_SUBJECT;
          const customBody = searchParams.get('body') || DEFAULT_BODY;
          openEmail(customSubj, customBody);
        } catch {
          openEmail();
        }
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [openEmail, recipientEmail]);

  return (
    <EmailContext.Provider
      value={{
        isOpen,
        hasSent,
        recipientEmail,
        subject,
        body,
        originalSubject,
        originalBody,
        openEmail,
        closeEmail,
        setSubject,
        setBody,
        resetEmail,
        launchEmailProvider
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = (): EmailContextType => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};
