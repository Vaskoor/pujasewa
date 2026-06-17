import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

interface Venue {
  id: string;
  name: string;
  location: string;
  district: string;
  capacity: number;
  pricePerDay: number;
  description: string;
  amenities: string[];
  images: string;
  eventTypes: string[];
  rating: number;
  reviews: number;
}

const DISTRICTS = ['All Districts', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara'];
const BUDGET_RANGES = [
  { label: 'All Budgets', min: 0, max: Infinity },
  { label: 'Up to NPR 40,000', min: 0, max: 40000 },
  { label: 'NPR 40,000 – 70,000', min: 40000, max: 70000 },
  { label: 'NPR 70,000 – 1,00,000', min: 70000, max: 100000 },
  { label: 'Above NPR 1,00,000', min: 100000, max: Infinity },
];

export function VenuePage() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState('All Districts');
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [selected, setSelected] = useState<Venue | null>(null);
  const [form, setForm] = useState({
    venueName: '', venueId: '',
    fullName: '', phone: '', altPhone: '', email: '',
    eventType: '', startDate: '', endDate: '',
    estimatedGuests: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.get('/venue')
      .then(res => setVenues(res.data))
      .catch(err => console.error('Failed to load venues', err))
      .finally(() => setLoading(false));
  }, []);

  const budget = BUDGET_RANGES[budgetIdx];
  const filtered = venues.filter(v =>
    (district === 'All Districts' || v.district === district) &&
    (v.pricePerDay >= budget.min && v.pricePerDay <= budget.max)
  );

  const openBooking = (v: Venue) => {
    setSelected(v);
    setForm(f => ({ ...f, venueName: v.name, venueId: v.id }));
    setSubmitted(false);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeModal = () => setSelected(null);

  const days = (() => {
    if (!form.startDate || !form.endDate) return 0;
    const diff = new Date(form.endDate).getTime() - new Date(form.startDate).getTime();
    return Math.max(1, Math.ceil(diff / 86400000) + 1);
  })();

  const totalPrice = selected ? selected.pricePerDay * Math.max(1, days) : 0;
  const advance = Math.round(totalPrice * 0.2);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.eventType.trim()) e.eventType = 'Event type is required';
    if (!form.startDate) e.startDate = 'Start date is required';
    if (!form.endDate) e.endDate = 'End date is required';
    else if (form.endDate < form.startDate) e.endDate = 'End date must be after start date';
    if (!form.estimatedGuests.trim()) e.estimatedGuests = 'Estimated guests is required';
    else if (isNaN(Number(form.estimatedGuests)) || Number(form.estimatedGuests) < 1)
      e.estimatedGuests = 'Enter a valid guest count';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setIsSubmitting(true);
    try {
      await api.post('/venue/inquiry', {
        venueId: form.venueId,
        venueName: form.venueName,
        fullName: form.fullName,
        phone: form.phone,
        altPhone: form.altPhone,
        email: form.email,
        eventType: form.eventType,
        startDate: form.startDate,
        endDate: form.endDate,
        estimatedGuests: form.estimatedGuests,
        notes: form.notes,
        totalAmount: totalPrice,
        advanceAmount: advance,
      });
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: 'Failed to submit. Please try again or call us.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center"><div className="text-4xl animate-spin mb-3">🪔</div><p className="text-gray-500">Loading venues...</p></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🏛️</div>
          <h1 className="section-title text-white mb-3">Book a Venue</h1>
          <p className="text-teal-100 max-w-2xl mx-auto text-base">
            Discover beautiful venues across Nepal for weddings, pujas, bratabandha, and every
            celebration. Choose your space, pick your dates, and we'll handle the coordination.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-40 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-600">📍 District:</span>
            <select
              value={district}
              onChange={e => setDistrict(e.target.value)}
              className="input-field py-2 text-sm w-44"
            >
              {DISTRICTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-600">💰 Budget:</span>
            <select
              value={budgetIdx}
              onChange={e => setBudgetIdx(Number(e.target.value))}
              className="input-field py-2 text-sm w-52"
            >
              {BUDGET_RANGES.map((b, i) => <option key={i} value={i}>{b.label}</option>)}
            </select>
          </div>
          <span className="text-sm text-gray-400 ml-auto">{filtered.length} venue{filtered.length !== 1 ? 's' : ''} found</span>
        </div>
      </div>

      {/* Venue Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No venues match your filters. Try adjusting the district or budget.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(v => (
              <div key={v.id} className="card-hover flex flex-col overflow-hidden">
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 border-b border-teal-100 text-center">
                  <div className="text-5xl mb-3">{v.images}</div>
                  <h3 className="text-lg font-bold text-gray-900">{v.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                    <span>📍</span>{v.location}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-yellow-400 text-sm">{'★'.repeat(Math.round(v.rating))}</span>
                    <span className="text-xs text-gray-500">{v.rating} ({v.reviews} reviews)</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{v.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2 py-1 rounded-full">
                      👥 Up to {v.capacity.toLocaleString()} guests
                    </span>
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full">
                      📅 Per day
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {v.amenities.slice(0, 4).map(a => (
                      <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">✓ {a}</span>
                    ))}
                    {v.amenities.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{v.amenities.length - 4} more</span>
                    )}
                  </div>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-teal-700 mb-1">
                      NPR {v.pricePerDay.toLocaleString()}
                      <span className="text-sm font-normal text-gray-400 ml-1">/ day</span>
                    </p>
                    <p className="text-xs text-amber-600 mb-3">20% advance required at booking</p>
                    <button
                      onClick={() => openBooking(v)}
                      className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all shadow-sm"
                    >
                      Book This Venue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Food note */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 via-yellow-50 to-teal-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🍽️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Food Customization Available</h3>
          <p className="text-gray-600 text-sm max-w-lg mx-auto mb-4">
            After booking your venue, reach out to us via phone or WhatsApp to customise your
            catering — menu, cuisine style, dietary preferences, and more. Our team will coordinate
            with our partner caterers to create the perfect feast.
          </p>
          <a
            href="https://wa.me/9779800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm"
          >
            <span>💬</span> WhatsApp for Food Customization
          </a>
        </div>
      </div>

      {/* Booking Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 overflow-y-auto" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selected.images} {selected.name}</h2>
                  <p className="text-teal-100 text-sm mt-1">📍 {selected.location}</p>
                </div>
                <button onClick={closeModal} className="text-white/70 hover:text-white text-2xl leading-none">×</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                  NPR {selected.pricePerDay.toLocaleString()}/day
                </span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                  Up to {selected.capacity.toLocaleString()} guests
                </span>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Request Sent!</h3>
                <p className="text-gray-600 mb-2">
                  Thank you, <strong>{form.fullName}</strong>! We've received your request for
                  <strong> {selected.name}</strong>.
                </p>
                {days > 0 && (
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 my-4 text-left">
                    <p className="text-sm font-semibold text-teal-800 mb-2">Booking Summary</p>
                    <p className="text-sm text-gray-700">📅 {form.startDate} → {form.endDate} ({days} day{days > 1 ? 's' : ''})</p>
                    <p className="text-sm text-gray-700">👥 ~{form.estimatedGuests} guests · {form.eventType}</p>
                    <p className="text-sm text-gray-700 mt-2">
                      Total: <strong>NPR {totalPrice.toLocaleString()}</strong>
                    </p>
                    <p className="text-sm text-amber-700 font-semibold">
                      20% Advance: <strong>NPR {advance.toLocaleString()}</strong> — our team will contact you to arrange payment.
                    </p>
                  </div>
                )}
                <p className="text-gray-500 text-sm mb-6">
                  We'll follow up on <strong>{form.phone}</strong> within 24 hours. For food customization, contact us on WhatsApp.
                </p>
                <div className="flex gap-3 justify-center">
                  <button onClick={closeModal} className="btn-secondary px-6">Close</button>
                  <a href="https://wa.me/9779800000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
                    💬 WhatsApp for Food
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                  ⚠️ <strong>20% advance payment</strong> is required to confirm the booking. Our team will contact you to arrange the payment after submission.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" error={errors.fullName}>
                    <input className="input-field" placeholder="Your full name" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
                  </Field>
                  <Field label="Phone Number *" error={errors.phone}>
                    <input className="input-field" placeholder="98XXXXXXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </Field>
                  <Field label="Alternate Phone" error={errors.altPhone}>
                    <input className="input-field" placeholder="Optional" value={form.altPhone} onChange={e => setForm(f => ({ ...f, altPhone: e.target.value }))} />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input type="email" className="input-field" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </Field>
                  <Field label="Event Type *" error={errors.eventType}>
                    <select className="input-field" value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))}>
                      <option value="">Select event type</option>
                      {selected.eventTypes.map(et => <option key={et}>{et}</option>)}
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                  <Field label="Estimated Guests *" error={errors.estimatedGuests}>
                    <input type="number" className="input-field" placeholder={`Max ${selected.capacity}`} min={1} max={selected.capacity} value={form.estimatedGuests} onChange={e => setForm(f => ({ ...f, estimatedGuests: e.target.value }))} />
                  </Field>
                  <Field label="Start Date *" error={errors.startDate}>
                    <input type="date" className="input-field" min={new Date().toISOString().split('T')[0]} value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value, endDate: e.target.value }))} />
                  </Field>
                  <Field label="End Date *" error={errors.endDate}>
                    <input type="date" className="input-field" min={form.startDate || new Date().toISOString().split('T')[0]} value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
                  </Field>
                </div>

                <Field label="Special Requests / Notes" error="">
                  <textarea className="input-field" rows={3} placeholder="Any special requirements, setup preferences, accessibility needs..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                </Field>

                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-800">
                  🍽️ <strong>Food customization?</strong> After booking, call or WhatsApp us to discuss your menu preferences — we'll coordinate with partner caterers.
                </div>

                {days > 0 && (
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>NPR {selected.pricePerDay.toLocaleString()} × {days} day{days > 1 ? 's' : ''}</span>
                      <span className="font-semibold">NPR {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-amber-700 font-bold mt-1">
                      <span>Advance (20%)</span>
                      <span>NPR {advance.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-1">
                  <button onClick={closeModal} className="btn-secondary flex-1">Cancel</button>
                  <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all">
                    {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
