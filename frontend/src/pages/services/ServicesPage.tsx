import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  BookOpen, ShoppingBag, Sparkles, PartyPopper, Palette,
  Camera, Home, Gem, Crown, ArrowRight, Check, Star,
  Users, Calendar, Shield, Heart, ChevronRight, Phone, Loader2
} from 'lucide-react';

// Map icon names to components
const iconMap: Record<string, any> = {
  BookOpen, ShoppingBag, Sparkles, PartyPopper, Palette,
  Camera, Home, Gem, Crown, ArrowRight, Check, Star,
  Users, Calendar, Shield, Heart, ChevronRight, Phone
};

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  color: string;
  accentColor: string;
  to: string;
  features: string[];
  ceremonies: string[];
  image: string;
}

interface WhyChooseUsItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

interface PromoPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  includes: string[];
  popular: boolean;
}

export function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUsItem[]>([]);
  const [promoPackages, setPromoPackages] = useState<PromoPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState<string | null>(null);

  useEffect(() => {
    api.get('/services')
      .then(res => {
        setServices(res.data.services || []);
        setWhyChooseUs(res.data.whyChooseUs || []);
        setPromoPackages(res.data.promoPackages || []);
      })
      .catch(err => console.error('Failed to load services data', err))
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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden" style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-white/20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full border border-white/15" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <Crown className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">Complete Ceremonial Solutions</span>
          </div>
          <h1 className="font-serif font-bold text-white mb-6">
            Everything You Need for Sacred Celebrations
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            From verified pandits and stunning decorations to bridal makeup and photography — 
            PanditJi is your one-stop platform for all Hindu ceremonial needs in Nepal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pandits" className="btn-primary bg-white" style={{ color: 'rgb(var(--color-primary))' }}>
              <BookOpen className="w-4 h-4" />
              Book a Pandit
            </Link>
            <Link to="/packages" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border border-white/40 text-white hover:bg-white/10">
              <Gem className="w-4 h-4" />
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4" style={{ backgroundColor: 'rgb(var(--color-background))' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif font-semibold mb-4" style={{ color: 'rgb(var(--color-text))' }}>
              Our Services
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'rgb(var(--color-text-muted))' }}>
              Comprehensive ceremonial services designed to make your special occasions 
              truly memorable and spiritually fulfilling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.iconName] || BookOpen;
              const isActive = activeService === service.id;
              return (
                <div
                  key={service.id}
                  className="card overflow-hidden cursor-pointer group"
                  onClick={() => setActiveService(isActive ? null : service.id)}
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                    <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center ${service.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-lg mb-1" style={{ color: 'rgb(var(--color-text))' }}>
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium mb-3" style={{ color: service.accentColor }}>
                      {service.subtitle}
                    </p>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: 'rgb(var(--color-text-muted))' }}>
                      {service.description}
                    </p>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isActive ? '400px' : '0px', opacity: isActive ? 1 : 0 }}
                    >
                      <div className="pt-4 border-t" style={{ borderColor: 'rgb(var(--color-border))' }}>
                        <p className="text-xs font-semibold mb-2" style={{ color: 'rgb(var(--color-text))' }}>Features:</p>
                        <ul className="space-y-1.5 mb-4">
                          {service.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>
                              <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: service.accentColor }} />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs font-semibold mb-2" style={{ color: 'rgb(var(--color-text))' }}>Perfect for:</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {service.ceremonies.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded-md text-xs"
                              style={{ backgroundColor: 'rgb(var(--color-secondary))', color: 'rgb(var(--color-text-muted))' }}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Link
                      to={service.to}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold mt-2 transition-colors hover:underline"
                      style={{ color: service.accentColor }}
                    >
                      Explore
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4" style={{ backgroundColor: 'rgb(var(--color-secondary))' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif font-semibold mb-4" style={{ color: 'rgb(var(--color-text))' }}>
              Why Choose PanditJi
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'rgb(var(--color-text-muted))' }}>
              We combine ancient traditions with modern convenience to deliver 
              an unparalleled ceremonial experience for you and your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => {
              const Icon = iconMap[item.iconName] || Shield;
              return (
                <div key={item.id} className="card p-8 text-center group hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300" style={{ backgroundColor: 'rgb(var(--color-secondary))' }}>
                    <Icon className="w-7 h-7" style={{ color: 'rgb(var(--color-primary))' }} />
                  </div>
                  <h3 className="font-serif font-semibold text-lg mb-3" style={{ color: 'rgb(var(--color-text))' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--color-text-muted))' }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4" style={{ backgroundColor: 'rgb(var(--color-background))' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif font-semibold mb-4" style={{ color: 'rgb(var(--color-text))' }}>
              Popular Packages
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'rgb(var(--color-text-muted))' }}>
              Save time and money with our curated packages. Each bundle is designed 
              to provide everything you need for a seamless celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promoPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="card p-8 relative flex flex-col"
                style={pkg.popular ? { borderColor: 'rgb(var(--color-primary))', borderWidth: '2px' } : {}}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-serif font-semibold text-xl mb-2" style={{ color: 'rgb(var(--color-text))' }}>
                  {pkg.name}
                </h3>
                <p className="text-2xl font-bold mb-2" style={{ color: 'rgb(var(--color-primary))' }}>
                  {pkg.price}
                </p>
                <p className="text-sm mb-6" style={{ color: 'rgb(var(--color-text-muted))' }}>
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgb(var(--color-text))' }}>
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'rgb(var(--color-primary))' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/packages"
                  className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    pkg.popular
                      ? 'btn-primary'
                      : 'border border-current hover:bg-gray-50'
                  }`}
                  style={pkg.popular ? {} : { color: 'rgb(var(--color-primary))' }}
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4" style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif font-semibold text-white mb-4">
              How It Works
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Booking your ceremony has never been easier. Four simple steps to a perfect celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose Service', desc: 'Browse and select the services you need for your ceremony.' },
              { step: '02', title: 'Pick Date & Time', desc: 'Select your preferred date and time slot from real-time availability.' },
              { step: '03', title: 'Confirm Booking', desc: 'Review your selections and confirm with secure online payment.' },
              { step: '04', title: 'Celebrate', desc: 'Our team handles everything while you focus on your special day.' },
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-bold font-serif" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                  {item.step}
                </div>
                <h3 className="font-serif font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/70">{item.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: 'rgb(var(--color-background))' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ backgroundColor: 'rgb(var(--color-primary))', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-5" style={{ backgroundColor: 'rgb(var(--color-primary))', transform: 'translate(-30%, 30%)' }} />
            
            <div className="relative z-10">
              <h2 className="font-serif font-semibold text-3xl mb-4" style={{ color: 'rgb(var(--color-text))' }}>
                Ready to Plan Your Ceremony?
              </h2>
              <p className="mb-8 max-w-xl mx-auto" style={{ color: 'rgb(var(--color-text-muted))' }}>
                Let us help you create a memorable and spiritually fulfilling celebration. 
                Our team is here to guide you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pandits" className="btn-primary">
                  <Calendar className="w-4 h-4" />
                  Book Now
                </Link>
                <a href="tel:+9779800000000" className="btn-secondary">
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
