import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function CmsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    api.get(`/cms/${slug}`)
      .then(res => setPage(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error || !page) return <div className="text-center py-20 text-gray-500">Page not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
      <h1 className="font-serif text-3xl font-bold mb-4">{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
