import { DEFAULT_BANG } from 'astro:env/server';
import { defineMiddleware } from 'astro:middleware';
import { getBangredirectUrl } from './bang';

export const onRequest = defineMiddleware((context, next) => {
  if (context.routePattern === '/') {
    const searchUrl = getBangredirectUrl(context.url, DEFAULT_BANG);
    if (searchUrl) {
      return context.redirect(searchUrl);
    }
  }

  return next();
});
