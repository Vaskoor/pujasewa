import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';

const EVENT_TYPES = ['Marriage','Bratabandha','Puja','Shraddha','Griha Pravesh','Namkaran','Satyanarayana Puja','Chhewar'];
const DISTRICTS   = ['Kathmandu','Lalitpur','Bhaktapur','Pokhara','Chitwan','Butwal','Biratnagar','Dharan','Hetauda'];

export function PanditListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventType, setEventType] = useState(searchParams.get('eventType') || '');
  const [district,  setDistrict]  = useState(searchParams.get('district')  || '');

  // Booking context flags passed from home
  const wantPackage    = searchParams.get('wantPackage')    === 'true';
  const wantDecoration = searchParams.get('wantDecoration') === 'true';

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pandits', eventType, district],
    queryFn: () => {
      const params = new URLSearchParams();
      if (eventType) params.set('eventType', eventType);
      if (district)  params.set('district',  district);
      return api.get(`/pandits?${params.toString()}`).then(r => {
        const d = r.data; return Array.isArray(d) ? d : (d.data || []);
      });
    },
  });

  const pandits: any[] = Array.isArray(data) ? data : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Record<string,string> = {};
    if (eventType) p.eventType = eventType;
    if (district)  p.district  = district;
    if (wantPackage)    p.wantPackage    = 'true';
    if (wantDecoration) p.wantDecoration = 'true';
    setSearchParams(p);
    refetch();
  };

  const buildBookUrl = (panditId: string) => {
    const p = new URLSearchParams({ panditId });
    if (eventType)       p.set('eventType', eventType);
    if (district)        p.set('district', district);
    if (wantPackage)     p.set('wantPackage', 'true');
    if (wantDecoration)  p.set('wantDecoration', 'true');
    return `/book/${panditId}?${p.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Find a Pandit</h1>
          <p className="text-gray-500">Browse verified priests and book directly</p>
        </div>

        {/* Filters */}
        <form onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 mb-8">
          <select value={eventType} onChange={e => setEventType(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">All Event Types</option>
            {EVENT_TYPES.map(e => <option key={e}>{e}</option>)}
          </select>
          <select value={district} onChange={e => setDistrict(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">All Districts</option>
            {DISTRICTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <button type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-all">
            Search
          </button>
        </form>

        {/* Add-on context banners */}
        {(wantPackage || wantDecoration) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {wantPackage && (
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-sm text-orange-700 font-medium">
                📦 Package will be added to your booking
              </div>
            )}
            {wantDecoration && (
              <div className="flex items-center gap-2 bg-pink-50 border border-pink-200 rounded-full px-4 py-1.5 text-sm text-pink-700 font-medium">
                🌸 Decoration will be added to your booking
              </div>
            )}
          </div>
        )}

        {isLoading ? <LoadingSpinner /> : pandits.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No pandits found</p>
            <p className="text-sm mt-1">Try different filters or contact us directly</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pandits.map((p: any) => {
              const name  = p.user?.profile?.fullName || 'Pandit';
              const loc   = p.user?.profile?.district || '';
              const specs = p.specializations?.map((s: any) => s.eventType?.name).filter(Boolean) || [];
              return (
                <div key={p.id} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-orange-300 shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center mb-4 ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all">
                    {p.user?.profile?.photo
                      ? <img src={p.user.profile.photo} alt={name} className="w-full h-full object-cover" />
                      : <span className="text-3xl">🧑‍⚕️</span>}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
                  {loc && <p className="text-xs text-gray-400 mt-0.5">📍 {loc}</p>}
                  <div className="flex gap-0.5 my-2">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className={i <= Math.round(p.rating||0) ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{(p.rating||0).toFixed(1)} · {p.experienceYears||0} yrs exp</p>
                  {specs.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                      {specs.slice(0,3).map((s: string) => (
                        <span key={s} className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  )}
                  <Link to={buildBookUrl(p.id)}
                    className="mt-auto w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-all">
                    Book Now
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
