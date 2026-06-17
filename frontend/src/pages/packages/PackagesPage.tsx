import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/packages')
      .then(res => {
        const data = res.data;
        setPackages(Array.isArray(data) ? data : (data.data || []));
      })
      .catch(err => console.error('Failed to load packages', err))
      .finally(() => setLoading(false));
  }, []);

  const bookWithPackage = (pkgId: string) =>
    navigate(`/book?wantPackage=true&packageId=${pkgId}`);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">📦</div>
          <h1 className="section-title text-white mb-3">Ceremony Packages</h1>
          <p className="text-amber-100 max-w-2xl mx-auto text-base">
            Carefully curated puja packages that include everything you need —
            samagri, prasad, ritual items, and a <strong>verified pandit</strong>.
          </p>
        </div>
      </div>
      <div className="bg-white border-b border-orange-100 py-5 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4 justify-center flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-2xl">🙏</span>
            <span><strong>Every package includes a pandit.</strong> Our algorithm assigns the best available priest for your date and district.</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="section-title">Choose Your Package</h2>
          <p className="section-sub">All prices include pandit services, materials, and coordination.</p>
        </div>
        {packages.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No packages available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div key={pkg.id} className="card-hover flex flex-col overflow-hidden relative">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 border-b border-amber-100">
                  <div className="text-4xl mb-3">📦</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg.name}</h3>
                  {pkg.description && <p className="text-xs text-gray-500">{pkg.description}</p>}
                  <p className="mt-3 text-2xl font-bold text-amber-700">
                    NPR {Number(pkg.price).toLocaleString()}
                    <span className="text-sm font-normal text-gray-400 ml-1">/ ceremony</span>
                  </p>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5 mb-4">
                    <span className="text-lg">🙏</span>
                    <div>
                      <p className="text-xs font-bold text-orange-800">Pandit Included</p>
                      <p className="text-xs text-orange-600">Auto-assigned based on your date</p>
                    </div>
                  </div>
                  {pkg.includesItems?.length > 0 && (
                    <ul className="space-y-2 mb-5">
                      {pkg.includesItems.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-green-500 font-bold text-xs">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button onClick={() => bookWithPackage(pkg.id)} className="btn-primary w-full mt-auto py-3">
                    Book This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-12 bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🎨</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Need a Custom Package?</h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-5">
            Don't see what you need? Design your own custom puja with our specialists.
          </p>
          <Link to="/custom-puja" className="btn-primary px-8 py-3 text-base">
            ✍️ Design a Custom Puja
          </Link>
        </div>
      </div>
    </div>
  );
}
