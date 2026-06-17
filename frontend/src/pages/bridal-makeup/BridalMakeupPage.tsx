import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Sparkles, Star, ArrowRight, Calendar, Check, Phone, Loader2 } from 'lucide-react';

interface MakeupPackage {
  name: string;
  price: number;
  description: string;
  includes: string[];
}

interface BridalArtist {
  id: string;
  name: string;
  title: string;
  experience: number;
  image: string;
  rating: number;
  reviews: number;
  specialties: string[];
  location: string;
  packages: MakeupPackage[];
}

export function BridalMakeupPage() {
  const [artists, setArtists] = useState<BridalArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  useEffect(() => {
    api.get('/bridal-makeup')
      .then(res => setArtists(res.data))
      .catch(err => console.error('Failed to load bridal artists', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Hero */}
      <section className="relative bg-[#1a1410] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&fit=crop"
            alt="Bridal makeup"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium text-[#C28C50] mb-4">
              Premium Bridal Services
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Bridal <span className="text-[#C28C50]">Makeup</span> & Mehndi
            </h1>
            <p className="text-lg text-white/70 mb-8">
              Transform into the most beautiful version of yourself on your special day.
              Our certified artists bring years of expertise in traditional and contemporary bridal looks.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B5A2B] text-white font-medium hover:bg-[#654321] transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Artist
              </Link>
              <a
                href="tel:+9779801234567"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                Call for Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-b border-[#E6E4E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Verified Professional Artists',
              'Premium Branded Products',
              'Trial Sessions Available',
              'On-location Service',
              '24/7 Customer Support',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FDF8F3] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#8B5A2B]" />
                </div>
                <span className="text-sm font-medium text-[#4a4a4a]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1410] mb-3">
            Our <span className="text-[#8B5A2B]">Expert</span> Artists
          </h2>
          <p className="text-[#8a8a8a] max-w-xl mx-auto">
            Handpicked professionals with proven expertise in bridal transformations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white rounded-2xl border border-[#E6E4E0] overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-xl font-bold text-white">{artist.name}</h3>
                  <p className="text-sm text-white/80">{artist.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="text-sm font-medium text-white">{artist.rating}</span>
                    <span className="text-xs text-white/60">({artist.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {artist.specialties.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 rounded-md bg-[#FDF8F3] text-[#8B5A2B] text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[#8a8a8a] mb-1">{artist.experience} years experience</p>
                <p className="text-sm text-[#8a8a8a] mb-4">{artist.location}</p>

                {/* Packages */}
                <div className="space-y-3 mb-5">
                  {artist.packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedArtist === `${artist.id}-${pkg.name}`
                          ? 'border-[#8B5A2B] bg-[#FDF8F3]'
                          : 'border-[#E6E4E0] hover:border-[#8B5A2B]/30'
                      }`}
                      onClick={() => setSelectedArtist(`${artist.id}-${pkg.name}`)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-[#1a1410]">{pkg.name}</span>
                        <span className="font-bold text-[#8B5A2B]">NPR {pkg.price.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-[#8a8a8a] mb-2">{pkg.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.includes.map((inc) => (
                          <span key={inc} className="text-xs text-[#8a8a8a] flex items-center gap-1">
                            <Check className="w-3 h-3 text-[#8B5A2B]" />
                            {inc}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/book?service=bridal-makeup&artist=${artist.id}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8B5A2B] text-white font-medium hover:bg-[#654321] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Book This Artist
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a1410] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Ready for Your <span className="text-[#C28C50]">Transformation</span>?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Book a trial session today and experience the magic before your big day
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#8B5A2B] text-white font-medium hover:bg-[#654321] transition-all"
            >
              Book Trial Session
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
            >
              View Wedding Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
