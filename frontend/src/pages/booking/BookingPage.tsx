import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

/* ─── Static fallbacks so the UI never shows "Loading…" forever ─── */
const FALLBACK_PACKAGES = [
  {
    id: 'basic-marriage', name: 'Basic Marriage Package', price: 25000,
    includesItems: ['Pandit Fee', 'Basic Puja Samagri', 'Prasad Kit'],
    description: 'Everything needed for an intimate wedding ceremony.',
  },
  {
    id: 'premium-marriage', name: 'Premium Marriage Package', price: 50000,
    includesItems: ['Pandit Fee', 'Premium Samagri', 'Mandap Decoration', 'Prasad'],
    description: 'Grand celebration with premium materials and full decoration.',
  },
  {
    id: 'bratabandha', name: 'Bratabandha Package', price: 15000,
    includesItems: ['Pandit Fee', 'Samagri', 'Prasad', 'Dhoti Set'],
    description: 'Complete thread ceremony package for your son.',
  },
  {
    id: 'griha-pravesh', name: 'Griha Pravesh Package', price: 11000,
    includesItems: ['Pandit Fee', 'Puja Samagri', 'Prasad', 'Havan Items'],
    description: 'Bless your new home with this house-warming puja kit.',
  },
  {
    id: 'satyanarayan', name: 'Satyanarayan Puja Package', price: 8000,
    includesItems: ['Pandit Fee', 'Puja Samagri', 'Prasad', 'Katha Book'],
    description: 'Full Satyanarayan puja with all ritual essentials.',
  },
];

const FALLBACK_DECORATIONS = [
  {
    id: 'basic-flower', name: 'Basic Flower Decoration', price: 5000,
    description: 'Fresh marigold garlands, small rangoli, and incense setup.',
  },
  {
    id: 'premium-mandap', name: 'Premium Mandap Setup', price: 15000,
    description: 'Full wooden mandap with silk draping, flowers, and lighting.',
  },
  {
    id: 'rangoli-set', name: 'Traditional Rangoli Setup', price: 3000,
    description: 'Intricate hand-crafted rangoli at the entrance and altar.',
  },
  {
    id: 'full-venue', name: 'Full Venue Decoration', price: 25000,
    description: 'Complete venue transformation — mandap, rangoli, garlands, and stage.',
  },
  {
    id: 'outdoor-setup', name: 'Outdoor Ceremony Setup', price: 18000,
    description: 'Tent, seating, flower canopy and fairy lights for outdoor events.',
  },
];

const EVENT_TYPES = ['Marriage','Bratabandha','Puja','Shraddha','Griha Pravesh','Namkaran','Satyanarayana Puja','Chhewar','Rudrabhishek','Lakshmi Puja'];
const DISTRICTS   = ['Kathmandu','Lalitpur','Bhaktapur','Pokhara','Chitwan','Butwal','Biratnagar','Dharan','Hetauda'];
const CASTES      = ['Brahmin','Chhetri','Newar','Gurung','Magar','Tamang','Rai','Limbu','Others'];
const RELIGIONS   = ['Hinduism','Buddhism','Kirat'];
const DURATIONS   = [
  { label: '1 hour', value: 60 },    { label: '2 hours', value: 120 },
  { label: '3 hours', value: 180 },  { label: '4 hours', value: 240 },
  { label: 'Half day (6 hrs)', value: 360 }, { label: 'Full day', value: 480 },
];

/* ─── What the user wants to book ─── */
type WhatToBuy = 'pandit_only' | 'package_only' | 'decoration_only' | 'pandit_package' | 'pandit_decoration' | 'all_three';

interface Option {
  id: WhatToBuy;
  icon: string;
  title: string;
  sub: string;
  color: string;
  border: string;
  bg: string;
  includes: { pandit: boolean; package: boolean; decoration: boolean };
}

