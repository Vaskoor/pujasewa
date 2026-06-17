export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className={`${sz} border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin`} />
      <p className="text-sm text-gray-400">Loading…</p>
    </div>
  );
}
