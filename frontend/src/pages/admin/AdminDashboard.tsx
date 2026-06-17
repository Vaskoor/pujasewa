import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function AdminDashboard() {
  const { data: stats, isLoading } = useQuery<any>({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/admin/stats').then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Platform overview</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users',    value: stats?.totalUsers    ?? 0, color: 'text-blue-600',   bg: 'bg-blue-50'   },
          { label: 'Pandits',        value: stats?.totalPandits  ?? 0, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Total Bookings', value: stats?.totalBookings ?? 0, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Revenue (NPR)',  value: `Rs. ${(stats?.totalRevenue ?? 0).toLocaleString()}`, color: 'text-green-600', bg: 'bg-green-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-5 border border-white shadow-sm`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/dashboard/pandits" className="bg-white rounded-2xl border-2 border-orange-200 hover:border-orange-400 p-5 transition-all hover:shadow-md">
          <div className="text-3xl mb-2">🙏</div>
          <p className="font-bold text-gray-800">Manage Pandits</p>
          <p className="text-xs text-gray-500 mt-1">Approve, verify, and manage pandit profiles</p>
        </Link>
        <Link to="/dashboard/pending-payments" className="bg-white rounded-2xl border-2 border-green-200 hover:border-green-400 p-5 transition-all hover:shadow-md">
          <div className="text-3xl mb-2">💰</div>
          <p className="font-bold text-gray-800">Pending Payments</p>
          <p className="text-xs text-gray-500 mt-1">Verify QR payments and confirm bookings</p>
        </Link>
        <Link to="/dashboard/packages" className="bg-white rounded-2xl border-2 border-purple-200 hover:border-purple-400 p-5 transition-all hover:shadow-md">
          <div className="text-3xl mb-2">📦</div>
          <p className="font-bold text-gray-800">Packages & Decor</p>
          <p className="text-xs text-gray-500 mt-1">Add and manage ceremony packages</p>
        </Link>
      </div>

      {stats?.recentBookings?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Bookings</h2>
          <div className="space-y-3">
            {stats.recentBookings.slice(0, 8).map((b: any) => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{b.eventType} — {b.district}</p>
                  <p className="text-xs text-gray-400">
                    {b.eventDate ? new Date(b.eventDate).toLocaleDateString('en-NP') : '—'}
                    {b.pandit?.user?.profile?.fullName ? ` · ${b.pandit.user.profile.fullName}` : ''}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                  b.status === 'PENDING'   ? 'bg-yellow-100 text-yellow-700' :
                  b.status === 'CANCELLED' || b.status === 'PANDIT_CANCELLED' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-600'
                }`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
