import { useState } from 'react';
import api from '../services/api';
export function RescheduleModal({ booking, onClose, onSuccess }: any) {
  if (!booking) return null;
  const [newDate, setNewDate] = useState(booking.eventDate?.split('T')[0] || '');
  const [newTime, setNewTime] = useState(booking.eventTime || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.patch(`/bookings/${booking.id}/reschedule`, { startTime: `${newDate}T${newTime}:00` });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Reschedule failed');
    } finally { setLoading(false); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Reschedule Booking</h2>
        {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="input-field mb-3" min={new Date().toISOString().split('T')[0]} required />
          <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="input-field mb-4" required />
          <div className="flex gap-3"><button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button><button type="submit" disabled={loading} className="btn-primary flex-1">{loading ? 'Saving...' : 'Confirm'}</button></div>
        </form>
      </div>
    </div>
  );
}
