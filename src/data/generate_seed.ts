import fs from 'fs';
import { projects } from './projects';
import { blogPosts } from './blog';
import { services } from './services';

function escapeSql(str) {
  if (str == null) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function jsonSql(obj) {
  if (obj == null) return "'[]'::jsonb";
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
}

let sql = `-- Real Seed Data\n\n`;

// Projects
sql += `-- PROJECTS\n`;
sql += `DELETE FROM projects;\n`;
for (const p of projects) {
  sql += `INSERT INTO projects (
    universe, slug, status, featured, 
    name_en, name_ar, tagline_en, tagline_ar, description_en, description_ar,
    focus_keyword_en, focus_keyword_ar, seo_title_en, seo_title_ar, seo_description_en, seo_description_ar,
    tech_stack, tags, repo_url, live_url, screens,
    case_study_problem_en, case_study_problem_ar, case_study_solution_en, case_study_solution_ar,
    case_study_outcome_en, case_study_outcome_ar, case_study_role_en, case_study_role_ar,
    case_study_stack_en, case_study_stack_ar, case_study_steps_en, case_study_steps_ar,
    faqs,
    highlight_key_points_en, highlight_key_points_ar, highlight_focus_en, highlight_focus_ar,
    highlight_role_en, highlight_role_ar
  ) VALUES (
    ${p.universe || 0}, ${escapeSql(p.slug)}, 'published', true,
    ${escapeSql(p.name?.en)}, ${escapeSql(p.name?.ar)},
    ${escapeSql(p.tagline?.en)}, ${escapeSql(p.tagline?.ar)},
    ${escapeSql(p.description?.en)}, ${escapeSql(p.description?.ar)},
    ${escapeSql(p.focusKeyword?.en)}, ${escapeSql(p.focusKeyword?.ar)},
    ${escapeSql(p.seoTitle?.en)}, ${escapeSql(p.seoTitle?.ar)},
    ${escapeSql(p.seoDescription?.en)}, ${escapeSql(p.seoDescription?.ar)},
    ${jsonSql(p.techStack)}, ${jsonSql(p.tags)}, ${escapeSql(p.repoUrl)}, ${escapeSql(p.liveUrl)},
    ${jsonSql(p.screens)},
    ${escapeSql(p.caseStudy?.problem?.en)}, ${escapeSql(p.caseStudy?.problem?.ar)},
    ${escapeSql(p.caseStudy?.solution?.en)}, ${escapeSql(p.caseStudy?.solution?.ar)},
    ${escapeSql(p.caseStudy?.outcome?.en)}, ${escapeSql(p.caseStudy?.outcome?.ar)},
    ${escapeSql(p.caseStudy?.role?.en)}, ${escapeSql(p.caseStudy?.role?.ar)},
    ${escapeSql(p.caseStudy?.stack?.en)}, ${escapeSql(p.caseStudy?.stack?.ar)},
    ${jsonSql(p.caseStudy?.steps?.en)}, ${jsonSql(p.caseStudy?.steps?.ar)},
    ${jsonSql(p.caseStudy?.faqs)},
    ${escapeSql(p.highlights?.[0]?.body?.en)}, ${escapeSql(p.highlights?.[0]?.body?.ar)},
    ${escapeSql(p.highlights?.[1]?.body?.en)}, ${escapeSql(p.highlights?.[1]?.body?.ar)},
    ${escapeSql(p.highlights?.[2]?.body?.en)}, ${escapeSql(p.highlights?.[2]?.body?.ar)}
  );\n`;
}

// Blog Posts
sql += `\n-- BLOG POSTS\n`;
sql += `DELETE FROM blog_posts;\n`;
for (const b of blogPosts) {
  sql += `INSERT INTO blog_posts (
    slug, status, title_en, title_ar, summary_en, summary_ar, content_en, content_ar, tags, cover_image, published_date
  ) VALUES (
    ${escapeSql(b.slug)}, 'published',
    ${escapeSql(b.title?.en)}, ${escapeSql(b.title?.ar)},
    ${escapeSql(b.description?.en)}, ${escapeSql(b.description?.ar)},
    ${jsonSql(b.blocks)}, ${jsonSql(b.blocks)},
    ${jsonSql(b.tags)}, NULL, ${escapeSql(b.dateISO)}
  );\n`;
}

// Services
sql += `\n-- SERVICES\n`;
sql += `DELETE FROM services;\n`;
let order = 1;
for (const s of services || []) {
  sql += `INSERT INTO services (
    "order", status, slug, icon, keyword_en, keyword_ar, title_en, title_ar,
    description_en, description_ar, includes_en, includes_ar
  ) VALUES (
    ${order++}, 'published', ${escapeSql(s.slug)}, ${escapeSql(s.icon)},
    ${escapeSql(s.keyword?.en)}, ${escapeSql(s.keyword?.ar)},
    ${escapeSql(s.title?.en)}, ${escapeSql(s.title?.ar)},
    ${escapeSql(s.description?.en)}, ${escapeSql(s.description?.ar)},
    ${jsonSql(s.includes?.en)}, ${jsonSql(s.includes?.ar)}
  );\n`;
}

fs.writeFileSync('supabase/migrations/003_real_seed_data.sql', sql);
console.log("SQL seed file generated at 003_real_seed_data.sql");
