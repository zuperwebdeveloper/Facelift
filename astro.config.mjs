// Imports
import { defineConfig } from 'astro/config';
import react from '@astrojs/react'; //React
import sitemap from "@astrojs/sitemap"; // For sitemap in live site

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  //site: '', Published homepage link goes here for sitemap
  integrations: [react() // sitemap({customPages: [''] Subpages links goes here for sitemap. }),
  , tailwind()],
  //For custom build
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/main.js',
          chunkFileNames: 'chunks/chunk.[hash].js',
          assetFileNames: ({
            name
          }) => {
            if (/\.(gif|jpe?g|png|svg|mp4)$/.test(name ?? '')) {
              return 'assets/images/[name][extname]';
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/styles[extname]';
            }
            return 'assets/[name][extname]';
          }
        }
      }
    }
  }
});