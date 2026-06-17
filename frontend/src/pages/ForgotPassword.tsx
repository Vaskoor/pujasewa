import { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="card p-8 text-center max-w-md">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-xl font-bold text-gray-800">Check your inbox</h2>
          <p className="mt-2 text-gray-600">If an account exists for {email}, you will receive a password reset link.</p>
          <Link to="/login" className="btn-secondary mt-6 inline-block">Back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="card p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-2">Forgot Password?</h1>
        <p className="text-center text-gray-500 mb-6">Enter your email to reset your password.</p>
        {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="input-field" />
          <button type="submit" className="btn-primary w-full">Send Reset Link</button>
        </form>
        <p className="text-center mt-4 text-sm"><Link to="/login" className="text-orange-500">Back to Login</Link></p>
      </div>
    </div>
  );
}
