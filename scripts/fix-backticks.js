import fs from 'fs';
let content = fs.readFileSync('scripts/build-data.js', 'utf8');
content = content.replace(/\\`/g, '`');
fs.writeFileSync('scripts/build-data.js', content);
