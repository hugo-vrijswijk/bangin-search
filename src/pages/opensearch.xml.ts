import type { APIRoute } from 'astro';
import { makeOpenSearchXml } from '../opensearch';

export const GET: APIRoute = ({ url }) => {
  return new Response(
    makeOpenSearchXml({
      baseUrl: url.origin,
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
