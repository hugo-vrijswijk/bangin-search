import type { APIRoute } from 'astro';
import { baseOpenSearchParams, makeOpenSearchXml } from '../opensearch';

export const GET: APIRoute = ({ url, request }) => {
  const proto = request.headers.get('x-forwarded-proto') ?? url.protocol;
  const origin = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? url.host;
  const baseUrl = `${proto}://${origin}`;

  return new Response(
    makeOpenSearchXml({
      baseUrl,
      ...baseOpenSearchParams,
    }),
    {
      headers: {
        'Content-Type': 'application/opensearchdescription+xml',
      },
    },
  );
};
