import { Link } from 'react-router-dom';

export function PaymentFailure() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="card p-10 text-center max-w-md">
        <div className="text-5xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
        <p className="text-gray-500 mb-8">
          Something went wrong with your payment. Your booking has not been confirmed.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => window.history.back()} className="btn-primary">Try Again</button>
          <Link to="/dashboard" className="btn-secondary">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
