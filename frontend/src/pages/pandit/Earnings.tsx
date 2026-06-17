import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function PanditEarnings() {
  const { data, isLoading } = useQuery({
    queryKey: ['earnings'],
    queryFn:  () => api.get('/pandits/me/earnings').then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!data) return <div className="text-center py-10 text-gray-500">No earnings data available.</div>;

  const total       = data.total       ?? 0;
  const thisMonth   = data.thisMonth   ?? 0;
  const bookings    = data.bookings    ?? [];
  const pending     = data.pending     ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Earnings</h1>
      <p className="text-gray-500 mb-8">Your revenue summary and transaction history.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card bg-green-50 p-6">
          <p className="text-sm text-gray-500">Total Earned</p>
          <p className="text-2xl font-bold text-green-700 mt-1">NPR {total.toLocaleString()}</p>
        </div>
        <div className="card bg-blue-50 p-6">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">NPR {thisMonth.toLocaleString()}</p>
        </div>
        <div className="card bg-yellow-50 p-6">
          <p className="text-sm text-gray-500">Pending Payout</p>
          <p className="text-2xl font-bold text-yellow-700 mt-1">NPR {pending.toLocaleString()}</p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No completed bookings yet.</p>
        ) : (
          <div className="space-y-2">
            {bookings.map((b: any) => (
              <div key={b.id} className="flex justify-between items-center border border-gray-100 rounded-lg p-3">
                <div>
                  <p className="font-medium text-gray-800">{b.eventType?.name}</p>
                  <p className="text-sm text-gray-500">{new Date(b.eventDate).toLocaleDateString('en-NP', { dateStyle: 'medium' })}</p>
                </div>
                <p className="font-semibold text-green-600">NPR {b.amount?.toLocaleString() ?? '—'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
