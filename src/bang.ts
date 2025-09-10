import bangs from './bangs.json';

// Fast lookup
const bangsMap = new Map((bangs as [string[], string][]).flatMap(([ts, u]) => ts.map((t) => [t, u] as const)));

export function getBangRedirectUrl(url: URL, fallback: string): string | null {
  const query = url.searchParams.get('q')?.trim();
  if (!query) {
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  let selectedBang = bangCandidate ? bangsMap.get(bangCandidate) : null;

  let cleanQuery;
  if (!selectedBang) {
    // If no bang was found, redirect to the fallback bang as-is
    selectedBang = bangsMap.get(fallback);
    cleanQuery = query;
  } else {
    // Remove the first bang from the query
    cleanQuery = query.replace(/!\S+\s*/i, '').trim();
  }

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.replace(
    '{{{s}}}',
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, '/'),
  );
  if (!searchUrl || !URL.canParse(searchUrl)) return null;

  return searchUrl;
}
