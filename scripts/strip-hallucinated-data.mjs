import fs from 'fs';

const factsMap = {
  'noda-clothing-brand': {
    desc: 'لوحة تحكم واحدة (Rebrand) مبنية بتقنيات PHP و MySQL لمتجر إلكتروني.',
    enDesc: 'A single dashboard (Rebrand) built with PHP and MySQL for an e-commerce store.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS']
  },
  'gedo-store': {
    desc: 'لوحة تحكم واحدة (Rebrand) مبنية بتقنيات PHP و MySQL لمتجر إلكتروني.',
    enDesc: 'A single dashboard (Rebrand) built with PHP and MySQL for an e-commerce store.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS']
  },
  'rose-ecommerce': {
    desc: 'لوحة تحكم واحدة (Rebrand) مبنية بتقنيات PHP و MySQL لمتجر إلكتروني.',
    enDesc: 'A single dashboard (Rebrand) built with PHP and MySQL for an e-commerce store.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS']
  },
  'alkhair-store': {
    desc: 'مشروع React بلوحة تحكم واحدة مع نظام نقطة بيع (POS) داخلية للمحل لربط المبيعات الأوفلاين والأونلاين.',
    enDesc: 'A React project with a single dashboard and an internal POS system linking offline and online sales.',
    tech: ['React', 'Node.js', 'PostgreSQL']
  },
  'kenz-ecommerce': {
    desc: 'مشروع React بلوحة تحكم واحدة. نظام متجر إلكتروني متكامل (ليس SaaS) لمتجر واحد متعدد المنتجات يشمل ERP و CRM وتتبع للمخزون والفواتير المحاسبية.',
    enDesc: 'A React project with a single dashboard. Full e-commerce system (not SaaS) for a single vendor with multiple products, including ERP, CRM, inventory tracking, and accounting.',
    tech: ['React', 'Node.js', 'PostgreSQL']
  },
  'al-afkham-woocommerce': {
    desc: 'مشروع ووردبريس ووكمرس متكامل.',
    enDesc: 'A complete WordPress WooCommerce project.',
    tech: ['WordPress', 'WooCommerce', 'PHP']
  },
  'arab-anglais': {
    desc: 'منصة لتقديم الخدمات للعملاء.',
    enDesc: 'A service platform for clients.',
    tech: ['Next.js', 'Tailwind CSS']
  },
  'ahwa-saas-platform': {
    desc: 'نظام تشغيل وإدارة مخصص للمقاهي.',
    enDesc: 'A specialized operating system and management platform for cafes.',
    tech: ['Next.js', 'PostgreSQL', 'Supabase']
  },
  'restaurant-specialized-saas': {
    desc: 'نظام مشابه لقهوة ولكنه مخصص أكثر لإدارة المطاعم.',
    enDesc: 'A system similar to Ahwa but specialized for restaurant management.',
    tech: ['Next.js', 'PostgreSQL', 'Supabase']
  },
  'nori-restaurant-ui': {
    desc: 'مشروع منفصل لواجهة أمامية (Static) لمطعم.',
    enDesc: 'A separate static frontend project for a restaurant.',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  'crm-system-nextjs': {
    desc: 'نظام CRM كامل للشركات مبني بـ Next.js يحتوي على أتمتة بالواتساب، أجندة، وإدارة الصفقات (Deals).',
    enDesc: 'A complete CRM system for companies built with Next.js, featuring WhatsApp automation, agenda, and deals management.',
    tech: ['Next.js', 'WhatsApp API', 'Tailwind CSS']
  },
  'crm-system-python': {
    desc: 'نظام CRM محاكاة لـ Odoo 17 مبني على بايثون و Docker مع أتمتة واتساب وكافة ميزات إدارة العملاء.',
    enDesc: 'A CRM simulation of Odoo 17 built with Python and Docker, including WhatsApp automation and full CRM features.',
    tech: ['Python', 'Docker', 'PostgreSQL']
  },
  'bcc-fullstack': {
    desc: 'إنشاء منصة كاملة من الصفر، تشمل لوحة التحكم وقواعد البيانات (Fullstack).',
    enDesc: 'Built a complete platform from scratch, including dashboard and database (Fullstack).',
    tech: ['Next.js', 'Node.js', 'PostgreSQL']
  },
  'arab-tourism': {
    desc: 'واجهة أمامية لدليل سياحي فقط.',
    enDesc: 'Frontend interface for a tourist guide only.',
    tech: ['Next.js', 'Tailwind CSS']
  },
  'growlik-seo': {
    desc: 'تغيير محتوى الموقع بالكامل وعمل 8 صفحات إضافية لتحسين المحتوى وتفصيل الخدمات لتصدر نتائج البحث الأولى.',
    enDesc: 'Completely revamped site content and added 8 pages to optimize services and rank first in search results.',
    tech: ['SEO', 'Content Strategy']
  },
  'vortexq8-seo': {
    desc: 'تغيير التصميم بالكامل بـ Custom CSS و Custom JS، مع حقن فهرسة جوجل في منصة رمز (التي لا تقبل تعديل HTML).',
    enDesc: 'Completely redesigned using Custom CSS and JS, injecting Google indexing into the Ramz platform which restricts HTML edits.',
    tech: ['Custom CSS', 'Custom JS', 'SEO']
  },
  'saqi-sa-seo': {
    desc: 'تحدي مشابه لمنصة رمز، تم الربط وحقن الفهرسة عبر Google Tag Manager.',
    enDesc: 'A challenge similar to the Ramz platform, integrated and indexed via Google Tag Manager.',
    tech: ['Google Tag Manager', 'SEO']
  },
  'holospace-simulator': {
    desc: 'نظام محاكاة ويب لتطبيقات سطح المكتب (مثل winapp) عبر الإنترنت.',
    enDesc: 'A web simulation of desktop applications (like winapp) online.',
    tech: ['React', 'CSS Modules']
  }
};

