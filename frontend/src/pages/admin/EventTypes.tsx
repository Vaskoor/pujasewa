import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function AdminEventTypes() {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const { data: events = [], isLoading } = useQuery<any[]>({
    queryKey: ['events'],
    queryFn:  () => api.get('/events').then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (name: string) => api.post('/events', { name }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['events'] }); setName(''); setError(''); },
    onError:   (err: any) => setError(err.response?.data?.message || 'Failed to add'),
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addMutation.mutate(name.trim());
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Event Types</h1>
      <p className="text-gray-500 mb-6">Manage available ceremony types for bookings.</p>

      <div className="card p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Add New Event Type</h2>
        {error && <p className="text-red-600 text-sm mb-3">⚠️ {error}</p>}
        <form onSubmit={handleAdd} className="flex gap-3">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Bratabandha"
            className="input-field flex-1"
          />
          <button type="submit" disabled={addMutation.isPending} className="btn-primary">
            Add
          </button>
        </form>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? <LoadingSpinner /> : (
          <ul className="divide-y divide-gray-100">
            {events.map((ev: any) => (
              <li key={ev.id} className="px-6 py-3 flex items-center gap-3">
                <span className="text-lg">📿</span>
                <span className="font-medium text-gray-800">{ev.name}</span>
              </li>
            ))}
            {events.length === 0 && (
              <li className="px-6 py-8 text-center text-gray-400">No event types yet.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
