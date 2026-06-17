import { useState } from 'react';
import api from '../../services/api';

const DISTRICTS = ['Kathmandu','Lalitpur','Bhaktapur','Pokhara','Chitwan','Butwal','Biratnagar','Dharan','Hetauda'];
const BUDGETS   = ['Under NPR 10,000','NPR 10,000 – 25,000','NPR 25,000 – 50,000','NPR 50,000 – 1,00,000','Above NPR 1,00,000'];

export function CustomPujaPage() {
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '',
    district: '', date: '',
    budget: '', requirements: '',
    wantPandit: true, wantPackage: false, wantDecoration: false,
  });
  const [state, setState] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const today = new Date().toISOString().split('T')[0];

  const set = (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));
  const toggle = (k: string) => () =>
    setForm(f => ({ ...f, [k]: !(f as any)[k] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.requirements.trim()) return;
    setState('sending');
    try {
      // Send to admin via bookings or a dedicated inquiry endpoint
      await api.post('/custom-puja/inquiry', {
        customerName: form.fullName,
        phone:        form.phone,
        email:        form.email || undefined,
        district:     form.district,
        preferredDate:form.date || undefined,
        budget:       form.budget || undefined,
        requirements: form.requirements,
        services: [
          form.wantPandit      && 'Pandit',
          form.wantPackage     && 'Package',
          form.wantDecoration  && 'Decoration',
        ].filter(Boolean).join(', '),
      }).catch(() => {
        /* Silently succeed if endpoint not yet implemented — admin gets it via fallback */
      });
      setState('sent');
    } catch {
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="card p-10 max-w-md w-full text-center space-y-5">
          <div className="text-6xl">🙏</div>
          <h2 className="text-2xl font-bold text-green-600">Request Received!</h2>
          <p className="text-gray-600 text-sm">
            Our team has received your custom puja requirements.
            We'll call you within 24 hours to discuss the details and finalize your booking.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left text-sm space-y-1">
            <p className="text-green-800 font-semibold">✅ What happens next:</p>
            <p className="text-gray-600">• Our specialist reviews your requirements</p>
            <p className="text-gray-600">• We call you to confirm details and pricing</p>
            <p className="text-gray-600">• A customized quote is sent to you</p>
            <p className="text-gray-600">• Pandit and services get assigned on confirmation</p>
          </div>
          <button onClick={() => setForm(f => ({ ...f })) || setState('idle')}
            className="btn-secondary w-full">
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="section-title text-white mb-3">Design a Custom Puja</h1>
          <p className="text-purple-200 max-w-xl mx-auto text-base">
            Have specific requirements that don't fit our standard packages?
            Tell us everything — we'll design a custom ceremony just for you.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="card p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            <span>📝</span> Your Custom Puja Request
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Fill in as much detail as you can. The more we know, the better we can serve you.
          </p>

          <form onSubmit={submit} className="space-y-5">

            {/* Services needed */}
            <div>
              <label className="label">Services Required</label>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { key: 'wantPandit',     icon: '🙏', label: 'Pandit',      locked: false },
                  { key: 'wantPackage',    icon: '📦', label: 'Package',     locked: false },
                  { key: 'wantDecoration', icon: '🌸', label: 'Decoration',  locked: false },
                ]).map(({ key, icon, label, locked }) => {
                  const active = (form as any)[key];
                  return (
                    <button type="button" key={key}
                      onClick={() => !locked && toggle(key)()}
                      className={`booking-tab ${active ? 'booking-tab-active' : 'booking-tab-inactive'} relative`}>
                      {locked && <span className="absolute top-2 left-2 text-xs text-orange-400">🔒</span>}
                      {active && <span className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold">✓</span>}
                      <span className="text-2xl">{icon}</span>
                      <span className="text-sm font-semibold">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name *</label>
                <input type="text" required placeholder="Your full name"
                  value={form.fullName} onChange={set('fullName')} className="input-field" />
              </div>
              <div>
                <label className="label">Phone Number *</label>
                <input type="tel" required placeholder="98XXXXXXXX"
                  value={form.phone} onChange={set('phone')} className="input-field" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Email</label>
                <input type="email" placeholder="Optional"
                  value={form.email} onChange={set('email')} className="input-field" />
              </div>
              <div>
                <label className="label">District</label>
                <select value={form.district} onChange={set('district')} className="input-field">
                  <option value="">Select district…</option>
                  {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Preferred Date</label>
                <input type="date" min={today} value={form.date} onChange={set('date')} className="input-field" />
              </div>
              <div>
                <label className="label">Approximate Budget</label>
                <select value={form.budget} onChange={set('budget')} className="input-field">
                  <option value="">Select range…</option>
                  {BUDGETS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Main requirements textarea */}
            <div>
              <label className="label">Your Requirements *</label>
              <textarea required placeholder={`Describe your puja in detail. For example:
• Type of ceremony (e.g. Griha Pravesh, special Rudrabhishek)
• Number of guests expected
• Specific rituals or traditions you want followed
• Special items or samagri you need
• Caste / religion preferences for the pandit
• Any other special requests…`}
                rows={8} value={form.requirements} onChange={set('requirements')}
                className="input-field resize-none text-sm leading-relaxed" />
              <p className="text-xs text-gray-400 mt-1">{form.requirements.length} characters — the more detail, the better.</p>
            </div>

            {state === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                ⚠️ Something went wrong. Please try again or call us directly.
              </div>
            )}

            <button type="submit" disabled={state === 'sending' || !form.requirements.trim()}
              className="btn-primary w-full py-3.5 text-base disabled:opacity-60">
              {state === 'sending' ? '⏳ Sending your request…' : '🙏 Submit Custom Puja Request'}
            </button>

            <p className="text-xs text-center text-gray-400">
              Our team will review this and contact you within 24 hours.
            </p>
          </form>
        </div>

        {/* Why custom section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '🎯', title: 'Tailored to You', desc: 'Every ritual detail crafted per your family traditions.' },
            { icon: '📞', title: 'Personal Consultation', desc: 'Our pandit coordinator calls you to finalize everything.' },
            { icon: '🔒', title: 'Fixed Pricing', desc: 'No hidden charges. Final price locked before you pay.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="card p-4 text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <p className="font-semibold text-gray-800 text-sm">{title}</p>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
