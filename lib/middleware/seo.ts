// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import freshApp from "~/fresh.gen.ts";

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const url = new URL(req.url);
  const path = url.pathname;

  if (path === "/robots.txt") {
    return new Response(
      `User-agent: *\nAllow: /\n\nsitemap: ${url.protocol}//${url.host}/sitemap.xml`,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      },
    );
  }

  if (path === "/sitemap.xml") {
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${
        Object.entries(freshApp.routes).filter(([route]) =>
          !(route.includes("_") || route.includes("/api/"))
        ).map(([route, module]: [string, unknown]) => {
          const { info } = module as {
            info?: {
              GET?: {
                lastModified: string;
                priority: number;
                params?: Record<string, unknown>;
                changeFrequency:
                  | "always"
                  | "hourly"
                  | "daily"
                  | "weekly"
                  | "monthly"
                  | "yearly"
                  | "never";
              };
            };
          };
          const data = info?.GET;
          const params = data?.params;
          const lastModified = data?.lastModified || new Date().toISOString();
          const changeFrequency = data?.changeFrequency || "monthly";
          const path = route.replace("./routes", "").replace(
            /(index)?\.tsx?$/,
            "",
          );
          const priority =
            (data?.priority || path === "/" ? 1 : path === "/login" ? .7 : .5)
              .toFixed(1);

          const returnXML = (route: string) =>
            `  <url>
  <loc>${url.protocol}//${url.host}${route}</loc>
  <lastmod>${lastModified}</lastmod>
  <changefreq>${changeFrequency}</changefreq>
  <priority>${priority}</priority>
</url>`;

          return params
            ? Object.keys(params).map((param) => {
              const paramValues = params[param] as {
                options?:
                  | string[]
                  | ((args: unknown) => string[] | Promise<string[]>);
              };
              if (Array.isArray(paramValues.options)) {
                return paramValues.options.map((paramValue) => {
                  return returnXML(
                    path.replace(`[${param}]`, paramValue as string),
                  );
                }).join("\n");
              } else if (typeof paramValues.options === "function") {
                let returnValues = paramValues.options({});

                // if is promise
                if (returnValues instanceof Promise) {
                  returnValues = [];
                }

                return returnValues.map((paramValue) => {
                  return returnXML(
                    path.replace(`[${param}]`, paramValue as string),
                  );
                }).join("\n");
              }

              return returnXML(path);
            }).join("\n")
            : returnXML(path);
        }).join("\n")
      }
</urlset>`,
      {
        headers: {
          "Content-Type": "application/xml",
        },
      },
    );
  }

  const resp = await ctx.next();
  return resp;
}
