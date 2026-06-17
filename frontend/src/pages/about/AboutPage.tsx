import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Shield, Heart, BookOpen, MapPin, CheckCircle } from 'lucide-react';
import { MetaTags } from '../../components/MetaTags';

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const stats = [
    { number: '5000+', label: 'Ceremonies Conducted' },
    { number: '200+', label: 'Verified Pandits' },
    { number: '50+', label: 'Cities Covered' },
    { number: '99%', label: 'Satisfaction Rate' },
  ];

  const values = [
    { icon: Heart, title: 'Authenticity', description: 'Every ceremony follows authentic Vedic traditions passed down through generations.' },
    { icon: Shield, title: 'Trust', description: 'All pandits are verified, background-checked, and rated by the community.' },
    { icon: Users, title: 'Community', description: 'Building a community that preserves and celebrates Hindu spiritual traditions.' },
    { icon: Award, title: 'Excellence', description: 'Committed to delivering the highest quality spiritual services.' },
  ];

  const team = [
    { name: 'Rahul Sharma', role: 'Founder & CEO', image: '/images/team-1.jpg' },
    { name: 'Priya Patel', role: 'Head of Operations', image: '/images/team-2.jpg' },
    { name: 'Dr. Anand Mishra', role: 'Spiritual Advisor', image: '/images/team-3.jpg' },
  ];

  return (
    <div className="min-h-screen bg-background">
    <MetaTags title="About PujaSewa | Nepal's Pandit Booking Platform" description="Learn about our mission to connect devotees with verified pandits and ceremony services." />
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge badge-primary mb-4">About Us</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6">
              Bridging Tradition <span className="text-gradient">& Technology</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              PanditJi was born from a simple belief: that every devotee deserves access to 
              authentic Vedic ceremonies, performed by verified pandits, with the convenience 
              of modern technology.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-primary-50">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="badge badge-primary mb-4">Our Mission</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text mb-6">
                Preserving Sacred Traditions for Future Generations
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                In a rapidly modernizing world, many ancient Vedic traditions risk being forgotten. 
                PanditJi exists to ensure that these sacred practices remain accessible to all, 
                connecting devotees with knowledgeable pandits who can guide them through life's 
                most important spiritual milestones.
              </p>
              <ul className="space-y-3">
                {['Verified and experienced pandits', 'Transparent pricing', 'End-to-end ceremony management', 'Post-ceremony support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
                <img src="/images/about-mission.jpg" alt="Our mission" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-large">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Sacred Knowledge</p>
                    <p className="text-xs text-muted">Passed down generations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge badge-accent mb-4">Our Values</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text mb-4">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-text mb-2">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.description}</p>
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
              Ready to Begin Your Spiritual Journey?
            </h2>
            <p className="text-white/80 mb-8">
              Join thousands of devotees who have found their perfect pandit through PanditJi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/pandits" className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-all">
                Find a Pandit
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
