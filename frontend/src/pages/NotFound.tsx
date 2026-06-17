import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'rgb(var(--color-background))' }}>
      <div className="max-w-lg w-full text-center">
        {/* Decorative element */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(var(--color-secondary))' }}>
            <Search className="w-10 h-10" style={{ color: 'rgb(var(--color-primary))' }} />
          </div>
        </div>
        
        <h1 className="font-serif font-bold mb-4" style={{ color: 'rgb(var(--color-text))' }}>
          404
        </h1>
        <h2 className="font-serif text-2xl font-semibold mb-4" style={{ color: 'rgb(var(--color-primary))' }}>
          Page Not Found
        </h2>
        <p className="mb-8" style={{ color: 'rgb(var(--color-text-muted))' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
        
        {/* Decorative divider */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-16" style={{ backgroundColor: 'rgb(var(--color-border))' }} />
          <span className="text-2xl">🪔</span>
          <div className="h-px w-16" style={{ backgroundColor: 'rgb(var(--color-border))' }} />
        </div>
      </div>
    </div>
  );
}
