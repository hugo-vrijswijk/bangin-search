# Bangin' Search

Fast search with [bangs](https://duckduckgo.com/bangs). Maybe DuckDuckGo is too slow for you, or you want to use another search engine, but miss the bangs? This is the solution.

## Getting started

Run with Docker:

```bash
docker run -p 4321:4321 --name bangin-search ghcr.io/hugo-vrijswijk/bangin-search
```

The container will also listen to the `PORT` environment variable, so you can set that to your desired port.

The default search engine is [Qwant](https://www.qwant.com/), but you can change that by setting the `DEFAULT_BANG` environment variable. For example, to use [DuckDuckGo](https://duckduckgo.com/):

```bash
docker run -p 4321:4321 --name bangin-search -e DEFAULT_BANG=ddg ghcr.io/hugo-vrijswijk/bangin-search
```

Put the service behind your favorite reverse proxy, and you're good to go. Open the site and your browser should let you add the search engine to your browser.

No tracking, no ads, no bullshit. Just a simple search engine with bangs. You can also use it as a bookmarklet in your browser.
