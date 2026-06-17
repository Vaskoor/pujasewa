import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, CreditCard, CheckCircle, ArrowRight, Star, Shield, Clock } from 'lucide-react';

export default function HowItWorksPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Find Your Pandit',
      description: 'Browse our curated list of verified pandits. Filter by specialization, language, location, and ratings to find the perfect match for your ceremony.',
      features: ['200+ verified pandits', 'Filter by language & region', 'Read authentic reviews'],
    },
    {
      icon: Calendar,
      number: '02',
      title: 'Book Your Date',
      description: 'Select your preferred date and time. Our real-time availability system ensures you get the slot that works best for your schedule.',
      features: ['Real-time availability', 'Flexible scheduling', 'Instant confirmation'],
    },
    {
      icon: CreditCard,
      number: '03',
      title: 'Secure Payment',
      description: 'Pay securely with multiple payment options. We hold your payment until the ceremony is completed to your satisfaction.',
      features: ['Multiple payment options', 'Secure transactions', 'Money-back guarantee'],
    },
    {
      icon: CheckCircle,
      number: '04',
      title: 'Ceremony Day',
      description: 'Your pandit arrives prepared with all necessary materials. Focus on your spiritual experience while we handle the logistics.',
      features: ['Pandit arrives on time', 'All materials included', 'Post-ceremony support'],
    },
  ];

  const benefits = [
    { icon: Shield, title: 'Verified Pandits', description: 'Every pandit is background-checked and verified' },
    { icon: Star, title: 'Rated & Reviewed', description: 'Transparent ratings from real customers' },
    { icon: Clock, title: 'On-Time Service', description: 'Punctual arrivals guaranteed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge badge-primary mb-4">How It Works</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6">
              Book a Ceremony in <span className="text-gradient">4 Simple Steps</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              We have simplified the process of booking authentic Vedic ceremonies. 
              From finding the right pandit to ceremony completion, we have got you covered.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-5xl">
          <div className="space-y-12 lg:space-y-20">
            {steps.map((step, i) => (
              <div key={i} className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
                      <div className="w-full h-full flex items-center justify-center bg-primary-50">
                        <step.icon className="w-24 h-24 text-primary/20" />
                      </div>
                    </div>
                    <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                      <span className="font-serif text-2xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="badge badge-primary mb-4">Step {step.number}</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-4">{step.title}</h2>
                  <p className="text-muted leading-relaxed mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge badge-accent mb-4">Why Choose Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text mb-4">The PanditJi Advantage</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="card p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-text mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Book Your Ceremony?
            </h2>
            <p className="text-white/80 mb-8">
              Start your spiritual journey today. Find the perfect pandit for your ceremony.
            </p>
            <Link to="/pandits" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-all">
              Find a Pandit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
