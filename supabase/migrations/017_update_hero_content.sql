BEGIN;

UPDATE site_settings SET
  hero_heading_ar = 'أنا محمد الحسيني. أبني منصات ويب، ومتاجر إلكترونية، وأنظمة إدارة متكاملة.',
  hero_heading_en = 'I''m Mohamed El Hussainy. I build solid web apps, marketplaces, and e-commerce platforms.',
  hero_subheading_ar = 'من خلفية في المحاماة إلى تنفيذ أكثر من 30 مشروع برمجي متكامل. أصمم وأبرمج حلول حقيقية تخدم عملك بشكل مباشر، بدون تعقيدات أو قوالب جاهزة.',
  hero_subheading_en = 'From a background in law to executing over 30 full-stack projects. I design and build systems that actually work for your business.'
WHERE key = 'main';

COMMIT;
