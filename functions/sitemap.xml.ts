type AssetFetcher = {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

type PagesContext = {
  request: Request;
  env: { ASSETS: AssetFetcher };
};

export async function onRequest(ctx: PagesContext): Promise<Response> {
  const url = new URL(ctx.request.url);

  // Request جديد بدون If-None-Match / If-Modified-Since => يمنع 304
  const assetRes = await ctx.env.ASSETS.fetch(new Request(url.toString(), { method: "GET" }));
  const body = ctx.request.method === "HEAD" ? null : await assetRes.text();

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-seo-fn": "sitemap",
      "x-robots-tag": "all"
    },
  });
}
