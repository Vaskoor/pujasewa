import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../../services/booking.service';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const STATUS_BADGE: Record<string, string> = {
  PENDING:           'bg-yellow-100 text-yellow-700',
  CONFIRMED:         'bg-green-100 text-green-700',
  COMPLETED:         'bg-blue-100 text-blue-700',
  CANCELLED:         'bg-red-100 text-red-700',
  PANDIT_CANCELLED:  'bg-orange-100 text-orange-700',
};

export function MyBookings() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data: bookings = [], isLoading } = useQuery<any[]>({
    queryKey: ['my-bookings'],
    queryFn: bookingService.myBookings,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">My Bookings</h1>
      <p className="text-gray-500 text-sm mb-6">All your ceremony bookings</p>

      {bookings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-lg font-medium">No bookings yet</p>
          <a href="/pandits" className="inline-block mt-4 bg-orange-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-orange-600 transition-all">
            Book a Pandit
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b: any) => (
            <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all"
                onClick={() => setExpanded(expanded === b.id ? null : b.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">🙏</div>
                  <div>
                    <p className="font-bold text-gray-800">{b.eventType}</p>
                    <p className="text-xs text-gray-400">
                      {b.eventDate ? new Date(b.eventDate).toLocaleDateString('en-NP') : b.date}
                      {' · '}{b.district}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_BADGE[b.status] || 'bg-gray-100 text-gray-600'}`}>
                    {b.status}
                  </span>
                  <span className="text-gray-400 text-sm">{expanded === b.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expanded === b.id && (
                <div className="px-5 pb-5 border-t border-gray-50 pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">📅 Date & Time</p>
                    <p className="font-medium text-gray-700">
                      {b.eventDate ? new Date(b.eventDate).toLocaleString('en-NP') : '—'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">📍 Location</p>
                    <p className="font-medium text-gray-700">{b.address || b.district || '—'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">🙏 Pandit</p>
                    <p className="font-medium text-gray-700">
                      {b.pandit?.user?.profile?.fullName || 'Being assigned…'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">💳 Payment</p>
                    <p className={`font-semibold ${b.paymentStatus === 'PAID' ? 'text-green-600' : 'text-orange-600'}`}>
                      {b.paymentStatus || 'UNPAID'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">💰 Amount</p>
                    <p className="font-medium text-gray-700">Rs. {b.totalAmount?.toLocaleString() || '—'}</p>
                  </div>
                  {b.status === 'PANDIT_CANCELLED' && (
                    <div className="bg-orange-50 rounded-xl p-3 col-span-2 sm:col-span-3">
                      <p className="text-xs text-orange-700 font-medium">⚠️ Original pandit cancelled. Emergency pandit is being assigned — you will be notified shortly.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
