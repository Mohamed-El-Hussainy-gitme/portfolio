export type PageKey = 'projects' | 'services' | 'about' | 'blog' | 'contact';

export type PageHeroContent = {
  label_en: string;
  label_ar: string;
  heading_en: string;
  heading_ar: string;
  sub_en: string;
  sub_ar: string;
};

export type PageSeoContent = {
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  focus_keyword_en: string;
  focus_keyword_ar: string;
};

export type PageContent = {
  hero: PageHeroContent;
  seo: PageSeoContent;
};

export type PagesMetaMap = Partial<Record<PageKey, PageContent>>;

export type ProjectScreen = {
  id: string;
  src: string;
  alt: string;
};
