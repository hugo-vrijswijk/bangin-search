import type { APIRoute } from 'astro';
import { getBangRedirectUrl } from '../bang';
import { DEFAULT_BANG } from 'astro:env/server';

export const GET: APIRoute = ({ url, redirect }) => {
  const searchUrl = getBangRedirectUrl(url, DEFAULT_BANG) ?? '/';
  return redirect(searchUrl, 301);
};
