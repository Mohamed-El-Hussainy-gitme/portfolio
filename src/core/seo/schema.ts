import { buildLangUrl, getSiteOrigin, type SiteLocale, SITE_NAME } from "./siteMeta";
import type { BlogPost } from "../../data/blog";
import type { ServiceItem } from "../../data/services";
import type { ProjectDefinition } from "../../data/projects";

export type BreadcrumbCrumb = { name: string; path: string };

export function breadcrumbList(locale: SiteLocale, crumbs: BreadcrumbCrumb[]) {
  const itemListElement = crumbs.map((c, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: c.name,
    // Build fully qualified URL for each crumb. Note: buildLangUrl accepts
    // locale first and path second. Passing arguments in the wrong order
    // produces incorrect URLs (e.g. treating the path as a locale). See
    // siteMeta.ts for the signature.
    item: buildLangUrl(locale, c.path),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function blogPostingSchema(locale: SiteLocale, post: BlogPost) {
  const origin = getSiteOrigin();
  const url = buildLangUrl(locale, `/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.description[locale],
    inLanguage: locale,
    keywords: [...post.tags, post.focusKeyword[locale]].join(", "),
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", name: SITE_NAME, url: origin },
    publisher: { "@type": "Person", name: SITE_NAME, url: origin },
    url,
  };
}

export function blogItemListSchema(locale: SiteLocale, posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "http://schema.org/ItemListOrderDescending",
    numberOfItems: posts.length,
    itemListElement: posts.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "WebPage",
        name: p.title[locale],
        url: buildLangUrl(locale, `/blog/${p.slug}`),
      },
    })),
  };
}

export function serviceSchema(locale: SiteLocale, service: ServiceItem, pagePath: string) {
  const origin = getSiteOrigin();
  // The pagePath should include the slug (e.g. "/services/landing-page"). We do
  // not append a fragment (#slug) here because each service has its own
  // dedicated page. Using a fragment would point crawlers back to the index
  // page instead of the detail page.
  const url = buildLangUrl(locale, pagePath);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title[locale],
    description: service.summary[locale],
    url,
    provider: { "@type": "Person", name: SITE_NAME, url: origin },
    areaServed: "Worldwide",
    // serviceType should be a short descriptive phrase. When a service does not
    // define a dedicated focus keyword, fall back to its title.
    serviceType: service.focusKeyword?.[locale] ?? service.title[locale],
  };
}

export function servicesItemListSchema(locale: SiteLocale, services: ServiceItem[], pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "http://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    itemListElement: services.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      // Provide a path including the service slug when delegating to
      // serviceSchema. Without the slug the schema would construct a URL with a
      // fragment (#) which points back to the service index. See serviceSchema
      // for details.
      item: serviceSchema(locale, s, `${pagePath}/${s.slug}`),
    })),
  };
}

export function projectCaseStudySchema(locale: SiteLocale, project: ProjectDefinition) {
  const origin = getSiteOrigin();
  const url = buildLangUrl(locale, `/projects/${project.slug}`);

  const focusKeyword = (project.focusKeyword?.[locale] || "").trim();

  return {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: project.seoTitle?.[locale] || project.name[locale],
    description: project.seoDescription?.[locale] || project.description[locale],
    inLanguage: locale,
    url,
    creator: { "@type": "Person", name: SITE_NAME, url: origin },
    author: { "@type": "Person", name: SITE_NAME, url: origin },
    keywords: [...project.tags, ...project.techStack, focusKeyword].filter(Boolean).join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function projectsItemListSchema(locale: SiteLocale, projects: ProjectDefinition[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "http://schema.org/ItemListOrderAscending",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "WebPage",
        name: p.seoTitle?.[locale] || p.name[locale],
        url: buildLangUrl(locale, `/projects/${p.slug}`),
      },
    })),
  };
}

export function websiteSchema(locale: SiteLocale) {
  const origin = getSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: origin,
    inLanguage: locale,
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: origin,
    },
  };
}

export function personSchema(locale: SiteLocale) {
  const origin = getSiteOrigin();
  const name = locale === "ar" ? "محمد الحسيني" : "Mohamed El-Husseiny";

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url: origin,
    jobTitle: locale === "ar" ? "مطور فل ستاك" : "Full-stack developer",
    knowsAbout:
      locale === "ar"
        ? ["إنشاء مواقع", "Next.js", "React", "SEO تقني", "أداء الموقع"]
        : ["website development", "Next.js", "React", "technical SEO", "web performance"],
  };
}
