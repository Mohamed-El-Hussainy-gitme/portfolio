-- Migration: 020_update_skills.sql

DELETE FROM skills;

INSERT INTO skills ("order", category, name, logo_url, project_count, visible) VALUES
  (1, 'Frontend', 'Next.js', 'nextjs.svg', 10, true),
  (2, 'Backend', 'PostgreSQL', 'database.svg', 9, true),
  (3, 'Frontend', 'React', 'react.svg', 7, true),
  (4, 'UI & Styling', 'CSS', 'css.svg', 6, true),
  (5, 'Backend', 'PHP', 'php.svg', 5, true),
  (6, 'Frontend', 'HTML', 'html.svg', 5, true),
  (7, 'Backend', 'Supabase', 'database.svg', 4, true),
  (8, 'UI & Styling', 'Tailwind CSS', 'tailwind.svg', 4, true),
  (9, 'Backend', 'Node.js', 'nodejs.svg', 3, true),
  (10, 'CMS & SEO', 'SEO', 'seo.svg', 3, true),
  (11, 'Backend', 'MySQL', 'database.svg', 3, true),
  (12, 'Frontend', 'TypeScript', 'typescript.svg', 2, true),
  (13, 'Backend', 'Python', NULL, 2, true),
  (14, 'Other', 'Dashboard', 'admin-dashboard.svg', 2, true),
  (15, 'Backend', 'ERP Integration', NULL, 2, true),
  (16, 'CMS & SEO', 'WordPress', 'wordpress.svg', 2, true),
  (17, 'UI & Styling', 'UI/UX', NULL, 2, true),
  (18, 'UI & Styling', 'Framer Motion', 'framer-motion.svg', 2, true),
  (19, 'Frontend', 'Next.js 14', 'nextjs-app-router.svg', 1, true),
  (20, 'Backend', 'RLS', NULL, 1, true),
  (21, 'Other', 'Real-time', NULL, 1, true),
  (22, 'Backend', 'FastAPI', NULL, 1, true),
  (23, 'Frontend', 'Vite', 'vite.svg', 1, true),
  (24, 'Backend', 'SQLAlchemy', NULL, 1, true),
  (25, 'Backend', 'Alembic', NULL, 1, true),
  (26, 'State & Data', 'Redux', 'redux.svg', 1, true),
  (27, 'Other', 'Booking Engine', NULL, 1, true),
  (28, 'Tooling', 'Maps API', NULL, 1, true),
  (29, 'Backend', 'PostgreSQL RLS', 'database.svg', 1, true),
  (30, 'Tooling', 'Payment Gateway APIs', NULL, 1, true),
  (31, 'CMS & SEO', 'Content Strategy', NULL, 1, true),
  (32, 'Tooling', 'Hardware API', NULL, 1, true),
  (33, 'CMS & SEO', 'WooCommerce', 'ecommerce.svg', 1, true),
  (34, 'Tooling', 'OpenAI API', NULL, 1, true),
  (35, 'Tooling', 'Groq', NULL, 1, true),
  (36, 'Tooling', 'Ollama', NULL, 1, true),
  (37, 'UI & Styling', 'CSS Modules', 'css.svg', 1, true),
  (38, 'UI & Styling', 'WebGL', NULL, 1, true),
  (39, 'UI & Styling', 'Cinematic Animations', NULL, 1, true),
  (40, 'CMS & SEO', 'Astra Child Theme', 'astra-child-theme.svg', 1, true),
  (41, 'Frontend', 'JavaScript', 'javascript.svg', 1, true),
  (42, 'Backend', 'Docker', NULL, 1, true),
  (43, 'Other', 'Asset Management', NULL, 1, true),
  (44, 'UI & Styling', 'CSS Generator', 'css-design-system-variables.svg', 1, true),
  (45, 'Other', 'Workflow', NULL, 1, true),
  (46, 'UI & Styling', 'Atomic Design', NULL, 1, true),
  (47, 'Backend', 'Fullstack', NULL, 1, true),
  (48, 'Backend', 'Custom DB', 'database.svg', 1, true),
  (49, 'Tooling', 'Google Tag Manager', NULL, 1, true),
  (50, 'UI & Styling', 'Custom CSS', 'css.svg', 1, true),
  (51, 'Other', 'Custom JS', NULL, 1, true),
  (52, 'Frontend', 'JS', 'javascript.svg', 1, true),
  (53, 'Other', 'Web Platform', NULL, 1, true),
  (54, 'Other', 'Frontend', NULL, 1, true),
  (55, 'Backend', 'Backend', NULL, 1, true),
  (56, 'Tooling', 'WhatsApp API', NULL, 1, true);


-- REVIEWS --

DELETE FROM reviews;

