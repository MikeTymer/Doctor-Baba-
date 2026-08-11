import { BlogPost, Category, GalleryItem, BlogComment } from '../types';

export const SITE_INFO = {
  title: "Doctor Baba Mukisa - Traditional Herbalist & Spiritual Guidance",
  tagline: "African Traditional Herbalist & Spiritual Consultation Practitioner",
  phone: "+256767062834",
  whatsapp: "256767062834",
  email: "help@doctorbabamukisa.com",
  address: "Plot 24 Buganda Street, Kampala, Uganda",
  templeLocation: "Kampala Temple, Uganda (Origin: Digo Land, Coastal Kenya)",
  aboutShort: "Doctor Baba Mukisa is an African traditional herbalist and spiritual practitioner, sharing ancestral guidance and cultural herbal knowledge passed down through generations from the Digo land in coastal Kenya.",
  disclaimerShort: "Spiritual guidance, cultural herbal consultations, and traditional reflections are offered for personal guidance, spiritual comfort, and cultural enrichment only.",
  disclaimerFull: `Spiritual guidance, traditional herbal consultations, and cultural reflections provided by Doctor Baba Mukisa are for personal spiritual guidance and cultural enrichment only. Content on this website—including readings, traditional herbal knowledge, and meditation guidance—is not intended as a substitute for certified medical, financial, or legal advice.

Users engaging with our consultations acknowledge that the application of any advice is strictly at their own personal discretion and responsibility. Doctor Baba Mukisa does not make guaranteed claims regarding specific personal, financial, legal, or health outcomes, as results vary based on individual belief, personal effort, and external circumstances.

Our platform respects African traditional heritage and cultural spiritual practices. We prioritize privacy and encourage visitors to maintain personal confidentiality during interactions.`
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Love & Relationship Guidance",
    slug: "love-and-marriage-spells",
    description: "Traditional spiritual reflection and herbal consultation aimed at fostering harmony, emotional peace, relationship reconciliation, and mutual respect.",
    views: 3420,
    featured_image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-2",
    name: "Financial & Enterprise Well-Being",
    slug: "financial-and-wealth-recovery",
    description: "Traditional herbal infusions, personal focus, and spiritual guidance to promote clarity, confidence, and enterprise diligence.",
    views: 2890,
    featured_image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-3",
    name: "Legal Stress & Conflict Mediation",
    slug: "court-cases-and-legal-help",
    description: "Spiritual meditation, mental clarity rituals, and stress-relief guidance for individuals navigating difficult disputes or litigation.",
    views: 1940,
    featured_image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-4",
    name: "Spiritual Protection & Cleansing",
    slug: "spiritual-protection-and-cleansing",
    description: "Traditional herbal washes and ancestral meditation practices designed to clear negative energy and promote peace of mind.",
    views: 2510,
    featured_image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-5",
    name: "Consecrated Rings & Cultural Amulets",
    slug: "magic-rings-and-luck-charms",
    description: "Empowered traditional rings and cultural keepsakes crafted to encourage personal focus, self-assurance, and spiritual presence.",
    views: 3100,
    featured_image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-6",
    name: "Property & Family Peace Rituals",
    slug: "property-and-land-rituals",
    description: "Spiritual mediation and boundary blessings to promote peaceful family dialogue and estate stability.",
    views: 1680,
    featured_image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    name: "Traditional Relationship Guidance & Spiritual Reflection",
    slug: "powerful-lost-lover-spells-that-work-instantly",
    author: "Doctor Baba Mukisa",
    views: 2450,
    mini_description: "Explore how ancestral wisdom, herbal reflection, and focused spiritual meditation help nurture emotional peace and relationship reconciliation.",
    description: "Relationship challenges can leave you feeling drained and uncertain. Across Africa, ancestral spiritual practitioners have shared traditional reflection practices designed to foster forgiveness, clear emotional distance, and rebuild trust.",
    content_sections: [
      {
        heading: "Understanding Emotional Distance in Relationships",
        body: "Relationships encounter difficulties due to stress, misunderstandings, or emotional fatigue. Doctor Baba Mukisa offers spiritual consultation and traditional guidance to help individuals reflect on underlying challenges and cultivate positive energy."
      },
      {
        heading: "Traditional Meditation & Digo Herbal Wisdom",
        body: "From his Kampala Temple, Doctor Baba Mukisa shares traditional Digo herbal practices and guided meditation. These traditional practices support internal peace and mindful communication."
      },
      {
        heading: "Reflections on Personal Growth",
        body: "Sarah K. shares: 'Doctor Baba Mukisa offered valuable spiritual guidance and meditation during a stressful time in my relationship. The perspective helped us communicate with empathy and understanding.'"
      },
      {
        heading: "Requesting a Confidential Consultation",
        body: "For personal guidance or consultation, reach out directly to Doctor Baba Mukisa via WhatsApp at +256767062834 or phone call +256767062834."
      }
    ],
    post_date: "2026-07-15",
    feature_image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    category_slug: "love-and-marriage-spells",
    category_name: "Love & Relationship Guidance"
  },
  {
    id: "blog-2",
    name: "How Traditional Herbal Cleansing Supports Inner Balance & Peace of Mind",
    slug: "how-traditional-herbal-cleansing-restores-spiritual-balance",
    author: "Doctor Baba Mukisa",
    views: 1980,
    mini_description: "Clear feelings of mental heaviness and spiritual fatigue with authentic ancestral herbal cleanses prepared by Doctor Baba Mukisa.",
    description: "When experiencing persistent stress or feelings of stagnation, traditional herbal cleansing offers a soothing ritual to refresh your outlook and promote spiritual clarity.",
    content_sections: [
      {
        heading: "Signs You May Benefit from a Herbal Cleansing Ritual",
        body: "Persistent fatigue, unmanaged stress, or feelings of negativity can cloud your daily focus. Traditional herbal baths provide a serene space for personal renewal and spiritual grounding."
      },
      {
        heading: "Sacred Digo Herbs & Natural Herbal Washes",
        body: "Doctor Baba Mukisa prepares custom herbal washes using organic roots and bark sourced from coastal Digo heritage. These herbal preparations are crafted to support physical freshness and spiritual calmness."
      },
      {
        heading: "Maintaining Positivity & Emotional Renewal",
        body: "Following a traditional cleanse, individuals often experience enhanced focus and a sense of renewed peace, helping them approach daily life with clarity."
      },
      {
        heading: "Book Your Consultation Session",
        body: "Contact Doctor Baba Mukisa on WhatsApp or Call +256767062834 to learn more about traditional herbal cleansing consultations."
      }
    ],
    post_date: "2026-07-20",
    feature_image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    category_slug: "spiritual-protection-and-cleansing",
    category_name: "Spiritual Protection & Cleansing"
  },
  {
    id: "blog-3",
    name: "Enterprise Guidance, Mindful Planning & Traditional Herbal Practices",
    slug: "unlocking-business-wealth-fast-debt-relief-and-customer-attraction",
    author: "Doctor Baba Mukisa",
    views: 2850,
    mini_description: "Enhance focus, customer rapport, and business confidence using time-honored traditional herbal consultations and focus keepsakes.",
    description: "In commerce and daily business, maintaining mental clarity and confidence is key. Traditional African herbal consultations offer guidance to help entrepreneurs approach challenges with renewed vigor.",
    content_sections: [
      {
        heading: "Fostering Positive Commercial Atmosphere",
        body: "Creating a welcoming environment and clear focus can significantly improve business relationships. Traditional reflection practices help align your mindset with constructive action."
      },
      {
        heading: "Traditional Consecrated Rings & Keepsakes",
        body: "Doctor Baba Mukisa crafts customized keepsakes that serve as personal symbols of determination, calm decision-making, and professional magnetism."
      },
      {
        heading: "Personal Growth Perspective",
        body: "John B. shares: 'Doctor Baba Mukisa provided traditional guidance and an encouraging perspective that restored my confidence in managing my shop during tough economic times.'"
      },
      {
        heading: "Get Personal Consultation Today",
        body: "Speak with Doctor Baba Mukisa directly via WhatsApp at +256767062834 or call +256767062834 for personal spiritual consultation."
      }
    ],
    post_date: "2026-07-28",
    feature_image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    category_slug: "financial-and-wealth-recovery",
    category_name: "Financial & Enterprise Well-Being"
  },
  {
    id: "blog-4",
    name: "Spiritual Reflection & Peace of Mind for Households",
    slug: "spiritual-shielding-against-evil-eye-household-envy-and-sabotage",
    author: "Doctor Baba Mukisa",
    views: 1620,
    mini_description: "Promote harmony, family peace, and emotional comfort within your home through traditional spiritual practices.",
    description: "Family life thrives when supported by mutual understanding, calm communication, and spiritual peace. Traditional home blessings encourage a serene atmosphere for all family members.",
    content_sections: [
      {
        heading: "Encouraging Harmony at Home",
        body: "Stress and external pressures can occasionally affect domestic tranquility. Traditional herbal cleanses and family reflections support emotional stability."
      },
      {
        heading: "Ancestral Blessing Rituals",
        body: "Doctor Baba Mukisa uses traditional Digo herbal elements to encourage feelings of safety and unity across the household."
      },
      {
        heading: "Nurturing Future Generations",
        body: "Creating a calm and supportive home environment fosters emotional well-being and confidence for children and youth."
      },
      {
        heading: "Schedule a Household Blessing Consultation",
        body: "Contact Doctor Baba Mukisa on WhatsApp +256767062834 or phone +256767062834 to discuss traditional home guidance."
      }
    ],
    post_date: "2026-08-01",
    feature_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    category_slug: "spiritual-protection-and-cleansing",
    category_name: "Spiritual Protection & Cleansing"
  },
  {
    id: "blog-5",
    name: "Spiritual Reflection & Stress Relief During Legal Challenges",
    slug: "winning-difficult-court-cases-and-judicial-disputes",
    author: "Doctor Baba Mukisa",
    views: 1840,
    mini_description: "Maintain composure, mental clarity, and peace of mind during legal processes through guided meditation.",
    description: "Navigating legal disputes can cause significant mental strain. Doctor Baba Mukisa provides calming spiritual meditation and mindfulness to help clients maintain focus and emotional resilience.",
    content_sections: [
      {
        heading: "Maintaining Mental Calm in High-Stress Situations",
        body: "Clear thinking and emotional balance are vital during challenging proceedings. Guided meditation supports mental clarity and stress reduction."
      },
      {
        heading: "Complementing Professional Legal Counsel",
        body: "While legal representatives handle court proceedings, spiritual meditation helps clients manage anxiety and maintain emotional strength."
      },
      {
        heading: "Personal Reflection Story",
        body: "David M. shares: 'During a lengthy property dispute, Doctor Baba Mukisa provided calming meditation techniques that kept me focused and grounded throughout the process.'"
      },
      {
        heading: "Seek Personal Guidance",
        body: "Reach out to Doctor Baba Mukisa on WhatsApp at +256767062834 or call +256767062834 for confidential spiritual meditation."
      }
    ],
    post_date: "2026-08-04",
    feature_image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    category_slug: "court-cases-and-legal-help",
    category_name: "Legal Stress & Conflict Mediation"
  },
  {
    id: "blog-6",
    name: "Traditional Wisdom for Estate Harmony & Family Resolution",
    slug: "securing-land-protecting-property-and-resolving-estate-wrangles",
    author: "Doctor Baba Mukisa",
    views: 1530,
    mini_description: "Promote constructive family dialogue and estate stability through traditional mediation principles.",
    description: "Land and property are significant assets that require respectful stewardship. Traditional mediation encourages fair dialogue and mutual understanding among family members.",
    content_sections: [
      {
        heading: "Traditional Principles of Estate Harmony",
        body: "African cultural traditions emphasize unity and respectful negotiation during family property discussions."
      },
      {
        heading: "Fostering Peaceful Family Dialogue",
        body: "Spiritual reflection sessions help ease tensions and encourage fair agreements regarding family estates."
      },
      {
        heading: "Safeguarding Peace and Stewardship",
        body: "Applying traditional principles helps family members preserve ancestral property with unity and respect."
      },
      {
        heading: "Consult Doctor Baba Mukisa",
        body: "Contact Doctor Baba Mukisa on WhatsApp at +256767062834 or phone call +256767062834 for traditional property guidance."
      }
    ],
    post_date: "2026-08-06",
    feature_image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    category_slug: "property-and-land-rituals",
    category_name: "Property & Family Peace Rituals"
  }
];

