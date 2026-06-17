import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Filter, Search, ArrowRight, Sparkles, Gem, Crown, Gift } from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

// Boutique categories for puja ceremonies
const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: Sparkles },
  { id: 'jewelry', name: 'Temple Jewelry', icon: Gem },
  { id: 'accessories', name: 'Puja Accessories', icon: Crown },
  { id: 'gifts', name: 'Spiritual Gifts', icon: Gift },
  { id: 'clothing', name: 'Ceremonial Clothing', icon: ShoppingBag },
];

// Sample boutique items (in a real app, these would come from an API)
const BOUTIQUE_ITEMS = [
  {
    id: 'btq-001',
    name: 'Traditional Gold-Plated Temple Necklace',
    category: 'jewelry',
    price: 4500,
    originalPrice: 5500,
    rating: 4.8,
    reviews: 24,
    description: 'Exquisite gold-plated necklace with intricate temple design, perfect for wedding ceremonies and special pujas.',
    image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400&h=400&fit=crop',
    isNew: true,
    isBestseller: true,
    tags: ['temple jewelry', 'gold-plated', 'wedding']
  },
  {
    id: 'btq-002',
    name: 'Silver Oxidized Jhumka Earrings',
    category: 'jewelry',
    price: 2200,
    originalPrice: 2800,
    rating: 4.6,
    reviews: 18,
    description: 'Beautiful oxidized silver jhumkas with traditional motifs, lightweight and comfortable for long ceremonies.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    isNew: false,
    isBestseller: true,
    tags: ['earrings', 'silver', 'traditional']
  },
  {
    id: 'btq-003',
    name: 'Bridal Maang Tikka with Pearls',
    category: 'jewelry',
    price: 3200,
    originalPrice: 3800,
    rating: 4.9,
    reviews: 31,
    description: 'Elegant maang tikka adorned with freshwater pearls and crystals, the perfect finishing touch for bridal ceremonies.',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
    isNew: true,
    isBestseller: false,
    tags: ['bridal', 'pearls', 'maang tikka']
  },
  {
    id: 'btq-004',
    name: 'Complete Puja Thali Set (Brass)',
    category: 'accessories',
    price: 1800,
    originalPrice: 2200,
    rating: 4.7,
    reviews: 42,
    description: 'Handcrafted brass puja thali with diya, incense holder, kumkum container, and bell — everything needed for daily worship.',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&h=400&fit=crop',
    isNew: false,
    isBestseller: true,
    tags: ['puja thali', 'brass', 'daily worship']
  },
  {
    id: 'btq-005',
    name: 'Decorated Coconut (Nariyal) for Puja',
    category: 'accessories',
    price: 350,
    originalPrice: 450,
    rating: 4.5,
    reviews: 56,
    description: 'Fresh coconut wrapped in decorative red and gold cloth with sacred thread, ready for any Hindu ceremony.',
    image: 'https://images.unsplash.com/photo-1590004987778-bece5c9adab6?w=400&h=400&fit=crop',
    isNew: false,
    isBestseller: false,
    tags: ['coconut', 'decorative', 'ceremony ready']
  },
  {
    id: 'btq-006',
    name: 'Premium Incense Stick Collection (12 scents)',
    category: 'accessories',
    price: 1200,
    originalPrice: 1500,
    rating: 4.8,
    reviews: 67,
    description: 'A curated collection of 12 divine fragrances including sandalwood, jasmine, rose, and frankincense.',
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&h=400&fit=crop',
    isNew: true,
    isBestseller: false,
    tags: ['incense', 'fragrance', 'meditation']
  },
  {
    id: 'btq-007',
    name: 'Crystal Shivling with Yoni Base',
    category: 'gifts',
    price: 5500,
    originalPrice: 6500,
    rating: 4.9,
    reviews: 15,
    description: 'Natural crystal Shivling mounted on a polished black stone yoni base, ideal for home temple or meditation space.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&h=400&fit=crop',
    isNew: false,
    isBestseller: true,
    tags: ['shivling', 'crystal', 'home temple']
  },
  {
    id: 'btq-008',
    name: 'Feng Shui Laughing Buddha Statue',
    category: 'gifts',
    price: 2800,
    originalPrice: 3200,
    rating: 4.4,
    reviews: 22,
    description: 'Hand-painted golden Laughing Buddha statue symbolizing happiness and abundance, perfect housewarming gift.',
    image: 'https://images.unsplash.com/photo-1610128114395-1e3b68b435d4?w=400&h=400&fit=crop',
    isNew: false,
    isBestseller: false,
    tags: ['buddha', 'feng shui', 'gift']
  },
  {
    id: 'btq-009',
    name: 'Tibetan Singing Bowl Set',
    category: 'gifts',
    price: 4200,
    originalPrice: 4800,
    rating: 4.7,
    reviews: 28,
    description: 'Authentic Tibetan singing bowl with wooden mallet and silk cushion, produces deep resonant tones for meditation.',
    image: 'https://images.unsplash.com/photo-1603653856395-084009e58a42?w=400&h=400&fit=crop',
    isNew: true,
    isBestseller: false,
    tags: ['singing bowl', 'meditation', 'tibetan']
  },
  {
    id: 'btq-010',
    name: 'Traditional Banarasi Silk Dupatta',
    category: 'clothing',
    price: 3800,
    originalPrice: 4500,
    rating: 4.6,
    reviews: 19,
    description: 'Rich Banarasi silk dupatta with intricate zari work in traditional motifs, perfect for ceremonial occasions.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
    isNew: false,
    isBestseller: true,
    tags: ['silk', 'banarasi', 'dupatta']
  },
  {
    id: 'btq-011',
    name: 'Men\'s Dhoti-Kurta Set (Cotton Silk)',
    category: 'clothing',
    price: 3200,
    originalPrice: 3800,
    rating: 4.5,
    reviews: 14,
    description: 'Elegant cream cotton-silk dhoti with matching kurta, comfortable and dignified for puja ceremonies.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    isNew: false,
    isBestseller: false,
    tags: ['dhoti', 'kurta', 'men traditional']
  },
  {
    id: 'btq-012',
    name: 'Women\'s Pooja Saree (Yellow Cotton)',
    category: 'clothing',
    price: 2800,
    originalPrice: 3200,
    rating: 4.7,
    reviews: 33,
    description: 'Auspicious yellow cotton saree with red border, specially designed for religious ceremonies and festivals.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e360c66532?w=400&h=400&fit=crop',
    isNew: true,
    isBestseller: false,
    tags: ['saree', 'yellow', 'festival wear']
  },
];

