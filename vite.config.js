import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function spaGlanceMailFallback() {
  return {
    name: 'spa-glance-mail-fallback',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? '';
        if (url === '/glanceMail.html' || url.startsWith('/glanceMail.html?')) {
          req.url = '/index.html';
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? '';
        if (url === '/glanceMail.html' || url.startsWith('/glanceMail.html?')) {
          req.url = '/index.html';
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    spaGlanceMailFallback(),
    {
      name: 'spa-html-clones',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist');
        const indexHtml = path.join(distDir, 'index.html');
        if (!fs.existsSync(indexHtml)) return;
        const html = fs.readFileSync(indexHtml, 'utf8');
        fs.writeFileSync(path.join(distDir, '404.html'), html);
        fs.writeFileSync(path.join(distDir, 'glanceMail.html'), html);
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
