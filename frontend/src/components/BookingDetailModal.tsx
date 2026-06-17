import { getGoogleCalendarLink } from '../lib/calendar';

interface Props {
  booking: any;
  onClose: () => void;
}

const ROW = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between py-3 border-b border-gray-50 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800 text-right max-w-[60%]">{value}</span>
  </div>
);

export function BookingDetailModal({ booking, onClose }: Props) {
  const panditName = booking.pandit?.user?.profile?.fullName || '—';
  const panditEmail = booking.pandit?.user?.email || '—';
  const startTime = booking.startTime ? new Date(booking.startTime) : new Date(booking.eventDate);
  const endTime = new Date(startTime.getTime() + (booking.duration || 60) * 60000);
  const googleLink = getGoogleCalendarLink({
    title: `${booking.eventType?.name} with ${panditName}`,
    start: startTime,
    end: endTime,
    description: `Booking ID: ${booking.id}\nLocation: ${booking.location}`,
    location: booking.location,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-t-2xl text-white">
          <div className="flex justify-between items-start">
            <div><p className="text-orange-100 text-sm mb-1">Booking Reference</p><p className="font-mono text-sm bg-white/20 px-2 py-1 rounded">{booking.id.slice(0, 8).toUpperCase()}</p></div>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl leading-none">×</button>
          </div>
          <h2 className="text-2xl font-bold mt-4">{booking.eventType?.name}</h2>
          <p className="text-orange-100 mt-1">with {panditName}</p>
        </div>

        <div className="p-6 space-y-6">
          <section><h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Event Details</h3><div className="bg-gray-50 rounded-xl px-4"><ROW label="Date" value={startTime.toLocaleDateString('en-NP', { dateStyle: 'full' })} /><ROW label="Time" value={booking.eventTime} /><ROW label="Duration" value={`${booking.duration || 60} minutes`} /><ROW label="Location" value={booking.location} /><ROW label="Package" value={booking.package?.name || 'No package'} /></div></section>
          <section><h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pandit</h3><div className="bg-gray-50 rounded-xl px-4"><ROW label="Name" value={panditName} /><ROW label="Email" value={panditEmail} /><ROW label="Experience" value={`${booking.pandit?.experienceYears ?? 0} years`} /></div></section>
          <section><h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Payment</h3><div className="bg-gray-50 rounded-xl px-4"><ROW label="Total Amount" value={`NPR ${booking.totalAmount > 0 ? booking.totalAmount.toLocaleString() : '—'}`} /><ROW label="Payment Status" value={booking.paymentStatus?.replace('_', ' ')} />{booking.payments?.length > 0 && <ROW label="Gateway" value={booking.payments[0].gateway} />}</div></section>
          {booking.cancellationReason && <section><h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Cancellation Reason</h3><div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-700">{booking.cancellationReason}</div></section>}
          {booking.review && <section><h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Review</h3><div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4"><div className="flex gap-0.5 mb-2">{[...Array(5)].map((_, i) => <span key={i} className={i < booking.review.rating ? 'text-yellow-400' : 'text-gray-200'}>★</span>)}</div><p className="text-sm text-gray-700">{booking.review.comment}</p></div></section>}
          <a href={googleLink} target="_blank" rel="noopener noreferrer" className="btn-secondary block w-full text-center mt-3">📅 Add to Google Calendar</a>
          <button onClick={onClose} className="btn-primary w-full">Close</button>
        </div>
      </div>
    </div>
  );
}