INSERT INTO reviews ("order", platform, reviewer_name, rating, review_text_ar, review_text_en, review_url, screenshot_url, visible) VALUES
  (1, 'Khamsat', 'حسام ص.', 5, 'تعامل أكثر من رائع، شخص محترف جدًا في مجال السيو و الموقع وملم بالتفاصيل بشكل واضح. ساعدني في تحسين موقعي بشكل ملحوظ، وشرح لي الأمور ببساطة وصبر، وكان دائمًا متعاونًا وسريع الرد.
يعمل بضمير ويهتم فعلًا بنجاح العميل، وليس فقط بتنفيذ المطلوب. أنصح به بشدة، وبإذن الله سيكون بيننا تعاملات قادمة. شكرًا لك على مجهودك الكبير', 'An excellent experience, a very professional person in SEO and web development who understands every detail clearly. He noticeably improved my site, explained things simply and patiently, and was always responsive and cooperative. He works with integrity and genuinely cares about the client''s success, not just completing the task. Highly recommended — God willing we''ll work together again. Thank you for your great effort.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1114962', 'https://khamsat.hsoubcdn.com/reviews/7558ec2baeaa24758aa8cd95ca2135a8.png', true),
  (2, 'Khamsat', 'حسام ص.', 5, 'تعامل رائع جدًا
الخدمة كانت ممتازة من حيث الجودة والالتزام بالوقت، والتواصل كان سلس وواضح من البداية حتى التسليم. أنصح بالتعامل معه بدون تردد، وبإذن الله لن يكون آخر تعامل بيننا.', 'A truly great experience. The service was excellent in quality and punctuality, and communication was smooth and clear from start to delivery. I recommend working with him without hesitation, and God willing this won''t be our last collaboration.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1115268', 'https://khamsat.hsoubcdn.com/reviews/071a6f04fd82ff7ca733211db487dee6.png', true),
  (3, 'Khamsat', 'A. Alshammari', 5, 'مبرمج ممتاز ومتفهم لكثرة التغييرات جزاه الله خير وان شاء الله مو اخر تعامل', 'An excellent developer, understanding of frequent changes. May God reward him well — God willing this won''t be the last time we work together.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1133205', 'https://khamsat.hsoubcdn.com/reviews/8c93e6fb250859e385568d5f4a493823.png', true),
  (4, 'Khamsat', 'A. Alshammari', 5, 'من لايشكر الناس لايشكر الله
الشغل فوق الممتاز والوقت قياسي جدا
مبرمج فاهم ومتفهم للتغيير المستمر وان شاء الله ماهو اخر تعامل
بالتوفيق', 'Those who don''t thank people don''t thank God. The work was more than excellent and delivered in record time. An understanding developer who handles continuous changes well. God willing this isn''t our last collaboration. All the best.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1134116', 'https://khamsat.hsoubcdn.com/reviews/8a7ef974905bbd8d321da7428d10182a.png', true),
  (5, 'Khamsat', 'Muhammad K.', 5, 'يسعدني القول أن التعامل معك أستاذ محمد كان ممتع وتجربة جداً رائعة وسلسة واستيعابك للعميل أحييك عليه بشرح اصغر لأكبر تفصيل في عملك
بالإضافة أن العمل كان إبداعي جزاك الله عني كل خير ووفقك الله لما هو قادم وبإذن الله التعامل بيننا دائم', 'It''s a pleasure to say that working with you, Mr. Mohamed, was enjoyable and a truly great, smooth experience. Your understanding of the client is commendable, explaining every detail from the smallest to the largest. The work was also creative — may God reward you greatly and grant you success ahead. God willing our collaboration is ongoing.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1138711', 'https://khamsat.hsoubcdn.com/reviews/02c12790ca1395151a9499c3cfd22881.png', true),
  (6, 'Khamsat', 'D. Qx', 5, 'مبرمج فنان محترم انصحكم في ي اخوان', 'A respectable, artistic developer — I recommend him, guys.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1138760', 'https://khamsat.hsoubcdn.com/reviews/3dffe77eebcf91d63c5dc74741ede6fc.png', true),
  (7, 'Khamsat', 'D. Qx', 5, 'شي جميل انصحكم في', 'Something beautiful, I recommend it.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1138768', 'https://khamsat.hsoubcdn.com/reviews/563be79ed6df3e7dae9e46e72ac0a6b3.png', true),
  (8, 'Khamsat', 'Julian A.', 5, 'تعامل راقي جداً وسرعة في التجاوب البائع حريص على رضا العميل وأنصح الجميع بالتعامل معه تجربة شراء استثنائية احترافية في التعامل وأمانة في الوصف ودقة في المواعيد', 'A very refined interaction and fast response. The seller cares about client satisfaction, and I recommend everyone work with him. An exceptional, professional buying experience, honest in description and precise with deadlines.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1140138', 'https://khamsat.hsoubcdn.com/reviews/dad1d88c162c1081093101fa4b01f573.png', true),
  (9, 'Khamsat', 'Julian A.', 5, 'تجربة شراء رائعة! البائع قمة في الرقي والأمانة ومطابق تماماً للوصف. أنصح بالتعامل معه بشدة وسأكرر التجربة بالتأكيد خدمة احترافية وسريعة جداً. البائع كان ممتازاً . شكراً جزيلاً للبائع على اهتمامه وجودة خدمته', 'A wonderful buying experience! The seller is the height of professionalism and honesty, matching the description exactly. I strongly recommend working with him and will definitely repeat the experience. A professional and very fast service. The seller was excellent. Thank you very much to the seller for his attention and quality of service.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1140411', 'https://khamsat.hsoubcdn.com/reviews/db32a7d91a874852b633a8fbad39ecc9.png', true),
  (10, 'Khamsat', 'عبدالرحمن ع.', 5, 'متعاون جدا', 'Very cooperative.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1141223', 'https://khamsat.hsoubcdn.com/reviews/96af59d246d086f73fe228cf447d7aef.png', true),
  (11, 'Khamsat', 'Sultan A.', 5, 'شخص طيب متعاون  ويعطيك انت من الطلب اللي انت طالبه
اشكرك علي سعه الصدر وهلي تعاملك الطيب', 'A kind, cooperative person who gives you more than what you asked for. Thank you for your open-mindedness and your kind dealings.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1142531', 'https://khamsat.hsoubcdn.com/reviews/fff2d7edfad6bec12741f43e24f6615f.png', true),
  (12, 'Khamsat', 'Julian A.', 5, 'شكرا لك على على هذا التعامل الراقي', 'Thank you for this refined interaction.', 'https://khamsat.com/user/mohamed_hussainy/reviews/1142751', 'https://khamsat.hsoubcdn.com/reviews/427177aff42a20a7a93ff19dee9cc5e7.png', true);
