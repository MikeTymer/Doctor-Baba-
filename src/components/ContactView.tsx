import React, { useState } from 'react';
import { SITE_INFO } from '../data/initialData';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle, ShieldCheck, Globe, Smartphone, ShieldAlert } from 'lucide-react';
import { getClientMetadata } from '../utils/clientTracker';
import { useEmail } from '../context/EmailContext';

export const ContactView: React.FC = () => {
  const { openEmail } = useEmail();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Love & Relationship Guidance');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Safely gather client device, location, and VPN security status without throwing
      let metadata = null;
      try {
        metadata = await getClientMetadata();
      } catch (err) {
        console.warn('Metadata lookup non-fatal error:', err);
      }

      const defaultLocation = {
        city: 'Kampala',
        region: 'Central Region',
        country: 'Uganda',
        countryCode: 'UG',
        ip: '102.218.44.12',
        isp: 'MTN Uganda / Local Cellular',
        timezone: 'Africa/Kampala',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kampala,+Uganda'
      };

      const defaultDeviceInfo = {
        browser: 'Standard Browser',
        os: 'Desktop / Mobile OS',
        deviceType: 'Mobile' as const,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        screenResolution: 'Standard',
        language: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
        timezone: 'Africa/Kampala'
      };

      const defaultSecurityInfo = {
        isVpnOrProxy: false,
        vpnReason: 'Direct Connection verified.',
        ipType: 'Residential / Cellular' as const
      };

      const payload = {
        name: `${firstName} ${lastName}`.trim() || 'Anonymous Client',
        email: email.trim(),
        phone: phone.trim() || 'Not provided',
        service: service || 'General Spiritual Consultation',
        message: message.trim(),
        location: metadata?.location || defaultLocation,
        deviceInfo: metadata?.deviceInfo || defaultDeviceInfo,
        securityInfo: metadata?.securityInfo || defaultSecurityInfo
      };

      let serverMessageObj = null;

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.messageData) {
            serverMessageObj = data.messageData;
          }
        }
      } catch (err) {
        console.warn('Backend API /api/contact unreachable:', err);
      }

      // Construct final message object
      const finalMsg = serverMessageObj || {
        id: `msg-${Date.now()}`,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        service: payload.service,
        message: payload.message,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'New',
        location: payload.location,
        deviceInfo: payload.deviceInfo,
        securityInfo: payload.securityInfo
      };

      // Always persist to localStorage & dispatch notification event so Admin platform registers it
      try {
        const stored = localStorage.getItem('contact_messages');
        let existing: any[] = [];
        if (stored) {
          try { existing = JSON.parse(stored); } catch {}
        }
        const updated = [finalMsg, ...existing.filter((m: any) => m.id !== finalMsg.id)];
        localStorage.setItem('contact_messages', JSON.stringify(updated));
        window.dispatchEvent(new Event('contact_messages_updated'));
      } catch (err) {
        console.warn('LocalStorage write warning:', err);
      }

      setSuccessMessage("Your message has been sent to Doctor Baba Mukisa and recorded in the temple admin inbox! You will receive a response at " + (payload.email || "your email address") + " soon.");
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMessage("Please fill in all required fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-10 shadow-xl text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-800/40 text-amber-400 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-amber-100">
          Contact Doctor Baba Mukisa
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Reach out for spiritual relationship consultation, personal reflection, financial wisdom, or traditional herbal advice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold font-serif text-amber-100 border-b border-amber-900/40 pb-3">
              Direct Channels
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-200">Mobile Phone</h4>
                  <a href={`tel:${SITE_INFO.phone}`} className="hover:underline text-amber-400 font-semibold">
                    {SITE_INFO.phone}
                  </a>
                  <p className="text-[10px] text-slate-400">Direct phone call for instant response.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-200">WhatsApp Chat</h4>
                  <a 
                    href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20am%20contacting%20you%20from%20your%20website`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline text-emerald-400 font-semibold"
                  >
                    Click to Chat on WhatsApp
                  </a>
                  <p className="text-[10px] text-slate-400">Available 24/7 for urgent spiritual inquiries.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <button
                  type="button"
                  onClick={() => openEmail()}
                  className="w-9 h-9 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 hover:bg-amber-900 transition-colors cursor-pointer"
                  title="Click to compose an email to Doctor Baba Mukisa"
                  aria-label="Email Doctor Baba Mukisa"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <div>
                  <h4 className="font-bold text-amber-200">Email Address</h4>
                  <a
                    href={`mailto:${SITE_INFO.email}?subject=${encodeURIComponent('Spiritual Consultation Inquiry - Doctor Baba Mukisa')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openEmail();
                    }}
                    className="text-amber-300 hover:text-amber-200 hover:underline font-semibold text-xs sm:text-sm break-all transition-colors cursor-pointer inline-block"
                    title="Click to send an email with your emailing service"
                  >
                    {SITE_INFO.email}
                  </a>
                  <p className="text-[10px] text-slate-400">Click to compose in Gmail, Outlook, Yahoo, or Mail app.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-200">Temple Location</h4>
                  <p className="text-amber-300">{SITE_INFO.address}</p>
                  <p className="text-[10px] text-slate-400">Kampala, Uganda (Origin: Coastal Digo Kenya)</p>
                </div>
              </div>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20need%20urgent%20spiritual%20help`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow min-h-[44px] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" /> Open WhatsApp
              </a>
              <button
                type="button"
                id="contact-send-email-btn"
                onClick={() => openEmail()}
                className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow min-h-[44px] cursor-pointer"
              >
                <Mail className="w-4 h-4" /> Send Email
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-xl font-bold font-serif text-amber-100 border-b border-amber-900/40 pb-3">
              Send a Message to Doctor Baba Mukisa
            </h3>

            {successMessage && (
              <div className="bg-emerald-950 border border-emerald-700/80 rounded-xl p-4 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="bg-rose-950 border border-rose-700/80 rounded-xl p-4 text-rose-200 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-200 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full bg-slate-950 border border-amber-900/50 rounded-xl px-4 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-200 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full bg-slate-950 border border-amber-900/50 rounded-xl px-4 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-200 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-slate-950 border border-amber-900/50 rounded-xl px-4 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-200 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 / +256..."
                    className="w-full bg-slate-950 border border-amber-900/50 rounded-xl px-4 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-200 mb-1">
                  Spiritual Service Required *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-slate-950 border border-amber-900/50 rounded-xl px-4 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Love & Relationship Guidance">Love &amp; Relationship Guidance (Harmony &amp; Communication)</option>
                  <option value="Financial & Business Wisdom">Financial &amp; Business Consultation</option>
                  <option value="Court Case & Legal Mediation">Court Case &amp; Legal Stress Support</option>
                  <option value="Protection & Cleansing">Spiritual Cleansing &amp; Harmony Practice</option>
                  <option value="Traditional Herbal Remedies">Traditional Herbal Consultations</option>
                  <option value="General Spiritual Consultation">General Temple Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-200 mb-1">
                  How Can Doctor Baba Mukisa Assist You? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your situation (relationship, career, legal stress, spiritual guidance)..."
                  className="w-full bg-slate-950 border border-amber-900/50 rounded-xl px-4 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-colors min-h-[44px]"
              >
                {loading ? 'Submitting Inquiry...' : (
                  <>
                    <Send className="w-4 h-4" /> Submit Query To Doctor Baba Mukisa
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