export function BoutiquePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [favorites, setFavorites] = useState<Set<string>>(new Set()); // ✅ FIXED LINE
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<typeof BOUTIQUE_ITEMS>([]);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setItems(BOUTIQUE_ITEMS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort items
  const filteredItems = items
    .filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToCart = (itemId: string) => {
    // In a real app, this would add to a cart context/store
    alert('Item added to cart! (Cart functionality coming soon)');
  };

  const activeCategoryData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20" />
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/15" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Curated for Your Sacred Moments
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Puja Boutique</h1>
          <p className="text-amber-100 max-w-2xl mx-auto text-base leading-relaxed">
            Discover exquisite temple jewelry, sacred accessories, and ceremonial essentials 
            handpicked to elevate your spiritual journey and special occasions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-soft p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jewelry, accessories, gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              />
            </div>
            
            {/* Sort */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-white cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredItems.length}</span> items
            {activeCategory !== 'all' && (
              <span> in <span className="font-medium text-amber-700">{activeCategoryData?.name}</span></span>
            )}
            {searchQuery && (
              <span> for "<span className="font-medium text-amber-700">{searchQuery}</span>"</span>
            )}
          </p>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="group bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.isNew && (
                      <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                        NEW
                      </span>
                    )}
                    {item.isBestseller && (
                      <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                        BESTSELLER
                      </span>
                    )}
                  </div>
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      favorites.has(item.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(item.id) ? 'fill-current' : ''}`} />
                  </button>
                  {/* Discount Badge */}
                  {item.originalPrice > item.price && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Category Tag */}
                  <span className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-2">
                    {CATEGORIES.find(c => c.id === item.category)?.name}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-amber-700 transition-colors">
                    {item.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
                    {item.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(item.rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                    <span className="text-sm text-gray-400">({item.reviews})</span>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-lg font-bold text-gray-900">NPR {item.price.toLocaleString()}</p>
                      {item.originalPrice > item.price && (
                        <p className="text-sm text-gray-400 line-through">
                          NPR {item.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="bg-amber-600 hover:bg-amber-700 text-white p-2.5 rounded-xl transition-colors"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}