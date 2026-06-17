import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const ROLE_COLOR: Record<string, string> = {
  ADMIN:    'bg-purple-100 text-purple-700',
  PANDIT:   'bg-green-100 text-green-700',
  CUSTOMER: 'bg-blue-100 text-blue-700',
};

export function AdminUsers() {
  const { data: users = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-users'],
    queryFn:  () => api.get('/admin/users').then(r => r.data),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Users</h1>
      <p className="text-gray-500 mb-6">All registered users on the platform.</p>

      <div className="card overflow-hidden">
        {isLoading ? <LoadingSpinner /> : (
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {['Email', 'Role', 'Phone', 'Joined'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-sm text-gray-800">{u.email}</td>
                  <td className="px-6 py-3">
                    <span className={`badge ${ROLE_COLOR[u.role] ?? 'bg-gray-100 text-gray-600'}`}>{u.role}</span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">{u.phone || '—'}</td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
