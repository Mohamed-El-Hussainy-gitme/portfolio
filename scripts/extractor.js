import fs from 'fs';
import path from 'path';

const targetDirs = [
  'D:\\freelawyers',
  'D:\\opened projects',
  'D:\\projects',
  'D:\\works inshaa-allah'
];

let summary = {};

function scanDir(dir) {
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const projSummary = extractProjectFeatures(fullPath);
        if (projSummary) {
          summary[item] = projSummary;
        }
      }
    }
  } catch (e) {
    console.error('Error reading dir', dir, e.message);
  }
}

function extractProjectFeatures(projPath) {
  let hasCode = false;
  let details = {
    stack: [],
    models: [],
    routes: []
  };

  // Check package.json
  const pkgPath = path.join(projPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    hasCode = true;
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps['next']) details.stack.push('Next.js');
      if (deps['react']) details.stack.push('React');
      if (deps['prisma']) details.stack.push('Prisma');
      if (deps['supabase']) details.stack.push('Supabase');
      if (deps['framer-motion']) details.stack.push('Framer Motion');
      if (deps['tailwindcss']) details.stack.push('Tailwind CSS');
    } catch (e) {}
  }

  // Check WordPress
  const wpPath = path.join(projPath, 'wp-content');
  if (fs.existsSync(wpPath)) {
    hasCode = true;
    details.stack.push('WordPress');
    // Check plugins
    try {
      const plugins = fs.readdirSync(path.join(wpPath, 'plugins'));
      details.stack.push('Plugins: ' + plugins.join(', '));
    } catch(e) {}
  }

  // Check Prisma Schema
  const prismaPath = path.join(projPath, 'prisma', 'schema.prisma');
  if (fs.existsSync(prismaPath)) {
    hasCode = true;
    const schema = fs.readFileSync(prismaPath, 'utf8');
    const models = schema.match(/model\s+(\w+)/g);
    if (models) {
      details.models = models.map(m => m.replace('model ', ''));
    }
  }

  // Check app directory for Next.js routes
  const appPath = path.join(projPath, 'app');
  if (fs.existsSync(appPath)) {
    try {
      const appContents = fs.readdirSync(appPath);
      details.routes = appContents.filter(f => !f.includes('.') || f.includes('.tsx') || f.includes('.js'));
    } catch (e) {}
  }

  return hasCode ? details : null;
}

targetDirs.forEach(scanDir);
fs.writeFileSync('D:\\projects\\elhussainy-next\\project_features.json', JSON.stringify(summary, null, 2));
console.log('Done!');
