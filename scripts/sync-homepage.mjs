import { copyFileSync } from 'node:fs';

// The static homepage is authoritative; Vite overwrites dist/index.html last.
copyFileSync('public/static-home.html', 'public/index.html');
if (process.argv.includes('--dist')) {
  copyFileSync('public/static-home.html', 'dist/index.html');
  copyFileSync('public/static-home.html', 'dist/static-home.html');
}