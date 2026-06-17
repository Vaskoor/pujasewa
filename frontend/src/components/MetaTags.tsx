import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import api from '../services/api';

interface MetaTagsProps {
  slug?: string;          // CMS page slug
  title?: string;         // override title
  description?: string;   // override description
  image?: string;
}

const DEFAULT_TITLE = 'PujaSewa – Book Pandits, Packages & Decorations in Nepal';
const DEFAULT_DESCRIPTION = 'Find verified pandits, ceremony packages, decorations, venues, and bridal services for Hindu ceremonies in Nepal. Easy online booking.';
const DEFAULT_IMAGE = '/og-image.jpg';
const SITE_URL = import.meta.env.VITE_FRONTEND_URL || 'https://pujasewa.com';

export function MetaTags({ slug, title, description, image }: MetaTagsProps) {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(!!slug);

  useEffect(() => {
    if (slug) {
      api.get(`/cms/${slug}`)
        .then(res => setCmsData(res.data))
        .catch(() => setCmsData(null))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return null;

  const metaTitle = title || cmsData?.title || DEFAULT_TITLE;
  const metaDescription = description || cmsData?.seoMeta?.description || DEFAULT_DESCRIPTION;
  const metaImage = image || cmsData?.seoMeta?.image || DEFAULT_IMAGE;
  const canonicalUrl = slug ? `${SITE_URL}/cms/${slug}` : SITE_URL;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}
