export interface OpenSearchParams {
  shortName: string;
  description: string;
  longName: string;
  baseUrl: string;
  suggestions: string;
}

export function makeOpenSearchXml({ shortName, description, longName, baseUrl, suggestions }: OpenSearchParams): string {
  return `<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
  <ShortName>${shortName}</ShortName>
  <Description>${description}</Description>
  <LongName>${longName}</LongName>
  <InputEncoding>UTF-8</InputEncoding>
  <OutputEncoding>UTF-8</OutputEncoding>
  <Image width="64" height="64" type="image/png">${new URL('/pwa-64x64.png', baseUrl)}</Image>
  <Image width="16" height="16" type="image/x-icon">${new URL('/favicon.ico', baseUrl)}</Image>
  <Url type="text/html" template="${new URL('/search?q={searchTerms}', baseUrl)}"/>
  <Url type="application/x-suggestions+json" method="GET" template="${suggestions}"/>
  <Url type="application/opensearchdescription+xml" rel="self" template="${new URL('/opensearch.xml', baseUrl)}" />
  <moz:SearchForm>${baseUrl}</moz:SearchForm>
</OpenSearchDescription>`;
}

export const baseOpenSearchParams: Omit<OpenSearchParams, 'baseUrl'> = {
  suggestions: 'https://api.qwant.com/v3/suggest/?q={searchTerms}&amp;client=opensearch',
  description: 'Search the web with fast Bangs',
  longName: "Bangin' Search",
  shortName: "Bangin'",
};
