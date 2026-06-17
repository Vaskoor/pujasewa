import { useState } from 'react';

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ eventType, location, date });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 justify-center">
      <input
        type="text"
        placeholder="Event Type (e.g., Marriage)"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        className="px-4 py-2 rounded-lg text-gray-800 w-64"
      />
      <input
        type="text"
        placeholder="Location (District)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-4 py-2 rounded-lg text-gray-800 w-64"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-4 py-2 rounded-lg text-gray-800"
      />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold">
        Search
      </button>
    </form>
  );
}
