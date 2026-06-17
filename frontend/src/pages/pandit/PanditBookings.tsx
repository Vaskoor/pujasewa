import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const STATUS_BADGE: Record<string, string> = {
  PENDING:   'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export function PanditBookings() {
  const qc = useQueryClient();
  const [cancelId, setCancelId]     = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelError, setCancelError]   = useState('');

  const { data: bookings = [], isLoading } = useQuery<any[]>({
    queryKey: ['pandit-bookings'],
    queryFn: () => api.get('/pandits/my-bookings').then(r => Array.isArray(r.data) ? r.data : []),
  });

  const cancelMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      api.patch(`/bookings/${id}/cancel`, { reason }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['pandit-bookings'] });
      setCancelId(null); setCancelReason(''); setCancelError('');
    },
    onError: (err: any) => setCancelError(err.response?.data?.message || 'Could not cancel.'),
  });

  const canCancel = (booking: any) => {
    const eventDate = new Date(booking.eventDate || booking.date);
    const diff = (eventDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff >= 2 && ['PENDING','CONFIRMED'].includes(booking.status);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">My Assigned Bookings</h1>
      <p className="text-gray-500 text-sm mb-6">
        You can see your event location and time only — customer details are kept confidential by PanditJi.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700 mb-6 flex gap-2">
        <span>🔒</span>
        <span>Customer phone numbers are <strong>never</strong> shared. Contact the customer through PanditJi support if needed.</span>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">📭</div>
          <p>No bookings assigned yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b: any) => (
            <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">{b.eventType || 'Ceremony'}</h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">#{b.id?.slice(0,8)}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_BADGE[b.status] || 'bg-gray-100 text-gray-600'}`}>
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">📅 Date &amp; Time</p>
                  <p className="font-medium text-gray-700">
                    {b.eventDate ? new Date(b.eventDate).toLocaleDateString('en-NP') : b.date}
                    {b.eventTime || b.time ? ` at ${b.eventTime || b.time}` : ''}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">📍 Location</p>
                  <p className="font-medium text-gray-700">{b.district || b.location || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">🏠 Venue</p>
                  <p className="font-medium text-gray-700">{b.address || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-0.5">⏱ Duration</p>
                  <p className="font-medium text-gray-700">{b.duration ? `${b.duration} min` : '—'}</p>
                </div>
              </div>

              {/* Customer info — NEVER show phone */}
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-xs text-yellow-800 mb-4">
                <p>🙏 <strong>Event Type:</strong> {b.eventType} &nbsp;|&nbsp; <strong>Religion:</strong> {b.religion || 'N/A'} &nbsp;|&nbsp; <strong>Caste:</strong> {b.caste || 'N/A'}</p>
              </div>

              {canCancel(b) && (
                <button
                  onClick={() => { setCancelId(b.id); setCancelError(''); }}
                  className="text-sm text-red-500 hover:text-red-600 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                >
                  Cancel Appointment
                </button>
              )}
              {!canCancel(b) && ['PENDING','CONFIRMED'].includes(b.status) && (
                <p className="text-xs text-gray-400 italic">
                  ⚠️ Cancellations must be made at least 2 days before the event.
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Cancel Modal */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Cancel Appointment</h3>
            <p className="text-sm text-gray-500 mb-4">
              Please provide a reason. PanditJi will immediately assign an emergency pandit to ensure the customer is not affected.
            </p>
            {cancelError && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-3">{cancelError}</p>}
            <textarea
              value={cancelReason}
              onChange={e => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation (illness, emergency, etc.)"
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)} className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-xl hover:bg-gray-50">
                Keep Appointment
              </button>
              <button
                onClick={() => cancelMutation.mutate({ id: cancelId, reason: cancelReason })}
                disabled={!cancelReason.trim() || cancelMutation.isPending}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-all"
              >
                {cancelMutation.isPending ? 'Cancelling…' : 'Cancel Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
