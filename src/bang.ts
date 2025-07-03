import bangs from './bangs.json';

// Fast lookup
const bangsMap = new Map(bangs.map((bang) => [bang.t, bang]));

export function getBangredirectUrl(url: URL, fallback: string): string | null {
  const query = url.searchParams.get('q')?.trim();
  if (!query) {
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  let selectedBang = bangCandidate ? bangsMap.get(bangCandidate) : null;

  let cleanQuery;
  if (!selectedBang) {
    selectedBang = bangsMap.get(fallback);
    cleanQuery = query;
  } else {
    // Remove the first bang from the query
    cleanQuery = query.replace(/!\S+\s*/i, '').trim();
  }

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    '{{{s}}}',
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, '/'),
  );
  if (!searchUrl) return null;

  return searchUrl;
}
