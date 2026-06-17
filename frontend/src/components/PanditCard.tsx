import { Link } from 'react-router-dom';

interface PanditCardProps {
  pandit: any;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center gap-0.5 text-lg">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
      ))}
    </div>
  );
}

export function PanditCard({ pandit }: PanditCardProps) {
  const name = pandit.user?.profile?.fullName || 'Pandit';
  const photo = pandit.user?.profile?.photo || null;
  const years = pandit.experienceYears ?? 0;
  const rating = pandit.rating ?? 0;
  // Fix: specializations may be array of objects, extract eventType name
  const specializations = pandit.specializations?.map((s: any) => s.eventType?.name).filter(Boolean) || [];
  const location = pandit.user?.profile?.district || '';

  return (
    <div className="card p-6 flex flex-col items-center text-center group">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center mb-4 ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all">
        {photo ? (
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl">🧑‍⚕️</span>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-0.5">{name}</h3>

      {location && (
        <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
          <span>📍</span>{location}
        </p>
      )}

      <StarRating rating={rating} />
      <p className="text-xs text-gray-500 mt-1 mb-3">{rating.toFixed(1)} · {years} yrs experience</p>

      {specializations.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {specializations.slice(0, 3).map((s: string, idx: number) => (
            <span key={idx} className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
        </div>
      )}

      <Link
        to={`/book/${pandit.id}`}
        className="btn-primary w-full text-sm mt-auto"
      >
        Book Now
      </Link>
    </div>
  );
}
