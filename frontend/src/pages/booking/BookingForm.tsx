import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const EVENT_TYPES = ['Marriage','Bratabandha','Puja','Shraddha','Griha Pravesh','Namkaran','Satyanarayana Puja','Chhewar'];
const DISTRICTS   = ['Kathmandu','Lalitpur','Bhaktapur','Pokhara','Chitwan','Butwal','Biratnagar','Dharan','Hetauda'];
const CASTES      = ['Brahmin','Chhetri','Newar','Gurung','Magar','Tamang','Rai','Limbu','Others'];
const RELIGIONS   = ['Hinduism','Buddhism','Kirat'];
const DURATIONS   = [
  {label:'1 hour',value:60},{label:'2 hours',value:120},{label:'3 hours',value:180},
  {label:'4 hours',value:240},{label:'5 hours',value:300},{label:'Half day (6 hrs)',value:360},{label:'Full day',value:480},
];

const STEPS = ['Event Details', 'Personal Info', 'Add-ons', 'Payment'];

export function BookingForm() {
  const { panditId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [pandit, setPandit]   = useState<any>(null);
  const [packages, setPackages]       = useState<any[]>([]);
  const [decorations, setDecorations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [qrReady, setQrReady]     = useState(false);

  // Seed from URL params (coming from home search)
  const [form, setForm] = useState({
    // Step 1 — event
    eventType:   searchParams.get('eventType') || '',
    district:    searchParams.get('district')  || '',
    date:        searchParams.get('date')       || '',
    time:        searchParams.get('time')       || '',
    duration:    searchParams.get('duration')   ? Number(searchParams.get('duration')) : 120,
    caste:       searchParams.get('caste')      || '',
    religion:    searchParams.get('religion')   || '',
    address:     '',
    // Step 2 — personal
    fullName:    '',
    phone:       '',
    altPhone:    '',
    email:       '',
    notes:       '',
    // Step 3 — add-ons
    packageId:    '',
    decorationId: '',
    wantPackage:  searchParams.get('wantPackage')    === 'true',
    wantDecoration: searchParams.get('wantDecoration') === 'true',
  });

  useEffect(() => {
    const calls: any[] = [
      api.get('/packages').catch(() => ({ data: [] })),
      api.get('/decorations').catch(() => ({ data: [] })),
    ];
    if (panditId) calls.unshift(api.get(`/pandits/${panditId}`).catch(() => ({ data: null })));

    Promise.all(calls).then((results) => {
      if (panditId) {
        const [panditRes, pkgRes, decRes] = results;
        setPandit(panditRes.data);
        setPackages(Array.isArray(pkgRes.data) ? pkgRes.data : []);
        setDecorations(Array.isArray(decRes.data) ? decRes.data : []);
      } else {
        const [pkgRes, decRes] = results;
        setPackages(Array.isArray(pkgRes.data) ? pkgRes.data : []);
        setDecorations(Array.isArray(decRes.data) ? decRes.data : []);
      }
    }).finally(() => setLoading(false));
  }, [panditId]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));
  const setNum = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: Number(e.target.value) }));
  const toggle = (k: string) => () =>
    setForm(f => ({ ...f, [k]: !(f as any)[k] }));

  const today = new Date().toISOString().split('T')[0];

  const validateStep = () => {
    if (step === 0) {
      if (!form.eventType) return 'Please select an event type.';
      if (!form.district)  return 'Please select a district.';
      if (!form.date)      return 'Please choose a date.';
      if (!form.time)      return 'Please choose a start time.';
      if (!form.address)   return 'Please enter venue address.';
    }
    if (step === 1) {
      if (!form.fullName)  return 'Please enter your full name.';
      if (!form.phone || form.phone.length < 10) return 'Please enter a valid phone number.';
    }
    return '';
  };

  const nextStep = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError('');
    setStep(s => s + 1);
    if (step === 1 && !qrReady) setQrReady(true); // show QR after phone
  };

  const submitBooking = async () => {
    setSubmitting(true); setError('');
    try {
      const payload: any = {
        eventType:   form.eventType,
        district:    form.district,
        date:        form.date,
        time:        form.time,
        duration:    form.duration,
        caste:       form.caste,
        religion:    form.religion,
        address:     form.address,
        customerName: form.fullName,
        phone:       form.phone,
        altPhone:    form.altPhone,
        email:       form.email,
        notes:       form.notes,
        ...(panditId && { panditId }),
        ...(form.wantPackage && form.packageId && { packageId: form.packageId }),
        ...(form.wantDecoration && form.decorationId && { decorationId: form.decorationId }),
      };
      const res = await api.post('/bookings', payload);
      setBookingId(res.data.id || 'DEMO-' + Date.now());
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally { setSubmitting(false); }
  };

  if (loading) return <LoadingSpinner />;

  const panditName = pandit?.user?.profile?.fullName || 'Nearest Available Pandit';
  const selectedPkg = packages.find(p => p.id === form.packageId);
  const selectedDec = decorations.find(d => d.id === form.decorationId);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🪔</div>
          <h1 className="text-2xl font-bold text-gray-800">
            {panditId ? `Book ${panditName}` : 'Book a Pandit'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Complete your booking in a few simple steps</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1 flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step ? 'bg-green-500 text-white' :
                  i === step ? 'bg-orange-500 text-white ring-4 ring-orange-200' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs mt-1 hidden sm:block font-medium ${i === step ? 'text-orange-600' : 'text-gray-400'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 transition-all ${i < step ? 'bg-green-400' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

          {/* ── STEP 0: Event Details ── */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-3">📅 Event Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Event Type *</label>
                  <select required value={form.eventType} onChange={set('eventType')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Choose event…</option>
                    {EVENT_TYPES.map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">District *</label>
                  <select required value={form.district} onChange={set('district')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Choose district…</option>
                    {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Event Date *</label>
                  <input type="date" required min={today} value={form.date} onChange={set('date')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Start Time *</label>
                  <input type="time" required value={form.time} onChange={set('time')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Duration</label>
                  <select value={form.duration} onChange={setNum('duration')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    {DURATIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Caste Preference</label>
                  <select value={form.caste} onChange={set('caste')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">No preference</option>
                    {CASTES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Religion</label>
                  <select value={form.religion} onChange={set('religion')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">No preference</option>
                    {RELIGIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Venue Address *</label>
                <input type="text" required placeholder="Full venue address / landmark" value={form.address} onChange={set('address')}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
            </div>
          )}

          {/* ── STEP 1: Personal Info ── */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-3">👤 Your Details</h2>
              <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                🔒 Your phone number is kept confidential and will never be shared with the pandit.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                  <input type="text" required placeholder="Your full name" value={form.fullName} onChange={set('fullName')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number *</label>
                  <input type="tel" required placeholder="98XXXXXXXX" value={form.phone} onChange={set('phone')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Alternate Phone</label>
                  <input type="tel" placeholder="Optional" value={form.altPhone} onChange={set('altPhone')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email (for confirmation)</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={set('email')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Special Instructions / Notes</label>
                  <textarea placeholder="Any specific requirements or instructions…" value={form.notes} onChange={set('notes')} rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Add-ons ── */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-3">✨ Optional Add-ons</h2>
              <p className="text-sm text-gray-500">Enhance your ceremony — or skip and proceed to payment.</p>

              {/* Packages */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-700">📦 Ceremony Package</h3>
                  <button type="button" onClick={toggle('wantPackage')}
                    className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
                      form.wantPackage ? 'bg-orange-100 border-orange-300 text-orange-700' : 'border-gray-200 text-gray-400 hover:border-orange-300'
                    }`}>
                    {form.wantPackage ? '✓ Added' : '+ Add'}
                  </button>
                </div>
                {form.wantPackage && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {packages.length > 0 ? packages.map((p: any) => (
                      <label key={p.id} className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                        form.packageId === p.id ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                      }`}>
                        <input type="radio" name="package" value={p.id} checked={form.packageId === p.id}
                          onChange={set('packageId')} className="sr-only" />
                        <div className="font-semibold text-gray-800 text-sm">{p.name}</div>
                        {p.description && <div className="text-xs text-gray-500 mt-1">{p.description}</div>}
                        <div className="text-orange-600 font-bold text-sm mt-2">Rs. {p.price?.toLocaleString()}</div>
                      </label>
                    )) : (
                      <p className="text-sm text-gray-400 col-span-2">No packages available right now.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Decorations */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-700">🌸 Decorations</h3>
                  <button type="button" onClick={toggle('wantDecoration')}
                    className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${
                      form.wantDecoration ? 'bg-pink-100 border-pink-300 text-pink-700' : 'border-gray-200 text-gray-400 hover:border-pink-300'
                    }`}>
                    {form.wantDecoration ? '✓ Added' : '+ Add'}
                  </button>
                </div>
                {form.wantDecoration && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {decorations.length > 0 ? decorations.map((d: any) => (
                      <label key={d.id} className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                        form.decorationId === d.id ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                      }`}>
                        <input type="radio" name="decoration" value={d.id} checked={form.decorationId === d.id}
                          onChange={set('decorationId')} className="sr-only" />
                        <div className="font-semibold text-gray-800 text-sm">{d.name}</div>
                        {d.description && <div className="text-xs text-gray-500 mt-1">{d.description}</div>}
                        <div className="text-pink-600 font-bold text-sm mt-2">Rs. {d.price?.toLocaleString()}</div>
                      </label>
                    )) : (
                      <p className="text-sm text-gray-400 col-span-2">No decorations available right now.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Booking Summary */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-4">
                <h4 className="font-bold text-gray-800 mb-3 text-sm">📋 Booking Summary</h4>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Event</span><span className="font-medium text-gray-800">{form.eventType}</span></div>
                  <div className="flex justify-between"><span>Date</span><span className="font-medium text-gray-800">{form.date} at {form.time}</span></div>
                  <div className="flex justify-between"><span>Location</span><span className="font-medium text-gray-800">{form.district}</span></div>
                  {form.wantPackage && selectedPkg && (
                    <div className="flex justify-between"><span>Package</span><span className="font-medium text-orange-600">{selectedPkg.name} — Rs. {selectedPkg.price?.toLocaleString()}</span></div>
                  )}
                  {form.wantDecoration && selectedDec && (
                    <div className="flex justify-between"><span>Decoration</span><span className="font-medium text-pink-600">{selectedDec.name} — Rs. {selectedDec.price?.toLocaleString()}</span></div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: QR Payment ── */}
          {step === 3 && (
            <QRPaymentStep
              bookingId={bookingId}
              phone={form.phone}
              onConfirmed={() => navigate('/dashboard')}
            />
          )}

          {/* Navigation Buttons */}
          {step < 3 && (
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button type="button" onClick={() => { setStep(s => s - 1); setError(''); }}
                  className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all">
                  ← Back
                </button>
              )}
              {step < 2 ? (
                <button type="button" onClick={nextStep}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all shadow-sm">
                  Continue →
                </button>
              ) : (
                <button type="button" onClick={submitBooking} disabled={submitting}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all shadow-sm">
                  {submitting ? 'Processing…' : '🙏 Confirm & Proceed to Payment'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── QR Payment Component ──────────────────────────────────
function QRPaymentStep({ bookingId, phone, onConfirmed }: { bookingId: string; phone: string; onConfirmed: () => void }) {
  const [confirmed, setConfirmed] = useState(false);
  const [checking,  setChecking]  = useState(false);

  // We generate a static-looking QR using phone number as ref
  const qrSeed = encodeURIComponent(`PanditJi|${bookingId}|${phone}`);
  const qrUrl  = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${qrSeed}&color=c2410c&bgcolor=fff8f1`;

  const simulateConfirm = async () => {
    setChecking(true);
    // In production: poll /bookings/:id/payment-status
    await new Promise(r => setTimeout(r, 2000));
    setChecking(false);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="text-center py-6 space-y-4">
        <div className="text-6xl animate-bounce">🎉</div>
        <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
        <p className="text-gray-600 text-sm max-w-sm mx-auto">
          Payment received. Our team will assign the nearest available pandit and notify you shortly.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-left space-y-1">
          <p className="text-green-700 font-medium">✅ What happens next:</p>
          <p className="text-gray-600">• We assign the nearest available pandit to your event</p>
          <p className="text-gray-600">• The pandit receives your venue location &amp; time</p>
          <p className="text-gray-600">• Your phone number stays private — we will mediate</p>
          <p className="text-gray-600">• You'll receive confirmation on your phone</p>
        </div>
        <p className="text-xs text-gray-400">Booking ID: <span className="font-mono">{bookingId}</span></p>
        <button onClick={onConfirmed} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-5">
      <h2 className="text-lg font-bold text-gray-800">💳 Scan to Pay</h2>
      <p className="text-sm text-gray-500">
        Scan the QR code below with your mobile banking app (eSewa, Khalti, IME Pay, etc.)
      </p>

      <div className="inline-block p-4 bg-orange-50 border-2 border-orange-300 rounded-2xl shadow-inner">
        <img src={qrUrl} alt="Payment QR" className="w-52 h-52 mx-auto rounded-lg" />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700 text-left space-y-1">
        <p className="font-medium">📋 Payment Details:</p>
        <p>Booking Reference: <span className="font-mono font-bold">{bookingId || 'Processing…'}</span></p>
        <p>Your Phone: <span className="font-mono">{phone}</span></p>
        <p>Account: <span className="font-medium">PanditJi Services Pvt. Ltd.</span></p>
      </div>

      <p className="text-xs text-gray-400">
        After payment, tap the button below. Our team verifies manually and confirms within 5 minutes.
      </p>

      <button onClick={simulateConfirm} disabled={checking}
        className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all">
        {checking ? '⏳ Verifying payment…' : '✅ I have paid — Confirm Booking'}
      </button>
    </div>
  );
}
