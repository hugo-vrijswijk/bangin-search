// @ts-check
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';
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
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    AstroPWA({
      srcDir: 'src',
      filename: 'service-worker.ts',
      strategies: 'injectManifest',
      registerType: 'autoUpdate',
      manifest: {
        name: "Bangin' Search",
        short_name: "Bangin'",
        theme_color: '#f9fafb',
        background_color: '#18181b',
        description: 'Search the web with fast Bangs',
      },
      pwaAssets: {
        preset: 'minimal-2023',
        image: 'public/favicon.svg',
      },
    }),
  ],
});
