import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function AdminInventory() {
  const queryClient = useQueryClient();
  const [newItem, setNewItem] = useState({ name: '', category: '', stockQuantity: 0, unitPrice: 0 });
  const [error, setError] = useState('');

  const { data: items = [], isLoading } = useQuery<any[]>({
    queryKey: ['inventory'],
    queryFn:  () => api.get('/inventory').then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (item: any) => api.post('/inventory', item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      setNewItem({ name: '', category: '', stockQuantity: 0, unitPrice: 0 });
    },
    onError: (err: any) => setError(err.response?.data?.message || 'Failed to add item'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    addMutation.mutate(newItem);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Inventory</h1>
      <p className="text-gray-500 mb-6">Manage puja items and supplies.</p>

      {/* Add Form */}
      <div className="card p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Add Item</h2>
        {error && <p className="text-red-600 text-sm mb-3">⚠️ {error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <input type="text"   placeholder="Item name"  value={newItem.name}          onChange={e => setNewItem({...newItem, name: e.target.value})}          className="input-field" required />
          <input type="text"   placeholder="Category"   value={newItem.category}      onChange={e => setNewItem({...newItem, category: e.target.value})}      className="input-field" />
          <input type="number" placeholder="Stock qty"  value={newItem.stockQuantity} onChange={e => setNewItem({...newItem, stockQuantity: +e.target.value})} className="input-field" min={0} />
          <input type="number" placeholder="Unit price" value={newItem.unitPrice}     onChange={e => setNewItem({...newItem, unitPrice: +e.target.value})}     className="input-field" min={0} />
          <button type="submit" disabled={addMutation.isPending} className="btn-primary col-span-2 md:col-span-4">
            {addMutation.isPending ? 'Adding…' : '+ Add Item'}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {isLoading ? <LoadingSpinner /> : (
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {['Item', 'Category', 'Stock', 'Unit Price (NPR)'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {items.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-500">{item.category}</td>
                  <td className="px-6 py-3">
                    <span className={`badge ${item.stockQuantity < 5 ? 'badge-cancelled' : 'badge-confirmed'}`}>
                      {item.stockQuantity}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">{item.unitPrice?.toLocaleString()}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No inventory items yet.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
