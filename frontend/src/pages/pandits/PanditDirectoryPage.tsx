import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Star, Award, BookOpen, Calendar, ChevronDown, Search,
  Filter, CheckCircle2, Sparkles, ArrowRight, User
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useTranslation } from 'react-i18next';

// Demo data for 10 pandits
const DEMO_PANDITS = [
  {
    id: 'p1',
    name: 'Pandit Ram Prasad Sharma',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
    district: 'Kathmandu',
    bio: 'Senior Vedic scholar with 22 years of experience in conducting traditional Hindu ceremonies.',
    experienceYears: 22,
    rating: 4.9,
    reviews: 127,
    specializations: ['Marriage', 'Satyanarayana Puja', 'Griha Pravesh'],
    isVerified: true,
    isTopRated: true,
  },
  {
    id: 'p2',
    name: 'Pandit Krishna Bhattarai',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
    district: 'Lalitpur',
    bio: 'Renowned astrologer and puja specialist with deep knowledge of Jyotish Shastra.',
    experienceYears: 18,
    rating: 4.8,
    reviews: 94,
    specializations: ['Rudrabhishek', 'Shraddha', 'Astrology'],
    isVerified: true,
    isTopRated: true,
  },
  {
    id: 'p3',
    name: 'Pandit Gopal Mishra',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
    district: 'Bhaktapur',
    bio: 'Young and dynamic priest specializing in modern interpretations of traditional rituals.',
    experienceYears: 8,
    rating: 4.7,
    reviews: 56,
    specializations: ['Bratabandha', 'Namkaran', 'Puja'],
    isVerified: true,
    isTopRated: false,
  },
  {
    id: 'p4',
    name: 'Pandit Hari Prasad Upadhyaya',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face',
    district: 'Pokhara',
    bio: 'Himalayan tradition keeper with expertise in Tantric rituals and Himalayan Vedic practices.',
    experienceYears: 30,
    rating: 5.0,
    reviews: 156,
    specializations: ['Shraddha', 'Puja', 'Tantric Rituals'],
    isVerified: true,
    isTopRated: true,
  },
  {
    id: 'p5',
    name: 'Pandit Shyam Sundar Joshi',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face',
    district: 'Chitwan',
    bio: 'Expert in Griha Pravesh and Vastu Shastra ceremonies.',
    experienceYears: 15,
    rating: 4.6,
    reviews: 78,
    specializations: ['Griha Pravesh', 'Vastu Puja', 'Marriage'],
    isVerified: true,
    isTopRated: false,
  },
  {
    id: 'p6',
    name: 'Pandit Damodar Paudel',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face',
    district: 'Butwal',
    bio: 'Lumbini region specialist with Buddhist-Hindu syncretic traditions.',
    experienceYears: 20,
    rating: 4.8,
    reviews: 103,
    specializations: ['Puja', 'Shraddha', 'Peace Ceremonies'],
    isVerified: true,
    isTopRated: true,
  },
  {
    id: 'p7',
    name: 'Pandit Narayan Bhandari',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
    district: 'Biratnagar',
    bio: 'Eastern Nepal tradition bearer specializing in elaborate marriage ceremonies.',
    experienceYears: 25,
    rating: 4.9,
    reviews: 142,
    specializations: ['Marriage', 'Bratabandha', 'Satyanarayana Puja'],
    isVerified: true,
    isTopRated: true,
  },
  {
    id: 'p8',
    name: 'Pandit Bharat Ghimire',
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop&crop=face',
    district: 'Dharan',
    bio: 'Former temple head priest with temple-level authenticity for home ceremonies.',
    experienceYears: 28,
    rating: 4.7,
    reviews: 89,
    specializations: ['Puja', 'Rudrabhishek', 'Shraddha'],
    isVerified: true,
    isTopRated: false,
  },
  {
    id: 'p9',
    name: 'Pandit Ramesh Koirala',
    photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&crop=face',
    district: 'Hetauda',
    bio: 'Expert in vehicle puja and business opening ceremonies for busy professionals.',
    experienceYears: 12,
    rating: 4.5,
    reviews: 67,
    specializations: ['Vehicle Puja', 'Office Opening', 'Puja'],
    isVerified: true,
    isTopRated: false,
  },
  {
    id: 'p10',
    name: 'Pandit Devendra Paudel',
    photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b2ad?w=400&h=500&fit=crop&crop=face',
    district: 'Kathmandu',
    bio: 'Newari tradition specialist preserving Kathmandu Valley\'s unique Vedic practices.',
    experienceYears: 16,
    rating: 4.8,
    reviews: 112,
    specializations: ['Marriage', 'Festival Puja', 'Griha Pravesh'],
    isVerified: true,
    isTopRated: true,
  },
];

