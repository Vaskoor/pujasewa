import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Camera, Star, ArrowRight, Calendar, Check, Phone, Sparkles, Loader2 } from 'lucide-react';

interface PhotographyPackage {
  id: string;
  name: string;
  emoji: string;
  pricePerDay: number;
  minDays: number;
  maxDays: number;
  description: string;
  includes: string[];
  badge: string;
}

interface Photographer {
  id: string;
  name: string;
  studio: string;
  emoji: string;
  experience: number;
  specialties: string[];
  portfolioHighlights: string[];
  rating: number;
  reviews: number;
  location: string;
  instagram?: string;
}

export function PhotographyPage() {
  const [packages, setPackages] = useState<PhotographyPackage[]>([]);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState<Record<string, number>>({});
  const [enquirePackage, setEnquirePackage] = useState<PhotographyPackage | null>(null);
  const [enquirePhotographer, setEnquirePhotographer] = useState<Photographer | null>(null);
  const [enquireForm, setEnquireForm] = useState({ name: '', phone: '', eventDate: '', notes: '' });
  const [enquireSubmitted, setEnquireSubmitted] = useState(false);
  const [enquireError, setEnquireError] = useState('');

  useEffect(() => {
    api.get('/photography')
      .then(res => {
        setPackages(res.data.packages || []);
        setPhotographers(res.data.photographers || []);
      })
      .catch(err => console.error('Failed to load photography data', err))
      .finally(() => setLoading(false));
  }, []);

  const getDays = (pkg: PhotographyPackage) => selectedDays[pkg.id] ?? pkg.minDays;

  const handleEnquire = (pkg: PhotographyPackage, photographer?: Photographer) => {
    setEnquirePackage(pkg);
    setEnquirePhotographer(photographer ?? null);
    setEnquireSubmitted(false);
    setEnquireError('');
    setEnquireForm({ name: '', phone: '', eventDate: '', notes: '' });
  };

  const submitEnquiry = async () => {
    if (!enquireForm.name.trim()) { setEnquireError('Please enter your name.'); return; }
    if (!enquireForm.phone.trim()) { setEnquireError('Phone number is required.'); return; }
    setEnquireError('');
    try {
      await api.post('/photography/inquiry', {
        packageName: enquirePackage?.name,
        photographerName: enquirePhotographer?.name,
        fullName: enquireForm.name,
        phone: enquireForm.phone,
        eventDate: enquireForm.eventDate,
        notes: enquireForm.notes,
      });
      setEnquireSubmitted(true);
    } catch (err) {
      setEnquireError('Failed to send enquiry. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">📸</div>
          <h1 className="section-title text-white mb-3">Photography & Videography</h1>
          <p className="text-violet-100 max-w-2xl mx-auto text-base">
            Capture every sacred moment with Nepal's best wedding photographers and studio teams.
            From intimate pujas to grand destination weddings — we bring professional lenses to your celebration.
          </p>
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="section-title">Photography Packages</h2>
          <p className="section-sub">Choose a package and select how many days you need. Mix and match with your venue booking.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map(pkg => {
            const days = getDays(pkg);
            const total = pkg.pricePerDay * days;
            return (
              <div key={pkg.id} className="card-hover flex flex-col overflow-hidden relative">
                {pkg.badge && (
                  <div className="absolute top-3 right-3 bg-violet-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    {pkg.badge}
                  </div>
                )}
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 border-b border-violet-100 text-center">
                  <div className="text-5xl mb-3">{pkg.emoji}</div>
                  <h3 className="text-base font-bold text-gray-900">{pkg.name}</h3>
                  <p className="text-2xl font-bold text-violet-700 mt-2">
                    NPR {pkg.pricePerDay.toLocaleString()}
                    <span className="text-sm font-normal text-gray-400 ml-1">/ day</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {pkg.minDays === pkg.maxDays
                      ? `${pkg.minDays} day${pkg.minDays > 1 ? 's' : ''}`
                      : `${pkg.minDays}–${pkg.maxDays} days`}
                  </p>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{pkg.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {pkg.includes.map(item => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <span className="text-violet-500 font-bold mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.maxDays > pkg.minDays && (
                    <div className="mb-4">
                      <label className="label">Number of Days</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedDays(s => ({ ...s, [pkg.id]: Math.max(pkg.minDays, (s[pkg.id] ?? pkg.minDays) - 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-violet-400 hover:text-violet-600 font-bold transition-all"
                        >−</button>
                        <span className="text-lg font-bold text-gray-800 w-6 text-center">{days}</span>
                        <button
                          onClick={() => setSelectedDays(s => ({ ...s, [pkg.id]: Math.min(pkg.maxDays, (s[pkg.id] ?? pkg.minDays) + 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:border-violet-400 hover:text-violet-600 font-bold transition-all"
                        >+</button>
                      </div>
                      <p className="text-sm font-semibold text-violet-700 mt-2">
                        Total: NPR {total.toLocaleString()}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => handleEnquire(pkg)}
                    className="mt-auto w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all shadow-sm"
                  >
                    Book This Package
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Photographers */}
      <div className="bg-white py-12 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Our Photographers & Studios</h2>
            <p className="section-sub">Experienced professionals with proven portfolios. Browse their work and book directly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photographers.map(ph => (
              <div key={ph.id} className="card-hover overflow-hidden">
                <div className="flex gap-4 p-6">
                  <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-4xl border border-violet-200">
                    {ph.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">{ph.name}</h3>
                        <p className="text-xs text-violet-600 font-semibold">{ph.studio}</p>
                        <p className="text-xs text-gray-400 mt-0.5">📍 {ph.location} · {ph.experience} yrs experience</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-0.5 justify-end">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.round(ph.rating) ? 'text-yellow-400 text-sm' : 'text-gray-200 text-sm'}>★</span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">{ph.rating} ({ph.reviews})</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2 mb-3">
                      {ph.specialties.map(s => (
                        <span key={s} className="text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>

                    {ph.instagram && (
                      <p className="text-xs text-gray-400 mb-2">🔗 {ph.instagram}</p>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Portfolio Highlights</p>
                  <ul className="space-y-1">
                    {ph.portfolioHighlights.map(h => (
                      <li key={h} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="text-violet-400 mt-0.5">✦</span>{h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => handleEnquire(packages[1], ph)}
                    className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-all"
                  >
                    Book with This Photographer
                  </button>
                  <a
                    href={`https://wa.me/9779800000000?text=Hi! I'd like to know more about ${ph.name} (${ph.studio})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
                  >
                    💬
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-orange-50 border-2 border-violet-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🎊</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Bundle with Venue & Pandit</h3>
          <p className="text-gray-600 text-sm max-w-lg mx-auto mb-5">
            Book your photographer alongside a venue and pandit for a seamless ceremony. Our team coordinates all vendors so you can focus on the celebration.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/venue" className="btn-primary px-6 py-3 text-base">🏛️ Book a Venue</a>
            <a href="/book" className="btn-secondary px-6 py-3 text-base">🙏 Book a Pandit</a>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {enquirePackage && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 overflow-y-auto" onClick={() => setEnquirePackage(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 rounded-t-2xl flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {enquirePackage.emoji} {enquirePackage.name}
                </h2>
                {enquirePhotographer && (
                  <p className="text-violet-200 text-sm mt-0.5">
                    with {enquirePhotographer.name} · {enquirePhotographer.studio}
                  </p>
                )}
                <p className="text-violet-200 text-xs mt-1">
                  NPR {enquirePackage.pricePerDay.toLocaleString()}/day
                </p>
              </div>
              <button onClick={() => setEnquirePackage(null)} className="text-white/70 hover:text-white text-2xl leading-none">×</button>
            </div>

            {enquireSubmitted ? (
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Enquiry Received!</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Thank you <strong>{enquireForm.name}</strong>! We'll call you on <strong>{enquireForm.phone}</strong> within 24 hours to confirm photographer availability and finalize your booking.
                </p>
                <button onClick={() => setEnquirePackage(null)} className="btn-primary px-8">Done</button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {enquireError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    ⚠️ {enquireError}
                  </div>
                )}
                <div>
                  <label className="label">Full Name *</label>
                  <input className="input-field" placeholder="Your name" value={enquireForm.name}
                    onChange={e => setEnquireForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Phone Number *</label>
                  <input className="input-field" placeholder="98XXXXXXXX" value={enquireForm.phone}
                    onChange={e => setEnquireForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Event Date</label>
                  <input type="date" className="input-field" min={new Date().toISOString().split('T')[0]}
                    value={enquireForm.eventDate}
                    onChange={e => setEnquireForm(f => ({ ...f, eventDate: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Additional Notes</label>
                  <textarea className="input-field" rows={3}
                    placeholder="Describe your event, special requirements, preferred dates..."
                    value={enquireForm.notes}
                    onChange={e => setEnquireForm(f => ({ ...f, notes: e.target.value }))} />
                </div>
                <div className="flex gap-3 pt-1">
                  <button onClick={() => setEnquirePackage(null)} className="btn-secondary flex-1">Cancel</button>
                  <button onClick={submitEnquiry}
                    className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all">
                    Submit Enquiry
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
