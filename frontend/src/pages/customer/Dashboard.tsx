import { useQuery } from '@tanstack/react-query';
import { Link }     from 'react-router-dom';
import api          from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useAuthStore }   from '../../store/authStore';

const STATUS_CLASS: Record<string, string> = {
  PENDING:   'badge-pending',
  CONFIRMED: 'badge-confirmed',
  COMPLETED: 'badge-completed',
  CANCELLED: 'badge-cancelled',
};

export function CustomerDashboard() {
  const { user } = useAuthStore();
  const { data: bookings = [], isLoading } = useQuery<any[]>({
    queryKey: ['my-bookings'],
    queryFn:  () => api.get('/users/bookings').then(r => r.data),
  });

  const stats = {
    total:     bookings.length,
    upcoming:  bookings.filter((b: any) => b.status === 'CONFIRMED').length,
    completed: bookings.filter((b: any) => b.status === 'COMPLETED').length,
    pending:   bookings.filter((b: any) => b.status === 'PENDING').length,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Welcome back{user ? `, ${user.email?.split('@')[0]}` : ''}! 🙏
      </h1>
      <p className="text-gray-500 mb-8">Here's an overview of your bookings.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Bookings', value: stats.total,     color: 'text-gray-800',  bg: 'bg-white' },
          { label: 'Upcoming',       value: stats.upcoming,  color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Completed',      value: stats.completed, color: 'text-blue-600',  bg: 'bg-blue-50' },
          { label: 'Pending',        value: stats.pending,   color: 'text-yellow-600',bg: 'bg-yellow-50' },
        ].map(stat => (
          <div key={stat.label} className={`card ${stat.bg} p-5`}>
            <p className="text-2xl font-bold {stat.color}">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Bookings List */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
          <Link to="/pandits" className="btn-primary text-sm py-1.5 px-4">
            + New Booking
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : bookings.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p>No bookings yet.</p>
            <Link to="/pandits" className="text-orange-500 hover:underline text-sm mt-2 inline-block">
              Find a Pandit →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking: any) => (
              <div key={booking.id} className="flex items-center justify-between border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-800">
                    {booking.eventType?.name ?? 'Ceremony'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.eventDate).toLocaleDateString('en-NP', { dateStyle: 'medium' })}
                    {' · '}{booking.location}
                  </p>
                </div>
                <span className={STATUS_CLASS[booking.status] ?? 'badge bg-gray-100 text-gray-600'}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
