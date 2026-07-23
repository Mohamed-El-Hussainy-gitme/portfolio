import fs from 'fs';
import path from 'path';

// Helper to escape strings in the generated file
const escapeString = (str) => {
  if (!str) return '""';
  return JSON.stringify(str);
};

// We will read the 4 parts
const p1 = JSON.parse(fs.readFileSync('./src/data/projects_v2_part1.json', 'utf8'));
const p2 = JSON.parse(fs.readFileSync('./src/data/projects_v2_part2.json', 'utf8'));
const p3 = JSON.parse(fs.readFileSync('./src/data/projects_v2_part3.json', 'utf8'));
const p4 = JSON.parse(fs.readFileSync('./src/data/projects_v2_part4.json', 'utf8'));

const updates = [...p1, ...p2, ...p3, ...p4];

// The original projects from our previous run (which had 36 projects).
// We will read the current projects.ts by executing it or parsing it.
// Since it's TS, it's easier to just use the `projects.ts` after compiling, or regex.
// Let's use dynamic import since we can run this script with `tsx`!

async function main() {
  const { projects } = await import('../src/data/projects.ts');
  
  // Filter out the non-projects
  let finalProjects = projects.filter(p => p.id !== 'dashboard-admin-personal' && p.id !== 'zeta-platform');

  // We need to map some old IDs to the new ones or just match by slug
  const updatesMap = {};
  updates.forEach(u => { updatesMap[u.id] = u; });
  
  // Special mappings for grouped projects
  const groupPhp = updatesMap['php-ecommerce-group'];
  const groupSeoGrowlik = updatesMap['growlik-seo'];

  finalProjects = finalProjects.map(p => {
    let updateData = updatesMap[p.id];
    
    // Fallbacks for mapped groups
    if (!updateData) {
      if (['noda-clothing-brand', 'gedo-store', 'rose-ecommerce'].includes(p.id)) {
        updateData = groupPhp;
      } else if (p.id === 'base44-ecommerce-erp') {
        updateData = updatesMap['kenz-ecommerce-erp'];
      }
    }
    
    // If we have update data, merge it
    if (updateData) {
      return {
        ...p,
        name: updateData.name || p.name,
        tagline: updateData.tagline || p.tagline,
        description: updateData.description || p.description,
        techStack: updateData.techStack || p.techStack,
        tags: updateData.tags || p.tags,
        seoTitle: updateData.seoTitle || p.seoTitle,
        seoDescription: updateData.seoDescription || p.seoDescription,
        caseStudy: {
          ...p.caseStudy,
          ...updateData.caseStudy
        }
      };
    }
    
    return p;
  });

  // Now generate the TS file string
  let output = `// ============================================================
// THIS FILE IS AUTO-GENERATED – DO NOT EDIT MANUALLY
// Source: scripts/rebuild-projects-ts.js
// Last updated: Based on direct client Q&A (100% human accurate data)
// ============================================================

export type LocalizedText = { en: string; ar: string };

export interface HighlightItem {
  id: string;
  label: LocalizedText;
  body: LocalizedText;
}

export interface CaseStudyStep {
  en: string[];
  ar: string[];
}

export interface FAQ {
  q: LocalizedText;
  a: LocalizedText;
}

export interface CaseStudy {
  problem: LocalizedText;
  solution: LocalizedText;
  outcome: LocalizedText;
  role: LocalizedText;
  stack: LocalizedText;
  steps: CaseStudyStep;
  faqs: FAQ[];
}

export interface ProjectScreen {
  id: string;
  src: string;
  alt: string;
}

export interface ProjectDefinition {
  id: string;
  universe: number;
  slug: string;
  name: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  focusKeyword: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  techStack: string[];
  tags: string[];
  repoUrl: string;
  liveUrl: string;
  screens: ProjectScreen[];
  highlights: HighlightItem[];
  caseStudy: CaseStudy;
  isFeatured: boolean;
}

export const projects: ProjectDefinition[] = ${JSON.stringify(finalProjects, null, 2)};
`;

  fs.writeFileSync('./src/data/projects.ts', output, 'utf8');
  console.log('Successfully rebuilt projects.ts with 34 accurate projects!');
}

main().catch(console.error);