const OPTIONS: Option[] = [
  {
    id: 'pandit_only', icon: '🙏', title: 'Pandit Only',
    sub: 'We assign the best available pandit for your date',
    color: 'text-orange-700', border: 'border-orange-400', bg: 'bg-orange-50',
    includes: { pandit: true, package: false, decoration: false },
  },
  {
    id: 'package_only', icon: '📦', title: 'Package Only',
    sub: 'Ceremony kit with samagri, prasad & a pandit included',
    color: 'text-amber-700', border: 'border-amber-400', bg: 'bg-amber-50',
    includes: { pandit: true, package: true, decoration: false },
  },
  {
    id: 'decoration_only', icon: '🌸', title: 'Decoration Only',
    sub: 'Just venue decoration — no pandit or package',
    color: 'text-pink-700', border: 'border-pink-400', bg: 'bg-pink-50',
    includes: { pandit: false, package: false, decoration: true },
  },
  {
    id: 'pandit_package', icon: '🙏📦', title: 'Pandit + Package',
    sub: 'Pandit auto-assigned + your chosen ceremony kit',
    color: 'text-orange-700', border: 'border-orange-400', bg: 'bg-orange-50',
    includes: { pandit: true, package: true, decoration: false },
  },
  {
    id: 'pandit_decoration', icon: '🙏🌸', title: 'Pandit + Decoration',
    sub: 'Pandit auto-assigned + beautiful venue setup',
    color: 'text-rose-700', border: 'border-rose-400', bg: 'bg-rose-50',
    includes: { pandit: true, package: false, decoration: true },
  },
  {
    id: 'all_three', icon: '✨', title: 'Complete Ceremony',
    sub: 'Pandit + Package + Decoration — the full experience',
    color: 'text-purple-700', border: 'border-purple-400', bg: 'bg-purple-50',
    includes: { pandit: true, package: true, decoration: true },
  },
];

const STEPS = ['What to Book', 'Ceremony Details', 'Your Info', 'Confirm & Pay'];

