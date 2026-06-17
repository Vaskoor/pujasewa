import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const blogPostsData: Record<string, any> = {
  'essential-rituals-nepali-wedding': {
    title: 'Essential Rituals in a Traditional Nepali Wedding',
    author: 'Pandit Ramesh Sharma',
    date: 'June 5, 2026',
    readTime: '8 min read',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=600&fit=crop',
    content: [
      {
        type: 'paragraph',
        text: 'A traditional Nepali Hindu wedding is not merely a social event — it is a sacred spiritual journey that unites two souls across seven lifetimes. Rooted in ancient Vedic scriptures, each ritual carries profound meaning and blessings for the couple\'s future together.',
      },
      {
        type: 'heading',
        text: '1. Kanyadaan — The Sacred Giving',
      },
      {
        type: 'paragraph',
        text: 'The ceremony begins with Kanyadaan, where the bride\'s parents formally give their daughter to the groom. This is considered one of the most pious acts a father can perform. The pandit chants mantras invoking Lord Vishnu and Goddess Lakshmi, blessing the union with divine grace.',
      },
      {
        type: 'heading',
        text: '2. Panigrahan — Holding Hands',
      },
      {
        type: 'paragraph',
        text: 'The groom takes the bride\'s hand, symbolizing his acceptance of her as his life partner. The pandit recites Vedic hymns that invoke the gods to witness this sacred bond. This ritual signifies the beginning of their journey together as husband and wife.',
      },
      {
        type: 'heading',
        text: '3. Saptapadi — The Seven Sacred Steps',
      },
      {
        type: 'paragraph',
        text: 'Around the sacred fire (Agni), the couple takes seven steps together, each representing a vow: nourishment, strength, prosperity, happiness, progeny, longevity, and friendship. These seven steps are the foundation of a Hindu marriage, and the fire serves as the eternal witness.',
      },
      {
        type: 'heading',
        text: '4. Sindoor and Mangalsutra',
      },
      {
        type: 'paragraph',
        text: 'The groom applies sindoor (vermilion) in the bride\'s hair parting and ties the mangalsutra (sacred necklace), marking her as a married woman. These symbols represent the bride\'s new status and the groom\'s commitment to protect and cherish her.',
      },
      {
        type: 'heading',
        text: '5. Ashirwad — Blessings from Elders',
      },
      {
        type: 'paragraph',
        text: 'The ceremony concludes with blessings from parents, grandparents, and elders. Their wisdom and good wishes form an essential part of the couple\'s married life, providing guidance and support through all of life\'s challenges.',
      },
      {
        type: 'quote',
        text: 'A Hindu wedding is not just the union of two individuals, but the merging of two families, two lineages, and two souls destined to walk the path of dharma together.',
        author: 'Pandit Ramesh Sharma',
      },
    ],
    tags: ['Wedding', 'Nepali Traditions', 'Hindu Rituals', 'Kanyadaan', 'Saptapadi'],
    relatedPosts: [2, 4, 7],
  },
  'griha-pravesh-muhurat-2026': {
    title: 'Griha Pravesh Muhurat Dates for 2026',
    author: 'Astrologer Deepak Joshi',
    date: 'May 28, 2026',
    readTime: '6 min read',
    category: 'Pujas',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', text: 'Griha Pravesh, or housewarming, is one of the most important ceremonies in Hindu tradition. Entering a new home during an auspicious muhurat ensures peace, prosperity, and positive energy for the residents.' },
      { type: 'heading', text: 'Understanding Griha Pravesh Muhurat' },
      { type: 'paragraph', text: 'A muhurat is an astrologically calculated auspicious time window. For Griha Pravesh, we consider the position of the moon, nakshatra (lunar mansion), and tithi (lunar day) to determine the most favorable time for entering your new home.' },
      { type: 'heading', text: 'Auspicious Months for 2026' },
      { type: 'paragraph', text: 'The months of Magh (January-February), Phalgun (February-March), and Vaishakh (April-May) are considered highly favorable for Griha Pravesh. Avoid the months of Ashadha and Shravana as they are generally considered inauspicious for new beginnings.' },
      { type: 'heading', text: 'Essential Preparations' },
      { type: 'paragraph', text: 'Before the ceremony, ensure the house is thoroughly cleaned. Prepare a kalash (sacred pot) with water, mango leaves, and coconut. Arrange for havan samagri, flowers, fruits, and sweets. The main door should be decorated with a toran (door hanging) made of mango leaves and marigold flowers.' },
      { type: 'quote', text: 'A home entered during an auspicious muhurat becomes a temple of peace and prosperity for generations to come.', author: 'Astrologer Deepak Joshi' },
    ],
    tags: ['Griha Pravesh', 'Muhurat', '2026', 'Vastu', 'Housewarming'],
    relatedPosts: [5, 3, 1],
  },
  'significance-bratabandha-ceremony': {
    title: 'The Sacred Significance of Bratabandha Ceremony',
    author: 'Pandit Gopal Acharya',
    date: 'May 20, 2026',
    readTime: '10 min read',
    category: 'Traditions',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', text: 'Bratabandha, also known as Upanayana, is one of the sixteen sacred samskaras (rites of passage) in Hindu tradition. This ceremony marks a boy\'s initiation into the study of the Vedas and his formal acceptance into the student phase of life (Brahmacharya Ashram).' },
      { type: 'heading', text: 'The Sacred Thread (Janeu)' },
      { type: 'paragraph', text: 'During the ceremony, the boy receives the sacred thread (janeu or yajnopavita) consisting of three strands representing the three debts every Hindu must fulfill: debt to the rishis (sages), debt to the ancestors, and debt to the gods. The thread is worn over the left shoulder and under the right arm.' },
      { type: 'heading', text: 'Gayatri Mantra Initiation' },
      { type: 'paragraph', text: 'A pivotal moment of the ceremony is when the guru whispers the Gayatri Mantra into the boy\'s ear. This powerful Vedic hymn is considered the mother of all mantras, and its proper recitation is believed to bestow wisdom, clarity, and spiritual illumination.' },
      { type: 'heading', text: 'The Mundan Ritual' },
      { type: 'paragraph', text: 'The boy\'s head is shaved, symbolizing the removal of past ignorance and ego. This prepares him to receive divine knowledge with a pure mind and open heart.' },
      { type: 'quote', text: 'Bratabandha is not merely a ritual — it is the spiritual rebirth of a child into the world of Vedic wisdom and dharma.', author: 'Pandit Gopal Acharya' },
    ],
    tags: ['Bratabandha', 'Upanayana', 'Janeu', 'Gayatri Mantra', 'Samskara'],
    relatedPosts: [1, 6, 4],
  },
  'choosing-right-pandit-wedding': {
    title: 'How to Choose the Right Pandit for Your Wedding',
    author: 'PanditJi Editorial Team',
    date: 'May 15, 2026',
    readTime: '7 min read',
    category: 'Planning',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', text: 'Selecting the right pandit for your wedding is one of the most important decisions you will make during your planning process. The pandit not only conducts the rituals but also sets the spiritual tone for your entire ceremony.' },
      { type: 'heading', text: 'Verify Qualifications and Experience' },
      { type: 'paragraph', text: 'Look for a pandit who has formal training in Vedic studies and substantial experience conducting weddings. Ask about their educational background, the number of weddings they have performed, and whether they specialize in your specific tradition (Nepali, Indian, etc.).' },
      { type: 'heading', text: 'Language and Communication' },
      { type: 'paragraph', text: 'Ensure the pandit can communicate effectively in your preferred language. Many modern couples prefer ceremonies where Sanskrit mantras are explained in Nepali or English so that all guests can understand and appreciate the rituals.' },
      { type: 'heading', text: 'Customization and Flexibility' },
      { type: 'paragraph', text: 'A good pandit should be willing to customize the ceremony according to your family traditions and preferences. Discuss any specific rituals you want to include or exclude, and ensure they are comfortable accommodating your requests.' },
      { type: 'quote', text: 'The right pandit transforms a wedding from a series of rituals into a deeply meaningful spiritual experience that you and your guests will remember forever.', author: 'PanditJi Editorial Team' },
    ],
    tags: ['Wedding Planning', 'Pandit Selection', 'Tips', 'Ceremony Guide'],
    relatedPosts: [1, 7, 2],
  },
  'satyanarayan-katha-significance': {
    title: 'Satyanarayan Katha: Significance and Procedure',
    author: 'Pandit Suresh Upadhyaya',
    date: 'May 8, 2026',
    readTime: '9 min read',
    category: 'Pujas',
    image: 'https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', text: 'Satyanarayan Katha is one of the most widely performed pujas in Hindu households. Dedicated to Lord Vishnu in his form as Satyanarayan (the Lord of Truth), this puja is believed to bring prosperity, remove obstacles, and fulfill the sincere wishes of devotees.' },
      { type: 'heading', text: 'When to Perform Satyanarayan Puja' },
      { type: 'paragraph', text: 'This puja can be performed on any day, but it is especially auspicious on Purnima (full moon days), Ekadashi, and during festivals like Vaikuntha Ekadashi. Many families perform it before starting new ventures, during housewarmings, or to mark important life events.' },
      { type: 'heading', text: 'The Five Chapters of the Katha' },
      { type: 'paragraph', text: 'The Satyanarayan Katha consists of five chapters (adhyayas) that narrate the divine stories of Lord Satyanarayan and the blessings received by his devotees. These stories emphasize the importance of truth, devotion, and gratitude in one\'s life.' },
      { type: 'heading', text: 'Prasad and Offerings' },
      { type: 'paragraph', text: 'The prasad (sacred offering) for Satyanarayan Puja is typically sheera (sooji halwa) made with wheat, ghee, sugar, bananas, and dry fruits. This prasad is distributed among all attendees after the puja, symbolizing the sharing of divine blessings.' },
      { type: 'quote', text: 'Truth is the foundation of dharma, and Lord Satyanarayan blesses those who walk the path of righteousness with unwavering faith.', author: 'Pandit Suresh Upadhyaya' },
    ],
    tags: ['Satyanarayan', 'Vishnu Puja', 'Katha', 'Prasad', 'Full Moon'],
    relatedPosts: [2, 6, 3],
  },
  'shraddha-ceremony-guide': {
    title: 'A Complete Guide to Shraddha Ceremony',
    author: 'Pandit Krishna Prasad',
    date: 'April 30, 2026',
    readTime: '12 min read',
    category: 'Traditions',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', text: 'Shraddha is a sacred Hindu ritual performed to honor and offer gratitude to deceased ancestors (pitrs). Rooted in the belief that the souls of our ancestors continue to influence our lives, Shraddha ensures their peace and blessings for the living family.' },
      { type: 'heading', text: 'The Philosophy Behind Shraddha' },
      { type: 'paragraph', text: 'According to Hindu scriptures, our ancestors reside in Pitru Loka (the realm of ancestors). Through Shraddha rituals, we offer them food, water, and prayers, which sustains them and earns their blessings for prosperity, health, and happiness in our lives.' },
      { type: 'heading', text: 'When to Perform Shraddha' },
      { type: 'paragraph', text: 'Shraddha is traditionally performed during Pitru Paksha (the fortnight dedicated to ancestors), which falls in the lunar month of Bhadrapada (September-October). It is also performed on the death anniversary (tithi) of the departed soul.' },
      { type: 'heading', text: 'Key Rituals: Tarpan and Pind Daan' },
      { type: 'paragraph', text: 'Tarpan involves offering water mixed with black sesame seeds to the ancestors, while Pind Daan is the offering of rice balls (pinds) representing the physical body. These rituals are performed with deep reverence and specific Vedic mantras.' },
      { type: 'quote', text: 'By honoring our ancestors, we honor the roots from which our family tree grows. Their blessings are the foundation of our prosperity.', author: 'Pandit Krishna Prasad' },
    ],
    tags: ['Shraddha', 'Pitru Paksha', 'Ancestors', 'Pind Daan', 'Tarpan'],
    relatedPosts: [3, 5, 1],
  },
  'wedding-decoration-trends-2026': {
    title: 'Wedding Decoration Trends in Nepal for 2026',
    author: 'Decor Team Nepal',
    date: 'April 22, 2026',
    readTime: '5 min read',
    category: 'Planning',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', text: 'Nepali wedding decorations in 2026 are a beautiful fusion of timeless tradition and contemporary elegance. From the classic marigold mandap to modern floral installations, couples are embracing designs that honor heritage while expressing personal style.' },
      { type: 'heading', text: 'The Return of Traditional Marigold' },
      { type: 'paragraph', text: 'Marigold (genda phool) remains the undisputed king of Nepali wedding decor. In 2026, we are seeing a resurgence of elaborate marigold garlands, torans, and rangoli designs that create a warm, auspicious atmosphere. The vibrant orange and yellow hues symbolize prosperity and happiness.' },
      { type: 'heading', text: 'Minimalist Mandap Designs' },
      { type: 'paragraph', text: 'While grand mandaps have their charm, many modern couples are opting for minimalist mandap designs featuring clean lines, neutral tones, and strategic floral accents. These designs photograph beautifully and create an intimate, serene ambiance.' },
      { type: 'heading', text: 'Sustainable and Local Decor' },
      { type: 'paragraph', text: 'Eco-conscious couples are choosing locally sourced flowers, reusable decor elements, and biodegradable materials. This trend not only reduces environmental impact but also supports local artisans and farmers.' },
      { type: 'quote', text: 'The best wedding decorations are those that tell your story while honoring the traditions that have brought your family together for generations.', author: 'Decor Team Nepal' },
    ],
    tags: ['Wedding Decor', 'Trends 2026', 'Marigold', 'Mandap', 'Sustainable'],
    relatedPosts: [1, 4, 8],
  },
  'power-of-mantra-chanting': {
    title: 'The Transformative Power of Mantra Chanting',
    author: 'Swami Ananda Giri',
    date: 'April 15, 2026',
    readTime: '8 min read',
    category: 'Spirituality',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&h=600&fit=crop',
    content: [
      { type: 'paragraph', text: 'Mantra chanting is one of the most powerful spiritual practices in Hindu tradition. The word "mantra" comes from Sanskrit — "man" meaning mind and "tra" meaning tool or instrument. Thus, a mantra is a tool for the mind, a sacred sound that transforms consciousness.' },
      { type: 'heading', text: 'The Science of Sound Vibrations' },
      { type: 'paragraph', text: 'Modern science has begun to validate what ancient sages knew thousands of years ago: specific sound frequencies can alter brainwave patterns, reduce stress hormones, and activate the parasympathetic nervous system. The vibrations of Sanskrit mantras create a resonance that harmonizes the body, mind, and spirit.' },
      { type: 'heading', text: 'Gayatri Mantra: The Mother of All Mantras' },
      { type: 'paragraph', text: 'The Gayatri Mantra, dedicated to the divine light of the sun, is considered the most powerful mantra in the Vedas. Regular chanting is believed to bestow wisdom, clarity of thought, and spiritual illumination. It is traditionally chanted 108 times during sunrise and sunset.' },
      { type: 'heading', text: 'Mahamrityunjaya Mantra: The Conqueror of Death' },
      { type: 'paragraph', text: 'Dedicated to Lord Shiva, the Mahamrityunjaya Mantra is known as the "death-conquering mantra." It is chanted for health, longevity, and protection from negative energies. Many families chant this mantra during illness or before major life transitions.' },
      { type: 'quote', text: 'When you chant a mantra with devotion, you are not merely reciting words — you are invoking the divine presence that resides within every syllable.', author: 'Swami Ananda Giri' },
    ],
    tags: ['Mantra', 'Spirituality', 'Gayatri', 'Meditation', 'Vedic Chanting'],
    relatedPosts: [3, 5, 6],
  },
};