const DISTRICTS = ['All', 'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 'Butwal', 'Biratnagar', 'Dharan', 'Hetauda'];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-sm ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}`}>★</span>
      ))}
    </span>
  );
}

export function PanditDirectoryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pandits, setPandits] = useState(DEMO_PANDITS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'reviews'>('rating');

  const allSpecializations = Array.from(
    new Set(DEMO_PANDITS.flatMap(p => p.specializations))
  ).sort();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = DEMO_PANDITS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDistrict = selectedDistrict === 'All' || p.district === selectedDistrict;
      const matchesSpec = !specializationFilter || p.specializations.includes(specializationFilter);
      const matchesRating = p.rating >= minRating;
      return matchesSearch && matchesDistrict && matchesSpec && matchesRating;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return b.reviews - a.reviews;
    });

    setPandits(filtered);
  }, [searchQuery, selectedDistrict, specializationFilter, minRating, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-700 via-orange-600 to-red-700 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {t('Find Your Pandit') || 'Find Your Pandit'}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Browse verified and experienced pandits across Nepal. Book ceremonies, pujas, and spiritual services with confidence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-soft p-4 md:p-6 mb-8 -mt-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none bg-white"
              >
                {DISTRICTS.map(d => (
                  <option key={d} value={d}>{d === 'All' ? 'All Districts' : d}</option>
                ))}
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-xl border font-medium transition-all flex items-center gap-2 ${
                  showFilters
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'border-gray-200 hover:border-amber-300 text-gray-600'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Specialization</label>
                <select
                  value={specializationFilter}
                  onChange={e => setSpecializationFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-amber-500 outline-none"
                >
                  <option value="">All Specializations</option>
                  {allSpecializations.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Minimum Rating</label>
                <div className="flex gap-2">
                  {[0, 4, 4.5, 4.8].map(r => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        minRating === r
                          ? 'bg-amber-100 text-amber-700 border border-amber-300'
                          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      {r === 0 ? 'Any' : `${r}+ ★`}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Sort By</label>
                <div className="flex gap-2">
                  {(['rating', 'experience', 'reviews'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                        sortBy === s
                          ? 'bg-amber-100 text-amber-700 border border-amber-300'
                          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{pandits.length}</span> pandits
          </p>
          {(searchQuery || selectedDistrict !== 'All' || specializationFilter || minRating > 0) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('All');
                setSpecializationFilter('');
                setMinRating(0);
                setSortBy('rating');
              }}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Pandit Cards Grid */}
        {pandits.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No pandits found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pandits.map(pandit => (
              <div
                key={pandit.id}
                className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-all duration-300 group"
              >
                {/* Card Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pandit.photo}
                    alt={pandit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {pandit.isTopRated && (
                      <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Top Rated
                      </span>
                    )}
                    {pandit.isVerified && (
                      <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {pandit.district}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{pandit.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={pandit.rating} />
                    <span className="text-sm font-semibold text-gray-700">{pandit.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-400">({pandit.reviews} reviews)</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{pandit.bio}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pandit.specializations.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Award className="w-4 h-4 text-amber-500" />
                    {pandit.experienceYears} years experience
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/pandit/${pandit.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      View Portfolio
                    </Link>
                    <button
                      onClick={() => navigate('/book')}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-amber-700 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

