import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function AdminPandits() {
  const queryClient = useQueryClient();
  const { data: pandits = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-pandits'],
    queryFn: () => api.get('/admin/pandits').then(r => r.data),
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, approve, adminNote }: { id: string; approve: boolean; adminNote?: string }) =>
      api.patch(`/admin/pandits/${id}/approve`, { approve, adminNote }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-pandits'] }),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Pandit Approvals</h1>
      <p className="text-gray-500 mb-6">Review and approve pandit applications.</p>

      {isLoading ? <LoadingSpinner /> : (
        <div className="space-y-3">
          {pandits.map((p: any) => (
            <div key={p.id} className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-gray-800">{p.user?.profile?.fullName}</p>
                <p className="text-sm text-gray-500">{p.user?.email} · {p.experienceYears} yrs</p>
                {p.specializations?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.specializations.map((s: any) => (
                      <span key={s.id} className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">
                        {s.eventType?.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`badge ${p.isApproved ? 'badge-confirmed' : 'badge-pending'}`}>
                  {p.isApproved ? 'Approved' : p.verificationStatus}
                </span>
                {!p.isApproved && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveMutation.mutate({ id: p.id, approve: true })}
                      disabled={approveMutation.isPending}
                      className="btn-primary text-sm py-1.5 px-4"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => approveMutation.mutate({ id: p.id, approve: false, adminNote: 'Not meeting requirements' })}
                      disabled={approveMutation.isPending}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm py-1.5 px-4 rounded-lg transition-all"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {pandits.length === 0 && (
            <p className="text-gray-400 text-center py-12">No pending pandit applications.</p>
          )}
        </div>
      )}
    </div>
  );
}
