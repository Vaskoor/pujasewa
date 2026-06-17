import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag, BookOpen, Search } from 'lucide-react';

const categories = ['All', 'Weddings', 'Pujas', 'Traditions', 'Planning', 'Spirituality'];

const blogPosts = [
  {
    id: 1,
    slug: 'essential-rituals-nepali-wedding',
    title: 'Essential Rituals in a Traditional Nepali Wedding',
    excerpt: 'From Kanyadaan to Saptapadi, discover the sacred rituals that make a Nepali Hindu wedding a divine union of two souls and their families.',
    category: 'Weddings',
    author: 'Pandit Ramesh Sharma',
    date: 'June 5, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop',
    featured: true,
  },
  {
    id: 2,
    slug: 'griha-pravesh-muhurat-2026',
    title: 'Griha Pravesh Muhurat Dates for 2026',
    excerpt: 'Plan your housewarming ceremony with our comprehensive guide to auspicious dates, rituals, and preparations for Griha Pravesh in 2026.',
    category: 'Pujas',
    author: 'Astrologer Deepak Joshi',
    date: 'May 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop',
    featured: false,
  },
  {
    id: 3,
    slug: 'significance-bratabandha-ceremony',
    title: 'The Sacred Significance of Bratabandha Ceremony',
    excerpt: 'Understanding the Upanayana sanskar — the sacred thread ceremony that marks a boy\'s spiritual initiation into Vedic learning and Brahminical duties.',
    category: 'Traditions',
    author: 'Pandit Gopal Acharya',
    date: 'May 20, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=400&fit=crop',
    featured: false,
  },
  {
    id: 4,
    slug: 'choosing-right-pandit-wedding',
    title: 'How to Choose the Right Pandit for Your Wedding',
    excerpt: 'A complete guide to selecting a qualified Vedic priest who aligns with your family traditions, language preferences, and ceremony requirements.',
    category: 'Planning',
    author: 'PanditJi Editorial Team',
    date: 'May 15, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop',
    featured: false,
  },
  {
    id: 5,
    slug: 'satyanarayan-katha-significance',
    title: 'Satyanarayan Katha: Significance and Procedure',
    excerpt: 'Learn about the divine story of Lord Satyanarayan, the proper vidhi for conducting the puja, and the blessings it brings to your home and family.',
    category: 'Pujas',
    author: 'Pandit Suresh Upadhyaya',
    date: 'May 8, 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=800&h=400&fit=crop',
    featured: false,
  },
  {
    id: 6,
    slug: 'shraddha-ceremony-guide',
    title: 'A Complete Guide to Shraddha Ceremony',
    excerpt: 'Honoring our ancestors through proper Shraddha rituals. Understanding the significance of Pind Daan, Tarpan, and the spiritual connection across generations.',
    category: 'Traditions',
    author: 'Pandit Krishna Prasad',
    date: 'April 30, 2026',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&h=400&fit=crop',
    featured: false,
  },
  {
    id: 7,
    slug: 'wedding-decoration-trends-2026',
    title: 'Wedding Decoration Trends in Nepal for 2026',
    excerpt: 'From traditional marigold mandaps to modern floral installations, explore the latest trends in Nepali wedding decorations that blend heritage with contemporary elegance.',
    category: 'Planning',
    author: 'Decor Team Nepal',
    date: 'April 22, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop',
    featured: false,
  },
  {
    id: 8,
    slug: 'power-of-mantra-chanting',
    title: 'The Transformative Power of Mantra Chanting',
    excerpt: 'Discover how regular chanting of Vedic mantras can bring peace, prosperity, and spiritual growth to your daily life according to ancient scriptures.',
    category: 'Spirituality',
    author: 'Swami Ananda Giri',
    date: 'April 15, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=400&fit=crop',
    featured: false,
  },
];

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-white/20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-white/10" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <BookOpen className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">Wisdom & Guidance</span>
          </div>
          <h1 className="font-serif font-bold text-white mb-6">
            PanditJi Blog
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Insights, guides, and spiritual wisdom for your sacred ceremonies and celebrations.
            Written by experienced pandits and ceremony experts.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgb(var(--color-text-muted))' }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgb(var(--color-primary))', color: 'white' }}>
                    Featured
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>
                    <Tag className="w-3 h-3" /> {featuredPost.category}
                  </span>
                </div>
                <h2 className="font-serif font-semibold text-2xl mb-4" style={{ color: 'rgb(var(--color-text))' }}>
                  {featuredPost.title}
                </h2>
                <p className="mb-6" style={{ color: 'rgb(var(--color-text-muted))' }}>
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6 text-sm" style={{ color: 'rgb(var(--color-text-muted))' }}>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {featuredPost.readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="btn-primary self-start"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-y" style={{ borderColor: 'rgb(var(--color-border))', backgroundColor: 'rgb(var(--color-surface))' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeCategory === cat ? 'rgb(var(--color-primary))' : 'transparent',
                  color: activeCategory === cat ? 'white' : 'rgb(var(--color-text-muted))',
                  border: `1.5px solid ${activeCategory === cat ? 'rgb(var(--color-primary))' : 'rgb(var(--color-border))'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4" style={{ backgroundColor: 'rgb(var(--color-background))' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.filter(p => p.id !== featuredPost.id).map((post) => (
              <article key={post.id} className="card overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgb(var(--color-secondary))', color: 'rgb(var(--color-primary))' }}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-serif font-semibold text-lg mb-3 group-hover:underline" style={{ color: 'rgb(var(--color-text))' }}>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: 'rgb(var(--color-text-muted))' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: 'rgb(var(--color-primary))' }} />
              <p className="text-lg font-medium" style={{ color: 'rgb(var(--color-text-muted))' }}>
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4" style={{ backgroundColor: 'rgb(var(--color-secondary))' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif font-semibold mb-4" style={{ color: 'rgb(var(--color-text))' }}>
            Stay Spiritually Informed
          </h2>
          <p className="mb-8" style={{ color: 'rgb(var(--color-text-muted))' }}>
            Subscribe to our newsletter for muhurat dates, ceremony guides, and spiritual wisdom delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
