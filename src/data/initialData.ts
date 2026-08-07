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
    views: 2450,
    mini_description: "Discover how ancestral spiritual wisdom, Digo herbal powers, and distance meditation can reconcile broken hearts and bring back lost partners swiftly.",
    description: "Heartbreak and relationship breakdown can leave you feeling helpless, lost, and emotionally drained. Across Africa, ancestral spiritual healers have preserved sacred rituals designed to harmonise troubled minds, dissolve third-party interference, and reignite deep love between partners—no matter where they are in the world.",
    content_sections: [
      {
        heading: "Understanding the Spiritual Root of Relationship Breakdowns",
        body: "Many relationships do not fail simply because of minor arguments. Unseen negative energies, spiritual incompatibility, envy from rival suitors, or malefic spiritual curses often create sudden emotional distance, anger, and loss of affection. Doctor Baba Mukisa uses ancestral spiritual divination to look into your relationship, revealing the hidden spiritual blockage causing your partner to pull away."
      },
      {
        heading: "How Remote Meditation and Digo Rituals Bring Partners Back",
        body: "You do not need to travel physically if distance or circumstance keeps you apart. Doctor Baba Mukisa performs sacred remote meditation from his Kampala Temple, utilizing authentic Digo herbs from coastal Kenya. By channeling ancestral energies, your lover's thoughts and feelings are gently guided back toward forgiveness, affection, and commitment."
      },
      {
        heading: "Real Client Transformation: A Story of Reclaimed Love",
        body: "Sarah K. from Nairobi writes: 'My husband left our home abruptly after 6 years of marriage due to external interference. After consulting Doctor Baba Mukisa, he performed a 3-day spiritual reconciliation ritual. On the fourth day, my husband called me in tears asking to return home. We are now happier than ever before.'"
      },
      {
        heading: "How to Request a Love Consultation Today",
        body: "If you are suffering from a broken relationship, threatened divorce, or an unfaithful partner, do not lose hope. Reach out directly to Doctor Baba Mukisa on WhatsApp at +256767062834 or phone call +256767062834 for an immediate spiritual reading and consultation."
      }
    ],
    post_date: "2026-07-15",
    feature_image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    category_slug: "love-and-marriage-spells",
    category_name: "Love & Marriage Spells"
  },
  {
    id: "blog-2",
    name: "How Traditional Herbal Cleansing Restores Spiritual Balance & Erases Bad Luck",
    slug: "how-traditional-herbal-cleansing-restores-spiritual-balance",
    author: "Doctor Baba Mukisa",
    views: 1980,
    mini_description: "Purge heavy negative energies, bad omens, and unexplained stagnation with authentic ancestral spiritual baths prepared by Doctor Baba Mukisa.",
    description: "Are you experiencing repeated failures, unexplainable fatigue, chronic bad luck, or constant financial drain? These are clear signs of an aura heavy with negative spiritual pollution or evil eye projection. Spiritual cleansing is an ancient remedy that purifies your energy field and opens locked doors to prosperity.",
    content_sections: [
      {
        heading: "Signs That You Need a Spiritual Cleansing Ritual",
        body: "When bad luck follows you everywhere—such as sudden loss of money, broken promises, terrifying nightmares, or constant conflict at home—it indicates your spiritual aura is clouded. Without proper purification, efforts to succeed in business or relationships will continue to hit invisible roadblocks."
      },
      {
        heading: "The Secret Power of Sacred Digo Herbs & Herbal Washes",
        body: "Doctor Baba Mukisa prepares custom herbal washes infused with sacred roots, organic bark, and ancestral bless oils sourced directly from coastal Digo land. Combined with sacred chanting at the Kampala Temple, this bath purges negative spiritual attachments and restores your natural, radiant energy."
      },
      {
        heading: "Unlocking Long-Term Peace and Protection",
        body: "Once your aura is cleansed, Doctor Baba Mukisa installs a permanent spiritual shield around you to ensure that envy, evil eyes, or future negative spells bounce off harmlessly. You will experience newfound clarity, renewed confidence, and attraction of positive opportunities."
      },
      {
        heading: "Book Your Personal Cleansing Session",
        body: "Do not suffer under the weight of persistent bad luck. Contact Doctor Baba Mukisa today on WhatsApp or Call +256767062834 to receive guidance on how to undergo your personal spiritual cleansing."
      }
    ],
    post_date: "2026-07-20",
    feature_image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    category_slug: "spiritual-protection-and-cleansing",
    category_name: "Spiritual Protection & Cleansing"
  },
  {
    id: "blog-3",
    name: "Unlocking Business Wealth, Fast Debt Relief & Customer Attraction Magic",
    slug: "unlocking-business-wealth-fast-debt-relief-and-customer-attraction",
    author: "Doctor Baba Mukisa",
    views: 2850,
    mini_description: "Transform struggling shops, attract paying clients, clear crippling debts, and boost profits using empowered magic rings and herbal wealth infusions.",
    description: "In the competitive world of business and trade, hard work alone is sometimes insufficient if your financial pathways are spiritually blocked. Doctor Baba Mukisa offers time-tested African traditional remedies that magnetize wealth, boost customer footfall, and grant commercial authority.",
    content_sections: [
      {
        heading: "Why Some Businesses Flourish While Others Struggle",
        body: "Spiritual blockages, negative business envy from competitors, or stagnant financial karma can prevent customers from entering your shop or buying your products. Traditional wealth rituals align your business location with positive money-attracting energies."
      },
      {
        heading: "Empowered Prosperity Rings & Wealth Talismans",
        body: "Doctor Baba Mukisa crafts customized traditional rings and lucky charms consecrated during full lunar phases. When worn or placed in your cash drawer, these items enhance your negotiation magnetism, attract high-paying clients, and open unexpected avenues for debt recovery."
      },
      {
        heading: "Testimonial: From Bankruptcy to Thriving Enterprise",
        body: "John B. from Mombasa shares: 'My hardware business was facing closure due to unpaid debts and zero sales. Doctor Baba Mukisa provided a business cleansing herbal formula and a prosperity ring. Within two weeks, I secured two massive supply contracts that cleared all my debts!'"
      },
      {
        heading: "Get Immediate Financial Breakthrough Guidance",
        body: "Ready to elevate your financial destiny? Speak with Doctor Baba Mukisa directly via WhatsApp at +256767062834 or call +256767062834 for your personalized financial reading."
      }
    ],
    post_date: "2026-07-28",
    feature_image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    category_slug: "financial-and-wealth-recovery",
    category_name: "Financial & Wealth Recovery"
  },
  {
    id: "blog-4",
    name: "Spiritual Shielding Against Evil Eye, Household Envy & Enemy Sabotage",
    slug: "spiritual-shielding-against-evil-eye-household-envy-and-sabotage",
    author: "Doctor Baba Mukisa",
    views: 1620,
    mini_description: "Protect your home, children, farm assets, and personal achievements from jealous enemies and unseen spiritual attacks.",
    description: "Success often breeds envy from unexpected places—including jealous relatives, toxic neighbors, or business rivals. Unseen spiritual attacks and evil eye projections can cause unexplained family sickness, livestock deaths, or sudden domestic breakdown.",
    content_sections: [
      {
        heading: "Identifying Evil Eye and Household Spiritual Attacks",
        body: "If your household experiences sudden unexplained illnesses, frequent strange sounds at night, constant bitter arguments, or loss of prosperity, your home may be targeted by malicious spiritual energy."
      },
      {
        heading: "Installing Ancestral Spiritual Shields around Your Property",
        body: "Doctor Baba Mukisa utilizes sacred protective amulets, traditional horn rituals, and protective herb burials around land boundaries. This creates an impenetrable spiritual perimeter that reflects any negative curse or evil intention back to its origin."
      },
      {
        heading: "Safeguarding Your Children and Future Generation",
        body: "Children are especially sensitive to negative spiritual forces. Doctor Baba Mukisa prepares gentle protective charms for infants and young family members to ensure they grow safely with peace, intelligence, and divine favor."
      },
      {
        heading: "Protect Your Loved Ones Today",
        body: "Never leave your household vulnerable to enemy sabotage. Contact Doctor Baba Mukisa now on WhatsApp +256767062834 or phone +256767062834 for immediate spiritual shielding."
      }
    ],
    post_date: "2026-08-01",
    feature_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    category_slug: "spiritual-protection-and-cleansing",
    category_name: "Spiritual Protection & Cleansing"
  },
  {
    id: "blog-5",
    name: "Winning Difficult Court Cases & Judicial Disputes Through Ancestral Meditation",
    slug: "winning-difficult-court-cases-and-judicial-disputes",
    author: "Doctor Baba Mukisa",
    views: 1840,
    mini_description: "Influence courtroom outcomes, calm opposing minds, and turn complicated legal battles in your favor through ancestral spiritual mediation.",
    description: "Legal disputes, false allegations, land lawsuits, and court trials can drain your finances, peace of mind, and reputation. Doctor Baba Mukisa applies ancient African spiritual wisdom to help truth prevail and grant favor in legal proceedings.",
    content_sections: [
      {
        heading: "How Spiritual Meditation Influences Legal Proceedings",
        body: "Court cases are decided not only by legal arguments, but also by the mental clarity and disposition of judges, magistrates, and witnesses. Doctor Baba Mukisa performs specialized mind-calming meditation rituals that soften hostile minds and expose hidden truths."
      },
      {
        heading: "Turning Complicated Land & Criminal Cases Around",
        body: "Whether you are facing wrongful prosecution, contentious divorce proceedings, or inheritance court battles, ancestral intervention helps tilt circumstances in your favor and soften aggressive accusers."
      },
      {
        heading: "Client Case Study: Overcoming False Allegations",
        body: "David M. from Kampala writes: 'I was wrongfully sued over a family property dispute that dragged on for 4 years. After Doctor Baba Mukisa performed a court meditation ritual for me, the key opposing witness withdrew their false statement, and the judge dismissed the case in my favor!'"
      },
      {
        heading: "Seek Legal Victory and Peace of Mind Today",
        body: "Do not face the court alone. Reach out to Doctor Baba Mukisa on WhatsApp at +256767062834 or call +256767062834 for a confidential legal spiritual consultation."
      }
    ],
    post_date: "2026-08-04",
    feature_image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    category_slug: "court-cases-and-legal-help",
    category_name: "Court Cases & Legal Help"
  },
  {
    id: "blog-6",
    name: "Securing Land, Protecting Property & Resolving Estate Wrangles Permanently",
    slug: "securing-land-protecting-property-and-resolving-estate-wrangles",
    author: "Doctor Baba Mukisa",
    views: 1530,
    mini_description: "Protect land boundaries, stop aggressive land grabbers, safeguard farm assets, and resolve family inheritance battles through sacred traditional rituals.",
    description: "Land and family estates are precious assets that carry generational heritage. Unfortunately, land grabbing, greedy relatives, and fraudulent claims frequently cause painful disputes. Doctor Baba Mukisa provides traditional rituals to lock and protect land boundaries permanently.",
    content_sections: [
      {
        heading: "The Ancient Art of Land Boundary Locking",
        body: "African traditional healers have long possessed secrets to anchor land and farm properties spiritually. By burying consecrated herbal elements along key plot corners, unwanted trespassers and land grabbers find themselves spiritually unable to steal or exploit your property."
      },
      {
        heading: "Resolving Bitter Family Estate & Inheritance Battles",
        body: "Inheritance disputes often divide families for years. Doctor Baba Mukisa brings peaceful resolution by neutralizing greedy agitators and inspiring fair distribution according to ancestral justice."
      },
      {
        heading: "Safeguard Your Farm Assets and Estate",
        body: "Whether protecting cattle, crops, residential plots, or commercial buildings, traditional property rituals prevent theft, arson, and malicious boundary encroachments."
      },
      {
        heading: "Consult Doctor Baba Mukisa on Property Protection",
        body: "Safeguard your land and family estate today. Contact Doctor Baba Mukisa on WhatsApp at +256767062834 or phone call +256767062834 for expert property consultation."
      }
    ],
    post_date: "2026-08-06",
    feature_image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    category_slug: "property-and-land-rituals",
    category_name: "Property & Land Rituals"
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

export const INITIAL_SUBSCRIBERS = [
  { id: "sub-1", email: "james.k@example.com", subscribed_date: "2026-08-01", status: "Active" as const, source: "Footer Form" },
  { id: "sub-2", email: "mercy.w@example.com", subscribed_date: "2026-08-03", status: "Active" as const, source: "Home Section" },
  { id: "sub-3", email: "david.o@example.com", subscribed_date: "2026-08-05", status: "Active" as const, source: "Footer Form" }
];
