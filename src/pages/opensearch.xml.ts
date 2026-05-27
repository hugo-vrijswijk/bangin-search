import type { APIRoute } from 'astro';
import { makeOpenSearchXml } from '../opensearch';

export const GET: APIRoute = ({ url, request }) => {
  const proto = request.headers.get('x-forwarded-proto') ?? url.protocol;
  const origin = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? url.host;
  const baseUrl = `${proto}://${origin}`;

  return new Response(
    makeOpenSearchXml({
      baseUrl,
      suggestions: 'https://api.qwant.com/v3/suggest/?q={searchTerms}&amp;client=opensearch',
      description: 'Search the web with fast Bangs',
      longName: "Bangin' Search",
      shortName: "Bangin'",
    }),
    {
      headers: {
        'Content-Type': 'application/opensearchdescription+xml',
      },
    },
  );
};
