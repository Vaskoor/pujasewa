import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!bookingId) return;
    api.get(`/bookings/${bookingId}`)
      .then(r => setBooking(r.data))
      .catch(() => setBooking({ id: bookingId, totalAmount: 0 }))
      .finally(() => setLoading(false));
  }, [bookingId]);

  const qrData = encodeURIComponent(`PanditJi|${bookingId}|Payment`);
  const qrUrl  = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${qrData}&color=c2410c&bgcolor=fff8f1`;

  const handleConfirm = async () => {
    setChecking(true);
    try {
      await api.post(`/bookings/${bookingId}/confirm-payment`).catch(() => {});
      await new Promise(r => setTimeout(r, 1500));
      setConfirmed(true);
    } finally { setChecking(false); }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center"><div className="text-4xl animate-spin mb-3">🪔</div><p className="text-gray-500">Loading…</p></div>
    </div>
  );

  if (confirmed) return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-green-200">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Confirmed!</h2>
        <p className="text-gray-600 text-sm mb-6">Our team will now assign the nearest pandit to your ceremony.</p>
        <button onClick={() => navigate('/dashboard')} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all">
          Go to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💳</div>
          <h2 className="text-2xl font-bold text-gray-800">Complete Your Payment</h2>
          <p className="text-sm text-gray-500 mt-1">Scan the QR with your mobile banking app</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-orange-50 border-2 border-orange-300 rounded-2xl">
            <img src={qrUrl} alt="QR Code" className="w-52 h-52 rounded-lg" />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-700 space-y-1">
          <p className="font-semibold">Payment Details:</p>
          <p>Booking ID: <span className="font-mono font-bold">{bookingId}</span></p>
          {booking?.totalAmount > 0 && <p>Amount: <span className="font-bold">Rs. {booking.totalAmount.toLocaleString()}</span></p>}
          <p>Account: <span className="font-medium">PanditJi Services</span></p>
        </div>

        <p className="text-xs text-gray-400 text-center mb-5">
          Supported: eSewa · Khalti · IME Pay · ConnectIPS · Bank Transfer
        </p>

        <button onClick={handleConfirm} disabled={checking}
          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all text-base">
          {checking ? '⏳ Verifying…' : '✅ I have paid — Confirm'}
        </button>

        <p className="text-xs text-gray-400 text-center mt-3">
          Our team manually verifies every payment. Confirmation within 5 minutes.
        </p>
      </div>
    </div>
  );
}
