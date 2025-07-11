export interface OpenSearchParams {
  shortName: string;
  description: string;
  longName: string;
  baseUrl: string;
  suggestions: string;
}

export function makeOpenSearchXml(params: OpenSearchParams): string {
  return `<OpenSearchDescription
  xmlns="http://a9.com/-/spec/opensearch/1.1/"
  xmlns:moz="http://www.mozilla.org/2006/browser/search/">
  <ShortName>${params.shortName}</ShortName>
  <Description>${params.description}</Description>
  <LongName>${params.longName}</LongName>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="16" height="16" type="image/x-icon">${new URL('/favicon.ico', params.baseUrl)}</Image>
  <Url type="text/html" template="${new URL('/search?q={searchTerms}', params.baseUrl)}"/>
  <Url type="application/x-suggestions+json" method="GET" template="${params.suggestions}"/>
  <Url type="application/opensearchdescription+xml" rel="self" template="${new URL('/opensearch.xml', params.baseUrl)}" />
</OpenSearchDescription>`;
}
