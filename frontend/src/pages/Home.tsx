import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EVENT_TYPES = ['Marriage','Bratabandha','Puja','Shraddha','Griha Pravesh','Namkaran','Satyanarayana Puja','Chhewar'];
const DISTRICTS   = ['Kathmandu','Lalitpur','Bhaktapur','Pokhara','Chitwan','Butwal','Biratnagar','Dharan','Hetauda'];
const CASTES      = ['Brahmin','Chhetri','Newar','Gurung','Magar','Tamang','Rai','Limbu','Others'];
const RELIGIONS   = ['Hinduism','Buddhism','Kirat'];

const BASE = (typeof window !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || '/api/v1';

export function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<any[]>([]);
  const [form, setForm] = useState({
    eventType:'', district:'', date:'', time:'',
    caste:'', religion:'',
    wantPackage: false, wantDecoration: false,
  });
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    axios.get(`${BASE}/pandits?take=6`).then(r => {
      let d = r.data; if (!Array.isArray(d) && d.data) d = d.data;
      setFeatured(Array.isArray(d) ? d : []);
    }).catch(() => {});
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));
  const toggle = (k: string) => () =>
    setForm(f => ({ ...f, [k]: !(f as any)[k] }));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => { if (v && v !== false) p.set(k, String(v)); });
    navigate(`/book?${p.toString()}`);
  };

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-700 via-orange-600 to-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium mb-6 border border-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
            Nepal's Trusted Pandit Booking Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
            Sacred Ceremonies,<br/>
            <span className="text-yellow-300">Seamlessly Arranged</span>
          </h1>
          <p className="text-lg text-orange-100 mb-10 max-w-2xl mx-auto">
            Book a pandit, choose ceremony packages, and add beautiful decorations —
            all in one place. For any ritual, anywhere in Nepal.
          </p>

          {/* 3-service Quick Picker */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mb-8">
            {[
              { label:'Pandit',      desc:'Auto-assigned', link:'/book', color:'bg-orange-500 hover:bg-orange-400' },
              { label:'Packages',    desc:'Samagri & kit', link:'/packages', color:'bg-amber-500 hover:bg-amber-400' },
              { label:'Decorations', desc:'Mandap & venue', link:'/decorations', color:'bg-pink-500 hover:bg-pink-400' },
            ].map(({ label, desc, link, color }) => (
              <Link key={label} to={link}
                className={`${color} text-white rounded-2xl p-4 flex flex-col items-center gap-1.5 text-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group`}>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">{label}</span>
                <span className="font-bold text-sm">{label}</span>
                <span className="text-xs opacity-80">{desc}</span>
              </Link>
            ))}
          </div>

          {/* Quick Booking Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-800">Quick Book a Pandit</h2>
                <p className="text-xs text-gray-500">Enter your details and we'll find the best match</p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="label text-gray-600">Event Type *</label>
                  <select required value={form.eventType} onChange={set('eventType')} className="input-field">
                    <option value="">Select ceremony…</option>
                    {EVENT_TYPES.map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label text-gray-600">District *</label>
                  <select required value={form.district} onChange={set('district')} className="input-field">
                    <option value="">Select district…</option>
                    {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label text-gray-600">Date *</label>
                  <input type="date" required min={today} value={form.date} onChange={set('date')} className="input-field" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="label text-gray-600">Start Time *</label>
                  <input type="time" required value={form.time} onChange={set('time')} className="input-field" />
                </div>
                <div>
                  <label className="label text-gray-600">Caste</label>
                  <select value={form.caste} onChange={set('caste')} className="input-field">
                    <option value="">Any</option>
                    {CASTES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label text-gray-600">Religion</label>
                  <select value={form.religion} onChange={set('religion')} className="input-field">
                    <option value="">Any</option>
                    {RELIGIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              {/* Add-on toggles */}
              <div className="flex flex-wrap gap-3 pt-1 items-center">
                <span className="text-xs text-gray-500 font-medium">Add to booking:</span>
                <button type="button" onClick={toggle('wantPackage')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    form.wantPackage ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-500 hover:border-amber-300'
                  }`}>
                  <span className={`w-4 h-4 rounded border-2 flex items-center justify-center text-xs ${form.wantPackage ? 'bg-amber-400 border-amber-400 text-white' : 'border-gray-300'}`}>
                    {form.wantPackage && '✓'}
                  </span>
                  Package
                </button>
                <button type="button" onClick={toggle('wantDecoration')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    form.wantDecoration ? 'border-pink-400 bg-pink-50 text-pink-700' : 'border-gray-200 text-gray-500 hover:border-pink-300'
                  }`}>
                  <span className={`w-4 h-4 rounded border-2 flex items-center justify-center text-xs ${form.wantDecoration ? 'bg-pink-400 border-pink-400 text-white' : 'border-gray-300'}`}>
                    {form.wantDecoration && '✓'}
                  </span>
                  Decorations
                </button>
              </div>

              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-base transition-all shadow-md hover:shadow-lg">
                Find Available Pandits
              </button>
            </form>
          </div>
        </div>

        {/* Wave */}
        <div className="relative h-14 mt-4">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full">
            <path d="M0 56L60 46.7C120 37 240 19 360 14C480 9 600 19 720 23.3C840 28 960 28 1080 23.3C1200 19 1320 9 1380 4.7L1440 0V56H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* 3 Booking Types */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Everything for Your Sacred Ceremony</h2>
            <p className="section-sub">Book any combination — a pandit alone, with packages, with decorations, or all three together.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pandit Card */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 overflow-hidden hover:border-orange-400 hover:shadow-lg transition-all group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white text-center">
                <h3 className="text-xl font-bold mb-1">Book a Pandit</h3>
                <p className="text-orange-100 text-sm">Auto-assigned by our algorithm</p>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Verified, background-checked pandits only</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Nearest available pandit assigned on your date</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Emergency backup if pandit cancels</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Your phone stays private throughout</span>
                </div>
                <Link to="/book" className="btn-primary w-full mt-4 py-3">
                  Book a Pandit
                </Link>
              </div>
            </div>

            {/* Package Card */}
            <div className="bg-white rounded-2xl border-2 border-amber-200 overflow-hidden hover:border-amber-400 hover:shadow-lg transition-all group">
              <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-8 text-white text-center">
                <h3 className="text-xl font-bold mb-1">Ceremony Packages</h3>
                <p className="text-amber-100 text-sm">Pandit + Samagri + Prasad kit</p>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Every package includes a pandit</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Pre-curated ritual items and samagri</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Available for marriage, bratabandha, and more</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Transparent all-inclusive pricing</span>
                </div>
                <Link to="/packages" className="w-full mt-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center justify-center gap-2 transition-all">
                  Browse Packages
                </Link>
              </div>
            </div>

            {/* Decoration Card */}
            <div className="bg-white rounded-2xl border-2 border-pink-200 overflow-hidden hover:border-pink-400 hover:shadow-lg transition-all group">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-8 text-white text-center">
                <h3 className="text-xl font-bold mb-1">Decorations</h3>
                <p className="text-pink-100 text-sm">Mandap, garlands, rangoli & more</p>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Professional decoration team dispatched</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Mandap setup, marigold garlands, rangoli</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Indoor and outdoor venue coverage</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>Add to any pandit or package booking</span>
                </div>
                <Link to="/decorations" className="w-full mt-4 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold flex items-center justify-center gap-2 transition-all">
                  Browse Decorations
                </Link>
              </div>
            </div>
          </div>

          {/* Combine CTA */}
          <div className="mt-8 bg-gradient-to-r from-orange-500 via-amber-500 to-pink-500 rounded-2xl p-8 text-white text-center shadow-xl">
            <h3 className="text-xl font-bold mb-2">Book All Three Together</h3>
            <p className="text-white/80 text-sm mb-5 max-w-lg mx-auto">
              Combine a pandit, a ceremony package, and decorations in one seamless booking.
              Our team coordinates everything — you just show up.
            </p>
            <Link to="/book?wantPackage=true&wantDecoration=true"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3 rounded-xl transition-all hover:bg-orange-50 shadow-lg text-base">
              Book Complete Ceremony
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="section-title">How It Works</h2>
          <p className="section-sub">Simple, transparent, and reliable in 4 steps</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step:'01', title:'Fill Your Details',  desc:'Choose event, location, date, and any add-ons you need' },
            { step:'02', title:'We Match & Assign', desc:'Our algorithm finds the nearest verified pandit for your date' },
            { step:'03', title:'Pay via QR',        desc:'Scan our QR code with eSewa, Khalti, or mobile banking' },
            { step:'04', title:'Ceremony Completed',desc:'Pandit arrives on time. Emergency backup is always ready' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="card-hover p-6 text-center">
              <div className="text-xs font-bold text-orange-400 mb-1 tracking-widest">STEP {step}</div>
              <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-orange-50 py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { title:'Privacy Protected',  desc:'Your phone is never shared with the pandit. We act as your intermediary.' },
            { title:'Emergency Service',   desc:'If a pandit cancels, we instantly reassign. Your ceremony will not be disrupted.' },
            { title:'Verified Pandits',    desc:'All pandits are background-checked, certified, and rated by real customers.' },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white p-7 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Pandits */}
      {featured.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="section-title">Our Pandits</h2>
                <p className="text-gray-500 mt-1 text-sm">Browse profiles — we'll assign the right one for your date</p>
              </div>
              <Link to="/pandits" className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.slice(0, 6).map((p: any) => {
                const name   = p.user?.profile?.fullName || 'Pandit';
                const photo  = p.user?.profile?.photo;
                const dist   = p.user?.profile?.district || '—';
                const rating = p.rating || 0;
                const years  = p.experienceYears || 0;
                const specs  = p.specializations?.map((s: any) => s.eventType?.name).filter(Boolean).slice(0,2) || [];
                return (
                  <div key={p.id} className="card-hover p-5 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center shrink-0 ring-2 ring-orange-200">
                      {photo ? <img src={photo} alt={name} className="w-full h-full object-cover" /> : <span className="text-sm font-bold text-orange-500">{name.charAt(0)}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 truncate">{name}</p>
                      <p className="text-xs text-gray-400">{dist} · {years} yrs</p>
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(i => (
                          <span key={i} className={`text-xs ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                        ))}
                        <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)}</span>
                      </div>
                      {specs.length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {specs.map((s: string, i: number) => (
                            <span key={i} className="text-xs bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded-full border border-orange-200">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-6">
              <Link to="/pandits" className="btn-secondary px-8 py-3">
                View All Pandits
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Custom Puja CTA */}
      <section className="py-14 px-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Have a Unique Ceremony in Mind?</h2>
          <p className="text-purple-200 mb-7 text-base max-w-xl mx-auto">
            Our standard packages not quite right? Design a fully custom puja — describe your requirements
            and our team will craft the perfect arrangement for you.
          </p>
          <Link to="/custom-puja"
            className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3.5 rounded-xl transition-all hover:bg-purple-50 shadow-lg text-base">
            Design a Custom Puja
          </Link>
        </div>
      </section>

    </div>
  );
}
