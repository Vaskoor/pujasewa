import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function CustomerProfile() {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);
  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/users/profile').then(r => r.data),
  });
  const { register, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: (data: any) => api.put('/users/profile', data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['profile'] }); setSaved(true); setTimeout(() => setSaved(false), 3000); },
  });
  // Password change
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const changePasswordMutation = useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string }) => api.post('/users/change-password', data),
    onSuccess: () => { setPwdSuccess(true); setOldPassword(''); setNewPassword(''); setConfirmPassword(''); setTimeout(() => setPwdSuccess(false), 3000); },
    onError: (err: any) => setPwdError(err.response?.data?.message || 'Failed to change password')
  });
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setPwdError('Passwords do not match'); return; }
    if (newPassword.length < 6) { setPwdError('Password must be at least 6 characters'); return; }
    setPwdError('');
    changePasswordMutation.mutate({ oldPassword, newPassword });
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">My Profile</h1>
      <p className="text-gray-500 mb-8">Keep your details up to date.</p>
      <div className="card p-8">
        {saved && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-5 text-sm">✅ Profile updated!</div>}
        {mutation.isError && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">⚠️ Failed to update.</div>}
        <form onSubmit={handleSubmit(d => mutation.mutate(d))} className="space-y-5">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input {...register('fullName', { required: true })} defaultValue={user?.profile?.fullName} className="input-field" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><input {...register('address')} defaultValue={user?.profile?.address} className="input-field" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input {...register('phone')} defaultValue={user?.phone} className="input-field" /></div>
          <button type="submit" disabled={mutation.isPending} className="btn-primary w-full py-2.5">{mutation.isPending ? 'Saving…' : 'Save Changes'}</button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h2>
          {pwdSuccess && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-4 text-sm">✅ Password changed!</div>}
          {pwdError && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">⚠️ {pwdError}</div>}
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label><input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">New Password</label><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="input-field" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="input-field" /></div>
            <button type="submit" disabled={changePasswordMutation.isPending} className="btn-secondary w-full py-2.5">{changePasswordMutation.isPending ? 'Updating...' : 'Update Password'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
