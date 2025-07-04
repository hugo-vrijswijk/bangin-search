import type { APIRoute } from 'astro';
import { getBangRedirectUrl } from '../bang';
import { DEFAULT_BANG } from 'astro:env/server';

export const GET: APIRoute = ({ url }) => {
  const searchUrl = getBangRedirectUrl(url, DEFAULT_BANG) ?? '/';
  return Response.redirect(searchUrl, 301);
};
