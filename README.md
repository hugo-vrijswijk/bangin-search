# Bangin' Search

Fast search with [bangs](https://duckduckgo.com/bangs). Maybe DuckDuckGo is too slow for you, or you want to use another search engine, but miss the bangs? This is the solution. DuckDuckGo bangs are also routed through DuckDuckGo servers, which this avoids.

Uses server-side redirects on a first visit to avoid downloading the large bangs file. On subsequent visits, a service-worker will be used for instantaneous client-side redirects.

## Getting started

Run with Docker:

```bash
docker run -p 4321:4321 --name bangin-search ghcr.io/hugo-vrijswijk/bangin-search
```

The container will also listen to the `PORT` environment variable, so you can set that to your desired port if needed.

The default search engine is [Qwant](https://www.qwant.com/), but you can change that by setting the `DEFAULT_BANG` environment variable. For example, to use [DuckDuckGo](https://duckduckgo.com/):

```bash
docker run -p 4321:4321 --name bangin-search -e DEFAULT_BANG=ddg ghcr.io/hugo-vrijswijk/bangin-search
```

Put the service behind your favorite reverse proxy, and you're good to go. Open the site and your browser should let you add the search engine to your browser.

No tracking, no ads, no bullshit. Just a simple search engine with bangs.

## Acknowledgements

- [Kagi](https://github.com/kagisearch/bangs/) for a well-maintained list of bangs
- [t3dotgg/unduck](https://github.com/t3dotgg/unduck) for the original idea and some of the styling
