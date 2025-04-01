import type { APIRoute } from 'astro';
import { makeOpenSearchXml } from '../opensearch';

export const GET: APIRoute = ({ request }) => {
  return new Response(
    makeOpenSearchXml({
      baseUrl: request.url.replace(/\/opensearch\.xml$/, ''),
      suggestions: 'https://www.qwant.com?q={searchTerms}&amp;client=opensearch',
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
