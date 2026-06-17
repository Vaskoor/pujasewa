import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, Heart } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sunita & Rajesh Sharma',
    location: 'Kathmandu',
    event: 'Wedding Ceremony',
    rating: 5,
    date: 'March 2026',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop&crop=faces',
    text: 'PanditJi made our wedding absolutely magical. From the initial consultation to the final blessing, everything was handled with such grace and professionalism. Our guests, many of whom were unfamiliar with Hindu traditions, were captivated by the explanations provided during each ritual. The ceremony was the perfect blend of tradition and accessibility.',
    tags: ['Wedding', 'Kathmandu'],
  },
  {
    id: 2,
    name: 'Dr. Priya Koirala',
    location: 'Lalitpur',
    event: 'Griha Pravesh',
    rating: 5,
    date: 'February 2026',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
    text: 'We booked a pandit for our Griha Pravesh ceremony through PanditJi, and the experience exceeded all expectations. The pandit arrived on time, brought all necessary samagri, and conducted the puja with such devotion. The platform made everything so easy — from booking to payment. Highly recommend!',
    tags: ['Griha Pravesh', 'Lalitpur'],
  },
  {
    id: 3,
    name: 'Anil & Meera Gurung',
    location: 'Pokhara',
    event: 'Bratabandha',
    rating: 5,
    date: 'January 2026',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    text: 'For our son\'s Bratabandha ceremony, we wanted everything to be perfect. PanditJi connected us with a highly experienced pandit who guided our family through every step. The ceremony was beautiful, meaningful, and our relatives were deeply impressed. The booking process was seamless.',
    tags: ['Bratabandha', 'Pokhara'],
  },
  {
    id: 4,
    name: 'Ramesh Thapa Family',
    location: 'Bhaktapur',
    event: 'Satyanarayan Puja',
    rating: 5,
    date: 'December 2025',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
    text: 'We organized a Satyanarayan Puja for our family gathering, and the pandit arranged through PanditJi was exceptional. He explained the significance of each mantra in both Sanskrit and Nepali, making it educational for the younger generation. The decoration service we booked alongside was also stunning.',
    tags: ['Satyanarayan', 'Bhaktapur'],
  },
  {
    id: 5,
    name: 'Sarita & Bikash Adhikari',
    location: 'Chitwan',
    event: 'Wedding + Decorations',
    rating: 5,
    date: 'November 2025',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces',
    text: 'We used PanditJi for our complete wedding package — pandit, decorations, photography, and venue. Everything was coordinated perfectly. The mandap decoration was breathtaking with fresh marigolds and jasmine. Our photographer captured candid moments we will treasure forever. One platform for everything made planning so much easier.',
    tags: ['Wedding', 'Full Package'],
  },
  {
    id: 6,
    name: 'Dr. Harsha Bhandari',
    location: 'Biratnagar',
    event: 'Shraddha Ceremony',
    rating: 5,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    text: 'During a difficult time for our family, PanditJi helped us arrange a dignified Shraddha ceremony for my father. The pandit was compassionate, patient, and conducted all rituals with the utmost respect. The platform handled everything discreetly and professionally. We are grateful for their service.',
    tags: ['Shraddha', 'Biratnagar'],
  },
];

const stats = [
  { icon: Users, value: '2,500+', label: 'Happy Families' },
  { icon: Award, value: '4.9/5', label: 'Average Rating' },
  { icon: Heart, value: '98%', label: 'Would Recommend' },
];

export function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Wedding', 'Griha Pravesh', 'Bratabandha', 'Satyanarayan', 'Shraddha'];
  const filtered = filter === 'All' ? testimonials : testimonials.filter(t => t.tags.includes(filter));

  const next = () => setActiveIndex(i => (i + 1) % testimonials.length);
  const prev = () => setActiveIndex(i => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-white/30" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-2 border-white/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/10" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <Heart className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">Trusted by Thousands</span>
          </div>
          <h1 className="font-serif font-bold text-white mb-6">
            Stories from Our Community
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Real experiences from families who trusted PanditJi for their most sacred ceremonies.
            Every review reflects our commitment to preserving tradition with excellence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 -mt-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgb(var(--color-secondary))' }}>
                  <stat.icon className="w-6 h-6" style={{ color: 'rgb(var(--color-primary))' }} />
                </div>
                <p className="text-3xl font-bold font-serif mb-1" style={{ color: 'rgb(var(--color-primary))' }}>{stat.value}</p>
                <p className="text-sm" style={{ color: 'rgb(var(--color-text-muted))' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-16 px-4" style={{ backgroundColor: 'rgb(var(--color-secondary))' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif font-semibold mb-3" style={{ color: 'rgb(var(--color-text))' }}>
              Featured Stories
            </h2>
            <p style={{ color: 'rgb(var(--color-text-muted))' }}>Hear directly from families we have served</p>
          </div>
          
          <div className="card p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 w-10 h-10 opacity-20" style={{ color: 'rgb(var(--color-primary))' }} />
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-24 h-24 rounded-full object-cover ring-4"
                  style={{ ringColor: 'rgb(var(--color-secondary))' }}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-3">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg italic mb-6 leading-relaxed" style={{ color: 'rgb(var(--color-text))' }}>
                  "{testimonials[activeIndex].text}"
                </p>
                <div>
                  <p className="font-semibold" style={{ color: 'rgb(var(--color-primary))' }}>{testimonials[activeIndex].name}</p>
                  <p className="text-sm" style={{ color: 'rgb(var(--color-text-muted))' }}>
                    {testimonials[activeIndex].event} · {testimonials[activeIndex].location} · {testimonials[activeIndex].date}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-3 mt-8">
              <button onClick={prev} className="btn-ghost w-10 h-10 p-0 rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: i === activeIndex ? 'rgb(var(--color-primary))' : 'rgb(var(--color-border))',
                      width: i === activeIndex ? '24px' : '8px',
                    }}
                  />
                ))}
              </div>
              <button onClick={next} className="btn-ghost w-10 h-10 p-0 rounded-full">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif font-semibold mb-4" style={{ color: 'rgb(var(--color-text))' }}>
              All Testimonials
            </h2>
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: filter === f ? 'rgb(var(--color-primary))' : 'rgb(var(--color-surface))',
                    color: filter === f ? 'white' : 'rgb(var(--color-text-muted))',
                    border: `1.5px solid ${filter === f ? 'rgb(var(--color-primary))' : 'rgb(var(--color-border))'}`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <div key={t.id} className="card p-6 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed mb-6" style={{ color: 'rgb(var(--color-text))' }}>
                  "{t.text.substring(0, 180)}..."
                </p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'rgb(var(--color-border))' }}>
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'rgb(var(--color-text))' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>{t.event} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif font-semibold text-white mb-4">
            Share Your Experience
          </h2>
          <p className="text-white/80 mb-8">
            Have we served your family? We would love to hear about your experience and share your story with our community.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 bg-white" style={{ color: 'rgb(var(--color-primary))' }}>
            <Heart className="w-4 h-4" />
            Write a Testimonial
          </button>
        </div>
      </section>
    </div>
  );
}
