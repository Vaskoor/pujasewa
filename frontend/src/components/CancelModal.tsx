import { useState } from 'react';

interface Props {
  booking: any;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading: boolean;
}

export function CancelModal({ booking, onClose, onConfirm, isLoading }: Props) {
  const [reason, setReason] = useState('');
  const REASONS = [
    'Change of plans',
    'Date conflict',
    'Found another pandit',
    'Financial constraints',
    'Family emergency',
    'Other',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>

        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Cancel Booking</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Cancel <strong>{booking.eventType?.name}</strong> on{' '}
            {new Date(booking.eventDate).toLocaleDateString('en-NP', { dateStyle: 'medium' })}?
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            ⚠️ Cancellations may be subject to a cancellation fee depending on how close to the event date.
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for cancellation</label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {REASONS.map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setReason(r)}
                  className={`text-sm text-left px-3 py-2 rounded-lg border transition-all ${
                    reason === r
                      ? 'border-orange-400 bg-orange-50 text-orange-700 font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <textarea
              placeholder="Any additional details (optional)…"
              value={reason.startsWith(REASONS.slice(0,-1).join('|')) ? '' : reason === REASONS[5] ? '' : ''}
              onChange={e => setReason(e.target.value)}
              className="input-field text-sm"
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-secondary flex-1" disabled={isLoading}>
              Keep Booking
            </button>
            <button
              onClick={() => reason && onConfirm(reason)}
              disabled={!reason || isLoading}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Cancelling…' : 'Yes, Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
