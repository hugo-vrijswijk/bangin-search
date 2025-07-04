/// <reference lib="WebWorker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { getBangRedirectUrl } from './bang';

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

const bangCacheName = 'bangs';
const defaultBangCacheName = '/default-bang';

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const data = event.data as { defaultBang: string };
  if (data && data.defaultBang) {
    saveValue(bangCacheName, defaultBangCacheName, data.defaultBang);
  }
});

self.addEventListener('fetch', async (event: FetchEvent) => {
  const url = new URL(event.request.url);
  if (event.request.method === 'GET' && url.pathname === '/search' && url.searchParams.has('q')) {
    return event.respondWith(redirectToBangSearch(url));
  }
});

export async function redirectToBangSearch(url: URL) {
  const bang = (await getValue(bangCacheName, defaultBangCacheName)) || 'qw';
  const searchUrl = getBangRedirectUrl(url, bang);
  console.log(`Redirecting to search URL`, searchUrl);
  return Response.redirect(searchUrl ?? '/', 301);
}

async function saveValue(cacheName: string, key: string, value: string) {
  const cache = await caches.open(cacheName);
  await cache.put(key, new Response(value));
}

async function getValue(cacheName: string, key: string) {
  const cache = await caches.open(cacheName);
  const response = await cache.match(key);
  if (response) {
    const value = await response.text();
    return value;
  }
  return null;
}
