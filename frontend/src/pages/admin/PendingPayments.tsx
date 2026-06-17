import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function AdminPendingPayments() {
  const qc = useQueryClient();

  const { data: pending = [], isLoading } = useQuery<any[]>({
    queryKey: ['pending-payments'],
    queryFn: () => api.get('/admin/pending-payments').then(r => r.data),
  });

  const confirm = useMutation({
    mutationFn: (id: string) => api.post(`/admin/confirm-payment/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pending-payments'] }),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Pending Payments</h1>
      <p className="text-gray-500 text-sm mb-6">
        Manually verify QR payments and confirm bookings here.
      </p>

      {pending.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">✅</div>
          <p>No pending payments — all clear!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((b: any) => (
            <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="font-bold text-gray-800">{b.eventType} — {b.district}</p>
                <p className="text-sm text-gray-500">
                  {b.eventDate ? new Date(b.eventDate).toLocaleString('en-NP') : '—'}
                </p>
                <p className="text-xs font-mono text-gray-400">ID: {b.id?.slice(0,12)}…</p>
                <p className="text-sm font-semibold text-orange-600">
                  Rs. {b.totalAmount?.toLocaleString() || '—'}
                </p>
              </div>
              <button
                onClick={() => confirm.mutate(b.id)}
                disabled={confirm.isPending}
                className="bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shrink-0"
              >
                ✅ Confirm Payment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
