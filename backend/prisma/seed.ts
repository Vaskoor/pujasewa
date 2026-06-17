import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with all data...');

  // 1. Admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@pujasewa.com' },
    update: {},
    create: {
      email: 'admin@pujasewa.com',
      phone: '9800000000',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isVerified: true,
      profile: { create: { fullName: 'System Admin' } },
    },
  });
  console.log('✅ Admin seeded');

  // 2. Event types
  const eventTypes = [
    'Marriage', 'Bratabandha', 'Nwaran', 'Pasni', 'Griha Pravesh',
    'Satyanarayan Puja', 'Rudrabhishek', 'Shraddha', 'Funeral Rituals',
    'Lakshmi Puja', 'Saraswati Puja', 'Birthday Puja', 'Vehicle Puja',
    'Office Opening'
  ];
  for (const name of eventTypes) {
    await prisma.eventType.upsert({
      where: { name },
      update: {},
      create: { name, isActive: true },
    });
  }
  console.log('✅ Event types seeded');

  // 3. Packages
  const packages = [
    { id: 'basic-marriage', name: 'Basic Marriage Package', price: 25000, includesItems: ['Pandit Fee', 'Basic Puja Samagri'], description: 'Essential wedding ceremony kit with pandit and samagri.' },
    { id: 'premium-marriage', name: 'Premium Marriage Package', price: 50000, includesItems: ['Pandit Fee', 'Premium Samagri', 'Decoration', 'Prasad'], description: 'Full wedding experience with decoration and premium items.' },
    { id: 'bratabandha', name: 'Bratabandha Package', price: 15000, includesItems: ['Pandit Fee', 'Samagri', 'Prasad'], description: 'Complete thread ceremony package.' },
    { id: 'griha-pravesh', name: 'Griha Pravesh Package', price: 11000, includesItems: ['Pandit Fee', 'Puja Samagri', 'Prasad'], description: 'Housewarming ceremony with all essentials.' },
    { id: 'satyanarayan', name: 'Satyanarayan Puja Package', price: 8000, includesItems: ['Pandit Fee', 'Puja Samagri', 'Prasad', 'Katha Book'], description: 'Full Satyanarayan puja package.' },
  ];
  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { id: pkg.id },
      update: {},
      create: { ...pkg, isActive: true },
    });
  }
  console.log('✅ Packages seeded');

  // 4. Decorations
  const decorations = [
    { id: 'basic-flower', name: 'Basic Flower Decoration', type: 'Floral', price: 5000, description: 'Fresh marigold garlands, small rangoli, and incense setup.' },
    { id: 'premium-mandap', name: 'Premium Mandap Setup', type: 'Mandap', price: 15000, description: 'Full wooden mandap with silk draping, flowers, and lighting.' },
    { id: 'rangoli-set', name: 'Traditional Rangoli Setup', type: 'Rangoli', price: 3000, description: 'Intricate hand‑crafted rangoli at the entrance and altar.' },
    { id: 'full-venue', name: 'Full Venue Decoration', type: 'Venue', price: 25000, description: 'Complete venue transformation — mandap, rangoli, garlands, and stage.' },
    { id: 'outdoor-setup', name: 'Outdoor Ceremony Setup', type: 'Outdoor', price: 18000, description: 'Tent, seating, flower canopy and fairy lights for outdoor events.' },
  ];
  for (const deco of decorations) {
    await prisma.decoration.upsert({
      where: { id: deco.id },
      update: {},
      create: { ...deco, isActive: true },
    });
  }
  console.log('✅ Decorations seeded');

  // 5. Venues
  const venues = [
    { id: 'v1', name: 'Boudha Garden Banquet', location: 'Boudha, Kathmandu', district: 'Kathmandu', capacity: 500, pricePerDay: 80000, description: 'Spacious banquet hall with lush garden area...', amenities: ['AC Hall', 'Lawn Area', 'Stage', 'Parking (100 cars)'], images: '🏛️', eventTypes: ['Wedding', 'Bratabandha', 'Reception'], rating: 4.7, reviews: 89 },
    { id: 'v2', name: 'Patan Heritage Hall', location: 'Lalitpur, Patan', district: 'Lalitpur', capacity: 250, pricePerDay: 55000, description: 'Culturally rich heritage venue...', amenities: ['Newari Courtyard', 'Indoor Hall', 'Kitchen', 'Parking'], images: '🏯', eventTypes: ['Wedding', 'Puja', 'Cultural Events'], rating: 4.5, reviews: 62 },
    { id: 'v3', name: 'Sunrise Riverside Resort', location: 'Nagarkot Road, Bhaktapur', district: 'Bhaktapur', capacity: 300, pricePerDay: 65000, description: 'Scenic riverside venue with mountain views.', amenities: ['Riverside Lawn', 'Mountain View', 'Indoor Hall', 'Catering Kitchen'], images: '🌄', eventTypes: ['Wedding', 'Reception', 'Anniversary'], rating: 4.8, reviews: 115 },
    { id: 'v4', name: 'Thamel Grand Convention', location: 'Thamel, Kathmandu', district: 'Kathmandu', capacity: 700, pricePerDay: 120000, description: 'Premium convention center in central Kathmandu.', amenities: ['Multiple Halls', 'AV Setup', 'VIP Lounge', 'Valet Parking'], images: '🏢', eventTypes: ['Wedding', 'Corporate', 'Conference'], rating: 4.6, reviews: 143 },
    { id: 'v5', name: 'Kirtipur Valley View Venue', location: 'Kirtipur, Kathmandu', district: 'Kathmandu', capacity: 150, pricePerDay: 35000, description: 'Cozy hillside venue with stunning valley panorama.', amenities: ['Garden Terrace', 'Valley View', 'Indoor Lounge', 'Parking'], images: '🌿', eventTypes: ['Engagement', 'Small Wedding', 'Puja'], rating: 4.4, reviews: 41 },
    { id: 'v6', name: 'Pokhara Lakeside Pavilion', location: 'Lakeside, Pokhara', district: 'Pokhara', capacity: 400, pricePerDay: 70000, description: 'Stunning lakeside pavilion with views of Phewa Lake.', amenities: ['Lakeside Lawn', 'Phewa View', 'Pavilion Stage', 'Restaurant Partner'], images: '🏔️', eventTypes: ['Wedding', 'Reception', 'Destination Party'], rating: 4.9, reviews: 78 },
  ];
  for (const venue of venues) {
    await prisma.venue.upsert({
      where: { id: venue.id },
      update: {},
      create: venue,
    });
  }
  console.log('✅ Venues seeded');

  // 6. Photography Packages
  const photoPackages = [
    { id: 'essential-coverage', name: 'Essential Coverage', emoji: '📷', pricePerDay: 15000, minDays: 1, maxDays: 1, description: 'Perfect for single-day events.', includes: ['1 Photographer', '6–8 hours coverage', '200+ edited photos'], badge: '' },
    { id: 'standard-wedding', name: 'Standard Wedding', emoji: '🎞️', pricePerDay: 25000, minDays: 1, maxDays: 3, description: 'Our most popular package.', includes: ['2 Photographers', 'Full-day coverage', '400+ edited photos', 'Drone aerial shots'], badge: 'Most Popular' },
    { id: 'premium-studio', name: 'Premium Studio', emoji: '🎬', pricePerDay: 40000, minDays: 1, maxDays: 7, description: 'Studio-grade production.', includes: ['3 Photographers + Cinematographer', '2 Camera setups', '600+ edited photos', 'Cinematic wedding film'], badge: 'Best Value' },
    { id: 'destination-package', name: 'Destination Package', emoji: '✈️', pricePerDay: 55000, minDays: 2, maxDays: 10, description: 'For destination weddings.', includes: ['2 Photographers + Cinematographer', 'Travel & stay included', '800+ edited photos', 'Full-length film'], badge: 'All Inclusive' },
  ];
  for (const pkg of photoPackages) {
    await prisma.photographyPackage.upsert({
      where: { id: pkg.id },
      update: {},
      create: pkg,
    });
  }
  console.log('✅ Photography packages seeded');

  // 7. Photographers
  const photographers = [
    { id: 'rajesh-shrestha', name: 'Rajesh Shrestha', studio: 'Moments Nepal Studio', emoji: '📸', experience: 12, specialties: ['Hindu Weddings', 'Bratabandha'], portfolioHighlights: ['Featured in Nepal Wedding Magazine 2023', '500+ weddings'], rating: 4.9, reviews: 210, location: 'Kathmandu', instagram: '@momentsnepal' },
    { id: 'sushila-tamrakar', name: 'Sushila Tamrakar', studio: 'Golden Frame Photography', emoji: '🌸', experience: 8, specialties: ['Wedding Portraits', 'Pre-wedding Shoots'], portfolioHighlights: ['Completed 300+ wedding assignments', 'Destination shoots in Pokhara'], rating: 4.8, reviews: 145, location: 'Lalitpur', instagram: '@goldenframephoto' },
    { id: 'bikash-films', name: 'Bikash Films & Studio', studio: 'Bikash Films', emoji: '🎥', experience: 15, specialties: ['Cinematic Films', 'Aerial Drone'], portfolioHighlights: ['15 years of professional filmmaking', 'Drone licensed'], rating: 4.7, reviews: 178, location: 'Kathmandu', instagram: '@bikashfilms' },
    { id: 'anita-gurung', name: 'Anita Gurung', studio: 'Himalayan Clicks', emoji: '🏔️', experience: 6, specialties: ['Outdoor Weddings', 'Mountain Destination'], portfolioHighlights: ['Specialist in outdoor and mountain-view ceremonies', '200+ ceremonies'], rating: 4.6, reviews: 92, location: 'Pokhara', instagram: '@himalayanclicks' },
  ];
  for (const ph of photographers) {
    await prisma.photographer.upsert({
      where: { id: ph.id },
      update: {},
      create: ph,
    });
  }
  console.log('✅ Photographers seeded');

  // 8. Bridal Makeup Artists
  const bridalArtists = [
    { id: 'ma1', name: 'Sunita Gurung', title: 'Celebrity Bridal Artist', experience: 12, image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop', rating: 4.9, reviews: 234, specialties: ['HD Bridal Makeup', 'Airbrush', 'Traditional Nepali'], location: 'Kathmandu', packages: [{ name: 'Classic Bridal', price: 25000, description: 'Complete bridal look', includes: ['HD Makeup', 'Hair Styling'] }] },
    { id: 'ma2', name: 'Priya Sharma', title: 'International Certified Artist', experience: 8, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop', rating: 4.8, reviews: 189, specialties: ['Contemporary Bridal', 'Smokey Eyes'], location: 'Lalitpur', packages: [{ name: 'Natural Glow', price: 18000, description: 'Subtle makeup', includes: ['Natural Makeup', 'Soft Hairdo'] }] },
    { id: 'ma3', name: 'Anjali Thapa', title: 'Traditional Mehndi Specialist', experience: 15, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop', rating: 4.9, reviews: 312, specialties: ['Intricate Mehndi', 'Bridal Makeup'], location: 'Bhaktapur', packages: [{ name: 'Mehndi + Makeup', price: 15000, description: 'Complete hands and feet mehndi', includes: ['Full Hand Mehndi', 'Feet Mehndi'] }] },
  ];
  for (const artist of bridalArtists) {
    await prisma.bridalMakeupArtist.upsert({
      where: { id: artist.id },
      update: {},
      create: artist,
    });
  }
  console.log('✅ Bridal makeup artists seeded');

  // 9. Events Makeup Services
  const eventsServices = [
    { id: 'em1', name: 'Sangeet Night Glam', description: 'Dramatic makeup for sangeet', price: 12000, duration: '2 hours', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=700&fit=crop', rating: 4.8, reviews: 156, occasions: ['Sangeet', 'Mehndi Night'], includes: ['Full Face Makeup', 'Dramatic Eyes'] },
    { id: 'em2', name: 'Reception Elegance', description: 'Sophisticated reception makeup', price: 15000, duration: '2.5 hours', image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=700&fit=crop', rating: 4.9, reviews: 203, occasions: ['Reception', 'Engagement'], includes: ['HD Makeup', 'Contouring'] },
    { id: 'em3', name: 'Party Glow', description: 'Youthful party makeup', price: 8000, duration: '1.5 hours', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=700&fit=crop', rating: 4.7, reviews: 98, occasions: ['Birthday', 'Party'], includes: ['Natural Glow', 'Soft Eyes'] },
    { id: 'em4', name: 'Festival Special', description: 'Vibrant festival makeup', price: 10000, duration: '2 hours', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=700&fit=crop', rating: 4.8, reviews: 134, occasions: ['Teej', 'Dashain'], includes: ['Traditional Look', 'Bindi Design'] },
  ];
  for (const service of eventsServices) {
    await prisma.eventsMakeupService.upsert({
      where: { id: service.id },
      update: {},
      create: service,
    });
  }
  console.log('✅ Events makeup services seeded');

  // 10. Service Items (for /services page)
  const serviceItems = [
    {
      id: 'pandit',
      title: 'Pandit Services',
      subtitle: 'Verified Vedic Priests',
      description: 'Book experienced and verified pandits for all types of Hindu ceremonies.',
      iconName: 'BookOpen',
      color: 'bg-amber-50 text-amber-700',
      accentColor: 'rgb(180 83 9)',
      to: '/pandits',
      features: ['Verified & background-checked pandits', 'Multi-language ceremonies', 'Customizable rituals', 'Samagri included', 'Pre-ceremony consultation'],
      ceremonies: ['Wedding', 'Griha Pravesh', 'Bratabandha', 'Satyanarayan Puja'],
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
      order: 1,
    },
    {
      id: 'boutique',
      title: 'Wedding Boutique',
      subtitle: 'Bridal Lehengas & Jewelry',
      description: 'Discover exquisite bridal lehengas, sarees, jewelry, and accessories.',
      iconName: 'ShoppingBag',
      color: 'bg-rose-50 text-rose-700',
      accentColor: 'rgb(190 18 60)',
      to: '/boutique',
      features: ['Designer bridal lehengas', 'Traditional jewelry', 'Bridal accessories', 'Customization', 'Home trial'],
      ceremonies: ['Wedding', 'Engagement', 'Reception', 'Mehndi'],
      image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=600&h=400&fit=crop',
      order: 2,
    },
    {
      id: 'bridal-makeup',
      title: 'Bridal Makeup',
      subtitle: 'Professional Bridal Artists',
      description: 'Transform into a radiant bride with our expert makeup artists.',
      iconName: 'Sparkles',
      color: 'bg-pink-50 text-pink-700',
      accentColor: 'rgb(190 24 93)',
      to: '/bridal-makeup',
      features: ['HD & airbrush makeup', 'Traditional bridal looks', 'Mehndi application', 'Hair styling', 'Trial session'],
      ceremonies: ['Wedding', 'Engagement', 'Reception', 'Pre-wedding Shoot'],
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      order: 3,
    },
    {
      id: 'events-makeup',
      title: 'Events Makeup',
      subtitle: 'Party & Reception Glam',
      description: 'Look stunning for every celebration. Specialized in party and reception looks.',
      iconName: 'PartyPopper',
      color: 'bg-purple-50 text-purple-700',
      accentColor: 'rgb(126 34 206)',
      to: '/events-makeup',
      features: ['Party & sangeet makeup', 'Reception glam', 'Group discounts', 'On-location', 'Touch-up packages'],
      ceremonies: ['Sangeet', 'Reception', 'Party', 'Corporate Events'],
      image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=400&fit=crop',
      order: 4,
    },
    {
      id: 'decorations',
      title: 'Decorations',
      subtitle: 'Mandap & Floral Design',
      description: 'Transform your venue with our decoration services.',
      iconName: 'Palette',
      color: 'bg-orange-50 text-orange-700',
      accentColor: 'rgb(194 65 12)',
      to: '/decorations',
      features: ['Mandap decoration', 'Floral arrangements', 'Entrance decor', 'Lighting', 'Theme customization'],
      ceremonies: ['Wedding', 'Engagement', 'Griha Pravesh', 'Reception'],
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
      order: 5,
    },
    {
      id: 'photography',
      title: 'Photography',
      subtitle: 'Candid & Cinematic',
      description: 'Capture every precious moment with professional photographers.',
      iconName: 'Camera',
      color: 'bg-blue-50 text-blue-700',
      accentColor: 'rgb(29 78 216)',
      to: '/photography',
      features: ['Candid photography', 'Cinematic films', 'Drone shots', 'Pre-wedding shoots', 'Same-day editing'],
      ceremonies: ['Wedding', 'Engagement', 'Pre-wedding', 'Reception'],
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop',
      order: 6,
    },
    {
      id: 'venue',
      title: 'Venues',
      subtitle: 'Banquet Halls & Gardens',
      description: 'Find the perfect venue for your ceremony.',
      iconName: 'Home',
      color: 'bg-emerald-50 text-emerald-700',
      accentColor: 'rgb(4 120 87)',
      to: '/venue',
      features: ['Banquet halls', 'Garden venues', 'Temple halls', 'Catering coordination', 'Parking'],
      ceremonies: ['Wedding', 'Reception', 'Griha Pravesh', 'Corporate Events'],
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop',
      order: 7,
    },
    {
      id: 'custom-puja',
      title: 'Custom Puja',
      subtitle: 'Bespoke Ceremonies',
      description: 'Design a completely custom puja according to your requirements.',
      iconName: 'Gem',
      color: 'bg-teal-50 text-teal-700',
      accentColor: 'rgb(13 148 136)',
      to: '/custom-puja',
      features: ['Fully customizable', 'Specialized samagri', 'Multi-day ceremonies', 'Astrological consultation', 'Post-ceremony guidance'],
      ceremonies: ['Any Custom Ceremony', 'Corporate Puja', 'Special Occasions'],
      image: 'https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=600&h=400&fit=crop',
      order: 8,
    },
  ];
  for (const item of serviceItems) {
    await prisma.serviceItem.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
  }
  console.log('✅ Service items seeded');

  // 11. Why Choose Us items
  const whyChooseUsItems = [
    { id: 'verified', iconName: 'Shield', title: 'Verified Professionals', description: 'Every pandit, artist, and vendor on our platform is thoroughly verified.', order: 1 },
    { id: 'easy-booking', iconName: 'Calendar', title: 'Easy Booking', description: 'Book any service in minutes with real-time availability and instant confirmation.', order: 2 },
    { id: 'happy-families', iconName: 'Users', title: '2,500+ Happy Families', description: 'Join thousands of families who have trusted us for their sacred ceremonies.', order: 3 },
    { id: 'rating', iconName: 'Star', title: '4.9/5 Average Rating', description: 'Our commitment to excellence is reflected in glowing reviews.', order: 4 },
    { id: 'tradition-care', iconName: 'Heart', title: 'Tradition with Care', description: 'We treat every ceremony with reverence and authenticity.', order: 5 },
    { id: 'premium-packages', iconName: 'Crown', title: 'Premium Packages', description: 'Save time and money with our curated bundles.', order: 6 },
  ];
  for (const item of whyChooseUsItems) {
    await prisma.whyChooseUsItem.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
  }
  console.log('✅ Why Choose Us items seeded');

  // 12. Promo Packages
  const promoPackages = [
    { id: 'essential-puja', name: 'Essential Puja', price: 'From NPR 5,000', description: 'Perfect for small pujas and blessings', includes: ['Verified Pandit', 'Basic Samagri', '1-hour Ceremony', 'Post-ceremony Guidance'], popular: false, order: 1 },
    { id: 'wedding-classic', name: 'Wedding Classic', price: 'From NPR 75,000', description: 'Complete wedding ceremony package', includes: ['Pandit + Samagri', 'Mandap Decoration', 'Photography (4hrs)', 'Bridal Makeup'], popular: true, order: 2 },
    { id: 'grand-celebration', name: 'Grand Celebration', price: 'From NPR 1,50,000', description: 'The ultimate celebration experience', includes: ['Everything in Classic', 'Venue Booking', 'Catering Coordination', 'Full-day Photography', 'Bridal + Events Makeup'], popular: false, order: 3 },
  ];
  for (const pkg of promoPackages) {
    await prisma.promoPackage.upsert({
      where: { id: pkg.id },
      update: {},
      create: pkg,
    });
  }
  console.log('✅ Promo packages seeded');

  console.log('🎉 All seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
