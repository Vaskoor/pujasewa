import { useState } from 'react';
import api from '../services/api';

interface Props {
  booking: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReviewModal({ booking, onClose, onSuccess }: Props) {
  const [rating,     setRating]     = useState(5);
  const [comment,    setComment]    = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState('');

  const panditName = booking.pandit?.user?.profile?.fullName || 'the Pandit';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) { setError('Please write a comment.'); return; }
    setSubmitting(true);
    setError('');
    try {
      await api.post('/reviews', {
        bookingId: booking.id,
        panditId:  booking.pandit?.id,
        rating,
        comment: comment.trim(),
      });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const LABELS = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Leave a Review</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Share your experience with <strong>{panditName}</strong> for <strong>{booking.eventType?.name}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Star picker */}
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-4xl transition-all duration-100 hover:scale-125 focus:outline-none ${
                    star <= rating ? 'text-yellow-400 scale-110' : 'text-gray-200 hover:text-yellow-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-600">{LABELS[rating - 1]}</p>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your review</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder={`How was your experience with ${panditName}?`}
              className="input-field text-sm"
              rows={4}
              required
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{comment.length}/500</p>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="btn-secondary flex-1" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="flex-1 btn-primary">
              {submitting ? 'Submitting…' : 'Submit Review ⭐'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