let content = fs.readFileSync('./src/data/projects.ts', 'utf8');
const prefix = 'export const projects: ProjectDefinition[] = ';
const startIndex = content.indexOf(prefix) + prefix.length;
const jsonStr = content.slice(startIndex, content.lastIndexOf(';'));

let projects = JSON.parse(jsonStr);

// Filter out base44 completely, and any others that should be omitted
projects = projects.filter(p => !p.id.includes('base44'));

projects = projects.map(p => {
  const fact = factsMap[p.id];
  
  if (fact) {
    p.description = { ar: fact.desc, en: fact.enDesc };
    p.caseStudy = {
      problem: { ar: 'التطوير البرمجي والتنفيذ', en: 'Software development and implementation' },
      solution: { ar: fact.desc, en: fact.enDesc },
      outcome: { ar: 'تم بناء المشروع وتطويره بنجاح', en: 'Project successfully built and developed' },
      role: { ar: 'مطور', en: 'Developer' },
      stack: { ar: fact.tech.join(' • '), en: fact.tech.join(' • ') },
      steps: { ar: ['التحليل', 'التنفيذ'], en: ['Analysis', 'Execution'] },
      faqs: []
    };
    p.techStack = fact.tech;
  } else {
    // Minimal neutral string for any unlisted project (removes fake/guessed content)
    p.description = { ar: 'مشروع تم برمجته وتنفيذه بنجاح.', en: 'Project successfully developed and implemented.' };
    p.caseStudy = {
      problem: { ar: 'الطلب والتنفيذ', en: 'Requirement & Execution' },
      solution: { ar: 'تم تنفيذ المطلوب برمجياً.', en: 'Requirements implemented programmatically.' },
      outcome: { ar: 'اكتمال المشروع والتسليم.', en: 'Project completed and delivered.' },
      role: { ar: 'تطوير', en: 'Development' },
      stack: { ar: p.techStack.join(' • '), en: p.techStack.join(' • ') },
      steps: { ar: [], en: [] },
      faqs: []
    };
  }

  // Clear highlights as they contain fake data like percentages
  p.highlights = [];
  
  return p;
});

const newContent = content.slice(0, startIndex) + JSON.stringify(projects, null, 2) + ';\n';
fs.writeFileSync('./src/data/projects.ts', newContent, 'utf8');
console.log('Projects rewritten successfully without hallucinations.');
