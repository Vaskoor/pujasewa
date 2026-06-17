import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function DecorationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/decorations')
      .then(res => {
        const data = res.data;
        setItems(Array.isArray(data) ? data : (data.data || []));
      })
      .catch(err => console.error('Failed to load decorations', err))
      .finally(() => setLoading(false));
  }, []);

  const book = (id: string) => navigate(`/book?wantDecoration=true&decorationId=${id}`);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🌸</div>
          <h1 className="section-title text-white mb-3">Decoration Services</h1>
          <p className="text-pink-100 max-w-2xl mx-auto text-base">
            Transform your ceremony space with our professional decoration services.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="section-title">Decoration Options</h2>
          <p className="section-sub">All decorations can be combined with a pandit booking and/or a ceremony package.</p>
        </div>
        {loading ? <LoadingSpinner /> : items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No decoration options available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.filter(d => d.isActive !== false).map(item => (
              <div key={item.id} className="card-hover flex flex-col overflow-hidden">
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 border-b border-pink-100 flex flex-col items-center text-center">
                  <div className="text-5xl mb-3">🌸</div>
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <p className="text-2xl font-bold text-pink-700 mt-2">
                    NPR {Number(item.price).toLocaleString()}
                  </p>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-gray-600 mb-5 leading-relaxed">{item.description}</p>
                  <button onClick={() => book(item.id)} className="mt-auto w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold transition-all shadow-sm">
                    Book This Decoration
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-12 bg-gradient-to-r from-orange-50 via-yellow-50 to-pink-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🎊</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Book Everything Together</h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-5">
            Get a pandit, a ceremony package, AND decorations in one seamless booking.
          </p>
          <button onClick={() => navigate('/book?wantPackage=true&wantDecoration=true')} className="btn-primary px-8 py-3 text-base">
            🙏 Book Complete Ceremony
          </button>
        </div>
      </div>
    </div>
  );
}
