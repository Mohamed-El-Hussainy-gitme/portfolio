export type VerifiedReview = {
  id: string;
  platform: "Khamsat" | "Upwork";
  platformUrl: string;
  reviewerName: string;
  rating: number;
  reviewText: { ar: string; en: string };
  screenshot?: { src: string; width: number; height: number };
};

// All 12 reviews below were fetched directly from their Khamsat URLs.
// reviewText.ar is verbatim (character-for-character) from the live page.
// reviewText.en is a faithful translation — nothing added or embellished.
// screenshot.src points to Khamsat's own CDN-hosted preview image for each
// review (its public og:image), which is a real, already-existing asset —
// not a local path that needs a file uploaded.

export const verifiedReviews: VerifiedReview[] = [
  {
    // Service: تصميم وتنفيذ صفحة بورتفوليو صفحة هبوط تفاعلية احترافية
    // Reviewer: حسام ص. (hossamsaddouki)
    id: "khamsat-1114962",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1114962",
    reviewerName: "حسام ص.",
    rating: 5,
    reviewText: {
      ar: "تعامل أكثر من رائع، شخص محترف جدًا في مجال السيو و الموقع وملم بالتفاصيل بشكل واضح. ساعدني في تحسين موقعي بشكل ملحوظ، وشرح لي الأمور ببساطة وصبر، وكان دائمًا متعاونًا وسريع الرد.\nيعمل بضمير ويهتم فعلًا بنجاح العميل، وليس فقط بتنفيذ المطلوب. أنصح به بشدة، وبإذن الله سيكون بيننا تعاملات قادمة. شكرًا لك على مجهودك الكبير",
      en: "An excellent experience, a very professional person in SEO and web development who understands every detail clearly. He noticeably improved my site, explained things simply and patiently, and was always responsive and cooperative. He works with integrity and genuinely cares about the client's success, not just completing the task. Highly recommended — God willing we'll work together again. Thank you for your great effort.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/7558ec2baeaa24758aa8cd95ca2135a8.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: تصميم موقع الكتروني احترافي جذاب ومتجاوب مع كل الاجهزة
    // Reviewer: حسام ص. (hossamsaddouki)
    id: "khamsat-1115268",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1115268",
    reviewerName: "حسام ص.",
    rating: 5,
    reviewText: {
      ar: "تعامل رائع جدًا\nالخدمة كانت ممتازة من حيث الجودة والالتزام بالوقت، والتواصل كان سلس وواضح من البداية حتى التسليم. أنصح بالتعامل معه بدون تردد، وبإذن الله لن يكون آخر تعامل بيننا.",
      en: "A truly great experience. The service was excellent in quality and punctuality, and communication was smooth and clear from start to delivery. I recommend working with him without hesitation, and God willing this won't be our last collaboration.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/071a6f04fd82ff7ca733211db487dee6.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: تصميم موقع الكتروني احترافي جذاب ومتجاوب مع كل الاجهزة
    // Reviewer: .Alshammari A (amal_h_456)
    id: "khamsat-1133205",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1133205",
    reviewerName: "A. Alshammari",
    rating: 5,
    reviewText: {
      ar: "مبرمج ممتاز ومتفهم لكثرة التغييرات جزاه الله خير وان شاء الله مو اخر تعامل",
      en: "An excellent developer, understanding of frequent changes. May God reward him well — God willing this won't be the last time we work together.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/8c93e6fb250859e385568d5f4a493823.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: برمجة وتطوير موقع الكتروني كامل مع لوحة التحكم
    // Reviewer: .Alshammari A (amal_h_456)
    id: "khamsat-1134116",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1134116",
    reviewerName: "A. Alshammari",
    rating: 5,
    reviewText: {
      ar: "من لايشكر الناس لايشكر الله\nالشغل فوق الممتاز والوقت قياسي جدا\nمبرمج فاهم ومتفهم للتغيير المستمر وان شاء الله ماهو اخر تعامل\nبالتوفيق",
      en: "Those who don't thank people don't thank God. The work was more than excellent and delivered in record time. An understanding developer who handles continuous changes well. God willing this isn't our last collaboration. All the best.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/8a7ef974905bbd8d321da7428d10182a.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: إنشاء متجر إلكتروني احترافي Shopify وسلة وWooCommerce
    // Reviewer: .Muhammad K (abohamzah89)
    id: "khamsat-1138711",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1138711",
    reviewerName: "Muhammad K.",
    rating: 5,
    reviewText: {
      ar: "يسعدني القول أن التعامل معك أستاذ محمد كان ممتع وتجربة جداً رائعة وسلسة واستيعابك للعميل أحييك عليه بشرح اصغر لأكبر تفصيل في عملك\nبالإضافة أن العمل كان إبداعي جزاك الله عني كل خير ووفقك الله لما هو قادم وبإذن الله التعامل بيننا دائم",
      en: "It's a pleasure to say that working with you, Mr. Mohamed, was enjoyable and a truly great, smooth experience. Your understanding of the client is commendable, explaining every detail from the smallest to the largest. The work was also creative — may God reward you greatly and grant you success ahead. God willing our collaboration is ongoing.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/02c12790ca1395151a9499c3cfd22881.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: تصميم موقع الكتروني احترافي جذاب ومتجاوب مع كل الاجهزة
    // Reviewer: .Qx D (djqxq8)
    id: "khamsat-1138760",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1138760",
    reviewerName: "D. Qx",
    rating: 5,
    reviewText: {
      ar: "مبرمج فنان محترم انصحكم في ي اخوان",
      en: "A respectable, artistic developer — I recommend him, guys.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/3dffe77eebcf91d63c5dc74741ede6fc.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: تصميم موقع الكتروني احترافي جذاب ومتجاوب مع كل الاجهزة
    // Reviewer: .Qx D (djqxq8)
    id: "khamsat-1138768",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1138768",
    reviewerName: "D. Qx",
    rating: 5,
    reviewText: {
      ar: "شي جميل انصحكم في",
      en: "Something beautiful, I recommend it.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/563be79ed6df3e7dae9e46e72ac0a6b3.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: تشخيص وإصلاح عطل واحد في موقعك — Bug Fix
    // Reviewer: .Julian A (julianalmoustafa)
    id: "khamsat-1140138",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1140138",
    reviewerName: "Julian A.",
    rating: 5,
    reviewText: {
      ar: "تعامل راقي جداً وسرعة في التجاوب البائع حريص على رضا العميل وأنصح الجميع بالتعامل معه تجربة شراء استثنائية احترافية في التعامل وأمانة في الوصف ودقة في المواعيد",
      en: "A very refined interaction and fast response. The seller cares about client satisfaction, and I recommend everyone work with him. An exceptional, professional buying experience, honest in description and precise with deadlines.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/dad1d88c162c1081093101fa4b01f573.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: تشخيص وإصلاح عطل واحد في موقعك — Bug Fix
    // Reviewer: .Julian A (julianalmoustafa)
    id: "khamsat-1140411",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1140411",
    reviewerName: "Julian A.",
    rating: 5,
    reviewText: {
      ar: "تجربة شراء رائعة! البائع قمة في الرقي والأمانة ومطابق تماماً للوصف. أنصح بالتعامل معه بشدة وسأكرر التجربة بالتأكيد خدمة احترافية وسريعة جداً. البائع كان ممتازاً . شكراً جزيلاً للبائع على اهتمامه وجودة خدمته",
      en: "A wonderful buying experience! The seller is the height of professionalism and honesty, matching the description exactly. I strongly recommend working with him and will definitely repeat the experience. A professional and very fast service. The seller was excellent. Thank you very much to the seller for his attention and quality of service.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/db32a7d91a874852b633a8fbad39ecc9.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: تشخيص وإصلاح عطل واحد في موقعك — Bug Fix
    // Reviewer: عبدالرحمن ع. (auk1994)
    id: "khamsat-1141223",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1141223",
    reviewerName: "عبدالرحمن ع.",
    rating: 5,
    reviewText: {
      ar: "متعاون جدا",
      en: "Very cooperative.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/96af59d246d086f73fe228cf447d7aef.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: برمجة وتطوير موقع الكتروني كامل مع لوحة التحكم
    // Reviewer: .Sultan A (alsultan77)
    id: "khamsat-1142531",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1142531",
    reviewerName: "Sultan A.",
    rating: 5,
    reviewText: {
      ar: "شخص طيب متعاون  ويعطيك انت من الطلب اللي انت طالبه\nاشكرك علي سعه الصدر وهلي تعاملك الطيب",
      en: "A kind, cooperative person who gives you more than what you asked for. Thank you for your open-mindedness and your kind dealings.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/fff2d7edfad6bec12741f43e24f6615f.png",
      width: 800,
      height: 470,
    },
  },
  {
    // Service: تشخيص وإصلاح عطل واحد في موقعك — Bug Fix
    // Reviewer: .Julian A (julianalmoustafa0)
    id: "khamsat-1142751",
    platform: "Khamsat",
    platformUrl: "https://khamsat.com/user/mohamed_hussainy/reviews/1142751",
    reviewerName: "Julian A.",
    rating: 5,
    reviewText: {
      ar: "شكرا لك على على هذا التعامل الراقي",
      en: "Thank you for this refined interaction.",
    },
    screenshot: {
      src: "https://khamsat.hsoubcdn.com/reviews/427177aff42a20a7a93ff19dee9cc5e7.png",
      width: 800,
      height: 470,
    },
  },
];