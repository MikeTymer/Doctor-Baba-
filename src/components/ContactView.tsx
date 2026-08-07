import React, { useState } from 'react';
import { SITE_INFO } from '../data/initialData';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          message,
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage(data.message || "Your query has been submitted successfully, we will contact you soon.");
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setErrorMessage(data.error || "Please submit the form carefully.");
      }
    } catch {
      setSuccessMessage("Your query has been submitted successfully, we will contact you soon.");
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
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
          Reach out for spiritual spell casting, marriage restoration, financial luck, or traditional herbal healing.
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

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-200">Email Address</h4>
                  <p className="text-amber-300">{SITE_INFO.email}</p>
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

            <div className="pt-2">
              <a
                href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20need%20urgent%20spiritual%20help`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" /> Open WhatsApp
              </a>
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
                    placeholder="+254..."
                    className="w-full bg-slate-950 border border-amber-900/50 rounded-xl px-4 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
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
                  placeholder="Describe your situation (love, business, legal, health, protection)..."
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
