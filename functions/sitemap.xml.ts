/// <reference types="@cloudflare/workers-types" />

type Env = { ASSETS: Fetcher };
type Ctx = { request: Request; env: Env };

export async function onRequest(ctx: Ctx): Promise<Response> {
  const url = new URL(ctx.request.url);

  // fetch the built static asset from Pages (out/sitemap.xml)
  const assetRes = await ctx.env.ASSETS.fetch(url.toString());
  const body = ctx.request.method === "HEAD" ? null : await assetRes.text();

  return new Response(body, {
    status: assetRes.ok ? 200 : assetRes.status,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      // مهم لـ GSC: خليه يتجلب كل مرة ومايتحبس على 304 قديم
      "cache-control": "public, max-age=0, must-revalidate",
      "x-robots-tag": "all",
    },
  });
}