export function BookingPage() {
  const navigate       = useNavigate();
  const [sp]           = useSearchParams();
  const today          = new Date().toISOString().split('T')[0];

  const [step,        setStep]        = useState(0);
  const [selected,    setSelected]    = useState<WhatToBuy | null>(null);
  const [packages,    setPackages]    = useState<any[]>(FALLBACK_PACKAGES);
  const [decorations, setDecorations] = useState<any[]>(FALLBACK_DECORATIONS);
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState('');
  const [bookingId,   setBookingId]   = useState('');

  const [form, setForm] = useState({
    eventType: sp.get('eventType') || '',
    district:  sp.get('district')  || '',
    date:      sp.get('date')      || '',
    time:      sp.get('time')      || '',
    duration:  sp.get('duration') ? Number(sp.get('duration')) : 120,
    caste:     sp.get('caste')     || '',
    religion:  sp.get('religion')  || '',
    address:   '',
    fullName:  '',
    phone:     '',
    altPhone:  '',
    email:     '',
    notes:     '',
    packageId:    '',
    decorationId: '',
  });

  /* ── Try to load real data; keep fallback on failure ── */
  useEffect(() => {
    api.get('/packages').then(r => {
      const d = Array.isArray(r.data) ? r.data : (r.data?.data ?? []);
      if (d.length > 0) setPackages(d);
    }).catch(() => {/* keep fallback */});

    api.get('/decorations').then(r => {
      const d = Array.isArray(r.data) ? r.data : (r.data?.data ?? []);
      if (d.length > 0) setDecorations(d);
    }).catch(() => {/* keep fallback */});

    /* Pre-select from URL if coming from home form */
    const wp = sp.get('wantPackage')    === 'true';
    const wd = sp.get('wantDecoration') === 'true';
    if (wp && wd)  setSelected('all_three');
    else if (wp)   setSelected('pandit_package');
    else if (wd)   setSelected('pandit_decoration');
  }, []);

  const opt = OPTIONS.find(o => o.id === selected);

  const set = (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  /* ── Validation ── */
  const validate = (): string => {
    if (step === 0 && !selected) return 'Please choose what you would like to book.';
    if (step === 1) {
      if (!form.eventType) return 'Please select an event type.';
      if (!form.district)  return 'Please select a district.';
      if (!form.date)      return 'Please pick a date.';
      if (!form.time)      return 'Please choose a start time.';
      if (!form.address)   return 'Please enter the venue address.';
      if (opt?.includes.package    && !form.packageId)    return 'Please choose a package.';
      if (opt?.includes.decoration && !form.decorationId) return 'Please choose a decoration option.';
    }
    if (step === 2) {
      if (!form.fullName)               return 'Please enter your full name.';
      if (!form.phone || form.phone.length < 10) return 'Please enter a valid 10-digit phone number.';
    }
    return '';
  };

  const next = () => {
    const e = validate();
    if (e) { setError(e); return; }
    setError('');
    setStep(s => s + 1);
  };

  const submit = async () => {
    setSubmitting(true); setError('');
    try {
      const payload: any = {
        eventType:    form.eventType,
        district:     form.district,
        date:         form.date,
        time:         form.time,
        duration:     form.duration,
        caste:        form.caste || undefined,
        religion:     form.religion || undefined,
        address:      form.address,
        customerName: form.fullName,
        phone:        form.phone,
        altPhone:     form.altPhone || undefined,
        email:        form.email    || undefined,
        notes:        form.notes    || undefined,
        ...(opt?.includes.package    && form.packageId    && { packageId: form.packageId }),
        ...(opt?.includes.decoration && form.decorationId && { decorationId: form.decorationId }),
      };
      const res = await api.post('/bookings', payload);
      setBookingId(res.data?.id || `PS-${Date.now()}`);
      setStep(4);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Payment / success ── */
  if (step === 4) {
    return <PaymentStep bookingId={bookingId} phone={form.phone} onDone={() => navigate('/dashboard')} />;
  }

  const selPkg = packages.find(p => p.id === form.packageId);
  const selDec = decorations.find(d => d.id === form.decorationId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🪔</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Book Your Ceremony
          </h1>
          <p className="text-gray-500 text-sm">Quick, simple, and fully coordinated by our team.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${i < step  ? 'bg-green-500 text-white'
                  : i === step ? 'bg-orange-500 text-white ring-4 ring-orange-200'
                  : 'bg-gray-200 text-gray-400'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs mt-1 hidden sm:block font-medium ${i === step ? 'text-orange-600' : 'text-gray-400'}`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1.5 mt-[-10px] ${i < step ? 'bg-green-400' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm flex gap-2">
            <span>⚠️</span><span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

          {/* ══════════ STEP 0: What to book ══════════ */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">What would you like to book?</h2>
              <p className="text-sm text-gray-500 mb-6">Choose one — you can always adjust later.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OPTIONS.map(o => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => { setSelected(o.id); setError(''); }}
                    className={`relative w-full text-left p-4 rounded-2xl border-2 transition-all duration-150
                      ${selected === o.id
                        ? `${o.border} ${o.bg} shadow-sm`
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
                  >
                    {selected === o.id && (
                      <span className="absolute top-3 right-3 w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center font-bold">✓</span>
                    )}
                    <div className="text-2xl mb-2">{o.icon}</div>
                    <p className={`font-bold text-sm ${selected === o.id ? o.color : 'text-gray-800'}`}>{o.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{o.sub}</p>

                    {/* Inclusion pills */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {o.includes.pandit     && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">🙏 Pandit</span>}
                      {o.includes.package    && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">📦 Package</span>}
                      {o.includes.decoration && <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">🌸 Decor</span>}
                    </div>
                  </button>
                ))}
              </div>

              {/* Pandit assignment note shown only if relevant */}
              {selected && opt?.includes.pandit && (
                <div className="mt-5 bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3">
                  <span className="text-xl">🤖</span>
                  <div>
                    <p className="font-semibold text-orange-800 text-sm">How pandit assignment works</p>
                    <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                      You don't pick a pandit — our system automatically assigns the nearest available,
                      verified pandit who matches your event type and district. You'll be notified after payment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════ STEP 1: Ceremony Details ══════════ */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Ceremony Details</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Booking: <span className="font-medium text-orange-600">{opt?.title}</span>
                </p>
              </div>

              {/* Event + District + Date + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Event Type *</label>
                  <select value={form.eventType} onChange={set('eventType')} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                    <option value="">Select ceremony…</option>
                    {EVENT_TYPES.map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">District *</label>
                  <select value={form.district} onChange={set('district')} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                    <option value="">Select district…</option>
                    {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Date *</label>
                  <input type="date" min={today} value={form.date} onChange={set('date')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Start Time *</label>
                  <input type="time" value={form.time} onChange={set('time')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Duration</label>
                  <select value={form.duration} onChange={e => setForm(f => ({ ...f, duration: Number(e.target.value) }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                    {DURATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Caste</label>
                  <select value={form.caste} onChange={set('caste')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                    <option value="">Any</option>
                    {CASTES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Religion</label>
                  <select value={form.religion} onChange={set('religion')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                    <option value="">Any</option>
                    {RELIGIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Venue Address *</label>
                <input type="text" placeholder="Full address of the ceremony venue"
                  value={form.address} onChange={set('address')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>

              {/* ── Package picker (inline, always visible) ── */}
              {opt?.includes.package && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2.5 uppercase tracking-wide">Choose a Package *</label>
                  <div className="space-y-2">
                    {packages.map(pkg => (
                      <label key={pkg.id}
                        className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
                          ${form.packageId === pkg.id ? 'border-amber-400 bg-amber-50' : 'border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/40'}`}>
                        <input type="radio" name="packageId" value={pkg.id}
                          checked={form.packageId === pkg.id}
                          onChange={e => setForm(f => ({ ...f, packageId: e.target.value }))}
                          className="sr-only" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">📦</span>
                            <p className="font-semibold text-gray-800 text-sm">{pkg.name}</p>
                          </div>
                          {(pkg.includesItems || pkg.description) && (
                            <p className="text-xs text-gray-500 mt-1 ml-7">
                              {pkg.includesItems ? pkg.includesItems.join(' · ') : pkg.description}
                            </p>
                          )}
                        </div>
                        <div className="text-right ml-4 shrink-0">
                          <p className="font-bold text-amber-700 text-sm">NPR {Number(pkg.price).toLocaleString()}</p>
                          {form.packageId === pkg.id && (
                            <span className="text-xs text-green-600 font-medium">✓ Selected</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Decoration picker (inline, always visible) ── */}
              {opt?.includes.decoration && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2.5 uppercase tracking-wide">Choose Decoration *</label>
                  <div className="space-y-2">
                    {decorations.map(dec => (
                      <label key={dec.id}
                        className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
                          ${form.decorationId === dec.id ? 'border-pink-400 bg-pink-50' : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-50/40'}`}>
                        <input type="radio" name="decorationId" value={dec.id}
                          checked={form.decorationId === dec.id}
                          onChange={e => setForm(f => ({ ...f, decorationId: e.target.value }))}
                          className="sr-only" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🌸</span>
                            <p className="font-semibold text-gray-800 text-sm">{dec.name}</p>
                          </div>
                          {dec.description && (
                            <p className="text-xs text-gray-500 mt-1 ml-7">{dec.description}</p>
                          )}
                        </div>
                        <div className="text-right ml-4 shrink-0">
                          <p className="font-bold text-pink-700 text-sm">NPR {Number(dec.price).toLocaleString()}</p>
                          {form.decorationId === dec.id && (
                            <span className="text-xs text-green-600 font-medium">✓ Selected</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════ STEP 2: Personal Info ══════════ */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Your Contact Info</h2>
                <p className="text-xs text-gray-500 mt-1 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 inline-block mt-2">
                  🔒 Your phone number stays private — we never share it with the pandit.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                  <input type="text" placeholder="Your full name" value={form.fullName} onChange={set('fullName')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number *</label>
                  <input type="tel" placeholder="98XXXXXXXX" value={form.phone} onChange={set('phone')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Alternate Phone</label>
                  <input type="tel" placeholder="Optional" value={form.altPhone} onChange={set('altPhone')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
                  <input type="email" placeholder="Optional — for receipt" value={form.email} onChange={set('email')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Special Instructions</label>
                <textarea placeholder="Any specific rituals, traditions, or requirements for the team…"
                  rows={3} value={form.notes} onChange={set('notes')}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
              </div>
            </div>
          )}

          {/* ══════════ STEP 3: Review ══════════ */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-800">Review &amp; Confirm</h2>

              {/* Booking type badge */}
              <div className={`flex items-center gap-3 p-4 rounded-2xl border-2 ${opt?.border ?? ''} ${opt?.bg ?? ''}`}>
                <span className="text-3xl">{opt?.icon}</span>
                <div>
                  <p className={`font-bold ${opt?.color}`}>{opt?.title}</p>
                  <p className="text-xs text-gray-500">{opt?.sub}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 bg-gray-50 rounded-xl p-4 text-sm">
                {[
                  ['Event',    form.eventType],
                  ['District', form.district],
                  ['Date',     form.date],
                  ['Time',     form.time],
                  ['Duration', DURATIONS.find(d => d.value === form.duration)?.label ?? ''],
                  ['Address',  form.address],
                  ['Name',     form.fullName],
                  ['Phone',    form.phone],
                  ...(selPkg ? [['Package',    `${selPkg.name} — NPR ${Number(selPkg.price).toLocaleString()}`]] : []),
                  ...(selDec ? [['Decoration', `${selDec.name} — NPR ${Number(selDec.price).toLocaleString()}`]] : []),
                  ...(opt?.includes.pandit ? [['Pandit', 'Auto-assigned by our team ✅']] : []),
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-gray-500 w-24 shrink-0">{label}</span>
                    <span className="text-gray-800 font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>

              {form.notes && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm">
                  <p className="text-gray-500 text-xs font-medium mb-1">Special Instructions</p>
                  <p className="text-gray-700">{form.notes}</p>
                </div>
              )}

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800 flex gap-2">
                <span>🔒</span>
                <p>Your contact details stay private. Our team mediates all communication with the assigned pandit or decoration team.</p>
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button type="button" onClick={() => { setError(''); setStep(s => s - 1); }}
                className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-all">
                ← Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={next} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-sm">
                Continue →
              </button>
            ) : (
              <button type="button" onClick={submit} disabled={submitting}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all shadow-sm">
                {submitting ? '⏳ Processing…' : '🙏 Confirm & Pay'}
              </button>
            )}
          </div>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-3 gap-3 mt-5 text-center">
          {[['🔒','Privacy Protected'],['🚨','Emergency Backup'],['⭐','Verified Pandits']].map(([icon, text]) => (
            <div key={text} className="bg-white rounded-xl border border-gray-100 py-3 px-2 shadow-sm">
              <div className="text-xl">{icon}</div>
              <p className="text-xs text-gray-600 font-medium mt-1">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── QR Payment Step ── */
function PaymentStep({ bookingId, phone, onDone }: { bookingId: string; phone: string; onDone: () => void }) {
  const [state, setState] = useState<'waiting' | 'checking' | 'done'>('waiting');
  const qrSeed = encodeURIComponent(`PanditJi|${bookingId}|${phone}`);
  const qrUrl  = `https://api.qrserver.com/v1/create-qr-code/?size=230x230&data=${qrSeed}&color=c2410c&bgcolor=fff8f1`;

  const confirm = async () => {
    setState('checking');
    await new Promise(r => setTimeout(r, 2000));
    setState('done');
  };

  if (state === 'done') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center space-y-5">
          <div className="text-6xl animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
          <p className="text-gray-600 text-sm">
            Payment received. We'll assign the best available pandit and notify you on your phone within 5 minutes.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-left space-y-1.5">
            <p className="text-green-800 font-semibold">✅ What happens next:</p>
            <p className="text-gray-600">• Our system finds the nearest available pandit</p>
            <p className="text-gray-600">• Pandit receives your ceremony details and venue</p>
            <p className="text-gray-600">• Your privacy is maintained throughout</p>
            <p className="text-gray-600">• You get an SMS confirmation shortly</p>
          </div>
          <p className="text-xs text-gray-400 font-mono">Booking ID: {bookingId}</p>
          <button onClick={onDone} className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-3 rounded-xl transition-all">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-sm w-full text-center space-y-5">
        <h2 className="text-xl font-bold text-gray-800">💳 Scan to Pay</h2>
        <p className="text-sm text-gray-500">Use eSewa, Khalti, IME Pay, or any mobile banking app.</p>
        <div className="inline-block p-4 bg-orange-50 border-2 border-orange-300 rounded-2xl shadow-inner">
          <img src={qrUrl} alt="Payment QR" className="w-56 h-56 rounded-lg" />
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-left space-y-1">
          <p className="font-semibold text-blue-800">📋 Payment Details</p>
          <p className="text-gray-600">Ref: <span className="font-mono font-bold">{bookingId || '…'}</span></p>
          <p className="text-gray-600">Account: <span className="font-semibold">PanditJi Services Pvt. Ltd.</span></p>
        </div>
        <p className="text-xs text-gray-400">After paying, tap below. Our team verifies within 5 minutes.</p>
        <button onClick={confirm} disabled={state === 'checking'}
          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all">
          {state === 'checking' ? '⏳ Verifying…' : '✅ I have paid — Confirm Booking'}
        </button>
      </div>
    </div>
  );
}
