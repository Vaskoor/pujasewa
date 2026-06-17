import { useSearchParams, Link } from 'react-router-dom';

export function PaymentSuccess() {
  const [params] = useSearchParams();
  const bookingId = params.get('bookingId') || '';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-green-200 p-10 text-center">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Your payment has been received. Our team will assign the nearest available pandit within minutes.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-left space-y-2 mb-6">
          <p className="font-semibold text-green-800">✅ What happens next:</p>
          <p className="text-gray-600">• PanditJi assigns the nearest available pandit</p>
          <p className="text-gray-600">• Pandit receives your venue location &amp; event time only</p>
          <p className="text-gray-600">• Your phone number stays private — we mediate all contact</p>
          <p className="text-gray-600">• You'll get a confirmation message shortly</p>
          <p className="text-gray-600">• If pandit cancels, emergency backup is sent automatically</p>
        </div>

        {bookingId && (
          <p className="text-xs text-gray-400 mb-5">Booking ID: <span className="font-mono">{bookingId}</span></p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/dashboard/bookings" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all text-sm">
            View My Bookings
          </Link>
          <Link to="/" className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-3 rounded-xl transition-all text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
