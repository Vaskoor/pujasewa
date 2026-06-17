import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    try {
      await api.post('/auth/reset-password', { token, newPassword: password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError('Invalid or expired token');
    }
  };

  if (!token) return <div className="text-center py-20">Invalid reset link.</div>;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="card p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
        {success ? (
          <div className="text-center">
            <div className="text-5xl mb-4">✅</div>
            <p className="mb-4">Password reset successful! Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>}
            <input type="password" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} required className="input-field" />
            <input type="password" placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} required className="input-field" />
            <button type="submit" className="btn-primary w-full">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}
