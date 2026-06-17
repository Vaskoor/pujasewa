import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin, Star, Award, BookOpen, Calendar, ChevronLeft, CheckCircle2,
  Clock, Languages, GraduationCap, Flame, Heart, Share2,
  Phone, Mail, MessageCircle, BadgeCheck, Sparkles, ArrowRight, Shield
} from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Navbar } from '../../components/Navbar';

// Demo data aligned with PanditDirectoryPage
const DEMO_PANDITS = [
  {
    id: 'p1',
    name: 'Pandit Ram Prasad Sharma',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=400&fit=crop',
    district: 'Kathmandu',
    address: 'Boudha, Kathmandu, Nepal',
    bio: 'Senior Vedic scholar with 22 years of experience in conducting traditional Hindu ceremonies. Specializes in marriage rituals and Satyanarayan Puja with authentic Sanskrit chanting. Known for precise mantra pronunciation and maintaining the sanctity of ancient rituals in modern settings.',
    experienceYears: 22,
    rating: 4.9,
    reviews: 127,
    specializations: ['Marriage', 'Satyanarayana Puja', 'Griha Pravesh'],
    languages: ['Sanskrit', 'Nepali', 'Hindi'],
    education: 'Shankaracharya Veda Peeth',
    certifications: ['Vedic Ritual Specialist', 'Marriage Ceremony Expert'],
    ceremoniesCompleted: 850,
    isVerified: true,
    isTopRated: true,
    phone: '+977 9812345678',
    email: 'ram.sharma@pujasewa.com',
    availability: 'Mon-Sun, 6:00 AM - 8:00 PM',
    about: `Pandit Ram Prasad Sharma is one of the most respected Vedic scholars in the Kathmandu Valley. With over two decades of experience, he has conducted ceremonies for thousands of families, bringing blessings and spiritual guidance to countless homes.

His approach combines strict adherence to Vedic traditions with a warm, personable demeanor that puts families at ease. He is particularly known for his expertise in marriage ceremonies, where his Sanskrit chanting and ritual precision create an atmosphere of divine sanctity.`,
    services: [
      { name: 'Marriage Ceremony', price: 25000, duration: '4-6 hours', description: 'Complete Vedic marriage rituals including Kanyadaan, Saptapadi, and all traditional ceremonies.' },
      { name: 'Satyanarayan Puja', price: 8000, duration: '2-3 hours', description: 'Full Satyanarayan Katha and puja for prosperity and well-being.' },
      { name: 'Griha Pravesh', price: 15000, duration: '3-4 hours', description: 'Vastu-compliant house warming ceremony with Ganesh Puja and Navagraha Shanti.' },
      { name: 'Rudrabhishek', price: 12000, duration: '2-3 hours', description: 'Sacred Shiva lingam abhishek with 108 bel patra and traditional mantras.' },
    ],
    testimonials: [
      { name: 'Sita Sharma', rating: 5, date: '2024-11-15', text: 'Pandit ji conducted our daughter\'s wedding with such grace and precision. The Sanskrit chanting was beautiful and the entire ceremony felt truly divine.' },
      { name: 'Ramesh Gupta', rating: 5, date: '2024-10-22', text: 'We had Griha Pravesh done by Pandit Sharma. Very knowledgeable and explained each ritual\'s significance. Highly recommended!' },
      { name: 'Anita Koirala', rating: 4, date: '2024-09-08', text: 'Professional and punctual. The Satyanarayan Puja was conducted flawlessly. Will definitely book again.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606293926075-69a00febf780?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1596386461350-326256694e69?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'p2',
    name: 'Pandit Krishna Bhattarai',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1606293926075-69a00febf780?w=1200&h=400&fit=crop',
    district: 'Lalitpur',
    address: 'Patan, Lalitpur, Nepal',
    bio: 'Renowned astrologer and puja specialist with deep knowledge of Jyotish Shastra. Expert in Rudrabhishek and Maha Mrityunjaya ceremonies for health and prosperity.',
    experienceYears: 18,
    rating: 4.8,
    reviews: 94,
    specializations: ['Rudrabhishek', 'Shraddha', 'Astrology'],
    languages: ['Nepali', 'Sanskrit', 'Hindi'],
    education: 'Varanasi Sanskrit University',
    certifications: ['Jyotish Acharya', 'Rudrabhishek Specialist'],
    ceremoniesCompleted: 620,
    isVerified: true,
    isTopRated: true,
    phone: '+977 9812345679',
    email: 'krishna.bhattarai@pujasewa.com',
    availability: 'Mon-Sat, 7:00 AM - 7:00 PM',
    about: `Pandit Krishna Bhattarai brings the ancient wisdom of Varanasi to Nepal. With 18 years of dedicated practice, he has mastered the intricate arts of Jyotish Shastra and Vedic rituals. His Rudrabhishek ceremonies are particularly sought after for their spiritual depth and healing energy.`,
    services: [
      { name: 'Rudrabhishek', price: 12000, duration: '2-3 hours', description: 'Complete Rudrabhishek with 108 offerings and Maha Mrityunjaya chanting.' },
      { name: 'Shraddha Ceremony', price: 10000, duration: '3-4 hours', description: 'Traditional ancestor worship ceremony with full tarpan and pind daan.' },
      { name: 'Birth Chart Analysis', price: 5000, duration: '1 hour', description: 'Detailed horoscope reading with remedies and gemstone recommendations.' },
      { name: 'Maha Mrityunjaya', price: 15000, duration: '3-4 hours', description: '108 Maha Mrityunjaya mantra chanting for health and longevity.' },
    ],
    testimonials: [
      { name: 'Govinda Prasad', rating: 5, date: '2024-11-20', text: 'The Rudrabhishek was incredibly powerful. Pandit ji\'s chanting created an atmosphere I can only describe as transformative.' },
      { name: 'Maya Devi', rating: 5, date: '2024-10-15', text: 'Very accurate horoscope reading. The remedies suggested have brought positive changes to our family.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1606293926075-69a00febf780?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1596386461350-326256694e69?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'p3',
    name: 'Pandit Gopal Mishra',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1596386461350-326256694e69?w=1200&h=400&fit=crop',
    district: 'Bhaktapur',
    address: 'Bhaktapur Durbar Square Area',
    bio: 'Young and dynamic priest specializing in modern interpretations of traditional rituals. Known for engaging ceremonies that connect with younger generations while maintaining authenticity.',
    experienceYears: 8,
    rating: 4.7,
    reviews: 56,
    specializations: ['Bratabandha', 'Namkaran', 'Puja'],
    languages: ['Nepali', 'English', 'Hindi'],
    education: 'Kathmandu Sanskrit University',
    certifications: ['Youth Ceremony Specialist'],
    ceremoniesCompleted: 340,
    isVerified: true,
    isTopRated: false,
    phone: '+977 9812345680',
    email: 'gopal.mishra@pujasewa.com',
    availability: 'Mon-Sun, 8:00 AM - 6:00 PM',
    about: `Pandit Gopal Mishra represents a new generation of Vedic priests who bridge ancient wisdom with contemporary understanding. His ceremonies are known for being engaging, educational, and spiritually fulfilling for all age groups.`,
    services: [
      { name: 'Bratabandha', price: 15000, duration: '4-5 hours', description: 'Complete thread ceremony with Gayatri mantra initiation and traditional rituals.' },
      { name: 'Namkaran', price: 5000, duration: '1-2 hours', description: 'Traditional naming ceremony with astrological name selection and blessings.' },
      { name: 'General Puja', price: 3000, duration: '1 hour', description: 'Customizable puja for any occasion with explanation of rituals.' },
    ],
    testimonials: [
      { name: 'Prakash Joshi', rating: 5, date: '2024-11-10', text: 'Pandit Mishra made our son\'s Bratabandha so engaging. He explained everything in a way the kids could understand.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1596386461350-326256694e69?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'p4',
    name: 'Pandit Hari Prasad Upadhyaya',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=400&fit=crop',
    district: 'Pokhara',
    address: 'Lakeside, Pokhara, Nepal',
    bio: 'Himalayan tradition keeper with expertise in Tantric rituals and Himalayan Vedic practices. Conducts ceremonies with unique Pashchimanchal traditions and mantras.',
    experienceYears: 30,
    rating: 5.0,
    reviews: 156,
    specializations: ['Shraddha', 'Puja', 'Tantric Rituals'],
    languages: ['Sanskrit', 'Nepali', 'Hindi', 'Khas'],
    education: 'Muktinath Vedic Gurukul',
    certifications: ['Tantric Ritual Master', 'Senior Vedic Scholar'],
    ceremoniesCompleted: 1200,
    isVerified: true,
    isTopRated: true,
    phone: '+977 9812345681',
    email: 'hari.upadhyaya@pujasewa.com',
    availability: 'Mon-Sun, 5:00 AM - 9:00 PM',
    about: `Pandit Hari Prasad Upadhyaya is a living repository of Himalayan Vedic traditions. With 30 years of practice in the shadow of the Annapurna range, he brings unique Pashchimanchal traditions that are rarely found elsewhere in Nepal.`,
    services: [
      { name: 'Shraddha', price: 10000, duration: '3-4 hours', description: 'Complete ancestor ceremony with Himalayan traditions and special tarpan.' },
      { name: 'Tantric Puja', price: 20000, duration: '4-6 hours', description: 'Authentic tantric rituals for specific spiritual and material goals.' },
      { name: 'Havan', price: 8000, duration: '2-3 hours', description: 'Sacred fire ceremony with Himalayan herbs and special mantras.' },
    ],
    testimonials: [
      { name: 'Dhan Bahadur', rating: 5, date: '2024-11-25', text: 'The Shraddha ceremony was conducted with such reverence. You can feel the Himalayan tradition in every mantra.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606293926075-69a00febf780?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'p5',
    name: 'Pandit Shyam Sundar Joshi',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1596386461350-326256694e69?w=1200&h=400&fit=crop',
    district: 'Chitwan',
    address: 'Bharatpur, Chitwan, Nepal',
    bio: 'Expert in Griha Pravesh and Vastu Shastra ceremonies. Helps families establish harmonious homes through traditional Vastu-compliant house warming rituals.',
    experienceYears: 15,
    rating: 4.6,
    reviews: 78,
    specializations: ['Griha Pravesh', 'Vastu Puja', 'Marriage'],
    languages: ['Nepali', 'Hindi', 'Sanskrit'],
    education: 'Chitwan Vedic Center',
    certifications: ['Vastu Shastra Expert', 'Griha Pravesh Specialist'],
    ceremoniesCompleted: 490,
    isVerified: true,
    isTopRated: false,
    phone: '+977 9812345682',
    email: 'shyam.joshi@pujasewa.com',
    availability: 'Mon-Sat, 7:00 AM - 6:00 PM',
    about: `Pandit Shyam Sundar Joshi is Chitwan's foremost expert in Vastu Shastra and Griha Pravesh ceremonies. His unique approach combines traditional Vastu principles with practical modern living solutions.`,
    services: [
      { name: 'Griha Pravesh', price: 15000, duration: '3-4 hours', description: 'Complete house warming with Vastu Shanti, Ganesh Puja, and Navagraha.' },
      { name: 'Vastu Consultation', price: 8000, duration: '2 hours', description: 'Detailed Vastu analysis of your home with practical remedies.' },
      { name: 'Marriage', price: 22000, duration: '4-6 hours', description: 'Traditional marriage ceremony with Vastu-aligned mandap setup.' },
    ],
    testimonials: [
      { name: 'Hari Prasad', rating: 4, date: '2024-11-05', text: 'Good Griha Pravesh ceremony. The Vastu advice was practical and helpful.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1596386461350-326256694e69?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'p6',
    name: 'Pandit Damodar Paudel',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1606293926075-69a00febf780?w=1200&h=400&fit=crop',
    district: 'Butwal',
    address: 'Butwal-11, Rupandehi, Nepal',
    bio: 'Lumbini region specialist with deep connections to Buddhist-Hindu syncretic traditions. Conducts peaceful ceremonies blending both philosophical approaches.',
    experienceYears: 20,
    rating: 4.8,
    reviews: 103,
    specializations: ['Puja', 'Shraddha', 'Peace Ceremonies'],
    languages: ['Nepali', 'Sanskrit', 'Hindi', 'Bhojpuri'],
    education: 'Lumbini Vedic Academy',
    certifications: ['Interfaith Ceremony Specialist'],
    ceremoniesCompleted: 710,
    isVerified: true,
    isTopRated: true,
    phone: '+977 9812345683',
    email: 'damodar.paudel@pujasewa.com',
    availability: 'Mon-Sun, 6:00 AM - 8:00 PM',
    about: `Pandit Damodar Paudel serves the Lumbini region with ceremonies that honor the unique Buddhist-Hindu syncretic traditions of the area. His peaceful, inclusive approach makes him a favorite among diverse communities.`,
    services: [
      { name: 'Peace Ceremony', price: 10000, duration: '2-3 hours', description: 'Harmony ceremony blending Buddhist and Hindu traditions for peace and prosperity.' },
      { name: 'Shraddha', price: 9000, duration: '3-4 hours', description: 'Traditional ancestor ceremony with Lumbini region customs.' },
      { name: 'General Puja', price: 4000, duration: '1-2 hours', description: 'Customizable puja with interfaith blessings.' },
    ],
    testimonials: [
      { name: 'Buddha Raj', rating: 5, date: '2024-11-18', text: 'Pandit Paudel\'s interfaith approach made our family ceremony beautiful and inclusive for everyone.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1606293926075-69a00febf780?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'p7',
    name: 'Pandit Narayan Bhandari',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=400&fit=crop',
    district: 'Biratnagar',
    address: 'Biratnagar-8, Morang, Nepal',
    bio: 'Eastern Nepal tradition bearer specializing in elaborate marriage ceremonies with Maithili and Nepali fusion rituals. Known for detailed and culturally rich wedding pujas.',
    experienceYears: 25,
    rating: 4.9,
    reviews: 142,
    specializations: ['Marriage', 'Bratabandha', 'Satyanarayana Puja'],
    languages: ['Nepali', 'Maithili', 'Sanskrit', 'Hindi'],
    education: 'Biratnagar Sanskrit College',
    certifications: ['Marriage Ritual Master', 'Cultural Fusion Expert'],
    ceremoniesCompleted: 980,
    isVerified: true,
    isTopRated: true,
    phone: '+977 9812345684',
    email: 'narayan.bhandari@pujasewa.com',
    availability: 'Mon-Sun, 6:00 AM - 9:00 PM',
    about: `Pandit Narayan Bhandari is Eastern Nepal's most celebrated marriage ceremony specialist. His unique Maithili-Nepali fusion rituals bring cultural richness and spiritual depth to every wedding he conducts.`,
    services: [
      { name: 'Marriage', price: 28000, duration: '5-7 hours', description: 'Elaborate marriage ceremony with Maithili and Nepali fusion traditions.' },
      { name: 'Bratabandha', price: 16000, duration: '4-5 hours', description: 'Traditional thread ceremony with Eastern Nepal customs.' },
      { name: 'Satyanarayan Puja', price: 9000, duration: '2-3 hours', description: 'Complete Satyanarayan Katha with Eastern Nepal traditions.' },
    ],
    testimonials: [
      { name: 'Maithili Devi', rating: 5, date: '2024-11-22', text: 'The marriage ceremony was a beautiful blend of Maithili and Nepali traditions. Truly unforgettable!' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606293926075-69a00febf780?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'p8',
    name: 'Pandit Bharat Ghimire',
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1596386461350-326256694e69?w=1200&h=400&fit=crop',
    district: 'Dharan',
    address: 'Dharan-15, Sunsari, Nepal',
    bio: 'Former temple head priest turned freelance ceremony conductor. Brings temple-level authenticity to home ceremonies with precise mantra pronunciation and ritual accuracy.',
    experienceYears: 28,
    rating: 4.7,
    reviews: 89,
    specializations: ['Puja', 'Rudrabhishek', 'Shraddha'],
    languages: ['Sanskrit', 'Nepali', 'Hindi'],
    education: 'Pashupatinath Temple Training',
    certifications: ['Temple Priest Certification', 'Advanced Mantra Chanting'],
    ceremoniesCompleted: 1100,
    isVerified: true,
    isTopRated: false,
    phone: '+977 9812345685',
    email: 'bharat.ghimire@pujasewa.com',
    availability: 'Mon-Sun, 5:00 AM - 8:00 PM',
    about: `Pandit Bharat Ghimire spent 15 years as a head priest at Pashupatinath Temple before bringing his expertise to home ceremonies. His temple-trained precision and authentic mantra chanting are unmatched.`,
    services: [
      { name: 'Rudrabhishek', price: 14000, duration: '2-3 hours', description: 'Temple-grade Rudrabhishek with precise 108 offerings and authentic mantras.' },
      { name: 'Shraddha', price: 11000, duration: '3-4 hours', description: 'Traditional ancestor ceremony with temple-level precision.' },
      { name: 'General Puja', price: 5000, duration: '1-2 hours', description: 'Temple-quality puja for any occasion with precise rituals.' },
    ],
    testimonials: [
      { name: 'Shiva Raj', rating: 5, date: '2024-11-12', text: 'The Rudrabhishek felt like being at Pashupatinath itself. The precision and energy were incredible.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1596386461350-326256694e69?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'p9',
    name: 'Pandit Ramesh Koirala',
    photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1606293926075-69a00febf780?w=1200&h=400&fit=crop',
    district: 'Hetauda',
    address: 'Hetauda-4, Makwanpur, Nepal',
    bio: 'Makwanpur district\'s most requested pandit for vehicle puja and business opening ceremonies. Known for concise yet effective rituals that fit modern schedules.',
    experienceYears: 12,
    rating: 4.5,
    reviews: 67,
    specializations: ['Vehicle Puja', 'Office Opening', 'Puja'],
    languages: ['Nepali', 'Hindi'],
    education: 'Hetauda Vedic Study Center',
    certifications: ['Modern Schedule Specialist'],
    ceremoniesCompleted: 420,
    isVerified: true,
    isTopRated: false,
    phone: '+977 9812345686',
    email: 'ramesh.koirala@pujasewa.com',
    availability: 'Mon-Sat, 8:00 AM - 6:00 PM',
    about: `Pandit Ramesh Koirala is the go-to pandit for busy professionals and modern families. His ceremonies are concise, effective, and designed to fit contemporary schedules without compromising spiritual integrity.`,
    services: [
      { name: 'Vehicle Puja', price: 3000, duration: '30-45 min', description: 'Quick yet effective vehicle blessing ceremony for new vehicles.' },
      { name: 'Office Opening', price: 8000, duration: '1-2 hours', description: 'Business blessing ceremony with Ganesh Puja and Lakshmi invocation.' },
      { name: 'General Puja', price: 2500, duration: '45 min', description: 'Concise puja for any occasion, perfect for busy schedules.' },
    ],
    testimonials: [
      { name: 'Business Man', rating: 4, date: '2024-11-08', text: 'Quick and effective office opening ceremony. Perfect for our busy schedule.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1606293926075-69a00febf780?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'p10',
    name: 'Pandit Devendra Paudel',
    photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b2ad?w=400&h=500&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=400&fit=crop',
    district: 'Kathmandu',
    address: 'Kirtipur, Kathmandu, Nepal',
    bio: 'Newari tradition specialist preserving Kathmandu Valley\'s unique Vedic practices. Expert in Newari-style marriage and festival ceremonies with traditional music coordination.',
    experienceYears: 16,
    rating: 4.8,
    reviews: 112,
    specializations: ['Marriage', 'Festival Puja', 'Griha Pravesh'],
    languages: ['Nepali', 'Newari', 'Sanskrit', 'Hindi'],
    education: 'Kirtipur Vedic Heritage Center',
    certifications: ['Newari Tradition Keeper', 'Festival Ceremony Expert'],
    ceremoniesCompleted: 580,
    isVerified: true,
    isTopRated: true,
    phone: '+977 9812345687',
    email: 'devendra.paudel@pujasewa.com',
    availability: 'Mon-Sun, 6:00 AM - 8:00 PM',
    about: `Pandit Devendra Paudel is a guardian of Newari Vedic traditions. His ceremonies preserve the unique cultural heritage of the Kathmandu Valley, incorporating traditional music and Newari customs into authentic Vedic rituals.`,
    services: [
      { name: 'Newari Marriage', price: 30000, duration: '5-7 hours', description: 'Authentic Newari-style marriage with traditional music and customs.' },
      { name: 'Festival Puja', price: 10000, duration: '2-3 hours', description: 'Festival-specific puja with Newari traditions and music coordination.' },
      { name: 'Griha Pravesh', price: 16000, duration: '3-4 hours', description: 'House warming with Newari customs and Vastu compliance.' },
    ],
    testimonials: [
      { name: 'Newari Family', rating: 5, date: '2024-11-28', text: 'The Newari marriage ceremony was a beautiful preservation of our heritage. The traditional music coordination was perfect.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606293926075-69a00febf780?w=400&h=300&fit=crop',
    ],
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-sm ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}`}>★</span>
      ))}
    </span>
  );
}

export function PanditPortfolioPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pandit, setPandit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews' | 'gallery'>('about');

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = DEMO_PANDITS.find(p => p.id === id);
      setPandit(found || null);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!pandit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Pandit Not Found</h2>
          <p className="text-gray-500 mb-4">The pandit portfolio you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/pandits')}
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Cover Photo */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <img
          src={pandit.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate('/pandits')}
          className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white transition-colors shadow-soft"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Directory
        </button>

        {/* Share Button */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: pandit.name, url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
          className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white transition-colors shadow-soft"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Profile Header */}
      <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-medium p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Photo */}
            <div className="relative flex-shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg -mt-16 md:-mt-24">
                <img
                  src={pandit.photo}
                  alt={pandit.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {pandit.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-md">
                  <BadgeCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {pandit.name}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    {pandit.address}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                    {pandit.isTopRated && (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                        <Star className="w-3 h-3 fill-current" />
                        Top Rated
                      </span>
                    )}
                    {pandit.isVerified && (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                        <Shield className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                      <Clock className="w-3 h-3" />
                      {pandit.experienceYears} Years Experience
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <StarRating rating={pandit.rating} />
                    <span className="font-bold text-gray-800">{pandit.rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">({pandit.reviews} reviews)</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2">
                  <Link
                    to="/book"
                    className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors shadow-soft"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </Link>
                  <a
                    href={`tel:${pandit.phone}`}
                    className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Pandit
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{pandit.ceremoniesCompleted}+</div>
              <div className="text-xs text-gray-500 mt-1">Ceremonies Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{pandit.experienceYears}</div>
              <div className="text-xs text-gray-500 mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{pandit.languages.length}</div>
              <div className="text-xs text-gray-500 mt-1">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{pandit.rating.toFixed(1)}</div>
              <div className="text-xs text-gray-500 mt-1">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tabs Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-6">
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {(['about', 'services', 'reviews', 'gallery'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[100px] px-4 py-4 text-sm font-semibold capitalize transition-colors relative whitespace-nowrap ${
                      activeTab === tab
                        ? 'text-amber-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        About
                      </h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {pandit.about}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Flame className="w-5 h-5 text-amber-500" />
                        Specializations
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {pandit.specializations.map((s: string, i: number) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full text-sm font-medium"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-amber-500" />
                          Education
                        </h4>
                        <p className="text-sm text-gray-600">{pandit.education}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <BadgeCheck className="w-4 h-4 text-amber-500" />
                          Certifications
                        </h4>
                        <div className="space-y-1">
                          {pandit.certifications.map((c: string, i: number) => (
                            <p key={i} className="text-sm text-gray-600 flex items-center gap-1.5">
                              <Award className="w-3 h-3 text-amber-500" />
                              {c}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Languages className="w-4 h-4 text-amber-500" />
                          Languages
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {pandit.languages.map((l: string, i: number) => (
                            <span key={i} className="text-xs bg-white text-gray-600 px-2 py-1 rounded-md border border-gray-200">
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-500" />
                          Availability
                        </h4>
                        <p className="text-sm text-gray-600">{pandit.availability}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Services & Pricing</h3>
                    {pandit.services.map((service: any, i: number) => (
                      <div
                        key={i}
                        className="border border-gray-100 rounded-xl p-4 hover:border-amber-200 hover:shadow-soft transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {service.duration}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xl font-bold text-amber-600">
                              Rs. {service.price.toLocaleString()}
                            </span>
                            <Link
                              to="/book"
                              className="inline-flex items-center gap-1 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
                            >
                              Book
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl font-bold text-amber-600">{pandit.rating.toFixed(1)}</div>
                      <div>
                        <StarRating rating={pandit.rating} />
                        <p className="text-sm text-gray-500 mt-1">{pandit.reviews} reviews</p>
                      </div>
                    </div>
                    {pandit.testimonials.map((review: any, i: number) => (
                      <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                              {review.name[0]}
                            </div>
                            <span className="font-medium text-gray-900 text-sm">{review.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <StarRating rating={review.rating} />
                        <p className="text-sm text-gray-600 mt-2">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {pandit.gallery.map((photo: string, i: number) => (
                        <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden group">
                          <img
                            src={photo}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${pandit.phone}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-amber-50"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Phone</div>
                    <div className="text-sm font-medium">{pandit.phone}</div>
                  </div>
                </a>
                <a
                  href={`mailto:${pandit.email}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-amber-50"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Email</div>
                    <div className="text-sm font-medium">{pandit.email}</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-gray-600 p-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Location</div>
                    <div className="text-sm font-medium">{pandit.district}, Nepal</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Book */}
            <div className="bg-gradient-to-br from-amber-600 to-orange-500 rounded-2xl shadow-soft p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Book This Pandit</h3>
              <p className="text-sm text-white/80 mb-4">
                Schedule your ceremony with {pandit.name.split(' ')[1]} and experience authentic Vedic rituals.
              </p>
              <Link
                to="/book"
                className="block w-full text-center bg-white text-amber-600 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Book Now
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h3 className="font-bold text-gray-900 mb-4">Why Choose {pandit.name.split(' ')[1]}</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Verified Profile</div>
                    <div className="text-xs text-gray-500">Identity and credentials verified</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{pandit.experienceYears}+ Years Experience</div>
                    <div className="text-xs text-gray-500">Trusted by thousands of families</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Secure Booking</div>
                    <div className="text-xs text-gray-500">Protected payments and cancellation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Authentic Rituals</div>
                    <div className="text-xs text-gray-500">Traditional Vedic ceremonies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
