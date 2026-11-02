// @ts-check
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import { AstroPWAIntegration } from '@vite-pwa/astro';
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      DEFAULT_BANG: envField.string({ default: 'qw', context: 'server', access: 'public' }),
    },
  },
  security: {
    csp: true,
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
    staticHeaders: true,
  }),
  integrations: [
    AstroPWAIntegration({
      filename: 'service-worker.js',
      strategies: 'buildSW',
      registerType: 'autoUpdate',
      manifest: {
        name: "Bangin' Search",
        short_name: "Bangin'",
        theme_color: '#f9fafb',
        background_color: '#18181b',
        description: 'Search the web with fast Bangs',
      },
      buildSW: {
        swSrc: 'src/service-worker.ts',
        manifestTransforms: [
          (arr) => ({
            manifest: arr.filter((e) => e.url !== '404.html'),
          }),
        ],
      },
      pwaAssets: {
        preset: 'minimal-2023',
        image: 'public/favicon.svg',
      },
    }),
  ],
});
