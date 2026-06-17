import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function AdminPackages() {
  const queryClient = useQueryClient();
  const [newPkg, setNewPkg] = useState({ name: '', description: '', price: 0 });

  const { data: packages = [], isLoading } = useQuery<any[]>({
    queryKey: ['packages'],
    queryFn:  () => api.get('/packages').then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (pkg: any) => api.post('/packages', pkg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      setNewPkg({ name: '', description: '', price: 0 });
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Packages</h1>
      <p className="text-gray-500 mb-6">Create and manage ceremony packages for customers.</p>

      <div className="card p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Add Package</h2>
        <form onSubmit={e => { e.preventDefault(); addMutation.mutate(newPkg); }} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input type="text"   placeholder="Package name" value={newPkg.name}        onChange={e => setNewPkg({...newPkg, name: e.target.value})}        className="input-field" required />
            <input type="number" placeholder="Price (NPR)"  value={newPkg.price}       onChange={e => setNewPkg({...newPkg, price: +e.target.value})}       className="input-field" min={0} required />
          </div>
          <input type="text" placeholder="Description (optional)" value={newPkg.description} onChange={e => setNewPkg({...newPkg, description: e.target.value})} className="input-field" />
          <button type="submit" disabled={addMutation.isPending} className="btn-primary">
            {addMutation.isPending ? 'Adding…' : '+ Add Package'}
          </button>
        </form>
      </div>

      {isLoading ? <LoadingSpinner /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {packages.map((p: any) => (
            <div key={p.id} className="card p-5">
              <p className="font-bold text-gray-800 text-lg">{p.name}</p>
              {p.description && <p className="text-sm text-gray-500 mt-1">{p.description}</p>}
              <p className="text-orange-600 font-semibold text-xl mt-3">NPR {p.price?.toLocaleString()}</p>
            </div>
          ))}
          {packages.length === 0 && <p className="text-gray-400 col-span-3 text-center py-8">No packages yet.</p>}
        </div>
      )}
    </div>
  );
}