const allPosts = [
  { id: 1, slug: 'essential-rituals-nepali-wedding', title: 'Essential Rituals in a Traditional Nepali Wedding', category: 'Weddings', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=250&fit=crop' },
  { id: 2, slug: 'griha-pravesh-muhurat-2026', title: 'Griha Pravesh Muhurat Dates for 2026', category: 'Pujas', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop' },
  { id: 3, slug: 'significance-bratabandha-ceremony', title: 'The Sacred Significance of Bratabandha Ceremony', category: 'Traditions', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=250&fit=crop' },
  { id: 4, slug: 'choosing-right-pandit-wedding', title: 'How to Choose the Right Pandit for Your Wedding', category: 'Planning', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop' },
  { id: 5, slug: 'satyanarayan-katha-significance', title: 'Satyanarayan Katha: Significance and Procedure', category: 'Pujas', image: 'https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=400&h=250&fit=crop' },
  { id: 6, slug: 'shraddha-ceremony-guide', title: 'A Complete Guide to Shraddha Ceremony', category: 'Traditions', image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=250&fit=crop' },
  { id: 7, slug: 'wedding-decoration-trends-2026', title: 'Wedding Decoration Trends in Nepal for 2026', category: 'Planning', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=250&fit=crop' },
  { id: 8, slug: 'power-of-mantra-chanting', title: 'The Transformative Power of Mantra Chanting', category: 'Spirituality', image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=250&fit=crop' },
];

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const post = slug ? blogPostsData[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'rgb(var(--color-background))' }}>
        <div className="text-center">
          <h2 className="font-serif font-semibold text-2xl mb-4" style={{ color: 'rgb(var(--color-text))' }}>Article Not Found</h2>
          <p className="mb-6" style={{ color: 'rgb(var(--color-text-muted))' }}>The article you are looking for does not exist.</p>
          <Link to="/blog" className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const related = post.relatedPosts?.map((id: number) => allPosts.find(p => p.id === id)).filter(Boolean) || [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(var(--color-background))' }}>
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: 'rgb(var(--color-primary))', color: 'white' }}>
              {post.category}
            </span>
            <h1 className="font-serif font-bold text-white text-3xl md:text-4xl">{post.title}</h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b" style={{ borderColor: 'rgb(var(--color-border))' }}>
            <div className="flex items-center gap-4 text-sm" style={{ color: 'rgb(var(--color-text-muted))' }}>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className="p-2 rounded-full transition-colors"
                style={{ backgroundColor: liked ? 'rgb(var(--color-primary))' : 'rgb(var(--color-secondary))', color: liked ? 'white' : 'rgb(var(--color-text-muted))' }}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="p-2 rounded-full transition-colors"
                style={{ backgroundColor: bookmarked ? 'rgb(var(--color-primary))' : 'rgb(var(--color-secondary))', color: bookmarked ? 'white' : 'rgb(var(--color-text-muted))' }}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full" style={{ backgroundColor: 'rgb(var(--color-secondary))', color: 'rgb(var(--color-text-muted))' }}>
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.map((block: any, idx: number) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={idx} className="mb-6 leading-relaxed" style={{ color: 'rgb(var(--color-text))' }}>
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2 key={idx} className="font-serif font-semibold text-2xl mt-10 mb-4" style={{ color: 'rgb(var(--color-primary))' }}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'quote') {
                return (
                  <blockquote key={idx} className="my-8 pl-6 border-l-4 py-4 rounded-r-xl" style={{ borderColor: 'rgb(var(--color-primary))', backgroundColor: 'rgb(var(--color-secondary))' }}>
                    <p className="font-serif italic text-lg mb-2" style={{ color: 'rgb(var(--color-text))' }}>
                      "{block.text}"
                    </p>
                    <cite className="text-sm not-italic font-medium" style={{ color: 'rgb(var(--color-primary))' }}>
                      — {block.author}
                    </cite>
                  </blockquote>
                );
              }
              return null;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t" style={{ borderColor: 'rgb(var(--color-border))' }}>
            {post.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgb(var(--color-secondary))', color: 'rgb(var(--color-text-muted))' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 px-4" style={{ backgroundColor: 'rgb(var(--color-secondary))' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif font-semibold text-2xl mb-8 text-center" style={{ color: 'rgb(var(--color-text))' }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p: any) => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="card overflow-hidden group">
                  <div className="h-40 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium mb-2 block" style={{ color: 'rgb(var(--color-primary))' }}>{p.category}</span>
                    <h3 className="font-serif font-semibold group-hover:underline" style={{ color: 'rgb(var(--color-text))' }}>{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <MessageCircle className="w-6 h-6" style={{ color: 'rgb(var(--color-primary))' }} />
            <h2 className="font-serif font-semibold text-2xl" style={{ color: 'rgb(var(--color-text))' }}>
              Discussion
            </h2>
          </div>
          <div className="card p-6">
            <p className="text-center py-8" style={{ color: 'rgb(var(--color-text-muted))' }}>
              Comments are coming soon. Stay tuned for community discussions!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
