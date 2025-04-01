// @ts-check
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
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
});