export const INITIAL_COMMENTS: BlogComment[] = [
  {
    id: "comment-1",
    blog_id: "blog-1",
    author_name: "Sarah K., Nairobi",
    comment_date: "2026-07-18",
    description: "Doctor Baba Mukisa's spiritual consultation gave me peace of mind when my marriage was on the verge of breakdown. Highly recommended!"
  },
  {
    id: "comment-2",
    blog_id: "blog-1",
    author_name: "David M., Kampala",
    comment_date: "2026-07-22",
    description: "The remote meditation and guidance worked wonders. Thank you Doctor Baba Mukisa for your help."
  },
  {
    id: "comment-3",
    blog_id: "blog-3",
    author_name: "John B., Mombasa",
    comment_date: "2026-08-02",
    description: "My business saw a significant turnaround after seeking Doctor Baba Mukisa's financial blessing rituals."
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", title: "Sacred Temple Shrine", image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80", category: "Temple" },
  { id: "g2", title: "Traditional Herbal Herbs & Oils", image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80", category: "Herbs" },
  { id: "g3", title: "Spiritual Meditation Space", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", category: "Temple" },
  { id: "g4", title: "Protection Charms & Amulets", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80", category: "Charms" },
  { id: "g5", title: "Ancestral Ceremony Ritual", image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80", category: "Ceremonies" },
  { id: "g6", title: "Healing Herbs Preparation", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", category: "Herbs" }
];

export const INITIAL_SUBSCRIBERS = [
  { id: "sub-1", email: "james.k@example.com", subscribed_date: "2026-08-01", status: "Active" as const, source: "Footer Form" },
  { id: "sub-2", email: "mercy.w@example.com", subscribed_date: "2026-08-03", status: "Active" as const, source: "Home Section" },
  { id: "sub-3", email: "david.o@example.com", subscribed_date: "2026-08-05", status: "Active" as const, source: "Footer Form" }
];
