-- Migration: 016_real_reviews
-- Replaces whatever rows currently exist in `reviews` with the 12 real
-- Khamsat reviews, fetched and verified directly from each review URL.
-- review_text_ar is verbatim from the live page; review_text_en is a
-- faithful translation. screenshot_url points to Khamsat's own CDN-hosted
-- preview image for each review (a real, already-existing asset).

BEGIN;

DELETE FROM reviews;

INSERT INTO reviews (
  "order", platform, rating, reviewer_name,
  review_text_en, review_text_ar,
  review_url, screenshot_url, visible
) VALUES
(
  1, 'Khamsat', 5, 'حسام ص.',
  'An excellent experience, a very professional person in SEO and web development who understands every detail clearly. He noticeably improved my site, explained things simply and patiently, and was always responsive and cooperative. He works with integrity and genuinely cares about the client''s success, not just completing the task. Highly recommended — God willing we''ll work together again. Thank you for your great effort.',
  'تعامل أكثر من رائع، شخص محترف جدًا في مجال السيو و الموقع وملم بالتفاصيل بشكل واضح. ساعدني في تحسين موقعي بشكل ملحوظ، وشرح لي الأمور ببساطة وصبر، وكان دائمًا متعاونًا وسريع الرد.
يعمل بضمير ويهتم فعلًا بنجاح العميل، وليس فقط بتنفيذ المطلوب. أنصح به بشدة، وبإذن الله سيكون بيننا تعاملات قادمة. شكرًا لك على مجهودك الكبير',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1114962',
  'https://khamsat.hsoubcdn.com/reviews/7558ec2baeaa24758aa8cd95ca2135a8.png',
  true
),
(
  2, 'Khamsat', 5, 'حسام ص.',
  'A truly great experience. The service was excellent in quality and punctuality, and communication was smooth and clear from start to delivery. I recommend working with him without hesitation, and God willing this won''t be our last collaboration.',
  'تعامل رائع جدًا
الخدمة كانت ممتازة من حيث الجودة والالتزام بالوقت، والتواصل كان سلس وواضح من البداية حتى التسليم. أنصح بالتعامل معه بدون تردد، وبإذن الله لن يكون آخر تعامل بيننا.',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1115268',
  'https://khamsat.hsoubcdn.com/reviews/071a6f04fd82ff7ca733211db487dee6.png',
  true
),
(
  3, 'Khamsat', 5, '.Alshammari A',
  'An excellent developer, understanding of frequent changes. May God reward him well — God willing this won''t be the last time we work together.',
  'مبرمج ممتاز ومتفهم لكثرة التغييرات جزاه الله خير وان شاء الله مو اخر تعامل',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1133205',
  'https://khamsat.hsoubcdn.com/reviews/8c93e6fb250859e385568d5f4a493823.png',
  true
),
(
  4, 'Khamsat', 5, '.Alshammari A',
  'Those who don''t thank people don''t thank God. The work was more than excellent and delivered in record time. An understanding developer who handles continuous changes well. God willing this isn''t our last collaboration. All the best.',
  'من لايشكر الناس لايشكر الله
الشغل فوق الممتاز والوقت قياسي جدا
مبرمج فاهم ومتفهم للتغيير المستمر وان شاء الله ماهو اخر تعامل
بالتوفيق',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1134116',
  'https://khamsat.hsoubcdn.com/reviews/8a7ef974905bbd8d321da7428d10182a.png',
  true
),
(
  5, 'Khamsat', 5, '.Muhammad K',
  'It''s a pleasure to say that working with you, Mr. Mohamed, was enjoyable and a truly great, smooth experience. Your understanding of the client is commendable, explaining every detail from the smallest to the largest. The work was also creative — may God reward you greatly and grant you success ahead. God willing our collaboration is ongoing.',
  'يسعدني القول أن التعامل معك أستاذ محمد كان ممتع وتجربة جداً رائعة وسلسة واستيعابك للعميل أحييك عليه بشرح اصغر لأكبر تفصيل في عملك
بالإضافة أن العمل كان إبداعي جزاك الله عني كل خير ووفقك الله لما هو قادم وبإذن الله التعامل بيننا دائم',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1138711',
  'https://khamsat.hsoubcdn.com/reviews/02c12790ca1395151a9499c3cfd22881.png',
  true
),
(
  6, 'Khamsat', 5, '.Qx D',
  'A respectable, artistic developer — I recommend him, guys.',
  'مبرمج فنان محترم انصحكم في ي اخوان',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1138760',
  'https://khamsat.hsoubcdn.com/reviews/3dffe77eebcf91d63c5dc74741ede6fc.png',
  true
),
(
  7, 'Khamsat', 5, '.Qx D',
  'Something beautiful, I recommend it.',
  'شي جميل انصحكم في',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1138768',
  'https://khamsat.hsoubcdn.com/reviews/563be79ed6df3e7dae9e46e72ac0a6b3.png',
  true
),
(
  8, 'Khamsat', 5, '.Julian A',
  'A very refined interaction and fast response. The seller cares about client satisfaction, and I recommend everyone work with him. An exceptional, professional buying experience, honest in description and precise with deadlines.',
  'تعامل راقي جداً وسرعة في التجاوب البائع حريص على رضا العميل وأنصح الجميع بالتعامل معه تجربة شراء استثنائية احترافية في التعامل وأمانة في الوصف ودقة في المواعيد',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1140138',
  'https://khamsat.hsoubcdn.com/reviews/dad1d88c162c1081093101fa4b01f573.png',
  true
),
(
  9, 'Khamsat', 5, '.Julian A',
  'A wonderful buying experience! The seller is the height of professionalism and honesty, matching the description exactly. I strongly recommend working with him and will definitely repeat the experience. A professional and very fast service. The seller was excellent. Thank you very much to the seller for his attention and quality of service.',
  'تجربة شراء رائعة! البائع قمة في الرقي والأمانة ومطابق تماماً للوصف. أنصح بالتعامل معه بشدة وسأكرر التجربة بالتأكيد خدمة احترافية وسريعة جداً. البائع كان ممتازاً . شكراً جزيلاً للبائع على اهتمامه وجودة خدمته',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1140411',
  'https://khamsat.hsoubcdn.com/reviews/db32a7d91a874852b633a8fbad39ecc9.png',
  true
),
(
  10, 'Khamsat', 5, 'عبدالرحمن ع.',
  'Very cooperative.',
  'متعاون جدا',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1141223',
  'https://khamsat.hsoubcdn.com/reviews/96af59d246d086f73fe228cf447d7aef.png',
  true
),
(
  11, 'Khamsat', 5, '.Sultan A',
  'A kind, cooperative person who gives you more than what you asked for. Thank you for your open-mindedness and your kind dealings.',
  'شخص طيب متعاون  ويعطيك انت من الطلب اللي انت طالبه
اشكرك علي سعه الصدر وهلي تعاملك الطيب',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1142531',
  'https://khamsat.hsoubcdn.com/reviews/fff2d7edfad6bec12741f43e24f6615f.png',
  true
),
(
  12, 'Khamsat', 5, '.Julian A',
  'Thank you for this refined interaction.',
  'شكرا لك على على هذا التعامل الراقي',
  'https://khamsat.com/user/mohamed_hussainy/reviews/1142751',
  'https://khamsat.hsoubcdn.com/reviews/427177aff42a20a7a93ff19dee9cc5e7.png',
  true
);

COMMIT;
