import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { PartyPopper, Star, ArrowRight, Calendar, Check, Sparkles, Loader2 } from 'lucide-react';

interface EventsService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
  reviews: number;
  occasions: string[];
  includes: string[];
}

export function EventsMakeupPage() {
  const [services, setServices] = useState<EventsService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/events-makeup')
      .then(res => setServices(res.data))
      .catch(err => console.error('Failed to load events makeup services', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1519671482749-fd09be7c5bfd?w=1200&fit=crop"
            alt="Party makeup"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <PartyPopper className="w-12 h-12 mx-auto mb-4 text-pink-300" />
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Events & Party <span className="text-pink-300">Makeup</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Look your best at every celebration – sangeet, reception, birthday, festivals, and more.
            Professional artists, premium products, and on‑location service.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-purple-700 font-semibold hover:bg-white/90 transition-all"
          >
            <Calendar className="w-4 h-4" />
            Book a Makeup Artist
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1410] mb-3">
            Makeup <span className="text-pink-600">Services</span>
          </h2>
          <p className="text-[#8a8a8a] max-w-xl mx-auto">
            Choose from a range of looks – from natural glow to full glam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#E6E4E0] overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-[#1a1410] mb-1">{service.name}</h3>
                <p className="text-sm text-[#8a8a8a] mb-3">{service.description}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-xs text-[#8a8a8a]">({service.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {service.occasions.map((occ) => (
                    <span key={occ} className="text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full">
                      {occ}
                    </span>
                  ))}
                </div>
                <p className="text-2xl font-bold text-pink-600 mb-3">
                  NPR {service.price.toLocaleString()}
                  <span className="text-sm font-normal text-[#8a8a8a]"> / {service.duration}</span>
                </p>
                <ul className="space-y-1 mb-4 text-sm text-[#4a4a4a]">
                  {service.includes.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-pink-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                  {service.includes.length > 3 && (
                    <li className="text-xs text-[#8a8a8a]">+{service.includes.length - 3} more</li>
                  )}
                </ul>
                <Link
                  to={`/book?service=events-makeup&id=${service.id}`}
                  className="w-full block text-center py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold transition-all"
                >
                  Book This Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-16 px-4 border-t border-pink-100">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-[#1a1410] mb-3">
            Let’s Make You <span className="text-pink-600">Shine</span>
          </h2>
          <p className="text-[#8a8a8a] mb-6">
            Not sure which look suits you best? Book a free consultation with our expert artists.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-all"
          >
            <Calendar className="w-4 h-4" />
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
